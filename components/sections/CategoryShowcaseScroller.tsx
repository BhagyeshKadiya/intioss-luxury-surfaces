"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Wrench,
} from "lucide-react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export type ShowcaseTab = "surfaces" | "services";

export interface ShowcaseItem {
  id: string;
  title: string;
  image: string;
  href: string;
  accent?: string;
}

export const SURFACE_CATEGORIES: ShowcaseItem[] = [
  {
    id: "marble",
    title: "Marble",
    image: "/images/categories/natural-stone.webp",
    href: "/products?category=Natural+Stones&type=Marble",
    accent: "from-amber-500/20 via-gold/10 to-transparent",
  },
  {
    id: "quartzite",
    title: "Quartzite",
    image: "/images/stones/paunazo/paunazo-slab.png",
    href: "/products?category=Natural+Stones&type=Quartzite",
    accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "onyx",
    title: "Onyx",
    image: "/images/stones/emerald-green-onyx.jpg",
    href: "/products?category=Natural+Stones&type=Onyx",
    accent: "from-emerald-500/20 via-gold/10 to-transparent",
  },
  {
    id: "travertine",
    title: "Travertine",
    image: "/images/stones/white-travertine.jpg",
    href: "/products?category=Natural+Stones&type=Travertine",
    accent: "from-amber-600/20 via-gold/15 to-transparent",
  },
  {
    id: "granite",
    title: "Granite",
    image: "/images/stones/super-spider/super-spider-slab.png",
    href: "/products?category=Natural+Stones&type=Granite",
    accent: "from-stone-500/20 via-amber-500/10 to-transparent",
  },
  {
    id: "limestone",
    title: "Lime Stone",
    image: "/images/stones/silver-travertine.jpg",
    href: "/products?category=Natural+Stones&type=Lime+Stone",
    accent: "from-amber-400/20 via-gold/10 to-transparent",
  },
  {
    id: "basalt",
    title: "Basalt",
    image: "/images/stones/emperador-dark.jpg",
    href: "/products?category=Natural+Stones&type=Basalt",
    accent: "from-zinc-500/20 via-stone-500/10 to-transparent",
  },
  {
    id: "semi-precious",
    title: "Semi Precious Stone",
    image: "/images/categories/semi-precious-stone.jpg",
    href: "/products?category=Semi-Precious+Stones",
    accent: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "table-tops",
    title: "Table Tops",
    image: "/images/categories/table-tops.webp",
    href: "/products?category=Exclusive+Table+Tops+%E2%80%94+Stone",
    accent: "from-emerald-500/20 via-gold/10 to-transparent",
  },
  {
    id: "stone-veneers",
    title: "Stone Veneers",
    image: "/images/categories/stone-veneers.jpg",
    href: "/products?category=Stone+Veneers",
    accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "mosaics",
    title: "Mosaics",
    image: "/images/categories/mosaics.jpg",
    href: "/products?category=Mosaics",
    accent: "from-rose-500/20 via-amber-500/10 to-transparent",
  },
  {
    id: "stone-art",
    title: "Stone Art",
    image: "/images/categories/artefacts.jpg",
    href: "/products?category=Stone+Art",
    accent: "from-amber-600/20 via-gold/15 to-transparent",
  },
];

export const SERVICE_DISCIPLINES: ShowcaseItem[] = [
  {
    id: "luxury-civil-contracting",
    title: "Luxury Civil Contracting",
    image: "/images/services/luxury-civil-contracting.jpg",
    href: "/services#luxury-civil-contracting",
    accent: "from-amber-500/20 via-gold/10 to-transparent",
  },
  {
    id: "marble-block-processing",
    title: "Marble Block Processing",
    image: "/images/services/marble-block-processing.jpg",
    href: "/services#marble-block-processing",
    accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "stone-facades",
    title: "Stone Facades & Cladding",
    image: "/images/services/stone-facades.jpg",
    href: "/services#stone-facades",
    accent: "from-emerald-500/20 via-gold/10 to-transparent",
  },
  {
    id: "cnc-waterjet",
    title: "CNC & Waterjet Carving",
    image: "/images/services/cnc-waterjet.jpg",
    href: "/services#cnc-waterjet",
    accent: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "international-stone-sourcing",
    title: "International Stone Sourcing",
    image: "/images/services/international-stone-sourcing.jpg",
    href: "/services#international-stone-sourcing",
    accent: "from-amber-600/20 via-gold/15 to-transparent",
  },
  {
    id: "stone-restoration-maintenance",
    title: "Restoration & Maintenance (AMC)",
    image: "/images/services/amc-services.jpg",
    href: "/services#stone-restoration-maintenance",
    accent: "from-rose-500/20 via-amber-500/10 to-transparent",
  },
];

export function CategoryShowcaseScroller() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("surfaces");
  const [activeId, setActiveId] = useState<string>("marble");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Active items list based on current tab
  const items = activeTab === "surfaces" ? SURFACE_CATEGORIES : SERVICE_DISCIPLINES;

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When switching tabs, select the first item
  const handleTabChange = (newTab: ShowcaseTab) => {
    setActiveTab(newTab);
    setActiveId(newTab === "surfaces" ? "marble" : "luxury-civil-contracting");
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Enable horizontal mouse wheel scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaY) > 2) {
        const canScrollLeft = track.scrollLeft > 0;
        const canScrollRight = track.scrollLeft < track.scrollWidth - track.clientWidth - 5;
        if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
          e.preventDefault();
          track.scrollBy({ left: e.deltaY * 1.5, behavior: "smooth" });
        }
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  // Scroll active into view on mobile or tab switch
  const scrollToItem = useCallback((id: string) => {
    setActiveId(id);
    const track = trackRef.current;
    if (!track) return;
    const itemEl = track.querySelector<HTMLElement>(`[data-item-id="${id}"]`);
    if (itemEl) {
      const containerLeft = track.getBoundingClientRect().left;
      const itemLeft = itemEl.getBoundingClientRect().left;
      const offset = itemLeft - containerLeft - 24;
      track.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, []);

  const nextItem = () => {
    const currentIdx = items.findIndex((c) => c.id === activeId);
    const nextIdx = (currentIdx + 1) % items.length;
    scrollToItem(items[nextIdx].id);
  };

  const prevItem = () => {
    const currentIdx = items.findIndex((c) => c.id === activeId);
    const prevIdx = (currentIdx - 1 + items.length) % items.length;
    scrollToItem(items[prevIdx].id);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-maroon-deep via-[#421422] to-maroon-deep text-ivory py-16 sm:py-24 overflow-hidden border-b border-gold/30"
      aria-label="Curated Surfaces and Solutions"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[#6B2236]/60 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#DDB62B_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-gold/40 shadow-[0_2px_12px_rgba(221,182,43,0.15)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Curated Surfaces & Solutions
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          {/* Main Heading */}
          <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide leading-tight text-center">
            Gold Standard in Stone Selection.
          </h2>

          {/* Subtitle */}
          <p className="font-jost text-base sm:text-lg lg:text-xl text-ivory/80 mt-3 max-w-2xl leading-relaxed text-center">
            Beyond the Slabs. Into the Details.
          </p>

          {/* Centered Interactive Controls Bar: Segmented Switcher & Navigation */}
          <div className="mt-8 flex items-center justify-center gap-2.5 sm:gap-4">
            {/* Prev Item Arrow */}
            <button
              type="button"
              onClick={prevItem}
              aria-label="Previous Item"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/20 border border-gold/40 hover:border-gold flex items-center justify-center text-ivory transition-all duration-200 active:scale-90 cursor-pointer shadow-md shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-gold" />
            </button>

            {/* Segmented Switcher: Products vs Services */}
            <div
              role="tablist"
              aria-label="Select Products or Services"
              className="inline-flex p-1 sm:p-1.5 rounded-full bg-black/75 border border-gold/40 backdrop-blur-md shadow-2xl"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "surfaces"}
                onClick={() => handleTabChange("surfaces")}
                className={`relative px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeTab === "surfaces"
                    ? "bg-gradient-to-r from-gold via-gold-light to-gold text-maroon-deep shadow-[0_2px_14px_rgba(221,182,43,0.4)] font-bold"
                    : "text-ivory/80 hover:text-ivory hover:bg-white/5"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Products</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    activeTab === "surfaces"
                      ? "bg-maroon-deep/20 text-maroon-deep font-bold"
                      : "bg-white/10 text-gold"
                  }`}
                >
                  {SURFACE_CATEGORIES.length}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "services"}
                onClick={() => handleTabChange("services")}
                className={`relative px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs font-montserrat uppercase tracking-[0.16em] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeTab === "services"
                    ? "bg-gradient-to-r from-gold via-gold-light to-gold text-maroon-deep shadow-[0_2px_14px_rgba(221,182,43,0.4)] font-bold"
                    : "text-ivory/80 hover:text-ivory hover:bg-white/5"
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Services</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    activeTab === "services"
                      ? "bg-maroon-deep/20 text-maroon-deep font-bold"
                      : "bg-white/10 text-gold"
                  }`}
                >
                  {SERVICE_DISCIPLINES.length}
                </span>
              </button>
            </div>

            {/* Next Item Arrow */}
            <button
              type="button"
              onClick={nextItem}
              aria-label="Next Item"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/20 border border-gold/40 hover:border-gold flex items-center justify-center text-ivory transition-all duration-200 active:scale-90 cursor-pointer shadow-md shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>

        {/* EXPANDABLE ACCORDION / HORIZONTAL SCROLLER CONTAINER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            ref={trackRef}
            className="relative w-full flex flex-col lg:flex-row gap-3 sm:gap-3.5 lg:h-[560px] overflow-x-auto pb-4 lg:pb-1 scrollbar-none select-none"
          >
            {items.map((item, idx) => {
              const isExpanded = activeId === item.id;
              const displayIndex = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

              return (
                <motion.div
                  key={item.id}
                  data-item-id={item.id}
                  onMouseEnter={() => !isMobile && setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  layout
                  transition={{
                    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 shrink-0 ${
                    isExpanded
                      ? "lg:flex-[4] lg:min-w-[420px] border-gold shadow-[0_16px_48px_rgba(221,182,43,0.25)] ring-1 ring-gold/40"
                      : "lg:flex-[1] lg:min-w-[76px] border-white/10 hover:border-gold/50 shadow-lg opacity-85 hover:opacity-100"
                  } ${
                    isExpanded
                      ? "h-[380px] sm:h-[440px] lg:h-full"
                      : "h-[90px] sm:h-[100px] lg:h-full"
                  }`}
                >
                  {/* Background Image with Zoom & Dark Gradient */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className={`object-cover object-center transition-transform duration-1000 ease-out ${
                        isExpanded ? "scale-105" : "scale-100 group-hover:scale-110"
                      }`}
                      priority={idx < 2}
                    />

                    {/* Gradient layers for dramatic contrast & legibility */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#100306] via-[#100306]/70 to-[#100306]/30 transition-opacity duration-500 ${
                        isExpanded ? "opacity-90" : "opacity-80 group-hover:opacity-65"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#18060B]/80 via-transparent to-[#100306] pointer-events-none" />

                    {/* Category/Discipline Accent Tint */}
                    {item.accent && (
                      <div className={`absolute inset-0 bg-gradient-to-tr ${item.accent} pointer-events-none`} />
                    )}
                  </div>

                  {/* COLLAPSED VERTICAL TITLE (Desktop Only, when not expanded) */}
                  {!isExpanded && (
                    <div className="hidden lg:flex absolute inset-0 p-6 flex-col justify-between z-10">
                      <span className="font-marcellus text-sm text-gold/60">
                        {displayIndex}
                      </span>

                      <div className="transform -rotate-90 origin-bottom-left translate-x-12 translate-y-2 whitespace-nowrap">
                        <span className="font-marcellus text-2xl tracking-wider text-ivory/95 group-hover:text-gold transition-colors">
                          {item.title}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold/20 transition-all self-end">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* COLLAPSED MOBILE ROW (Mobile Only, when not expanded) */}
                  {!isExpanded && (
                    <div className="flex lg:hidden absolute inset-0 p-4 sm:p-5 items-center justify-between z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border border-gold/40 overflow-hidden relative shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-marcellus text-xl text-ivory">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-gold/40 flex items-center justify-center text-gold shrink-0">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* FULL EXPANDED CONTENT: ONLY THE NAME + CLEAN LUXURY EXPLORE ACTION */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className="relative z-20 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
                    >
                      {/* Top Minimal Badge & Index */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-gold/40 shadow-sm backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                          <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
                            {activeTab === "surfaces" ? "Product Collection" : "Atelier Service"}
                          </span>
                        </div>

                        <span className="font-marcellus text-2xl text-gold/60">
                          {displayIndex}
                        </span>
                      </div>

                      {/* Bottom Area: Prominent Name & Clean CTA Button */}
                      <div className="space-y-5 max-w-xl">
                        <h3 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal leading-tight tracking-wide">
                          {item.title}
                        </h3>

                        <div className="pt-2">
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-light text-maroon-deep font-montserrat text-xs uppercase tracking-[0.16em] font-bold shadow-[0_4px_20px_rgba(221,182,43,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <span>Explore {item.title}</span>
                            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Interactive Guidance Pill */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-montserrat text-ivory/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="tracking-wider uppercase">
              Hover over or click any {activeTab === "surfaces" ? "product" : "service"} to view
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="tracking-wider uppercase text-gold font-semibold">
              {items.length} {activeTab === "surfaces" ? "Curated Collections" : "Specialized Services"}
            </span>
            <span className="text-white/20">|</span>
            <Link
              href={activeTab === "surfaces" ? "/products" : "/services"}
              className="text-ivory hover:text-gold transition-colors tracking-wider uppercase font-semibold underline underline-offset-4 decoration-gold/50"
            >
              Browse Complete {activeTab === "surfaces" ? "Products Catalogue" : "Services"} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
