"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "@/data/services";
import { ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react";

interface ProductCategoryItem {
  title: string;
  slug: string;
  subtitle: string;
  image: string;
  count: string;
  hasChevron: boolean;
}

const PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  {
    title: "Natural Stones",
    slug: "Marble",
    subtitle: "Italian Marbles, Exotic Quartzites & Travertines",
    image: "/images/stones/golden-statuario.jpg",
    count: "180+ Varieties",
    hasChevron: true,
  },
  {
    title: "Semi-Precious Stones",
    slug: "Semi-Precious",
    subtitle: "Rare Agates, Amethysts, Quartz & Petrified Wood",
    image: "/images/stones/blue-agate.jpg",
    count: "40+ Gemstones",
    hasChevron: true,
  },
  {
    title: "Exclusive Table Tops — Stone",
    slug: "Countertop",
    subtitle: "Monolithic Dining, Centre & Executive Conference Slabs",
    image: "/images/stones/petrified-wood.jpg",
    count: "Bespoke Edges",
    hasChevron: false,
  },
  {
    title: "Mosaics",
    slug: "Mosaics",
    subtitle: "Precision Waterjet & Gemstone Floor Medallions",
    image: "/images/stones/michael-angelo.jpg",
    count: "Custom Patterns",
    hasChevron: true,
  },
  {
    title: "Stone Veneers",
    slug: "Veneers",
    subtitle: "Ultra-Thin Flexible Slate & Translucent Backlit Panels",
    image: "/images/stones/tiger-eye.jpg",
    count: "1.5mm to 3mm",
    hasChevron: false,
  },
  {
    title: "Artefacts",
    slug: "Artefacts",
    subtitle: "Hand-Carved Stone Basins, Mandirs & Sculptures",
    image: "/images/stones/white-travertine.jpg",
    count: "Monolithic Pieces",
    hasChevron: false,
  },
];

interface ServiceCategoryItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  image: string;
  hasChevron: boolean;
}

const SERVICE_ITEMS: ServiceCategoryItem[] = [
  {
    id: "s1",
    title: "Luxury Civil Interior Contracting",
    slug: "luxury-civil-interior-contracting",
    shortDesc: "Precision structural retrofitting, subfloor casting, and zero-tolerance marble execution.",
    image: "/images/services/luxury-civil-contracting.jpg",
    hasChevron: false,
  },
  {
    id: "s2",
    title: "Marble Block Processing",
    slug: "marble-block-processing",
    shortDesc: "Gang-saw block slabbing, vacuum-epoxy netting, and Italian 16-head polishing line.",
    image: "/images/services/marble-block-processing.jpg",
    hasChevron: true,
  },
  {
    id: "s3",
    title: "Stone Facades",
    slug: "stone-facades",
    shortDesc: "Engineered ventilated facades, German undercut anchors, and exterior stone cladding.",
    image: "/images/services/stone-facades.jpg",
    hasChevron: false,
  },
  {
    id: "s4",
    title: "CNC & Waterjet",
    slug: "cnc-waterjet",
    shortDesc: "5-axis CNC 3D stone carving, zero-kerf abrasive waterjet inlays, and bespoke fluting.",
    image: "/images/services/cnc-waterjet.jpg",
    hasChevron: false,
  },
  {
    id: "s5",
    title: "International Stone Sourcing",
    slug: "international-stone-sourcing",
    shortDesc: "Direct quarry bench block selection in Carrara, Verona, Denizli, and Espírito Santo.",
    image: "/images/services/international-stone-sourcing.jpg",
    hasChevron: false,
  },
  {
    id: "s6",
    title: "Stone Maintenance Services",
    slug: "stone-maintenance-services",
    shortDesc: "Specialist diamond re-crystallisation, stain extraction, and surface rejuvenation.",
    image: "/images/services/amc-services.jpg",
    hasChevron: false,
  },
];

export function ProductsServicesToggle() {
  const [activeTab, setActiveTab] = useState<"products" | "services">("products");
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF8F5] text-maroon overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-2">
            Curated Excellence
          </span>
          <h2 className="font-marcellus text-3xl sm:text-5xl text-maroon font-normal tracking-wide max-w-2xl">
            We Source Top 2% Best Quality Stones
          </h2>

          {/* Exact Rounded Segmented Toggle Pill (Matching Screenshot) */}
          <div className="mt-8 inline-flex items-center p-1 bg-stone-200/60 rounded-full border border-stone-300/80 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setActiveTab("products");
                setHoveredIndex(0);
              }}
              className={`relative z-10 px-7 py-2 text-xs sm:text-[13px] font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 rounded-full ${
                activeTab === "products" ? "text-maroon shadow-sm" : "text-stone-500 hover:text-maroon"
              }`}
            >
              PRODUCTS
              {activeTab === "products" && (
                <motion.div
                  layoutId="activePillTab"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-full border border-stone-200 shadow-sm -z-10"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("services");
                setHoveredIndex(0);
              }}
              className={`relative z-10 px-7 py-2 text-xs sm:text-[13px] font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 rounded-full ${
                activeTab === "services" ? "text-maroon shadow-sm" : "text-stone-500 hover:text-maroon"
              }`}
            >
              SERVICES
              {activeTab === "services" && (
                <motion.div
                  layoutId="activePillTab"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-full border border-stone-200 shadow-sm -z-10"
                />
              )}
            </button>
          </div>
        </div>

        {/* Master Showcase Layout: Exact Card List on Left + Live Architectural Visual Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {/* Exact White Rounded Card (Matches Screenshot Dimensions & Typography) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeTab === "products" ? (
                <motion.div
                  key="products-menu"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="divide-y divide-stone-100"
                >
                  {PRODUCT_CATEGORIES.map((item, idx) => {
                    const isHovered = hoveredIndex === idx;
                    return (
                      <Link
                        key={item.title}
                        href={`/products?category=${encodeURIComponent(item.slug)}`}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        className={`flex items-center justify-between px-6 sm:px-8 py-5 transition-all duration-200 group cursor-pointer ${
                          isHovered ? "bg-stone-50/80" : "hover:bg-stone-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-marcellus text-lg sm:text-xl text-maroon group-hover:text-maroon-deep transition-colors ${
                              isHovered ? "font-medium" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        {item.hasChevron && (
                          <ChevronRight
                            className={`w-5 h-5 text-maroon/70 transition-transform duration-200 ${
                              isHovered ? "translate-x-1 text-gold" : ""
                            }`}
                          />
                        )}
                      </Link>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="services-menu"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="divide-y divide-stone-100"
                >
                  {SERVICE_ITEMS.map((item, idx) => {
                    const isHovered = hoveredIndex === idx;
                    return (
                      <Link
                        key={item.title}
                        href={`/services#${item.slug}`}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        className={`flex items-center justify-between px-6 sm:px-8 py-5 transition-all duration-200 group cursor-pointer ${
                          isHovered ? "bg-stone-50/80" : "hover:bg-stone-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-marcellus text-lg sm:text-xl text-maroon group-hover:text-maroon-deep transition-colors ${
                              isHovered ? "font-medium" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        {item.hasChevron && (
                          <ChevronRight
                            className={`w-5 h-5 text-maroon/70 transition-transform duration-200 ${
                              isHovered ? "translate-x-1 text-gold" : ""
                            }`}
                          />
                        )}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Live Interactive Architectural Visual Preview */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative h-full min-h-[380px] w-full rounded-3xl overflow-hidden border border-gold/40 shadow-xl bg-maroon-deep">
              <AnimatePresence mode="wait">
                {activeTab === "products" ? (
                  <motion.div
                    key={`prod-${hoveredIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={PRODUCT_CATEGORIES[hoveredIndex]?.image || PRODUCT_CATEGORIES[0].image}
                      alt={PRODUCT_CATEGORIES[hoveredIndex]?.title || "Intioss Luxury Surfaces"}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/95 via-maroon-deep/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-ivory">
                      <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold block mb-1">
                        Category Focus · {PRODUCT_CATEGORIES[hoveredIndex]?.count}
                      </span>
                      <h4 className="font-marcellus text-xl text-ivory">
                        {PRODUCT_CATEGORIES[hoveredIndex]?.title}
                      </h4>
                      <p className="font-poppins text-xs text-ivory/70 mt-1 line-clamp-2">
                        {PRODUCT_CATEGORIES[hoveredIndex]?.subtitle}
                      </p>
                      <Link
                        href={`/products?category=${encodeURIComponent(PRODUCT_CATEGORIES[hoveredIndex]?.slug)}`}
                        className="inline-flex items-center gap-1.5 text-xs text-gold mt-3 font-montserrat uppercase tracking-wider font-semibold group/link"
                      >
                        <span>Explore Collection</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`srv-${hoveredIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SERVICE_ITEMS[hoveredIndex]?.image || SERVICE_ITEMS[0].image}
                      alt={SERVICE_ITEMS[hoveredIndex]?.title || "Intioss Turnkey Services"}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/95 via-maroon-deep/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-ivory">
                      <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold block mb-1">
                        Turnkey Service Focus · Discipline 0{hoveredIndex + 1}
                      </span>
                      <h4 className="font-marcellus text-xl text-ivory">
                        {SERVICE_ITEMS[hoveredIndex]?.title}
                      </h4>
                      <p className="font-poppins text-xs text-ivory/70 mt-1 line-clamp-2">
                        {SERVICE_ITEMS[hoveredIndex]?.shortDesc}
                      </p>
                      <Link
                        href={`/services#${SERVICE_ITEMS[hoveredIndex]?.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs text-gold mt-3 font-montserrat uppercase tracking-wider font-semibold group/link"
                      >
                        <span>View Technical Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href={activeTab === "products" ? "/products" : "/services"}
            className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-maroon hover:text-gold transition-colors font-medium border-b border-gold/40 pb-1"
          >
            <span>
              {activeTab === "products"
                ? "View All 6 Product Categories (280+ Varieties)"
                : "Explore All 6 Turnkey Architectural Services"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
