import type { NextConfig } from "next";

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
        value: "camera=(), microphone=(), geolocation=()",
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
