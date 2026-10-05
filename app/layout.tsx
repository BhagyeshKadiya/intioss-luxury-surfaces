import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL("https://intioss.com"),
  title: {
    default: "INTIOSS – Luxury Surfaces | Sourcing · Processing · Fitting",
    template: "%s | INTIOSS – Luxury Surfaces",
  },
  description:
    "The luxury stone brand of the Gandhi Civil Decor Group and Quality Marble. Curating rare Italian marble, semi-precious gemstones, onyx, and architectural surfaces across South Mumbai and Gujarat.",
  keywords: [
    "Italian Marble Mumbai",
    "Luxury Surfaces Gujarat",
    "Statuario Marble South Mumbai",
    "Precious Stone Slabs",
    "Architectural Stone Facades",
    "Bookmatch Marble",
    "Gandhi Civil Decor",
    "Quality Marble",
  ],
  authors: [{ name: "INTIOSS Luxury Surfaces" }],
  openGraph: {
    title: "INTIOSS – Luxury Surfaces",
    description:
      "Sourcing · Processing · Fitting. Rare marble and architectural stone for discerning estates in South Mumbai and Gujarat.",
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
    name: "Gandhi Civil Decor Group",
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
    postalCode: "400018",
    addressCountry: "IN",
  },
  areaServed: ["Mumbai", "Ahmedabad", "Surat", "Vadodara", "Silvassa", "Goa"],
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

          {/* Custom desktop pointer */}
          <CustomCursor />

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
