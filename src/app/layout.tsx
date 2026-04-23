import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.northlanterngroup.com"),
  title: "North Lantern Group | Atlassian Consulting and Operational Reporting",
  description: "Canada-based firm for Atlassian systems, BI and operational reporting, automation, and integration. Founder-led scoping and senior delivery for teams that need the work to stick.",
  alternates: {
    canonical: "https://www.northlanterngroup.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.northlanterngroup.com/",
    siteName: "North Lantern Group",
    title: "North Lantern Group | Atlassian Consulting and Operational Reporting",
    description: "Canada-based firm for Atlassian systems, BI and operational reporting, automation, and integration.",
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
    title: "North Lantern Group | Atlassian Consulting and Operational Reporting",
    description: "Canada-based firm for Atlassian systems, BI and operational reporting, automation, and integration.",
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
  description: "Canada-based firm for Atlassian systems, BI and operational reporting, automation, and integration.",
  email: "leads@northlanterngroup.com",
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
    email: "leads@northlanterngroup.com",
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
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
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
