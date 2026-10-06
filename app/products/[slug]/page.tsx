import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { formatPriceTier } from "@/lib/utils";
import { getProductWhatsAppUrl } from "@/lib/config";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductStickyBar } from "@/components/products/ProductStickyBar";
import { ArrowLeft, Layers, Calendar, ShieldCheck, Check } from "lucide-react";
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
    description: product.description,
    openGraph: {
      title: `${product.name} – ${product.category} from ${product.origin}`,
      description: product.description,
      images: [{ url: product.primaryImage }],
    },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  // New Arrivals
  const newArrivals = [...PRODUCTS].filter(p => p.id !== product.id).reverse().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.primaryImage,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "INTIOSS",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      price: formatPriceTier(product.priceTier),
      availability:
        product.availability === "In stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
    },
  };

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center gap-3 text-xs font-raleway uppercase tracking-[0.25em] text-grey mb-8 flex-wrap">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-maroon hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalog</span>
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

        {/* Full Screen Scroller Images */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 mb-16">
          <div className="w-full px-4 sm:px-8 overflow-x-auto flex snap-x snap-mandatory gap-4 sm:gap-6 pb-6 scrollbar-hide">
            {[
              product.primaryImage,
              product.veinCloseUpImage,
              ...(product.galleryImages || []),
            ].filter((v, i, a) => v && a.indexOf(v) === i).map((src, idx) => (
              <div
                key={idx}
                className="relative flex-none w-[90vw] sm:w-[85vw] lg:w-[75vw] aspect-[16/10] sm:aspect-[21/9] snap-center overflow-hidden border border-gold/40 shadow-xl bg-stone-100 group"
              >
                <Image
                  src={src}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 75vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                {idx === 0 && (
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 backdrop-blur-md text-ivory text-[10px] font-montserrat uppercase tracking-widest px-3 py-1.5 border border-gold/40">
                    Primary Curation View
                  </div>
                )}
                {idx === 1 && (
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 backdrop-blur-md text-ivory text-[10px] font-montserrat uppercase tracking-widest px-3 py-1.5 border border-gold/40">
                    Architectural Application / Usecase
                  </div>
                )}
                {idx > 1 && (
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 backdrop-blur-md text-ivory text-[10px] font-montserrat uppercase tracking-widest px-3 py-1.5 border border-gold/40">
                    Interior Installation
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details & Specs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <span className="font-raleway font-light text-xs uppercase tracking-[0.3em] text-grey">
              {product.category} {product.subCategory ? `· ${product.subCategory}` : ""} · {product.origin}
            </span>
            <h1 className="font-marcellus text-4xl sm:text-5xl lg:text-6xl text-maroon mt-1">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4 pb-4 border-b border-gold/30">
              <span className="text-sm font-montserrat font-medium text-maroon">
                Tier:{" "}
                <strong className="text-gold font-semibold">
                  {formatPriceTier(product.priceTier)}
                </strong>
              </span>
              <span className="text-xs font-montserrat text-emerald-800 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200">
                {product.availability}
              </span>
            </div>

            <p className="font-poppins text-sm sm:text-base text-grey leading-relaxed mt-6">
              {product.description}
            </p>
            <p className="font-poppins text-xs text-grey mt-4">
              Calibrated and curated at our Silvassa master facility prior to crating. Pattern Classification: <span className="font-medium text-maroon">{product.veining}</span>.
            </p>

            <div className="mt-8">
              <h3 className="font-marcellus text-sm uppercase tracking-wider text-gold border-b border-gold/20 pb-2">
                Recommended Applications
              </h3>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.bestSuitedFor.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-poppins text-maroon">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            {/* Technical Specification Table */}
            <div className="bg-white p-6 border border-gold/30 shadow-sm">
              <h3 className="font-marcellus text-sm uppercase tracking-wider text-maroon mb-4">
                Technical Specifications
              </h3>
              <div className="divide-y divide-gold/15 text-xs font-poppins">
                <div className="py-2.5 flex justify-between">
                  <span className="text-grey font-raleway uppercase">Origin Source</span>
                  <span className="font-montserrat font-medium text-maroon text-right">{product.specs.quarryLocation}</span>
                </div>
                {product.specs.dimensions && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-grey font-raleway uppercase">Dimensions</span>
                    <span className="font-montserrat font-medium text-maroon text-right">{product.specs.dimensions}</span>
                  </div>
                )}
                {product.specs.compressiveStrength && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-grey font-raleway uppercase">Compressive Strength</span>
                    <span className="font-montserrat font-medium text-maroon text-right">{product.specs.compressiveStrength}</span>
                  </div>
                )}
                {product.specs.waterAbsorption && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-grey font-raleway uppercase">Water Absorption</span>
                    <span className="font-montserrat font-medium text-maroon text-right">{product.specs.waterAbsorption}</span>
                  </div>
                )}
                <div className="py-2.5 flex justify-between">
                  <span className="text-grey font-raleway uppercase">Thicknesses / Profile</span>
                  <span className="font-montserrat font-medium text-maroon text-right">{product.thicknesses.join(", ")}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-grey font-raleway uppercase">Available Finishes</span>
                  <span className="font-montserrat font-medium text-maroon text-right">{product.finishes.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Care note */}
            <div className="mt-6 p-4 bg-white border border-gold/30 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-montserrat font-medium text-maroon mb-1">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Curatorial Care Protocol</span>
              </div>
              <p className="text-[11px] font-poppins text-grey">
                {product.specs.recommendedCare}
              </p>
            </div>
          </div>
        </div>

        {/* Full Screen Slab Use Cases Scrollbar */}
        <div className="mt-24 pt-16 border-t border-gold/30">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-raleway text-xs uppercase tracking-[0.25em] text-grey block mb-1">
                Vision to Reality
              </span>
              <h2 className="font-marcellus text-2xl sm:text-3xl text-maroon">
                Architectural Applications
              </h2>
            </div>
            <div className="text-xs font-montserrat uppercase tracking-wider text-grey">
              Scroll to explore
            </div>
          </div>
          <div className="w-full overflow-x-auto flex snap-x snap-mandatory gap-6 pb-8 scrollbar-hide">
            {[
              product.primaryImage,
              ...(product.galleryImages || []),
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
            ]
              .filter((v, i, a) => a.indexOf(v) === i)
              .slice(0, 5)
              .map((src, idx) => (
              <div
                key={idx}
                className="relative flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] aspect-[4/5] snap-center overflow-hidden border border-gold/40 shadow-lg group"
              >
                <Image
                  src={src}
                  alt={`${product.name} application ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold/90 mb-1">
                    Application {idx + 1}
                  </span>
                  <span className="font-marcellus text-xl text-ivory shadow-black drop-shadow-md">
                    {product.applications[idx] || product.applications[0] || "Bespoke Design"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals Section */}
        {newArrivals.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gold/30">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-raleway text-xs uppercase tracking-[0.25em] text-grey block mb-1">
                  Just Unearthed
                </span>
                <h2 className="font-marcellus text-2xl sm:text-3xl text-maroon">
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-montserrat uppercase tracking-wider text-maroon hover:text-gold underline"
              >
                Explore Full Catalog
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map((p) => (
                <div key={p.id} className="bg-white border border-gold/30 p-4 shadow-sm group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-gold/20 mb-3">
                    <Image
                      src={p.primaryImage}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-raleway text-[10px] uppercase tracking-wider text-gold block">
                    {p.category}
                  </span>
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-marcellus text-lg text-maroon hover:text-gold transition-colors block"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs font-poppins text-grey mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Enquire Bar (WhatsApp + Book Consultation) */}
      <ProductStickyBar product={product} />
    </div>
  );
}
