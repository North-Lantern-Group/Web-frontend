import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "North Lantern Group | Illuminating Your Path to Digital Excellence",
  description: "Expert Atlassian solutions, Business Intelligence, and Cloud Migration services. Transform your business with North Lantern Group.",
  keywords: ["Atlassian", "Business Intelligence", "Cloud Migration", "Jira", "Power BI", "AWS", "Azure"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
