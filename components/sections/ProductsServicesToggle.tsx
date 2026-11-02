"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Wrench,
  Sparkles,
} from "lucide-react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export type ProductFilterCategory =
  | "all"
  | "natural-stone"
  | "semi-precious"
  | "table-tops"
  | "stone-veneers"
  | "artefacts";

interface ProductCarouselItem {
  id: string;
  title: string;
  category: string;
  categoryFilter: ProductFilterCategory;
  subtitle: string;
  image: string;
  badge: string;
  href: string;
  specs: string;
  origin?: string;
}

const TOP_10_PRODUCTS: ProductCarouselItem[] = [
  {
    id: "paunazo-quartzite",
    title: "Paunazo Quartzite",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "Exotic Multicolor Quartzite · Mohs 7 Scratch & Acid Immunity",
    image: "/images/stones/paunazo/paunazo-slab.png",
    badge: "Mohs 7 · Acid Immune",
    href: "/products/paunazo-quartzite",
    specs: "302 × 195 cm · Heat Proof 260°C",
    origin: "Exotic Quarry",
  },
  {
    id: "golden-statuario",
    title: "Golden Statuario Marble",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "Warm Amber-Honey Gold Veins on Pure White Calcite Matrix",
    image: "/images/stones/golden-statuario/golden-statuario-slab.png",
    badge: "Carrara, Italy",
    href: "/products/golden-statuario-marble",
    specs: "284 × 178 cm · Mirror Bookmatch",
    origin: "Carrara, Italy",
  },
  {
    id: "thassos-white",
    title: "Thassos White Marble",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "The Purest Snow-White Crystalline Marble on Earth · Light Refracting",
    image: "/images/stones/thassos/thassos-slab.png",
    badge: "Greece · Snow-White",
    href: "/products/thassos-white-marble",
    specs: "290 × 173 cm · Zero Veining Purity",
    origin: "Thassos Island, Greece",
  },
  {
    id: "statuario-classic",
    title: "Statuario Classic Marble",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "Bold Graphite-Black & Charcoal Veining on Brilliant Milk-White Marble",
    image: "/images/stones/statuario/statuario-slab.png",
    badge: "Carrara, Italy · Lot 6415A",
    href: "/products/statuario-marble",
    specs: "292 × 191 cm · 18mm Profile",
    origin: "Carrara, Tuscany, Italy",
  },
  {
    id: "statuario-rb599a",
    title: "Statuario Marble (Lot RB599A)",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "Monumental Monolithic Dimensions with High-Contrast Raven Veins",
    image: "/images/stones/statuario-rb599a/statuario-rb599a-slab.png",
    badge: "Monumental 125\" Format",
    href: "/products/statuario-rb599a-marble",
    specs: "318 × 196 cm · 20mm Profile",
    origin: "Carrara, Tuscany, Italy",
  },
  {
    id: "statuario-rb4384",
    title: "Statuario Marble (Lot RB-4384)",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "High-Contrast Charcoal Ribbons across Crystalline Carrara Base",
    image: "/images/stones/statuario-rb4384/statuario-rb4384-slab.png",
    badge: "Consecutive Block Pair",
    href: "/products/statuario-rb4384-marble",
    specs: "254 × 180 cm · 20mm Profile",
    origin: "Carrara, Tuscany, Italy",
  },
  {
    id: "semi-precious-amethyst",
    title: "Semi-Precious Gemstones",
    category: "Semi-Precious Stone",
    categoryFilter: "semi-precious",
    subtitle: "Handcrafted Purple Amethyst, Blue Agate & Malachite Inlays",
    image: "/images/products/amethyst_slab_1791259421373.jpg",
    badge: "Backlit Gemstone Slabs",
    href: "/products?category=Semi-Precious%20Stones",
    specs: "Bespoke Cut-to-Size · Translucent Matrix",
    origin: "Exotic Gemstone Mines",
  },
  {
    id: "exclusive-table-tops",
    title: "Exclusive Table Tops — Stone",
    category: "Table Tops",
    categoryFilter: "table-tops",
    subtitle: "Monolithic Dining, Executive Conference & Sculptural Salon Slabs",
    image: "/images/stones/paunazo/paunazo-table-top.png",
    badge: "Crafted on Request",
    href: "/products?category=Exclusive%20Table%20Tops%20%E2%80%94%20Stone",
    specs: "Custom Chamfer & Bullnose Edging",
    origin: "INTIOSS Studio Atelier",
  },
  {
    id: "stone-veneers",
    title: "Flexible Stone Veneers",
    category: "Stone Veneers",
    categoryFilter: "stone-veneers",
    subtitle: "Ultra-Thin Flexible Slate & Translucent Backlit Quartzite Panels",
    image: "/images/services/stone-facades.jpg",
    badge: "Curvature & Facades",
    href: "/products?category=Stone%20Veneers",
    specs: "Lightweight 2mm Profile · Backlight Ready",
    origin: "Architectural Grade",
  },
  {
    id: "artisan-mosaics-artefacts",
    title: "Artisan Mosaics & Artefacts",
    category: "Mosaics & Artefacts",
    categoryFilter: "artefacts",
    subtitle: "Monolithic Fluted Basins, Bathtubs & Waterjet Medallion Inlays",
    image: "/images/services/cnc-waterjet.jpg",
    badge: "5-Axis CNC & Hand-Carved",
    href: "/products?category=Artefacts",
    specs: "Custom Mandirs & Architectural Sculpture",
    origin: "Master Artisans",
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
  const [activeProductFilter, setActiveProductFilter] =
    useState<ProductFilterCategory>("all");
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

  // Filtered Products for the Carousel
  const filteredProducts = useMemo(() => {
    if (activeProductFilter === "all") return TOP_10_PRODUCTS;
    return TOP_10_PRODUCTS.filter(
      (p) => p.categoryFilter === activeProductFilter
    );
  }, [activeProductFilter]);

  const totalItems =
    activeTab === "products"
      ? filteredProducts.length
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

  // Auto-advance every 6.5s when idle
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // Filter categories with live counts
  const filterCategories = useMemo(() => {
    return [
      { value: "all" as ProductFilterCategory, label: "All Stones", count: TOP_10_PRODUCTS.length },
      {
        value: "natural-stone" as ProductFilterCategory,
        label: "Natural Stone",
        count: TOP_10_PRODUCTS.filter((p) => p.categoryFilter === "natural-stone").length,
      },
      {
        value: "semi-precious" as ProductFilterCategory,
        label: "Semi-Precious",
        count: TOP_10_PRODUCTS.filter((p) => p.categoryFilter === "semi-precious").length,
      },
      {
        value: "table-tops" as ProductFilterCategory,
        label: "Table Tops",
        count: TOP_10_PRODUCTS.filter((p) => p.categoryFilter === "table-tops").length,
      },
      {
        value: "stone-veneers" as ProductFilterCategory,
        label: "Stone Veneers",
        count: TOP_10_PRODUCTS.filter((p) => p.categoryFilter === "stone-veneers").length,
      },
      {
        value: "artefacts" as ProductFilterCategory,
        label: "Mosaics & Artefacts",
        count: TOP_10_PRODUCTS.filter((p) => p.categoryFilter === "artefacts").length,
      },
    ];
  }, []);

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
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
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
              className={`relative z-10 px-7 sm:px-9 py-2.5 text-xs sm:text-[13px] font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 rounded-full flex items-center gap-2 cursor-pointer ${
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
              className={`relative z-10 px-7 sm:px-9 py-2.5 text-xs sm:text-[13px] font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 rounded-full flex items-center gap-2 cursor-pointer ${
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

        {/* UPPER SIDE CATEGORY FILTER BAR (Shown when PRODUCTS tab is active) */}
        {activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none justify-start sm:justify-center px-1"
          >
            {filterCategories.map((filter) => {
              const isSelected = activeProductFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => {
                    setActiveProductFilter(filter.value);
                    setCurrentIndex(0);
                  }}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 flex-shrink-0 cursor-pointer active:scale-95 ${
                    isSelected
                      ? "text-maroon-deep shadow-sm"
                      : "text-stone-600 hover:text-maroon bg-white/70 border border-stone-200 hover:border-gold/50"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    )}
                    <span>{filter.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? "bg-maroon-deep/10 text-maroon-deep"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterPill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-full border border-gold shadow-md"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Carousel Header Bar: Slide Title & Navigation Arrows */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div>
            <span className="font-montserrat text-[11px] uppercase tracking-[0.22em] text-gold-dark font-semibold block">
              {activeTab === "products"
                ? `Top 10 Curated Products (${filteredProducts.length} Showing)`
                : "Architectural Services Showcase (6 Disciplines)"}
            </span>
            <span className="font-jost text-xs sm:text-sm text-stone-500">
              Showing {currentIndex + 1} to {Math.min(currentIndex + itemsVisible, totalItems)} of {totalItems}
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
                key={`products-${activeProductFilter}`}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35 }}
                className="flex transition-transform duration-500 ease-out -mx-3"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
                }}
              >
                {filteredProducts.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / itemsVisible}%` }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  >
                    <div className="h-full bg-white rounded-2xl border border-gold/30 shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 overflow-hidden flex flex-col group">
                      {/* Image Header with Badge & Hover Zoom */}
                      <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden bg-stone-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
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
                          <div className="flex items-center gap-1.5 text-[10px] font-montserrat uppercase tracking-widest text-gold-dark mb-1 font-semibold">
                            <Sparkles className="w-3 h-3 text-gold" />
                            <span>{item.origin || "Curated Monolith"}</span>
                          </div>
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
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="services-carousel"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35 }}
                className="flex transition-transform duration-500 ease-out -mx-3"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
                }}
              >
                {SERVICE_CAROUSEL_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / itemsVisible}%` }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  >
                    <div className="h-full bg-white rounded-2xl border border-gold/30 shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 overflow-hidden flex flex-col group">
                      {/* Image Header with Badge & Hover Zoom */}
                      <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden bg-stone-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
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
                  </motion.div>
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
