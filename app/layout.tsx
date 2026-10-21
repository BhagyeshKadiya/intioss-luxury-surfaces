import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL("https://intioss.com"),
  title: {
    default: "INTIOSS – Luxury Surfaces",
    template: "%s | INTIOSS – Luxury Surfaces",
  },
  description:
    "The luxury stone brand of INTIOSS Luxury Surfaces and group companies Quality Marble, Marmo Granite International, and Gandhi Civil Décor. Curating rare Italian marble, semi-precious gemstones, onyx, and architectural surfaces across Mumbai, Silvassa, and Kishangarh.",
  keywords: [
    "Italian Marble Mumbai",
    "Luxury Surfaces Silvassa",
    "Rare Marble Kishangarh",
    "Precious Stone Slabs",
    "Architectural Stone Surfaces",
    "Bookmatch Marble",
    "INTIOSS",
    "Quality Marble",
  ],
  authors: [{ name: "INTIOSS Luxury Surfaces" }],
  openGraph: {
    title: "INTIOSS – Luxury Surfaces",
    description:
      "Rare marble and architectural stone across Mumbai, Silvassa, and Kishangarh.",
    url: "https://intioss.com",
    siteName: "INTIOSS Luxury Surfaces",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "INTIOSS Luxury Surfaces",
  description: SITE_CONFIG.description,
  url: "https://intioss.com",
  telephone: SITE_CONFIG.phoneDisplay,
  email: SITE_CONFIG.email,
  parentOrganization: {
    "@type": "Organization",
    name: "Gandhi Civil Décor",
    subOrganization: {
      "@type": "Organization",
      name: "Quality Marble",
      url: "https://www.qualitymarble.co.in/",
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.locations[0].address,
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: ["Mumbai", "Silvassa", "Kishangarh"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-maroon antialiased selection:bg-maroon selection:text-gold">
        <SmoothScrollProvider>
          {/* Top hairline scroll progress */}
          <ScrollProgress />


          {/* Sticky Luxury Navbar */}
          <Navbar />

          {/* Page contents */}
          <main className="relative z-10">{children}</main>

          {/* Global persistent WhatsApp button */}
          <WhatsAppButton />

          {/* Global Footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
