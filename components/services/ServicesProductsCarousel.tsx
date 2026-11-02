"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export type ProductFilterCategory =
  | "all"
  | "natural-stone"
  | "semi-precious"
  | "table-tops"
  | "stone-veneers"
  | "artefacts";

interface ProductItem {
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
  highlight: string;
}

const TOP_10_PRODUCTS: ProductItem[] = [
  {
    id: "paunazo-quartzite",
    title: "Paunazo Quartzite",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "Exotic Multicolor Quartzite · Mohs 7 Scratch & Acid Immunity",
    image: "/images/stones/paunazo/paunazo-slab.png",
    badge: "Mohs 7 · Acid Immune",
    href: "/products/paunazo-quartzite",
    specs: "302 × 195 cm · 20mm Profile",
    origin: "Exotic Quarry",
    highlight: "Consecutive Bookmatch Alignment",
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
    specs: "284 × 178 cm · 20mm Profile",
    origin: "Carrara, Italy",
    highlight: "Mirror-Image Bookmatch Flow",
  },
  {
    id: "thassos-white",
    title: "Thassos White Marble",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "The Purest Snow-White Crystalline Marble on Earth",
    image: "/images/stones/thassos/thassos-slab.png",
    badge: "Greece · Snow-White",
    href: "/products/thassos-white-marble",
    specs: "290 × 173 cm · 20mm Profile",
    origin: "Island of Thassos, Greece",
    highlight: "Light-Refracting Sugar Crystals",
  },
  {
    id: "statuario-classic",
    title: "Statuario Classic Marble",
    category: "Natural Stone",
    categoryFilter: "natural-stone",
    subtitle: "Bold Graphite-Black & Charcoal Veining on Brilliant White Calcite",
    image: "/images/stones/statuario/statuario-slab.png",
    badge: "Carrara, Italy · Lot 6415A",
    href: "/products/statuario-marble",
    specs: "292 × 191 cm · 18mm Profile",
    origin: "Carrara, Tuscany, Italy",
    highlight: "Timeless Monochromatic Grandeur",
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
    highlight: "Double-Height Atrium Scale",
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
    highlight: "Precision Planar Calibration",
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
    specs: "Bespoke Cut-to-Size Profile",
    origin: "Exotic Gemstone Mines",
    highlight: "Translucent Deep Luminescence",
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
    specs: "Bespoke Edge Chamfers",
    origin: "INTIOSS Atelier",
    highlight: "Monolithic Sculpture Precision",
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
    specs: "Lightweight 2mm Profile",
    origin: "Architectural Grade",
    highlight: "Curvilinear Cladding Flexibility",
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
    specs: "Bespoke Architectural Sculpture",
    origin: "Master Stone Artisans",
    highlight: "Sub-Millimeter CNC Execution",
  },
];

export function ServicesProductsCarousel() {
  const [activeFilter, setActiveFilter] = useState<ProductFilterCategory>("all");
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

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return TOP_10_PRODUCTS;
    return TOP_10_PRODUCTS.filter((p) => p.categoryFilter === activeFilter);
  }, [activeFilter]);

  const totalItems = filteredProducts.length;
  const maxIndex = Math.max(0, totalItems - itemsVisible);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Auto-advance every 6.5s when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // SCROLLER WORK ON MOUSE HOVER: Wheel scrolling, edge hover auto-scroll, and gesture support
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const hoverScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoverScrollingRef = useRef<"next" | "prev" | null>(null);

  const startHoverScroll = useCallback(
    (direction: "next" | "prev") => {
      if (isHoverScrollingRef.current === direction) return;
      isHoverScrollingRef.current = direction;

      if (hoverScrollTimerRef.current) clearInterval(hoverScrollTimerRef.current);

      // Immediately advance once on hover edge
      if (direction === "next") {
        handleNext();
      } else {
        handlePrev();
      }

      // Then continuously advance while hovering over the edge zone
      hoverScrollTimerRef.current = setInterval(() => {
        if (direction === "next") {
          handleNext();
        } else {
          handlePrev();
        }
      }, 1400);
    },
    [handleNext, handlePrev]
  );

  const stopHoverScroll = useCallback(() => {
    if (hoverScrollTimerRef.current) {
      clearInterval(hoverScrollTimerRef.current);
      hoverScrollTimerRef.current = null;
    }
    isHoverScrollingRef.current = null;
  }, []);

  // Native mouse wheel listener with passive: false to smoothly translate vertical wheel into horizontal carousel scroll
  useEffect(() => {
    const el = carouselContainerRef.current;
    if (!el) return;

    let lastWheelTime = 0;
    const onWheel = (e: WheelEvent) => {
      const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominantDelta) < 12) return;

      // Prevent page jump while mouse is hovering and wheeling over the carousel
      e.preventDefault();

      const now = performance.now();
      if (now - lastWheelTime > 230) {
        lastWheelTime = now;
        if (dominantDelta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [handleNext, handlePrev]);

  // Clean up hover interval on unmount
  useEffect(() => {
    return () => {
      if (hoverScrollTimerRef.current) clearInterval(hoverScrollTimerRef.current);
    };
  }, []);

  // Handle mouse move across the carousel stage to detect left/right hover zones
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = carouselContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;

      // Left 16% zone triggers smooth backward scroll on hover
      if (x < width * 0.16) {
        startHoverScroll("prev");
      }
      // Right 16% zone triggers smooth forward scroll on hover
      else if (x > width * 0.84) {
        startHoverScroll("next");
      }
      // Center zone (safe for reading & clicking without movement)
      else {
        stopHoverScroll();
      }
    },
    [startHoverScroll, stopHoverScroll]
  );

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
    <section className="mt-28 sm:mt-36 pt-16 sm:pt-20 border-t border-gold/25">
      {/* Section Header & Interactive Dial Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5 px-1">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Materials Transformed Through Our Services
            </span>
          </div>
          <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon leading-tight">
            Top 10 Curated Surfaces & Exotic Slabs
          </h2>
          <p className="font-jost text-xs sm:text-sm text-stone-600 mt-1.5 max-w-xl leading-relaxed">
            From rare Italian marbles to monolithic quartzites, explore the surfaces specified, sourced, and fabricated through our architectural disciplines.
          </p>
        </div>

        {/* Liquid Progress Bar + Circular Glass Controls */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-montserrat text-xs font-bold text-maroon tracking-wider">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-24 sm:w-36 h-1.5 bg-stone-200 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gold via-[#F3E5AB] to-gold-dark rounded-full shadow-sm"
                animate={{
                  width: `${((currentIndex + 1) / totalItems) * 100}%`,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              />
            </div>
            <span className="font-montserrat text-xs font-medium text-stone-400 tracking-wider">
              {String(totalItems).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous product"
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-gold/40 hover:border-gold hover:bg-gold/15 text-maroon shadow-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-maroon" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next product"
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-gold/40 hover:border-gold hover:bg-gold/15 text-maroon shadow-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-maroon" />
            </button>
          </div>
        </div>
      </div>

      {/* UPPER SIDE CATEGORY FILTER BAR */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-3 mb-9 scrollbar-none justify-start px-1">
        {filterCategories.map((filter) => {
          const isSelected = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setActiveFilter(filter.value);
                setCurrentIndex(0);
              }}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 flex-shrink-0 cursor-pointer active:scale-95 ${
                isSelected
                  ? "text-maroon-deep shadow-sm"
                  : "text-stone-600 hover:text-maroon bg-white/80 border border-stone-200 hover:border-gold/50"
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
                  layoutId="activeServicesProdFilterPill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 bg-white rounded-full border border-gold shadow-md"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Modern Tall Architectural Poster Cards Carousel Track with Mouse Hover & Wheel Scrolling */}
      <div
        ref={carouselContainerRef}
        className="relative overflow-hidden py-3 group/stage"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          stopHoverScroll();
        }}
        onMouseMove={handleMouseMove}
      >
          {/* Left Hover Scroller Hotzone */}
          <div
            onMouseEnter={() => startHoverScroll("prev")}
            onMouseLeave={stopHoverScroll}
            onClick={handlePrev}
            className="absolute top-3 bottom-3 left-0 w-16 sm:w-20 z-30 hidden sm:flex items-center justify-start pl-3 cursor-pointer group/hoveredge"
            aria-label="Hover or click to scroll left"
          >
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-gold/50 text-gold flex items-center justify-center opacity-0 group-hover/hoveredge:opacity-100 group-hover/hoveredge:scale-105 transition-all duration-300 shadow-xl">
              <ChevronLeft className="w-5 h-5 text-gold group-hover/hoveredge:-translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Right Hover Scroller Hotzone */}
          <div
            onMouseEnter={() => startHoverScroll("next")}
            onMouseLeave={stopHoverScroll}
            onClick={handleNext}
            className="absolute top-3 bottom-3 right-0 w-16 sm:w-20 z-30 hidden sm:flex items-center justify-end pr-3 cursor-pointer group/hoveredge"
            aria-label="Hover or click to scroll right"
          >
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-gold/50 text-gold flex items-center justify-center opacity-0 group-hover/hoveredge:opacity-100 group-hover/hoveredge:scale-105 transition-all duration-300 shadow-xl">
              <ChevronRight className="w-5 h-5 text-gold group-hover/hoveredge:translate-x-0.5 transition-transform" />
            </div>
          </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`services-prod-${activeFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div
              className="flex transition-transform duration-500 ease-out -mx-3"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
              }}
            >
            {filteredProducts.map((item, idx) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsVisible}%` }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Modern Architectural Full-Bleed Tall Poster Card */}
                <Link
                  href={item.href}
                  className="group relative block h-[480px] sm:h-[530px] rounded-3xl overflow-hidden border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 bg-maroon-deep select-none"
                >
                  {/* Full-Bleed High-Res Stone Photography */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Cinematic Luxury Dark Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 group-hover:from-black/98 group-hover:via-black/50 transition-colors duration-500 pointer-events-none" />

                  {/* Top Floating Glass Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-[10px] font-montserrat uppercase tracking-wider font-semibold shadow-sm">
                      <IntiossHexagon size={12} useVector={true} />
                      <span>{item.category}</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[9px] font-montserrat uppercase tracking-wider font-medium bg-gold text-maroon-deep font-bold shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Typographic Card Body */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 flex flex-col justify-end text-ivory">
                    {/* Origin & Specs Micro-Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-montserrat uppercase tracking-widest text-gold font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-gold" />
                        {item.origin || "Curated Monolith"}
                      </span>
                      <span className="text-white/40 text-xs">·</span>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-white/70">
                        {item.specs}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-marcellus text-2xl sm:text-3xl text-white group-hover:text-gold transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p className="font-jost text-xs sm:text-sm text-white/75 mt-2 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Highlight Feature Chip */}
                    <div className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-montserrat text-gold-dark font-medium">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      <span>{item.highlight}</span>
                    </div>

                    {/* Interactive Action Strip */}
                    <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest font-semibold text-gold group-hover:text-white transition-colors">
                        <span>Explore Slabs</span>
                        <ArrowUpRight className="w-4 h-4 text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>

                      <span className="text-[10px] font-montserrat uppercase tracking-widest text-white/50">
                        Lot #{idx + 1}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* View All Products CTA Link */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-maroon hover:text-gold-dark transition-colors font-semibold border-b border-gold/40 pb-1"
        >
          <span>View Complete Slabs & Products Catalogue</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
        </Link>
      </div>
    </section>
  );
}
