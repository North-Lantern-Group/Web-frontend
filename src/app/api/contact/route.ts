import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Valid statuses that we accept
    const validStatuses = ['valid', 'catch-all'];

    if (validStatuses.includes(data.status)) {
      return { valid: true };
    }

    // Provide user-friendly error messages
    const errorMessages: Record<string, string> = {
      'invalid': 'This email address does not exist',
      'abuse': 'This email address cannot receive messages',
      'do_not_mail': 'This email address cannot receive messages',
      'spamtrap': 'This email address is not valid',
      'disposable': 'Please use a permanent email address, not a temporary one',
      'unknown': 'Unable to verify this email address. Please check for typos',
    };

    return {
      valid: false,
      reason: errorMessages[data.status] || 'This email address could not be verified'
    };
  } catch (error) {
    console.error('ZeroBounce verification error:', error);
    // Allow through if verification service fails
    return { valid: true };
  }
}

async function verifyCaptcha(token: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Allow dev-mode token when secret key is not configured (development only)
  if (!secretKey) {
    if (token === 'dev-mode') {
      console.warn('CAPTCHA bypassed - RECAPTCHA_SECRET_KEY not configured');
      return { success: true };
    }
    console.error('RECAPTCHA_SECRET_KEY not configured');
    return { success: false, error: 'CAPTCHA not configured on server' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    const data = await response.json();

    if (data.success === true) {
      return { success: true };
    }

    // Map Google's error codes to user-friendly messages
    const errorCodes = data['error-codes'] || [];
    console.error('reCAPTCHA verification failed:', errorCodes);

    if (errorCodes.includes('invalid-input-secret')) {
      return { success: false, error: 'CAPTCHA configuration error. Please contact support.' };
    }
    if (errorCodes.includes('timeout-or-duplicate')) {
      return { success: false, error: 'CAPTCHA expired. Please try again.' };
    }
    if (errorCodes.includes('bad-request')) {
      return { success: false, error: 'Invalid CAPTCHA request. Please refresh and try again.' };
    }

    return { success: false, error: 'CAPTCHA verification failed. Please try again.' };
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return { success: false, error: 'CAPTCHA service unavailable. Please try again.' };
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, company, companySize, email, phone, service, message, captchaToken } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    const fullName = `${firstName} ${lastName}`;

    const emailContent = `
New Contact Form Submission

Name: ${fullName}
Company: ${company || 'Not provided'}
Company Size: ${companySize || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interest: ${service}
Message: ${message || 'No message provided'}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a1628 0%, #164e63 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: 600; color: #0a1628; }
    .value { color: #374151; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">North Lantern Group Website</p>
    </div>
    <div class="content">
      <div class="field">
        <p class="label">Name:</p>
        <p class="value">${fullName}</p>
      </div>
      <div class="field">
        <p class="label">Company:</p>
        <p class="value">${company || 'Not provided'}</p>
      </div>
      <div class="field">
        <p class="label">Company Size:</p>
        <p class="value">${companySize || 'Not provided'}</p>
      </div>
      <div class="field">
        <p class="label">Email:</p>
        <p class="value"><a href="mailto:${email}">${email}</a></p>
      </div>
      <div class="field">
        <p class="label">Phone:</p>
        <p class="value">${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
      </div>
      <div class="field">
        <p class="label">Service Interest:</p>
        <p class="value">${service}</p>
      </div>
      <div class="field">
        <p class="label">Message:</p>
        <p class="value">${message || 'No message provided'}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: 'North Lantern Group <noreply@northlanterngroup.com>',
      to: [
        'hamzachundrigar@northlanterngroup.com',
        'hello@northlanterngroup.com',
        'osaed.chundrigar@gmail.com'
      ],
      replyTo: email,
      subject: `New Inquiry from ${fullName} - ${service}`,
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
