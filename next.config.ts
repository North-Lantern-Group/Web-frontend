import type { NextConfig } from "next";

// Report-only CSP. It does not block anything; it only reports violations
// to the browser console and (if configured) a report endpoint. Once the
// policy has been observed in production for a reasonable period without
// breakage, switch `Content-Security-Policy-Report-Only` to
// `Content-Security-Policy` to enforce it.
//
// Third-party origins accounted for:
//   - Google reCAPTCHA v3 script (https://www.google.com/recaptcha/...,
//     https://www.gstatic.com/recaptcha/...)
//   - Google Fonts are NOT used at runtime (next/font self-hosts them)
//
// `'unsafe-inline'` on script-src is currently required by Next.js runtime
// chunks and the JSON-LD <script type="application/ld+json"> in the root
// layout. Migrating to strict-dynamic with nonces is a follow-up.
const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
  "frame-src https://www.google.com/recaptcha/",
  "connect-src 'self' https://www.google.com/recaptcha/",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    const isProduction = process.env.VERCEL_ENV === "production";
    const headers = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
      {
        key: "Content-Security-Policy-Report-Only",
        value: contentSecurityPolicyReportOnly,
      },
      ...(isProduction
        ? []
        : [
            {
              key: "X-Robots-Tag",
              value: "noindex, nofollow",
            },
          ]),
    ];

    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
};

export default nextConfig;
