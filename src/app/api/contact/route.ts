import { Resend } from 'resend';
import { NextResponse } from 'next/server';
// Contact form API with CAPTCHA and email verification

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

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

// Verify email exists using ZeroBounce
async function verifyEmailExists(email: string): Promise<{ valid: boolean; reason?: string }> {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;

  // Skip verification in dev mode if no API key
  if (!apiKey) {
    console.warn('ZEROBOUNCE_API_KEY not configured - skipping email verification');
    return { valid: true };
  }

  try {
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`
    );
    const data = await response.json();

    // Only block emails that are definitely problematic
    // Be lenient for contact forms - people filling out forms want to be contacted
    const blockedStatuses = ['invalid', 'spamtrap', 'disposable'];

    if (blockedStatuses.includes(data.status)) {
      const errorMessages: Record<string, string> = {
        'invalid': 'This email address does not exist. Please check for typos.',
        'spamtrap': 'This email address is not valid.',
        'disposable': 'Please use a permanent email address, not a temporary one.',
      };
      return {
        valid: false,
        reason: errorMessages[data.status] || 'This email address could not be verified'
      };
    }

    // Allow all other statuses (valid, catch-all, do_not_mail, abuse, unknown)
    return { valid: true };
  } catch (error) {
    console.error('ZeroBounce verification error:', error);
    // Allow through if verification service fails
    return { valid: true };
  }
}

// Minimum score threshold for reCAPTCHA v3 (0.0 = likely bot, 1.0 = likely human)
// 0.5 is Google's recommended threshold for most use cases
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// Debug logging flag - set DEBUG_RECAPTCHA=true in env to enable verbose logging
const DEBUG_RECAPTCHA = process.env.DEBUG_RECAPTCHA === 'true';

async function verifyCaptcha(token: string): Promise<{ success: boolean; error?: string; score?: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Skip verification in development if no secret key
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured - allowing submission');
    return { success: true };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    const data = await response.json();

    // Log for monitoring (gated behind DEBUG_RECAPTCHA flag per code review)
    if (DEBUG_RECAPTCHA) {
      console.log('reCAPTCHA v3 response:', {
        success: data.success,
        score: data.score,
        action: data.action,
        hostname: data.hostname,
      });
    }

    // Check if verification succeeded
    if (!data.success) {
      const errorCodes = data['error-codes'] || [];
      console.error('reCAPTCHA verification failed:', errorCodes);

      if (errorCodes.includes('invalid-input-secret')) {
        return { success: false, error: 'Security verification configuration error.' };
      }
      if (errorCodes.includes('timeout-or-duplicate')) {
        return { success: false, error: 'Security verification expired. Please try again.' };
      }
      return { success: false, error: 'Security verification failed. Please try again.' };
    }

    // Check score threshold (v3 specific)
    const score = data.score || 0;
    if (score < RECAPTCHA_SCORE_THRESHOLD) {
      console.warn(`reCAPTCHA score too low: ${score} (threshold: ${RECAPTCHA_SCORE_THRESHOLD})`);
      return {
        success: false,
        error: 'Unable to verify your request. Please try again or contact us directly.',
        score
      };
    }

    // Optionally verify action matches expected value
    if (data.action && data.action !== 'contact_form_submit') {
      console.warn(`reCAPTCHA action mismatch: expected 'contact_form_submit', got '${data.action}'`);
      // Don't fail on action mismatch, just log it
    }

    return { success: true, score };
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return { success: false, error: 'Security verification service unavailable. Please try again.' };
  }
}

export async function POST(request: Request) {
  try {
    interface ContactFormData {
      firstName?: string;
      lastName?: string;
      company: string;
      companySize?: string;
      email: string;
      phone?: string;
      service: string;
      message: string;
      captchaToken: string;
      website?: string;
      marketingConsent?: boolean;
    }

    const { firstName, lastName, company, companySize, email, phone, service, message, captchaToken, website: honeypot, marketingConsent }: ContactFormData = await request.json();

    // Validate required fields
    if (!company || !email || !service || !message || message.trim().length < 30) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Honeypot check - if filled, it's a bot (real users can't see this field)
    if (honeypot) {
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 400 }
      );
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'CAPTCHA verification required' },
        { status: 400 }
      );
    }

    const captchaResult = await verifyCaptcha(captchaToken);
    if (!captchaResult.success) {
      return NextResponse.json(
        { error: captchaResult.error || 'CAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Verify email actually exists
    const emailVerification = await verifyEmailExists(email);
    if (!emailVerification.valid) {
      return NextResponse.json(
        { error: emailVerification.reason || 'Invalid email address' },
        { status: 400 }
      );
    }

    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || email;
    const serviceDisplay = serviceDisplayNames[service] || service;
    const safeFullName = escapeHtml(fullName);
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeCompanySize = escapeHtml(companySize || 'Not provided');
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeServiceDisplay = escapeHtml(serviceDisplay);
    const safeMessage = escapeHtml(message || 'No message provided');
    const marketingConsentLabel = marketingConsent ? 'Yes (marketing updates opt-in)' : 'No';
    const safeMarketingConsent = escapeHtml(marketingConsentLabel);

    const emailContent = `
New Contact Form Submission

Name: ${fullName}
Company: ${company || 'Not provided'}
Company Size: ${companySize || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}
Area of Interest: ${serviceDisplay}
Marketing consent: ${marketingConsentLabel}
Message: ${message || 'No message provided'}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0891b2; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: 600; color: #0a1628; }
    .value { color: #374151; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header" style="background-color: #0891b2 !important;">
      <h1 style="margin: 0; font-size: 24px; color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; color: #e0f7fa !important; -webkit-text-fill-color: #e0f7fa !important;">North Lantern Group Website</p>
    </div>
    <div class="content">
      <div class="field">
        <p class="label">Name:</p>
        <p class="value">${safeFullName}</p>
      </div>
      <div class="field">
        <p class="label">Company:</p>
        <p class="value">${safeCompany}</p>
      </div>
      <div class="field">
        <p class="label">Company Size:</p>
        <p class="value">${safeCompanySize}</p>
      </div>
      <div class="field">
        <p class="label">Email:</p>
        <p class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></p>
      </div>
      <div class="field">
        <p class="label">Phone:</p>
        <p class="value">${safePhone ? `<a href="tel:${safePhone}">${safePhone}</a>` : 'Not provided'}</p>
      </div>
      <div class="field">
        <p class="label">Area of Interest:</p>
        <p class="value">${safeServiceDisplay}</p>
      </div>
      <div class="field">
        <p class="label">Marketing consent:</p>
        <p class="value">${safeMarketingConsent}</p>
      </div>
      <div class="field">
        <p class="label">Message:</p>
        <p class="value">${safeMessage}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: 'North Lantern Group <noreply@northlanterngroup.com>',
      to: ['leads@northlanterngroup.com'],
      replyTo: cleanHeaderValue(email),
      subject: cleanHeaderValue(`New inquiry from ${fullName} - ${serviceDisplay}`),
      text: emailContent,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
