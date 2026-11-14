"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  Compass,
  Wrench,
  ShieldCheck,
  Check,
} from "lucide-react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export type ShowcaseTab = "surfaces" | "services";

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  href: string;
  stats: string;
  accent: string;
  highlights: string[];
  ctaText: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
}

export const SURFACE_CATEGORIES: ShowcaseItem[] = [
  {
    id: "natural-stone",
    title: "Natural Stone",
    subtitle: "Italian Marbles, Quartzites & Onyx",
    description:
      "Hand-selected slabs from Carrara, Greece & Brazil, crafted for timeless architectural expressions.",
    image: "/images/categories/natural-stone.webp",
    tag: "Architectural Slabs",
    href: "/products?category=Natural+Stones",
    stats: "Over 80+ Exotics",
    accent: "from-amber-500/20 via-gold/10 to-transparent",
    highlights: ["Statuario", "Paunazo Quartzite", "Thassos White", "Michael Angelo"],
    ctaText: "Explore Slabs",
    ctaSecondaryText: "Hold Slabs",
    ctaSecondaryHref: "/contact?interest=natural-stone",
  },
  {
    id: "semi-precious",
    title: "Semi Precious Stone",
    subtitle: "Translucent Gems & Rare Minerals",
    description:
      "Jewels of the earth crafted into backlit monolithic statement surfaces that radiate luminescence.",
    image: "/images/categories/semi-precious-stone.jpg",
    tag: "Jewel Surfaces",
    href: "/products?category=Semi-Precious+Stones",
    stats: "Backlit Radiance",
    accent: "from-purple-500/20 via-pink-500/10 to-transparent",
    highlights: ["Amethyst", "Lapis Lazuli", "Tiger Eye", "Malachite Inlay"],
    ctaText: "Explore Gemstones",
    ctaSecondaryText: "Request Sample",
    ctaSecondaryHref: "/contact?interest=semi-precious",
  },
  {
    id: "table-tops",
    title: "Table Tops",
    subtitle: "Bespoke Monoliths & Statement Dining",
    description:
      "Sculpted stone surfaces and bookmatched slabs engineered into heirloom focal dining centerpieces.",
    image: "/images/categories/table-tops.webp",
    tag: "Custom Furniture",
    href: "/products?category=Exclusive+Table+Tops+%E2%80%94+Stone",
    stats: "Custom Profiles",
    accent: "from-emerald-500/20 via-gold/10 to-transparent",
    highlights: ["Petrified Wood", "Travertine Monoliths", "Bookmatch Tops", "Sculpted Edges"],
    ctaText: "View Table Tops",
    ctaSecondaryText: "Custom Size Order",
    ctaSecondaryHref: "/contact?interest=table-tops",
  },
  {
    id: "stone-veneers",
    title: "Stone Veneers",
    subtitle: "Ultra-Lightweight Flexible Real Stone",
    description:
      "Natural 2mm stone split sheets for curved walls, high-rise facades, and luxury retail cladding.",
    image: "/images/categories/stone-veneers.jpg",
    tag: "Ultra-Thin Cladding",
    href: "/products?category=Stone+Veneers",
    stats: "2mm Flexible",
    accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
    highlights: ["Slate Veneer", "Translucent Backlit", "Flexible 3D Mesh", "Curved Pillars"],
    ctaText: "View Veneers",
    ctaSecondaryText: "Order Swatches",
    ctaSecondaryHref: "/contact?interest=stone-veneers",
  },
  {
    id: "mosaics",
    title: "Mosaics",
    subtitle: "Waterjet Precision & Hand-Cut Intricacy",
    description:
      "Geometric floor medallions, floral wall inlays, and glass-gold bespoke mosaic tapestries.",
    image: "/images/categories/mosaics.jpg",
    tag: "Artisanal Geometry",
    href: "/products?category=Mosaics",
    stats: "CNC Waterjet",
    accent: "from-rose-500/20 via-amber-500/10 to-transparent",
    highlights: ["Glass-Gold Mosaic", "Floral Medallions", "Herringbone Mesh", "Brass Inlay"],
    ctaText: "Explore Mosaics",
    ctaSecondaryText: "Bespoke Pattern",
    ctaSecondaryHref: "/contact?interest=mosaics",
  },
  {
    id: "stone-art",
    title: "Stone Art",
    subtitle: "Hand-Carved Mandirs, Basins & Sculptures",
    description:
      "Museum-grade hand-carved stone basins, monolithic bathtubs, sacred mandirs, and bespoke statues.",
    image: "/images/categories/artefacts.jpg",
    tag: "Master Sculptures",
    href: "/products?category=Stone+Art",
    stats: "Hand-Crafted",
    accent: "from-amber-600/20 via-gold/15 to-transparent",
    highlights: ["Carved Mandirs", "Sculpted Basins", "Solid Bathtubs", "Artisan Columns"],
    ctaText: "Explore Stone Art",
    ctaSecondaryText: "Commission Piece",
    ctaSecondaryHref: "/contact?interest=stone-art",
  },
];

export const SERVICE_DISCIPLINES: ShowcaseItem[] = [
  {
    id: "luxury-civil-contracting",
    title: "Luxury Civil Contracting",
    subtitle: "Structural Subfloors & Acoustic Decoupling",
    description:
      "Turnkey structural retrofitting, moisture barrier subfloors, and monolithic screed casting engineered for heavy architectural stone.",
    image: "/images/services/luxury-civil-contracting.jpg",
    tag: "Turnkey Contracting",
    href: "/services#luxury-civil-contracting",
    stats: "ASTM & IS Tested",
    accent: "from-amber-500/20 via-gold/10 to-transparent",
    highlights: ["Acoustic Decoupling", "Moisture Barrier Screed", "Heavy Stone Subfloor", "Laser Planar Leveling"],
    ctaText: "Contracting Details",
    ctaSecondaryText: "Schedule Site Audit",
    ctaSecondaryHref: "/contact?service=luxury-civil-contracting",
  },
  {
    id: "marble-block-processing",
    title: "Marble Block Processing",
    subtitle: "Silvassa Factory & Diamond Gangsaw",
    description:
      "Monolithic block squaring, multi-blade gangsaw slicing, and automated vacuum-epoxy netting lines at our 50,000 sq.ft Silvassa Works.",
    image: "/images/services/marble-block-processing.jpg",
    tag: "Industrial Processing",
    href: "/services#marble-block-processing",
    stats: "50,000 Sq.Ft Factory",
    accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
    highlights: ["Diamond Gangsaw Lines", "Vacuum Epoxy Netting", "Planar Calibration", "Resin Chamber Curing"],
    ctaText: "Explore Processing",
    ctaSecondaryText: "Factory Tour",
    ctaSecondaryHref: "/contact?service=marble-block-processing",
  },
  {
    id: "stone-facades",
    title: "Stone Facades & Cladding",
    subtitle: "Engineered Ventilated Facades & Anchor Systems",
    description:
      "Seismic-certified ventilated curtain walls, undercut SS316 anchor brackets, and dry-hung stone engineering for high-rises.",
    image: "/images/services/stone-facades.jpg",
    tag: "Architectural Facades",
    href: "/services#stone-facades",
    stats: "Seismic Certified",
    accent: "from-emerald-500/20 via-gold/10 to-transparent",
    highlights: ["SS316 Undercut Anchors", "Thermal Cavity Insulation", "Wind-Load Engineering", "Dry-Hung Honeycomb Panels"],
    ctaText: "Facade Engineering",
    ctaSecondaryText: "Technical Spec Sheet",
    ctaSecondaryHref: "/contact?service=stone-facades",
  },
  {
    id: "cnc-waterjet",
    title: "CNC & Waterjet Carving",
    subtitle: "5-Axis Robotic 3D Sculpting & Micro-Fluting",
    description:
      "Ultra-high precision robotic stone milling, intricate filigree inlays, waterjet medallion mosaics, and parametric fluted wall claddings.",
    image: "/images/services/cnc-waterjet.jpg",
    tag: "Robotic Precision",
    href: "/services#cnc-waterjet",
    stats: "Sub-Millimeter",
    accent: "from-purple-500/20 via-pink-500/10 to-transparent",
    highlights: ["5-Axis Robotic Milling", "Parametric 3D Fluting", "Bespoke Brass Inlays", "Floral Floor Medallions"],
    ctaText: "Carving Capabilities",
    ctaSecondaryText: "Send CAD / 3D File",
    ctaSecondaryHref: "/contact?service=cnc-waterjet",
  },
  {
    id: "international-stone-sourcing",
    title: "International Stone Sourcing",
    subtitle: "Direct Quarry Inspections across Carrara, Greece & Brazil",
    description:
      "Private client curation, ultrasonic slab integrity testing, and consecutive block reservation straight from mountain quarries.",
    image: "/images/services/international-stone-sourcing.jpg",
    tag: "Global Alliances",
    href: "/services#international-stone-sourcing",
    stats: "Direct Quarry Access",
    accent: "from-amber-600/20 via-gold/15 to-transparent",
    highlights: ["Carrara Calcite Quarries", "Thassos Island Crystals", "Brazilian Exotic Quartzites", "Ultrasonic Defect Testing"],
    ctaText: "Global Sourcing",
    ctaSecondaryText: "Book Quarry Curation",
    ctaSecondaryHref: "/contact?service=international-stone-sourcing",
  },
  {
    id: "stone-restoration-maintenance",
    title: "Restoration & Maintenance (AMC)",
    subtitle: "Italian Diamond Crystallization & Sealant Care",
    description:
      "Specialized lippage removal, diamond pad honing, Italian nano-penetrating sealants, and annual maintenance contracts (AMC).",
    image: "/images/services/amc-services.jpg",
    tag: "Lifetime Preservation",
    href: "/services#stone-restoration-maintenance",
    stats: "Lifetime AMC",
    accent: "from-rose-500/20 via-amber-500/10 to-transparent",
    highlights: ["Diamond Pad Resurfacing", "Italian Crystallization", "Nano Hydrophobic Sealants", "Historic Stone Restoration"],
    ctaText: "Maintenance Plans",
    ctaSecondaryText: "Book Stone Audit",
    ctaSecondaryHref: "/contact?service=stone-restoration-maintenance",
  },
];

export function CategoryShowcaseScroller() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("surfaces");
  const [activeId, setActiveId] = useState<string>("natural-stone");
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
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When tab changes, reset activeId to the first item of that tab
  const handleTabChange = (newTab: ShowcaseTab) => {
    setActiveTab(newTab);
    const targetItems = newTab === "surfaces" ? SURFACE_CATEGORIES : SERVICE_DISCIPLINES;
    setActiveId(targetItems[0].id);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Smooth wheel horizontal scroll on desktop
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
      className="relative w-full bg-[#140409] text-ivory py-16 sm:py-24 overflow-hidden border-b border-gold/25"
      aria-label="Curated Surfaces and Solutions"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-maroon-deep/60 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#DDB62B_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Centered Header Block: Luxury Eyebrow, Marcellus Heading & Subtitle */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          {/* Tag / Eyebrow - Centered */}
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-gold/40 shadow-[0_2px_12px_rgba(221,182,43,0.15)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Curated Surfaces & Solutions
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          {/* Main Heading - Centered */}
          <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide leading-tight text-center">
            Gold Standard in Stone Selection.
          </h2>

          {/* Subtitle - Centered */}
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
                className={`relative flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full font-montserrat text-xs sm:text-[13px] uppercase tracking-[0.16em] font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "surfaces"
                    ? "bg-gold text-maroon-deep shadow-[0_2px_14px_rgba(221,182,43,0.45)]"
                    : "text-ivory/70 hover:text-ivory hover:bg-white/5"
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
                  6
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "services"}
                onClick={() => handleTabChange("services")}
                className={`relative flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full font-montserrat text-xs sm:text-[13px] uppercase tracking-[0.16em] font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "services"
                    ? "bg-gold text-maroon-deep shadow-[0_2px_14px_rgba(221,182,43,0.45)]"
                    : "text-ivory/70 hover:text-ivory hover:bg-white/5"
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
                  6
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
            className="relative w-full flex flex-col lg:flex-row gap-3.5 sm:gap-4 lg:h-[620px] overflow-x-auto lg:overflow-hidden pb-4 lg:pb-0 scrollbar-none select-none"
          >
            {items.map((item, idx) => {
              const isExpanded = activeId === item.id;

              return (
                <motion.div
                  key={item.id}
                  data-item-id={item.id}
                  onMouseEnter={() => !isMobile && setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  layout
                  transition={{
                    layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 shrink-0 ${
                    isExpanded
                      ? "lg:flex-[3.8] border-gold shadow-[0_16px_48px_rgba(221,182,43,0.22)] ring-1 ring-gold/40"
                      : "lg:flex-[1] border-white/10 hover:border-gold/50 shadow-lg opacity-85 hover:opacity-100"
                  } ${
                    /* On mobile, unexpanded is compact card, expanded shows full details */
                    isExpanded
                      ? "h-[540px] sm:h-[580px] lg:h-full"
                      : "h-[120px] sm:h-[130px] lg:h-full"
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
                    <div className={`absolute inset-0 bg-gradient-to-tr ${item.accent} pointer-events-none`} />
                  </div>

                  {/* Index Watermark Number */}
                  <div
                    className={`absolute top-4 right-5 sm:top-6 sm:right-7 font-marcellus text-3xl sm:text-4xl text-white/20 group-hover:text-gold/40 transition-colors pointer-events-none ${
                      isExpanded ? "text-gold/60" : ""
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  {/* COLLAPSED VERTICAL TITLE (Desktop Only, when not expanded) */}
                  {!isExpanded && (
                    <div className="hidden lg:flex absolute inset-0 p-6 flex-col justify-between z-10">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 border border-gold/40 text-[10px] font-montserrat uppercase tracking-wider text-gold font-semibold backdrop-blur-xs">
                          {item.stats}
                        </span>
                      </div>

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
                          <span className="text-[10px] font-montserrat uppercase tracking-widest text-gold font-semibold block mb-0.5">
                            {item.tag}
                          </span>
                          <h3 className="font-marcellus text-xl text-ivory">
                            {item.title}
                          </h3>
                          <p className="font-jost text-xs text-ivory/70 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-gold/40 flex items-center justify-center text-gold shrink-0">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* FULL EXPANDED CONTENT (Shown on Desktop when hovered, on Mobile when active) */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="relative z-20 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-gold/50 shadow-sm backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-gold animate-pulse" />
                          <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">
                            {item.tag}
                          </span>
                        </div>

                        <span className="text-xs font-montserrat tracking-wider text-ivory/80 uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs">
                          {item.stats}
                        </span>
                      </div>

                      {/* Bottom Content Area */}
                      <div className="space-y-4 max-w-xl">
                        <div>
                          <span className="text-xs font-montserrat uppercase tracking-[0.22em] text-gold font-medium block mb-1">
                            {item.subtitle}
                          </span>
                          <h3 className="font-marcellus text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-tight">
                            {item.title}
                          </h3>
                        </div>

                        <p className="font-jost text-sm sm:text-base text-ivory/80 leading-relaxed max-w-lg">
                          {item.description}
                        </p>

                        {/* Signature Highlights / Materials */}
                        <div className="pt-2">
                          <span className="text-[10px] font-montserrat uppercase tracking-wider text-gold/80 block mb-2 font-semibold">
                            {activeTab === "surfaces" ? "Signature Varieties:" : "Core Capabilities:"}
                          </span>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.highlights.map((elem) => (
                              <span
                                key={elem}
                                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-gold/20 border border-white/15 hover:border-gold/40 text-[11px] font-montserrat text-ivory/90 tracking-wide transition-colors"
                              >
                                {elem}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA Action Bar */}
                        <div className="pt-4 flex flex-wrap items-center gap-3">
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-maroon-deep font-montserrat text-xs uppercase tracking-[0.16em] font-bold shadow-[0_4px_20px_rgba(221,182,43,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            {activeTab === "surfaces" ? (
                              <Layers className="w-3.5 h-3.5" />
                            ) : (
                              <Wrench className="w-3.5 h-3.5" />
                            )}
                            <span>{item.ctaText}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>

                          {item.ctaSecondaryHref && (
                            <Link
                              href={item.ctaSecondaryHref}
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-ivory border border-white/20 hover:border-gold/60 font-montserrat text-xs uppercase tracking-[0.14em] font-medium transition-all"
                            >
                              <Compass className="w-3.5 h-3.5 text-gold" />
                              <span>{item.ctaSecondaryText}</span>
                            </Link>
                          )}
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
              Hover over or click any {activeTab === "surfaces" ? "product" : "service"} to expand details & curation
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="tracking-wider uppercase text-gold font-semibold">
              6 {activeTab === "surfaces" ? "Signature Products" : "Specialized Services"}
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
