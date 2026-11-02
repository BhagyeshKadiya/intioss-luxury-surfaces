"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { getWhatsAppUrl } from "@/lib/config";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

const SERVICE_HIGHLIGHTS: Record<string, string> = {
  "luxury-civil-contracting": "Acoustic Decoupling & Subfloor Precision",
  "marble-block-processing": "Vacuum-Epoxy Resin Curing Lines",
  "stone-facades": "Seismic Wind Load Certification",
  "cnc-waterjet-cutting": "Sub-Millimeter Inlay Tolerances",
  "stone-care-restoration": "Diamond Crystallization & Molecular Sealing",
  "stone-flooring-installation": "Planar Calibration & Anti-Fracture Screeds",
};

export function ServicesShowcaseCarousel() {
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

  const totalItems = SERVICES.length;
  const maxIndex = Math.max(0, totalItems - itemsVisible);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Auto-advance every 6s when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
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

  return (
    <section className="mb-20 sm:mb-28">
      {/* Carousel Header Bar & Modern Liquid Dial Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-1">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Architectural Disciplines Carousel
            </span>
          </div>
          <h2 className="font-marcellus text-2xl sm:text-4xl text-maroon">
            End-to-End Stone Capabilities
          </h2>
          <p className="font-jost text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            From raw quarry block gang-sawing to precision dry-lay installation and ventilated facade engineering.
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
              aria-label="Previous service"
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-gold/40 hover:border-gold hover:bg-gold/15 text-maroon shadow-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-maroon" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next service"
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-gold/40 hover:border-gold hover:bg-gold/15 text-maroon shadow-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-maroon" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track: Modern Architectural Tall Cards with Mouse Hover & Wheel Scrolling */}
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
        <div
          className="flex transition-transform duration-500 ease-out -mx-3"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
          }}
        >
          {SERVICES.map((service, idx) => {
            const highlight =
              SERVICE_HIGHLIGHTS[service.slug] ||
              service.capabilities?.[0] ||
              "In-House Architectural Execution";

            return (
              <motion.div
                key={service.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsVisible}%` }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Modern Architectural Full-Bleed Tall Poster Card */}
                <div className="group relative block h-[480px] sm:h-[530px] rounded-3xl overflow-hidden border border-gold/30 hover:border-gold shadow-lg hover:shadow-2xl transition-all duration-500 bg-maroon-deep select-none">
                  {/* Full-Bleed Architectural Photography */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Dynamic Dark Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 group-hover:from-black/98 group-hover:via-black/50 transition-colors duration-500 pointer-events-none" />

                  {/* Top Floating Glass Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-[10px] font-montserrat uppercase tracking-wider font-semibold shadow-sm">
                      <IntiossHexagon size={12} useVector={true} />
                      <span>Discipline 0{idx + 1}</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[9px] font-montserrat uppercase tracking-wider font-medium bg-gold text-maroon-deep font-bold shadow-sm">
                      Active
                    </span>
                  </div>

                  {/* Bottom Typographic Card Body */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 flex flex-col justify-end text-ivory">
                    {/* Micro-Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-montserrat uppercase tracking-widest text-gold font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                        In-House & Group Capabilities
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-marcellus text-2xl sm:text-3xl text-white group-hover:text-gold transition-colors duration-300 leading-snug">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="font-jost text-xs sm:text-sm text-white/75 mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Highlight Chip */}
                    <div className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-montserrat text-gold-dark font-medium">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      <span>{highlight}</span>
                    </div>

                    {/* Action Strip: Protocol Link + WhatsApp Inquiry */}
                    <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                      <Link
                        href={`#${service.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest font-semibold text-gold group-hover:text-white transition-colors"
                      >
                        <span>View Protocol</span>
                        <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1.5 transition-transform" />
                      </Link>

                      <a
                        href={getWhatsAppUrl(`Hello INTIOSS, I would like to inquire regarding ${service.title}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-montserrat uppercase tracking-wider text-white/70 hover:text-gold transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-gold" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
