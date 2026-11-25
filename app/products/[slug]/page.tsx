import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductStickyBar } from "@/components/products/ProductStickyBar";
import { BespokeOrderForm } from "@/components/products/BespokeOrderForm";
import { ProductHouzezGallery } from "@/components/products/ProductHouzezGallery";
import { ProductTopCarousel } from "@/components/products/ProductTopCarousel";
import { ProductAeoGeoSection } from "@/components/products/ProductAeoGeoSection";
import { ProductUseCasesShowcase } from "@/components/products/ProductUseCasesShowcase";
import { ArrowLeft, Layers, ShieldCheck, Check } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};

  const cleanDesc =
    product.description ||
    `${product.name} is an exotic luxury stone curated by INTIOSS Luxury Surfaces.`;

  return {
    title: `${product.name} | Exotic Natural Quartzite Slabs | INTIOSS Luxury Surfaces`,
    description: `${cleanDesc.slice(0, 155)}... Bookmatched 20mm monolithic slabs for luxury kitchen islands, bathrooms, and feature walls.`,
    keywords: [
      product.name,
      `${product.name} India`,
      `${product.name} quartzite vs marble`,
      "exotic quartzite countertops",
      "luxury kitchen island stone",
      "bookmatched quartzite slabs Mumbai",
      "INTIOSS luxury surfaces",
      "natural stone slabs 20mm",
    ],
    openGraph: {
      title: `${product.name} | INTIOSS Luxury Surfaces`,
      description: `${product.name} – Monolithic ${product.subCategory || product.category} slabs for bespoke architectural living spaces.`,
      images: [{ url: product.primaryImage, width: 1536, height: 1024, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | INTIOSS Luxury Surfaces`,
      description: `Explore ${product.name} – High-density exotic stone for bespoke architectural living spaces.`,
      images: [product.primaryImage],
    },
  };
}

const SEVEN_SPACES = [
  "Flooring",
  "Bathroom",
  "Table Top",
  "Kitchen Countertop",
  "Wall Cladding — Interior",
  "Wall Cladding — Exterior",
  "Exterior Flooring",
];

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  // New Arrivals
  const newArrivals = [...PRODUCTS].filter((p) => p.id !== product.id).reverse().slice(0, 3);

  const countryOfOrigin =
    product.specs.countryOfOrigin || product.specs.quarryLocation || product.origin || "Exotic Quarry Import";

  // Comprehensive AEO / GEO / SEO Knowledge Graph (Schema.org)
  const productSchema = {
    "@type": "Product",
    "@id": `https://intioss.com/products/${product.slug}#product`,
    name: product.name,
    image: product.primaryImage,
    description: product.description,
    category: product.category,
    material: "Exotic Quartzite Natural Stone",
    color: product.colorFamily,
    brand: {
      "@type": "Brand",
      name: "INTIOSS Luxury Surfaces",
      url: "https://intioss.com",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "0",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        description: "Bespoke Price On Application / Availability on request",
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "INTIOSS Luxury Surfaces",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Slab Dimensions",
        value: product.specs.dimensions || "119\" x 77\" (302 x 195 cm)",
      },
      {
        "@type": "PropertyValue",
        name: "Thickness",
        value: product.thicknesses.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Mohs Hardness",
        value: "7 (Superior scratch resistance compared to marble)",
      },
      {
        "@type": "PropertyValue",
        name: "Water Absorption",
        value: "<0.2% (Impermeable crystalline matrix)",
      },
      {
        "@type": "PropertyValue",
        name: "Heat Resistance",
        value: "Up to 260°C / 500°F",
      },
      {
        "@type": "PropertyValue",
        name: "Pattern Bookmatch",
        value: product.veining,
      },
    ],
  };

  const faqSchema = product.faqs && product.faqs.length > 0 ? {
    "@type": "FAQPage",
    "@id": `https://intioss.com/products/${product.slug}#faq`,
    mainEntity: product.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  } : null;

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://intioss.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalogue",
        item: "https://intioss.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `https://intioss.com/products?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://intioss.com/products/${product.slug}`,
      },
    ],
  };

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [productSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])],
  };

  const isOrderBasis = [
    "Exclusive Table Tops — Stone",
    "Mosaics",
    "Stone Veneers",
    "Stone Art",
    "Artefacts",
  ].includes(product.category);

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 md:pt-32 pb-28 overflow-x-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Breadcrumb Navigation with Generous Breathing Room */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-montserrat uppercase tracking-[0.2em] text-stone-600 mb-6 sm:mb-8 flex-wrap"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-maroon hover:text-gold font-semibold transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold group-hover:-translate-x-0.5 transition-transform" />
            <span>Catalogue</span>
          </Link>
          <span className="text-gold/60 font-light select-none">/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-gold text-stone-700 transition-colors"
          >
            {product.category}
          </Link>
          {product.subCategory && (
            <>
              <span className="text-gold/60 font-light select-none">/</span>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}&subCategory=${encodeURIComponent(product.subCategory)}`}
                className="hover:text-gold text-stone-700 transition-colors"
              >
                {product.subCategory}
              </Link>
            </>
          )}
          <span className="text-gold/60 font-light select-none">/</span>
          <span className="text-maroon font-bold tracking-[0.22em] bg-gold/15 px-2.5 py-1 border border-gold/40 rounded-xs shadow-xs">
            {product.name}
          </span>
        </nav>

        {/* Order-Basis Bespoke Form OR Houzez-Style 5-Image Bento Gallery */}
        {isOrderBasis ? (
          <div className="mb-16">
            <BespokeOrderForm
              categoryName={`${product.category} — ${product.name}`}
              variant="full"
            />
          </div>
        ) : (
          /* Houzez-Style Luxury 5-Image Bento Grid with Full-Screen Lightbox */
          <ProductHouzezGallery product={product} />
        )}

        {/* Details & Technical Specifications (Clean 2-Column Editorial Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-4">
          {/* Left Column: Title, Suitable For Pills, Description & Book Match CTA */}
          <div className="lg:col-span-7">
            <span className="font-montserrat text-[11px] uppercase tracking-[0.22em] text-stone-500 block">
              {product.category}
              {product.subCategory ? ` · ${product.subCategory}` : ""} · {countryOfOrigin}
            </span>

            <h1 className="font-marcellus text-4xl sm:text-5xl text-maroon-deep mt-2 font-normal tracking-tight">
              {product.name}
            </h1>

            <p className="font-jost text-sm sm:text-base text-stone-600 mt-1.5">
              {product.colorFamily} · {countryOfOrigin}
            </p>

            {/* SUITABLE FOR */}
            {product.applications && product.applications.length > 0 && (
              <div className="mt-6">
                <span className="font-montserrat text-[10px] uppercase tracking-[0.22em] text-stone-500 font-semibold block mb-2.5">
                  Suitable For
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1 bg-white border border-stone-300 text-xs font-montserrat text-stone-700"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Short Description */}
            <p className="font-jost text-sm sm:text-base text-stone-700 leading-relaxed mt-6 max-w-2xl">
              {product.description}
            </p>

            {/* Try This in Book Match Studio Button */}
            <div className="mt-7">
              <Link
                href={`/book-match?stone=${product.slug}`}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-maroon-deep text-maroon-deep hover:text-ivory border border-stone-300 hover:border-maroon-deep px-5 py-2.5 text-xs font-montserrat uppercase tracking-[0.18em] font-semibold transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-gold-dark" />
                <span>Try This in Book Match Studio</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Technical Specifications Card + Primary & Secondary Buttons */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="font-marcellus text-lg sm:text-xl uppercase tracking-[0.12em] text-maroon-deep mb-5">
                Technical Specifications
              </h2>

              <div className="divide-y divide-stone-200 text-xs sm:text-[13px]">
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-stone-500 font-jost">Collection</span>
                  <span className="font-montserrat font-medium text-maroon-deep text-right">
                    {product.category}
                    {product.subCategory ? ` · ${product.subCategory}` : ""}
                  </span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-stone-500 font-jost">Colour</span>
                  <span className="font-montserrat font-medium text-maroon-deep text-right">
                    {product.colorFamily}
                  </span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-stone-500 font-jost">Origin</span>
                  <span className="font-montserrat font-medium text-maroon-deep text-right">
                    {countryOfOrigin}
                  </span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-stone-500 font-jost">Veining &amp; pattern</span>
                  <span className="font-montserrat font-medium text-maroon-deep text-right">
                    {product.veining}
                  </span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-stone-500 font-jost">Surface finish</span>
                  <span className="font-montserrat font-medium text-maroon-deep text-right">
                    {product.finishes.join(", ")}
                  </span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-stone-500 font-jost">Size · thickness</span>
                  <span className="font-montserrat font-medium text-maroon-deep text-right">
                    {product.specs?.dimensions || "290 × 173 cm"} · {product.thicknesses.join(", ")}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/919930171094?text=${encodeURIComponent(
                    `Hello INTIOSS, I would like to enquire about ${product.name} (${product.category}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-maroon-deep hover:bg-maroon text-ivory py-3.5 px-5 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  Enquire About This Stone
                </a>
                <Link
                  href="/#consultation"
                  className="w-full flex items-center justify-center bg-white hover:bg-stone-50 text-maroon-deep border border-stone-300 hover:border-maroon-deep py-3.5 px-5 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  Book a Private Viewing
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other Surfaces in Collection (Clean, replaces new arrivals) */}
        {newArrivals.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gold/30">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="font-marcellus text-2xl sm:text-3xl text-maroon">
                  Complementary Surfaces
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-montserrat uppercase tracking-wider text-maroon hover:text-gold underline"
              >
                View Full Catalogue
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map((p) => (
                <div key={p.id} className="bg-white border border-gold/30 p-4 shadow-sm group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-gold/20 mb-3 bg-paper-warm">
                    <Image
                      src={p.primaryImage}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-montserrat text-[10px] uppercase tracking-wider text-gold block">
                    {p.category}
                  </span>
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-marcellus text-lg text-maroon hover:text-gold transition-colors block mt-0.5"
                  >
                    {p.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Enquire Bar (WhatsApp + Hold this Slab / Consultation) */}
      <ProductStickyBar product={product} />
    </div>
  );
}
