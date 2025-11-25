import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

const openSans = Open_Sans({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});

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
      <body className={`${merriweather.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
