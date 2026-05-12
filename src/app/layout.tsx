import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://www.northlanterngroup.com";
const siteTitle = "Senior-led Atlassian, Analytics & Automation Consulting | NLG";
const siteDescription =
  "Atlassian, analytics, and automation consulting for IT and operations teams. Modernize workflows, unify reporting, and integrate disconnected systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "North Lantern Group",
    title: siteTitle,
    description: siteDescription,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05101F" },
    { media: "(prefers-color-scheme: light)", color: "#05101F" },
  ],
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "North Lantern Group Inc.",
  url: siteUrl,
  logo: "https://www.northlanterngroup.com/logo.png",
  description: siteDescription,
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
    "North America",
    "Latin America",
    "Europe",
    "Middle East",
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
  foundingDate: "2025",
  slogan: "Results that endure.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "North Lantern Group services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Atlassian Platform",
          description:
            "Atlassian that drifted. Jira instances that grew without rules. Confluence spaces nobody searches. JSM queues with inconsistent SLAs. Admin left, runbooks didn't. We rebuild the structure across the Atlassian stack: Jira, Confluence, JSM, and the governance, identity, discovery, and AI layers Atlassian has built on top. Then we hand back a system your team actually understands.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "BI and Analytics",
          description:
            "Reports leadership doesn't trust. Dashboards nobody opens. Three sources of truth for the same number. The real metric lives in someone's tab order. Definitions written after the chart. We rebuild the layer underneath the dashboard: semantic model, metric catalog, refresh SLAs, lineage, and row-level access, feeding Power BI, Tableau, or Atlassian Analytics on the Data Lake. Then we hand leadership a number they can quote without a caveat.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automation and Integration",
          description:
            "The work hiding between your systems. CRM to billing. Ticket to invoice. Slack to Jira. Afternoon hours burned because two systems don't talk and nobody scoped the integration. Brittle webhooks, a script on someone's laptop, a Zap that silently stopped firing. We build cross-system integrations, operational automations, and AI-assisted internal tooling on n8n, native platforms, or custom code. Every rule ships with a named owner and a rollback path.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" />
      </head>
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
