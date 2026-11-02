"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";

interface ProductItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  badge: string;
  href: string;
  specs: string;
}

const FEATURED_PRODUCTS: ProductItem[] = [
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

export function ServicesProductsCarousel() {
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

  const totalItems = FEATURED_PRODUCTS.length;
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

  return (
    <section className="mt-28 sm:mt-36 pt-16 sm:pt-20 border-t border-gold/25">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 px-1">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Materials Transformed Through Our Services
            </span>
          </div>
          <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon">
            Curated Surfaces & Exotic Stone Slabs
          </h2>
          <p className="font-jost text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            From rare Italian marbles to monolithic quartzites, explore the surfaces specified, sourced, and fabricated through our architectural disciplines.
          </p>
        </div>

        {/* Navigation Arrow Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gold/40 hover:border-gold hover:bg-gold/10 text-maroon shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-maroon" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gold/40 hover:border-gold hover:bg-gold/10 text-maroon shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-maroon" />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex transition-transform duration-500 ease-out -mx-3"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
          }}
        >
          {FEATURED_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsVisible}%` }}
            >
              <div className="h-full bg-white rounded-2xl border border-gold/30 shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 overflow-hidden flex flex-col group">
                {/* Image Header with Badge & Hover Zoom */}
                <div className="relative h-[230px] sm:h-[250px] w-full overflow-hidden bg-stone-100 flex-shrink-0">
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

                  {/* Footer Link */}
                  <div className="mt-5 pt-3.5 border-t border-gold/15 flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider font-semibold text-maroon group-hover:text-gold-dark transition-colors"
                    >
                      <span>Explore Stone</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <span className="text-[10px] font-montserrat uppercase tracking-widest text-stone-400">
                      INTIOSS Archive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to product slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? "w-8 bg-gold shadow-sm"
                : "w-2 bg-stone-300 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>

      {/* View All Products CTA */}
      <div className="text-center mt-10">
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

