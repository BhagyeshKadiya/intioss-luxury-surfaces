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
import { Placeholder } from "@/components/ui/Placeholder";
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
    "Artefacts",
  ].includes(product.category);

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-16 sm:pt-20 pb-28 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center gap-2.5 text-[11px] font-montserrat uppercase tracking-[0.18em] text-grey mb-3 flex-wrap">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-maroon hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalogue</span>
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-gold transition-colors"
          >
            {product.category}
          </Link>
          {product.subCategory && (
            <>
              <span>/</span>
              <span>{product.subCategory}</span>
            </>
          )}
          <span>/</span>
          <span className="text-gold font-medium">{product.name}</span>
        </div>

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

        {/* Details & Specs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-grey">
              {product.category} {product.subCategory ? `· ${product.subCategory}` : ""} · {countryOfOrigin}
            </span>
            <h1 className="font-marcellus text-4xl sm:text-5xl lg:text-6xl text-maroon mt-1 font-normal">
              {product.name}
            </h1>

            {/* Sub-header bar: pattern classification & Book Match simulator */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gold/30">
              <span className="font-montserrat text-xs text-grey uppercase tracking-wider">
                Pattern Classification: <strong className="text-maroon font-semibold">{product.veining}</strong>
              </span>

              <Link
                href={`/book-match?stone=${product.slug}`}
                className="inline-flex items-center gap-2 bg-white hover:bg-gold/15 text-maroon border border-gold/60 px-4 py-2 text-xs font-montserrat uppercase tracking-[0.15em] font-medium shadow-sm transition-all whitespace-nowrap shrink-0 group"
              >
                <Layers className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform shrink-0" />
                <span className="whitespace-nowrap">Simulate Mirror Match</span>
              </Link>
            </div>

            {/* Rich Curated Description in AEO / GEO Q&A Format (Marble Reference) */}
            <div className="mt-6 mb-8 bg-white border border-gold/35 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-raleway text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
                  Architectural Dossier · Marble & Natural Stone Advisory
                </span>
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-stone-500 bg-gold/10 px-2 py-0.5 border border-gold/30">
                  Mohs 7 · Non-Etching
                </span>
              </div>

              <h2 className="font-marcellus text-xl sm:text-2xl text-maroon mb-3 font-normal">
                Curatorial Profile: Why Architects Specify {product.name} Over Traditional Marble
              </h2>

              <p className="font-poppins text-xs sm:text-sm text-stone-700 leading-relaxed">
                {product.description}
              </p>

              {/* Direct Q&A Callouts for Answer Engines & Marble Researchers */}
              <div className="mt-6 pt-5 border-t border-gold/25 space-y-4">
                <div className="bg-ivory/80 border-l-2 border-gold p-3.5 sm:p-4">
                  <h3 className="font-marcellus text-sm sm:text-base text-maroon flex items-center gap-2">
                    <span className="text-gold font-semibold font-montserrat text-xs">Q:</span>
                    <span>Is {product.name} more durable than Italian marble for kitchen countertops and dining tables?</span>
                  </h3>
                  <p className="font-poppins text-xs sm:text-sm text-stone-700 mt-1.5 leading-relaxed">
                    <strong className="text-maroon">A: Definitive Yes.</strong> While traditional Italian marbles (such as Calacatta or Carrara) rank 3–4 on the Mohs hardness scale and readily react to acidic liquids (lemon, vinegar, wine, and turmeric), {product.name} ranks <strong>7 on the Mohs scale (harder than granite)</strong>. It is 100% acid-proof, scratch-resistant to kitchen knives, and withstands direct heat up to 260°C (500°F) without resin degradation or staining.
                  </p>
                </div>

                <div className="bg-ivory/80 border-l-2 border-gold p-3.5 sm:p-4">
                  <h3 className="font-marcellus text-sm sm:text-base text-maroon flex items-center gap-2">
                    <span className="text-gold font-semibold font-montserrat text-xs">Q:</span>
                    <span>Can {product.name} be bookmatched like premium imported marble?</span>
                  </h3>
                  <p className="font-poppins text-xs sm:text-sm text-stone-700 mt-1.5 leading-relaxed">
                    <strong className="text-maroon">A: Yes.</strong> Sourced by INTIOSS in massive monolithic 119&quot; × 77&quot; (302 × 195 cm) slabs at 20mm thickness, consecutive slabs from the same block are precision-quarried for flawless mirror-image bookmatch alignment. This creates continuous fluid veining across full-height living room walls and culinary waterfall islands without disruptive seams.
                  </p>
                </div>
              </div>

              {product.bestSuitedFor && product.bestSuitedFor.length > 0 && (
                <div className="mt-6 pt-5 border-t border-gold/20">
                  <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-stone-500 font-semibold block mb-3">
                    Architectural Specifications & Suitable Applications
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.bestSuitedFor.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory text-maroon text-xs font-montserrat border border-gold/40 shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommended Applications (7 spaces tick list in exact order) */}
            <div className="mt-8">
              <h3 className="font-marcellus text-sm uppercase tracking-wider text-gold border-b border-gold/20 pb-2">
                Recommended Applications
              </h3>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEVEN_SPACES.map((spaceName) => {
                  const isSuitable =
                    (product.applications as string[]).includes(spaceName) ||
                    (spaceName === "Flooring" && product.applications.includes("Flooring")) ||
                    (spaceName === "Bathroom" && product.applications.includes("Bathroom")) ||
                    (spaceName === "Table Top" &&
                      (product.applications.includes("Table Top") ||
                        product.applications.includes("Countertop"))) ||
                    (spaceName === "Kitchen Countertop" &&
                      (product.applications.includes("Kitchen Countertop") ||
                        product.applications.includes("Countertop"))) ||
                    (spaceName === "Wall Cladding — Interior" &&
                      (product.applications.includes("Wall Cladding — Interior") ||
                        product.applications.includes("Wall Cladding") ||
                        product.applications.includes("Feature Wall"))) ||
                    (spaceName === "Wall Cladding — Exterior" &&
                      (product.applications.includes("Wall Cladding — Exterior") ||
                        product.applications.includes("Wall Cladding"))) ||
                    (spaceName === "Exterior Flooring" &&
                      (product.applications.includes("Exterior Flooring") ||
                        product.applications.includes("Flooring")));

                  return (
                    <li
                      key={spaceName}
                      className="flex items-center gap-2.5 text-xs font-montserrat text-maroon"
                    >
                      {isSuitable ? (
                        <div className="w-4 h-4 rounded-none bg-maroon text-gold flex items-center justify-center shrink-0 border border-gold/40">
                          <Check className="w-3 h-3 text-gold" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-none border border-grey/30 bg-white/60 shrink-0" />
                      )}
                      <span className={isSuitable ? "text-maroon font-medium" : "text-grey/60"}>
                        {spaceName}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            {/* Technical Specification Table */}
            <div className="bg-white p-6 border border-gold/30 shadow-sm">
              <h3 className="font-marcellus text-sm uppercase tracking-wider text-maroon mb-4">
                Technical Specifications
              </h3>
              <div className="divide-y divide-gold/15 text-xs font-jost">
                <div className="py-2.5 flex justify-between">
                  <span className="text-grey font-montserrat uppercase text-[11px]">
                    Country of Origin
                  </span>
                  <span className="font-montserrat font-medium text-maroon text-right">
                    {countryOfOrigin}
                  </span>
                </div>
                {product.specs.dimensions && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-grey font-montserrat uppercase text-[11px]">
                      Average Dimensions
                    </span>
                    <span className="font-montserrat font-medium text-maroon text-right">
                      {product.specs.dimensions}
                    </span>
                  </div>
                )}
                <div className="py-2.5 flex justify-between">
                  <span className="text-grey font-montserrat uppercase text-[11px]">
                    Thicknesses / Profile
                  </span>
                  <span className="font-montserrat font-medium text-maroon text-right">
                    {product.thicknesses.join(", ")}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-grey font-montserrat uppercase text-[11px]">
                    Available Finishes
                  </span>
                  <span className="font-montserrat font-medium text-maroon text-right">
                    {product.finishes.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Curatorial Care Note */}
            <div className="mt-6 p-4 bg-white border border-gold/30 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-montserrat font-medium text-maroon mb-1">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Care Protocol</span>
              </div>
              <p className="text-[11px] font-jost text-grey">
                {product.specs.recommendedCare}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ARCHITECTURAL LIVING SPACES SHOWCASE                     */}
        {/* ======================================================== */}
        {product.galleryImages && product.galleryImages.filter((img) => !img.toLowerCase().includes("slab")).length > 0 && (
          <div className="mt-20 pt-12 border-t border-gold/30">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-raleway text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold block mb-2">
                  Realized Installations
                </span>
                <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon">
                  Living Spaces in {product.name}
                </h2>
                <p className="font-poppins text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
                  Natural stone brought to life across bespoke chef&apos;s kitchens, master spa vanities, custom monolithic dining surfaces, and full-height architectural feature walls.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.galleryImages
                .filter((img) => !img.toLowerCase().includes("slab"))
                .map((img, idx) => {
                  const lower = img.toLowerCase();
                  let title = "Living Space Installation";
                  let category = "Interior Space";
                  let aspect = "aspect-[4/5]";

                  if (lower.includes("kitchen")) {
                    title = "Chef's Kitchen Island";
                    category = "Kitchen Countertop";
                  } else if (lower.includes("bath") || lower.includes("vanity")) {
                    title = "Master Spa Vanity";
                    category = "Bathroom";
                  } else if (lower.includes("table") || lower.includes("dining")) {
                    title = "Bespoke Dining Table";
                    category = "Table Top";
                  } else if (lower.includes("feature-wall") || lower.includes("living")) {
                    title = "Interior Feature Wall";
                    category = "Wall Cladding";
                  }

                  return (
                    <div
                      key={img}
                      className="group relative overflow-hidden bg-stone-900 border border-gold/35 shadow-md hover:border-gold hover:shadow-xl transition-all duration-500"
                    >
                      <div className={`relative w-full ${aspect} overflow-hidden`}>
                        <Image
                          src={img}
                          alt={`${product.name} - ${title}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        {/* Gradient Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300" />
                        
                        {/* Space Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-maroon-deep/90 text-ivory text-[9px] font-montserrat uppercase tracking-wider px-2 py-0.5 border border-gold/40 backdrop-blur-sm">
                            {category}
                          </span>
                        </div>

                        {/* Caption Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 z-10">
                          <h4 className="font-marcellus text-base sm:text-lg text-white group-hover:text-gold transition-colors">
                            {title}
                          </h4>
                          <span className="text-[10px] font-poppins text-stone-300 mt-0.5 block">
                            Monolithic {product.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* AEO / GEO / SEO ARCHITECTURAL ADVISORY & KNOWLEDGE BASE   */}
        {/* ======================================================== */}
        <ProductAeoGeoSection product={product} />

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
