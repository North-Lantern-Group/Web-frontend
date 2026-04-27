import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { renderContactLeadEmail } from '@/lib/contactEmail';
import {
  contactSubmissionSchema,
  getContactFieldErrors,
  type ContactSubmission,
} from '@/lib/contactValidation';
import { createLeadId, persistLeadBackup } from '@/lib/leadBackup';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const BODY_SIZE_LIMIT_BYTES = 16 * 1024;
const EXPECTED_RECAPTCHA_ACTION = 'contact_form_submit';
const EXPECTED_RECAPTCHA_HOSTNAME = 'www.northlanterngroup.com';
const RECAPTCHA_SCORE_THRESHOLD = 0.5;
const DEBUG_RECAPTCHA = process.env.DEBUG_RECAPTCHA === 'true';

// Map service values to display names for email
const serviceDisplayNames: Record<string, string> = {
  'atlassian-platform': 'Atlassian Platform',
  'bi-analytics': 'BI and Analytics',
  'automation-integration': 'Automation and Integration',
  'consultant-recovery': 'Our last consultant left us worse off',
  'general': 'General inquiry',
  // Legacy keys kept for backward compatibility with in-flight form submissions
  'atlassian-systems': 'Atlassian Platform',
  'bi-operational-reporting': 'BI and Analytics',
};

type LogLevel = 'error' | 'warn' | 'info';
type LogService = 'contact_api' | 'recaptcha' | 'zerobounce' | 'resend' | 'lead_backup';

class MissingResendApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingResendApiKeyError';
  }
}

function isProduction() {
  return process.env.VERCEL_ENV === 'production';
}

function toSafeErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return undefined;

  return error.message
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]')
    .replace(/https?:\/\/\S+/g, '[url]')
    .slice(0, 200);
}

function logStructured(
  level: LogLevel,
  service: LogService,
  reason: string,
  options: { leadId?: string; error?: unknown } = {}
) {
  const errorMessage = toSafeErrorMessage(options.error);
  const payload = {
    level,
    service,
    ...(options.leadId ? { leadId: options.leadId } : {}),
    reason,
    ...(errorMessage ? { errorMessage } : {}),
  };
  const line = JSON.stringify(payload);

  if (level === 'error') {
    console.error(line);
    return;
  }

  if (level === 'warn') {
    console.warn(line);
    return;
  }

  console.log(line);
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new MissingResendApiKeyError(
      isProduction()
        ? 'RESEND_API_KEY is not configured.'
        : 'RESEND_API_KEY is not configured. Add it to .env.local to test contact email delivery.'
    );
  }
  return new Resend(apiKey);
}

function cleanHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

const allowedAttributionParams = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
]);

function cleanUrlForLeadMetadata(value: string) {
  const trimmed = cleanHeaderValue(value).slice(0, 1000);
  if (!trimmed) return '';

  try {
    const url = new URL(trimmed);
    const allowedParams = new URLSearchParams();

    for (const [key, paramValue] of url.searchParams.entries()) {
      if (allowedAttributionParams.has(key.toLowerCase())) {
        allowedParams.append(key, paramValue.slice(0, 160));
      }
    }

    url.search = allowedParams.toString();
    url.hash = '';

    return url.toString().slice(0, 500);
  } catch {
    const [urlWithoutQuery] = trimmed.split(/[?#]/);
    return (urlWithoutQuery || '').slice(0, 500);
  }
}

function getErrorMessage(error: unknown) {
  return toSafeErrorMessage(error) || 'Unknown error';
}

function getClientIp(request: Request) {
  // Vercel forwards client IPs through x-forwarded-for first; x-real-ip is a fallback.
  const forwardedFor = request.headers.get('x-forwarded-for');
  const firstForwardedIp = forwardedFor?.split(',')[0]?.trim();

  if (firstForwardedIp) {
    return firstForwardedIp;
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function isBodyTooLarge(request: Request) {
  const contentLength = request.headers.get('content-length');
  if (!contentLength || !/^\d+$/.test(contentLength)) {
    return false;
  }

  return Number(contentLength) > BODY_SIZE_LIMIT_BYTES;
}

// Verify email exists using ZeroBounce
async function verifyEmailExists(
  email: string,
  leadId: string
): Promise<{ valid: boolean; reason?: string }> {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;

  if (!apiKey) {
    logStructured('warn', 'zerobounce', 'missing_api_key', { leadId });
    return { valid: true };
  }

  try {
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );
    const data = (await response.json()) as { status?: string };

    // Only block emails that are definitely problematic
    // Be lenient for contact forms - people filling out forms want to be contacted
    const blockedStatuses = ['invalid', 'spamtrap', 'disposable'];

    if (data.status && blockedStatuses.includes(data.status)) {
      const errorMessages: Record<string, string> = {
        invalid: 'This email address does not exist. Please check for typos.',
        spamtrap: 'This email address is not valid.',
        disposable: 'Please use a permanent email address, not a temporary one.',
      };
      return {
        valid: false,
        reason: errorMessages[data.status] || 'This email address could not be verified',
      };
    }

    // Allow all other statuses (valid, catch-all, do_not_mail, abuse, unknown)
    return { valid: true };
  } catch {
    logStructured('warn', 'zerobounce', 'fetch_failed', { leadId });
    // Allow through if verification service fails
    return { valid: true };
  }
}

type RecaptchaResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
};

type CaptchaVerificationResult = {
  success: boolean;
  error?: string;
  score?: number;
  status?: number;
};

async function verifyCaptcha(token: string, leadId: string): Promise<CaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    if (isProduction()) {
      logStructured('error', 'recaptcha', 'missing_secret_key', { leadId });
      return { success: false, error: 'Service temporarily unavailable.', status: 500 };
    }

    logStructured('warn', 'recaptcha', 'missing_secret_key_non_production', { leadId });
    return { success: true };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });
    const data = (await response.json()) as RecaptchaResponse;

    if (DEBUG_RECAPTCHA) {
      logStructured('info', 'recaptcha', 'verification_response', { leadId });
    }

    if (!data.success) {
      const errorCodes = data['error-codes'] || [];
      logStructured('warn', 'recaptcha', 'verification_failed', {
        leadId,
        error: new Error(errorCodes.join(',') || 'Unknown reCAPTCHA verification error'),
      });

      if (errorCodes.includes('invalid-input-secret')) {
        return { success: false, error: 'Security verification configuration error.' };
      }
      if (errorCodes.includes('timeout-or-duplicate')) {
        return { success: false, error: 'Security verification expired. Please try again.' };
      }
      return { success: false, error: 'Security verification failed. Please try again.' };
    }

    if (data.action !== EXPECTED_RECAPTCHA_ACTION) {
      logStructured(isProduction() ? 'error' : 'warn', 'recaptcha', 'action_mismatch', { leadId });
      if (isProduction()) {
        return { success: false, error: 'Security verification failed. Please try again.' };
      }
    }

    if (data.hostname !== EXPECTED_RECAPTCHA_HOSTNAME) {
      logStructured(isProduction() ? 'error' : 'warn', 'recaptcha', 'hostname_mismatch', { leadId });
      if (isProduction()) {
        return { success: false, error: 'Security verification failed. Please try again.' };
      }
    }

    const score = data.score || 0;
    if (score < RECAPTCHA_SCORE_THRESHOLD) {
      logStructured('warn', 'recaptcha', 'low_score', { leadId });
      return {
        success: false,
        error: 'Unable to verify your request. Please try again or contact us directly.',
        score,
      };
    }

    return { success: true, score };
  } catch (error) {
    logStructured('error', 'recaptcha', 'fetch_failed', { leadId, error });
    return { success: false, error: 'Security verification service unavailable. Please try again.' };
  }
}

function rateLimitErrorResponse(retryAfter?: number) {
  return NextResponse.json(
    { error: 'Too many requests. Please wait and try again.' },
    {
      status: 429,
      headers: retryAfter ? { 'Retry-After': String(retryAfter) } : undefined,
    }
  );
}

export async function POST(request: Request) {
  try {
    try {
      const rateLimit = await checkRateLimit(getClientIp(request));
      if (!rateLimit.allowed) {
        return rateLimitErrorResponse(rateLimit.retryAfter);
      }
    } catch (error) {
      logStructured('error', 'contact_api', 'rate_limit_failed_closed', { error });
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    if (isBodyTooLarge(request)) {
      return NextResponse.json(
        { error: 'Request body too large.' },
        { status: 413 }
      );
    }

    let rawSubmission: unknown;
    try {
      rawSubmission = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const validationResult = contactSubmissionSchema.safeParse(rawSubmission);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Please correct the highlighted fields.',
          fieldErrors: getContactFieldErrors(validationResult.error),
        },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      company,
      companySize,
      email,
      phone,
      service,
      message,
      captchaToken,
      website: honeypot,
      marketingConsent,
      sourcePage,
      referrer,
    }: ContactSubmission = validationResult.data;

    const leadId = createLeadId();

    if (honeypot) {
      return NextResponse.json({
        success: true,
        leadId,
        emailStatus: 'sent',
        backupStatus: 'stored',
      });
    }

    const captchaResult = await verifyCaptcha(captchaToken, leadId);
    if (!captchaResult.success) {
      return NextResponse.json(
        { error: captchaResult.error || 'CAPTCHA verification failed' },
        { status: captchaResult.status || 400 }
      );
    }

    const emailVerification = await verifyEmailExists(email, leadId);
    if (!emailVerification.valid) {
      return NextResponse.json(
        { error: emailVerification.reason || 'Invalid email address' },
        { status: 400 }
      );
    }

    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || email;
    const serviceDisplay = serviceDisplayNames[service] || service;
    const submittedAt = new Date().toISOString();
    const marketingConsentLabel = marketingConsent ? 'Yes (marketing updates opt-in)' : 'No';
    const safeSourcePage = cleanUrlForLeadMetadata(sourcePage || request.headers.get('referer') || '');
    const safeReferrer = cleanUrlForLeadMetadata(referrer || '');

    const { text: emailText, html: emailHtml } = renderContactLeadEmail({
      leadId,
      submittedAt,
      fullName,
      company,
      companySize,
      email,
      phone,
      serviceDisplay,
      message,
      marketingConsentLabel,
      privacyAccepted: true,
      sourcePage: safeSourcePage,
      referrer: safeReferrer,
    });

    let resendMessageId = '';
    let emailStatus: 'sent' | 'failed' = 'failed';
    let emailError = '';

    try {
      const resend = getResendClient();
      const { data, error } = await resend.emails.send(
        {
          from: 'North Lantern Group <noreply@northlanterngroup.com>',
          to: ['leads@northlanterngroup.com'],
          replyTo: cleanHeaderValue(email),
          subject: cleanHeaderValue(`New inquiry from ${fullName} - ${serviceDisplay}`),
          text: emailText,
          html: emailHtml,
        },
        { idempotencyKey: leadId }
      );

      if (error) {
        throw new Error(error.message);
      }

      emailStatus = 'sent';
      resendMessageId = data?.id || '';
    } catch (error) {
      if (error instanceof MissingResendApiKeyError) {
        throw error;
      }

      emailError = getErrorMessage(error);
      logStructured('error', 'resend', 'send_failed', { leadId, error });
    }

    const backupResult = await persistLeadBackup({
      leadId,
      submittedAt,
      firstName: firstName || '',
      lastName: lastName || '',
      company,
      companySize: companySize || '',
      email,
      phone: phone || '',
      service,
      serviceDisplay,
      message,
      marketingConsent: Boolean(marketingConsent),
      privacyAccepted: true,
      sourcePage: safeSourcePage,
      referrer: safeReferrer,
      emailStatus,
      resendMessageId,
      emailError,
    });

    if (backupResult.enabled && !backupResult.ok) {
      logStructured('error', 'lead_backup', 'persist_failed', {
        leadId,
        error: new Error(backupResult.error || 'Unknown lead backup error'),
      });
    }

    const hasStoredBackup = backupResult.enabled && backupResult.ok && backupResult.status !== 'disabled';

    if (emailStatus === 'failed' && !hasStoredBackup) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId,
      emailStatus,
      backupStatus: backupResult.status,
    });
  } catch (error) {
    logStructured(
      'error',
      'contact_api',
      error instanceof MissingResendApiKeyError ? 'missing_resend_api_key' : 'unhandled_error',
      { error }
    );
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
