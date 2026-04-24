import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.northlanterngroup.com"),
  title: "North Lantern Group | Results that endure.",
  description: "Senior operators for Atlassian, BI, and operational automation. Same team from first call to handover.",
  alternates: {
    canonical: "https://www.northlanterngroup.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.northlanterngroup.com/",
    siteName: "North Lantern Group",
    title: "North Lantern Group | Results that endure.",
    description: "Senior operators for Atlassian, BI, and operational automation. Same team from first call to handover.",
    images: [
      {
        url: "/logo.png",
        width: 1536,
        height: 1024,
        alt: "North Lantern Group",
      },
    ],
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Lantern Group | Results that endure.",
    description: "Senior operators for Atlassian, BI, and operational automation. Same team from first call to handover.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicons/NLG-Favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicons/NLG-Favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "North Lantern Group Inc.",
  url: "https://www.northlanterngroup.com/",
  logo: "https://www.northlanterngroup.com/logo.png",
  description: "Senior operators for Atlassian, BI, and operational automation. Same team from first call to handover.",
  email: "hello@northlanterngroup.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "400 Slater St.",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    postalCode: "K1R 7S7",
    addressCountry: "CA",
  },
  areaServed: [
    "Canada",
    "Global markets",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@northlanterngroup.com",
    contactType: "sales",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.linkedin.com/company/northlanterngroup/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-nlg-bg-0 text-nlg-fg-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
