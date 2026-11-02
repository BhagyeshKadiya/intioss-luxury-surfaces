"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Wrench,
} from "lucide-react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

interface ProductCarouselItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  badge: string;
  href: string;
  specs: string;
}

const PRODUCT_CAROUSEL_ITEMS: ProductCarouselItem[] = [
  {
    id: "paunazo-quartzite",
    title: "Paunazo Quartzite",
    category: "Exotic Quartzite",
    subtitle: "Monolithic 20mm Slabs · Consecutive Bookmatch Alignment",
    image: "/images/stones/paunazo/paunazo-slab.png",
    badge: "Mohs 7 · Acid Immune",
    href: "/products/paunazo-quartzite",
    specs: "302 × 195 cm · Heat Tolerant to 260°C",
  },
  {
    id: "golden-statuario",
    title: "Golden Statuario Marble",
    category: "Italian Calcite Marble",
    subtitle: "Warm Amber Gold Veins on Pure White Calcite Matrix",
    image: "/images/stones/golden-statuario/golden-statuario-slab.png",
    badge: "Carrara, Italy",
    href: "/products/golden-statuario-marble",
    specs: "284 × 178 cm · Mirror Bookmatch",
  },
  {
    id: "thassos-white",
    title: "Thassos White Marble",
    category: "Crystalline Greek Marble",
    subtitle: "The Purest Snow-White Crystalline Marble on Earth",
    image: "/images/stones/thassos/thassos-slab.png",
    badge: "Thassos Island, Greece",
    href: "/products/thassos-white-marble",
    specs: "290 × 173 cm · Zero Veining Purity",
  },
  {
    id: "semi-precious",
    title: "Semi-Precious Gemstones",
    category: "Luminescent Slabs",
    subtitle: "Handcrafted Amethyst, Blue Agate & Malachite Inlays",
    image: "/images/products/amethyst_slab_1791259421373.jpg",
    badge: "Backlit Gemstone Slabs",
    href: "/products?category=Semi-Precious%20Stones",
    specs: "Bespoke Cut-to-Size · Translucent Depth",
  },
  {
    id: "table-tops",
    title: "Exclusive Table Tops — Stone",
    category: "Bespoke Monoliths",
    subtitle: "Dining, Center & Executive Conference Centerpieces",
    image: "/images/stones/paunazo/paunazo-table-top.png",
    badge: "Crafted on Request",
    href: "/products?category=Exclusive%20Table%20Tops%20%E2%80%94%20Stone",
    specs: "Custom Chamfer & Bullnose Edging",
  },
  {
    id: "stone-veneers",
    title: "Flexible Stone Veneers",
    category: "Architectural Sheets",
    subtitle: "Ultra-Thin Flexible Slate & Translucent Backlit Quartzite",
    image: "/images/services/stone-facades.jpg",
    badge: "Curvature & Facades",
    href: "/products?category=Stone%20Veneers",
    specs: "Lightweight 2mm Profile · Backlight Ready",
  },
  {
    id: "artefacts-mosaics",
    title: "Artisan Mosaics & Artefacts",
    category: "Master Sculpting",
    subtitle: "Monolithic Fluted Basins, Bathtubs & Waterjet Inlays",
    image: "/images/services/cnc-waterjet.jpg",
    badge: "5-Axis CNC & Hand-Carved",
    href: "/products?category=Artefacts",
    specs: "Custom Mandirs & Architectural Sculpture",
  },
];

interface ServiceCarouselItem {
  id: string;
  discipline: string;
  title: string;
  slug: string;
  shortDesc: string;
  image: string;
  href: string;
  badge: string;
}

const SERVICE_CAROUSEL_ITEMS: ServiceCarouselItem[] = [
  {
    id: "s1",
    discipline: "Discipline 01",
    title: "Luxury Civil Contracting",
    slug: "luxury-civil-contracting",
    shortDesc:
      "Structural retrofitting, subfloor screed casting, moisture barriers, and stone installation coordination.",
    image: "/images/services/luxury-civil-contracting.jpg",
    href: "/services#luxury-civil-contracting",
    badge: "Civil Contracting",
  },
  {
    id: "s2",
    discipline: "Discipline 02",
    title: "Marble Block Processing",
    slug: "marble-block-processing",
    shortDesc:
      "Gang-saw block slabbing, vacuum-epoxy netting, and computerized surface calibration at Silvassa Works.",
    image: "/images/services/marble-block-processing.jpg",
    href: "/services#marble-block-processing",
    badge: "Silvassa Factory",
  },
  {
    id: "s3",
    discipline: "Discipline 03",
    title: "Stone Facades & Cladding",
    slug: "stone-facades",
    shortDesc:
      "Engineered ventilated facades, stainless steel undercut anchors, and exterior seismic cladding.",
    image: "/images/services/stone-facades.jpg",
    href: "/services#stone-facades",
    badge: "Ventilated Facades",
  },
  {
    id: "s4",
    discipline: "Discipline 04",
    title: "CNC & Waterjet Carving",
    slug: "cnc-waterjet",
    shortDesc:
      "5-axis robotic 3D stone carving, precision waterjet inlays, and bespoke micro-fluting artistry.",
    image: "/images/services/cnc-waterjet.jpg",
    href: "/services#cnc-waterjet",
    badge: "5-Axis CNC Precision",
  },
  {
    id: "s5",
    discipline: "Discipline 05",
    title: "International Stone Sourcing",
    slug: "international-stone-sourcing",
    shortDesc:
      "Direct quarry inspections in Carrara, Thassos, and Brazil with ultrasonic slab testing.",
    image: "/images/services/international-stone-sourcing.jpg",
    href: "/services#international-stone-sourcing",
    badge: "Global Quarry Alliances",
  },
  {
    id: "s6",
    discipline: "Discipline 06",
    title: "Restoration & Maintenance (AMC)",
    slug: "stone-restoration-maintenance",
    shortDesc:
      "Diamond crystallization polishing, scratch restoration, and annual maintenance contracts (AMC).",
    image: "/images/services/amc-services.jpg",
    href: "/services#stone-restoration-maintenance",
    badge: "Stone Care & AMC",
  },
];

export function ProductsServicesToggle() {
  const [activeTab, setActiveTab] = useState<"products" | "services">("products");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive items count: mobile = 1, tablet = 2, desktop = 3
  useEffect(() => {
    const updateItemsVisible = () => {
      if (window.innerWidth < 640) {
        setItemsVisible(1);
      } else if (window.innerWidth < 1024) {
        setItemsVisible(2);
      } else {
        setItemsVisible(3);
      }
    };
    updateItemsVisible();
    window.addEventListener("resize", updateItemsVisible);
    return () => window.removeEventListener("resize", updateItemsVisible);
  }, []);

  const totalItems =
    activeTab === "products"
      ? PRODUCT_CAROUSEL_ITEMS.length
      : SERVICE_CAROUSEL_ITEMS.length;

  const maxIndex = Math.max(0, totalItems - itemsVisible);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Reset index when switching tabs
  const handleTabChange = (tab: "products" | "services") => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  // Subtle auto-advance when idle (every 6s)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF8F5] text-maroon overflow-hidden border-b border-gold/20">
      {/* Luxury Animated Hexagon Background */}
      <HexagonBackground
        theme="light"
        intensity="medium"
        showPattern={true}
        showFloating={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Segmented Tab Pill */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          {/* Hexagon Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-white/80 border border-gold/30 shadow-xs backdrop-blur-xs transition-all hover:border-gold hover:shadow-[0_0_15px_rgba(221,182,43,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <IntiossHexagon size={16} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Curated Surfaces & Solutions
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-maroon font-normal tracking-wide max-w-3xl leading-tight">
            Gold Standard in Stone Selection.
          </h2>
          <p className="font-marcellus text-lg sm:text-2xl text-maroon/80 font-normal tracking-wide mt-2 sm:mt-3">
            Beyond the Slabs. Into the Details.
          </p>

          {/* Segmented Toggle Pill (Products vs Services) */}
          <div className="mt-8 inline-flex items-center p-1 bg-stone-200/70 rounded-full border border-stone-300 shadow-inner">
            <button
              type="button"
              onClick={() => handleTabChange("products")}
              className={`relative z-10 px-7 sm:px-9 py-2.5 text-xs sm:text-[13px] font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 rounded-full flex items-center gap-2 ${
                activeTab === "products"
                  ? "text-maroon shadow-sm"
                  : "text-stone-600 hover:text-maroon"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-gold-dark" />
              <span>PRODUCTS</span>
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
              onClick={() => handleTabChange("services")}
              className={`relative z-10 px-7 sm:px-9 py-2.5 text-xs sm:text-[13px] font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 rounded-full flex items-center gap-2 ${
                activeTab === "services"
                  ? "text-maroon shadow-sm"
                  : "text-stone-600 hover:text-maroon"
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-gold-dark" />
              <span>SERVICES</span>
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

        {/* Carousel Header Bar: Slide Title & Navigation Arrows */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div>
            <span className="font-montserrat text-[11px] uppercase tracking-[0.22em] text-gold-dark font-semibold block">
              {activeTab === "products"
                ? "Interactive Product Showcase"
                : "Architectural Services Showcase"}
            </span>
            <span className="font-jost text-xs sm:text-sm text-stone-500">
              Showing {currentIndex + 1} to {Math.min(currentIndex + itemsVisible, totalItems)} of {totalItems} {activeTab}
            </span>
          </div>

          {/* Navigation Arrow Controls */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gold/40 hover:border-gold hover:bg-gold/10 text-maroon shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-maroon" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gold/40 hover:border-gold hover:bg-gold/10 text-maroon shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-maroon" />
            </button>
          </div>
        </div>

        {/* Carousel Track Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            {activeTab === "products" ? (
              <motion.div
                key="products-carousel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="flex transition-transform duration-500 ease-out -mx-3"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
                }}
              >
                {PRODUCT_CAROUSEL_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / itemsVisible}%` }}
                  >
                    <div className="h-full bg-white rounded-2xl border border-gold/30 shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 overflow-hidden flex flex-col group">
                      {/* Image Header with Badge & Hover Zoom */}
                      <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden bg-stone-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-maroon-deep/20 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-montserrat uppercase tracking-wider font-semibold bg-maroon-deep/90 text-ivory border border-gold/40 shadow-xs backdrop-blur-xs">
                            {item.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-montserrat uppercase tracking-wider font-medium bg-gold text-maroon-deep shadow-xs">
                            {item.badge}
                          </span>
                        </div>

                        {/* Bottom Image Caption */}
                        <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                          <span className="text-[10px] font-montserrat uppercase tracking-widest text-gold/90 font-medium block">
                            {item.specs}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
                        <div>
                          <h3 className="font-marcellus text-xl sm:text-2xl text-maroon group-hover:text-gold-dark transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="font-jost text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                            {item.subtitle}
                          </p>
                        </div>

                        {/* Footer Action Link */}
                        <div className="mt-5 pt-3.5 border-t border-gold/15 flex items-center justify-between">
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider font-semibold text-maroon group-hover:text-gold-dark transition-colors"
                          >
                            <span>Explore Surface</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                          <span className="text-[10px] font-montserrat uppercase tracking-widest text-stone-400">
                            INTIOSS Selection
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="services-carousel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="flex transition-transform duration-500 ease-out -mx-3"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
                }}
              >
                {SERVICE_CAROUSEL_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / itemsVisible}%` }}
                  >
                    <div className="h-full bg-white rounded-2xl border border-gold/30 shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 overflow-hidden flex flex-col group">
                      {/* Image Header with Badge & Hover Zoom */}
                      <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden bg-stone-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-maroon-deep/20 to-transparent pointer-events-none" />

                        {/* Top Discipline Badge */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-montserrat uppercase tracking-wider font-semibold bg-maroon-deep/90 text-ivory border border-gold/40 shadow-xs backdrop-blur-xs">
                            {item.discipline}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-montserrat uppercase tracking-wider font-medium bg-gold text-maroon-deep shadow-xs">
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
                        <div>
                          <h3 className="font-marcellus text-xl sm:text-2xl text-maroon group-hover:text-gold-dark transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="font-jost text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                            {item.shortDesc}
                          </p>
                        </div>

                        {/* Footer Action Link */}
                        <div className="mt-5 pt-3.5 border-t border-gold/15 flex items-center justify-between">
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider font-semibold text-maroon group-hover:text-gold-dark transition-colors"
                          >
                            <span>View Execution Details</span>
                            <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
                          </Link>
                          <span className="text-[10px] font-montserrat uppercase tracking-widest text-stone-400">
                            In-House & Group
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-gold shadow-sm"
                  : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        {/* Bottom Comprehensive Link CTA */}
        <div className="text-center mt-10">
          <Link
            href={activeTab === "products" ? "/products" : "/services"}
            className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-maroon hover:text-gold-dark transition-colors font-semibold border-b border-gold/40 pb-1"
          >
            <span>
              {activeTab === "products"
                ? "View All Curated Product Collections"
                : "Explore All 6 Architectural Stone Services"}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
