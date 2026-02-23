import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "North Lantern Group | Illuminating Your Path to Digital Excellence",
  description: "Expert Atlassian solutions, Business Intelligence, and Cloud Migration services. Transform your business with North Lantern Group.",
  keywords: ["Atlassian", "Business Intelligence", "Cloud Migration", "Jira", "Power BI", "AWS", "Azure"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicons/NLG-Favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicons/NLG-Favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
