import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, company, email, service } = await request.json();

    // Validate required fields
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailContent = `
New Contact Form Submission

Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email}
Service Interest: ${service}
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
        <p class="value">${name}</p>
      </div>
      <div class="field">
        <p class="label">Company:</p>
        <p class="value">${company || 'Not provided'}</p>
      </div>
      <div class="field">
        <p class="label">Email:</p>
        <p class="value"><a href="mailto:${email}">${email}</a></p>
      </div>
      <div class="field">
        <p class="label">Service Interest:</p>
        <p class="value">${service}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: 'North Lantern Group <send@northlanterngroup.com>',
      to: [
        'hamzachundrigar@northlanterngroup.com',
        'hello@northlanterngroup.com'
      ],
      replyTo: email,
      subject: `New Inquiry from ${name} - ${service}`,
      text: emailContent,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
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
