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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
