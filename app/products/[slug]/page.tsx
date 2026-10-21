import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductStickyBar } from "@/components/products/ProductStickyBar";
import { BespokeOrderForm } from "@/components/products/BespokeOrderForm";
import { ProductTopCarousel } from "@/components/products/ProductTopCarousel";
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

  return {
    title: `${product.name} | INTIOSS Luxury Surfaces`,
    description: `Curated ${product.name} ${product.category} from ${product.origin}.`,
    openGraph: {
      title: `${product.name} – ${product.category} from ${product.origin}`,
      description: `Curated ${product.name} ${product.category} from ${product.origin}.`,
      images: [{ url: product.primaryImage }],
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
    product.specs.countryOfOrigin || product.specs.quarryLocation || product.origin || "[COUNTRY]";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.primaryImage,
    description: `Curated ${product.name} ${product.category} from ${product.origin}.`,
    brand: {
      "@type": "Brand",
      name: "INTIOSS",
    },
  };

  const isOrderBasis = [
    "Exclusive Table Tops — Stone",
    "Mosaics",
    "Stone Veneers",
    "Artefacts",
  ].includes(product.category);

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-montserrat uppercase tracking-[0.2em] text-grey mb-8 flex-wrap">
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

        {/* Order-Basis Bespoke Form OR Top Photo Carousel */}
        {isOrderBasis ? (
          <div className="mb-16">
            <BespokeOrderForm
              categoryName={`${product.category} — ${product.name}`}
              variant="full"
            />
          </div>
        ) : (
          /* One photo carousel at top only: full slab -> veining closeups -> installation photos with labels */
          <ProductTopCarousel product={product} />
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

            {/* Plain Description Placeholder */}
            <div className="mt-6 mb-8">
              <Placeholder
                kind="DESCRIPTION"
                label="[DESCRIPTION]"
                className="w-full bg-paper/60 p-6 text-left border-dashed"
              >
                <span className="text-xs text-grey max-w-lg block">
                  Authentic geological profile and quarry description pending from INTIOSS.
                </span>
              </Placeholder>
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
