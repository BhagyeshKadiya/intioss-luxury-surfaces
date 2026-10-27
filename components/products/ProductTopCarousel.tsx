"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  Layers,
  Eye,
  Check,
} from "lucide-react";
import { StoneProduct } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";

interface SlideMetadata {
  src: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  badge: string;
  isSlab: boolean;
}

interface ProductTopCarouselProps {
  product: StoneProduct;
}

export function ProductTopCarousel({ product }: ProductTopCarouselProps) {
  // Build structured slides with accurate, handcrafted labels
  const slides: SlideMetadata[] = React.useMemo(() => {
    const list: SlideMetadata[] = [];
    const addedSrcs = new Set<string>();

    const resolveSlide = (src: string): SlideMetadata => {
      const lower = src.toLowerCase();
      if (lower.includes("slab")) {
        return {
          src,
          title: "Monolithic Slab",
          shortTitle: "Full Slab",
          subtitle: product.specs.dimensions || "119\" × 77\" (302 × 195 cm) · 20mm",
          badge: "Quarry Slab",
          isSlab: true,
        };
      }
      if (lower.includes("kitchen")) {
        return {
          src,
          title: "Chef's Kitchen Island",
          shortTitle: "Kitchen Island",
          subtitle: "Waterfall Island, Backsplash & Countertop",
          badge: "Kitchen Application",
          isSlab: false,
        };
      }
      if (lower.includes("bath") || lower.includes("vanity")) {
        return {
          src,
          title: "Master Spa Bathroom",
          shortTitle: "Spa Bathroom",
          subtitle: "Floating Vanity with Warm Brass Accents",
          badge: "Bathroom Application",
          isSlab: false,
        };
      }
      if (lower.includes("table") || lower.includes("dining")) {
        return {
          src,
          title: "Bespoke Dining Table",
          shortTitle: "Dining Table",
          subtitle: "Monolithic Chamfered Stone Table Top",
          badge: "Table Top Application",
          isSlab: false,
        };
      }
      if (lower.includes("feature-wall") || lower.includes("living") || lower.includes("cladding")) {
        return {
          src,
          title: "Living Room Feature Wall",
          shortTitle: "Feature Wall",
          subtitle: "Full-Height Architectural Interior Cladding",
          badge: "Wall Cladding Application",
          isSlab: false,
        };
      }
      return {
        src,
        title: "Architectural Installation",
        shortTitle: "Living Space",
        subtitle: product.name,
        badge: "Interior Space",
        isSlab: false,
      };
    };

    // 1. Primary Image first
    if (product.primaryImage) {
      list.push(resolveSlide(product.primaryImage));
      addedSrcs.add(product.primaryImage);
    }

    // 2. Gallery Images
    if (product.galleryImages && Array.isArray(product.galleryImages)) {
      product.galleryImages.forEach((img) => {
        if (img && !addedSrcs.has(img)) {
          list.push(resolveSlide(img));
          addedSrcs.add(img);
        }
      });
    }

    // 3. Close up
    if (product.veinCloseUpImage && !addedSrcs.has(product.veinCloseUpImage)) {
      list.push(resolveSlide(product.veinCloseUpImage));
      addedSrcs.add(product.veinCloseUpImage);
    }

    return list.length > 0
      ? list
      : [
          {
            src: "/images/stones/golden-statuario.jpg",
            title: "Natural Stone Slab",
            shortTitle: "Full Slab",
            subtitle: "Curated Collection",
            badge: "Natural Stone",
            isSlab: true,
          },
        ];
  }, [product]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fitMode, setFitMode] = useState<"contain" | "cover">("cover");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide, isLightboxOpen]);

  const currentSlide = slides[currentIndex] || slides[0];

  // Slabs always look majestic in contain; for lifestyle scenes, user can toggle or it auto-adapts
  const effectiveFit = currentSlide.isSlab ? "contain" : fitMode;

  return (
    <div className="w-full mb-12 sm:mb-16 select-none">
      {/* 
        ============================================================
        STAGE HERO PRESENTATION (Architectural Gallery Format)
        ============================================================
      */}
      <div className="relative w-full h-[420px] sm:h-[540px] md:h-[620px] lg:h-[680px] bg-[#0E070B] border border-gold/40 shadow-2xl overflow-hidden rounded-sm group">
        
        {/* Dynamic Ambient Blur Glow (Takes stone color palette and illuminates background) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            key={`blur-${currentSlide.src}`}
            src={currentSlide.src}
            alt="Ambient Glow"
            fill
            sizes="100vw"
            className="object-cover blur-3xl opacity-35 scale-125 transition-opacity duration-700"
            priority
          />
          {/* Subtle vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E070B]/90 via-[#0E070B]/30 to-[#0E070B]/70" />
        </div>

        {/* Foreground Active Slide Image */}
        <div
          className={`relative w-full h-full flex items-center justify-center transition-all duration-500 cursor-zoom-in ${
            effectiveFit === "contain"
              ? "p-4 sm:p-8 md:p-12"
              : "p-0"
          }`}
          onClick={() => setIsLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentSlide.src}
                alt={`${product.name} - ${currentSlide.title}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1300px"
                className={`transition-all duration-300 ${
                  effectiveFit === "contain"
                    ? "object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                    : "object-cover"
                }`}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 
          ============================================================
          FLOATING HEADER BADGES & METADATA
          ============================================================
        */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-20 flex items-start justify-between gap-4 pointer-events-none">
          {/* Left: Space Title & Subtitle Badge */}
          <div className="bg-maroon-deep/90 text-ivory px-4 py-2.5 border border-gold/50 backdrop-blur-md shadow-xl max-w-[75%] sm:max-w-md pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-raleway uppercase tracking-[0.25em] text-gold font-semibold">
                {currentSlide.badge}
              </span>
            </div>
            <h2 className="font-marcellus text-base sm:text-xl text-white tracking-wide mt-0.5">
              {currentSlide.title}
            </h2>
            <p className="font-poppins text-[11px] sm:text-xs text-stone-300 tracking-normal mt-0.5 truncate">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Right: Controls & View Counter */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* View Mode Switcher (Contain vs Cover for life spaces) */}
            {!currentSlide.isSlab && (
              <button
                type="button"
                onClick={() => setFitMode(fitMode === "contain" ? "cover" : "contain")}
                title={fitMode === "contain" ? "Switch to Fill Frame" : "Switch to Fit Perspective"}
                className="hidden sm:inline-flex items-center gap-1.5 bg-black/60 hover:bg-black/90 text-white hover:text-gold border border-white/20 hover:border-gold px-3 py-1.5 text-[10px] font-montserrat uppercase tracking-wider backdrop-blur-md transition-all shadow-md active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-gold" />
                <span>{fitMode === "contain" ? "Fill View" : "Fit Frame"}</span>
              </button>
            )}

            {/* Lightbox Trigger */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label="View Fullscreen High-Resolution"
              title="View Fullscreen"
              className="p-2 sm:px-3 sm:py-1.5 bg-black/60 hover:bg-gold text-white hover:text-maroon border border-white/20 hover:border-gold text-[10px] font-montserrat uppercase tracking-wider backdrop-blur-md transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Zoom</span>
            </button>

            {/* Slide Index Pill */}
            <div className="bg-black/70 text-gold border border-gold/40 px-3 py-1.5 text-xs font-mono backdrop-blur-md shadow-md">
              <span className="font-bold text-white">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="text-white/40 mx-1">/</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {/* 
          ============================================================
          CAROUSEL DIRECTIONAL ARROWS
          ============================================================
        */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous Perspective"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/55 hover:bg-maroon-deep text-white hover:text-gold border border-gold/40 hover:border-gold flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md active:scale-90"
            >
              <ChevronLeft className="w-6 h-6 stroke-[1.75]" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next Perspective"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/55 hover:bg-maroon-deep text-white hover:text-gold border border-gold/40 hover:border-gold flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md active:scale-90"
            >
              <ChevronRight className="w-6 h-6 stroke-[1.75]" />
            </button>
          </>
        )}

        {/* Subtle Bottom Instruction */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-white/70 bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            Click image or Zoom for high-resolution inspection
          </span>
        </div>
      </div>

      {/* 
        ============================================================
        ARCHITECTURAL THUMBNAIL NAVIGATOR BAR
        ============================================================
      */}
      {slides.length > 1 && (
        <div className="mt-4 sm:mt-5">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-gold/30">
            {slides.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={`${slide.src}-${idx}`}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`group relative flex-none text-left transition-all duration-300 focus:outline-none ${
                    isActive ? "scale-[1.02]" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Thumbnail Image Box */}
                  <div
                    className={`relative w-28 sm:w-36 h-18 sm:h-22 overflow-hidden border bg-stone-900 transition-all ${
                      isActive
                        ? "border-gold shadow-[0_0_15px_rgba(221,182,43,0.45)] ring-2 ring-gold"
                        : "border-stone-300 hover:border-gold/60"
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      sizes="144px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Active Checkmark Pill */}
                    {isActive && (
                      <div className="absolute top-1 right-1 bg-gold text-maroon w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Micro Number */}
                    <span className="absolute top-1 left-1.5 text-[9px] font-mono text-white/90 bg-black/70 px-1 rounded-none border border-white/20">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Clean Label Below Thumbnail */}
                  <div className="mt-1.5 w-28 sm:w-36 text-center">
                    <span
                      className={`block text-[11px] font-montserrat uppercase tracking-wider font-semibold transition-colors truncate ${
                        isActive ? "text-maroon font-bold" : "text-stone-600 group-hover:text-maroon"
                      }`}
                    >
                      {slide.shortTitle}
                    </span>
                    <span className="block text-[9px] font-poppins text-stone-500 uppercase tracking-wide truncate">
                      {slide.badge.replace(" Application", "")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 
        ============================================================
        HIGH-RESOLUTION FULLSCREEN LIGHTBOX MODAL
        ============================================================
      */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
          >
            {/* Lightbox Topbar */}
            <div className="relative z-20 flex items-center justify-between border-b border-gold/30 pb-4">
              <div>
                <span className="text-[10px] font-raleway uppercase tracking-[0.25em] text-gold block">
                  {product.name} · {currentSlide.badge}
                </span>
                <h3 className="font-marcellus text-lg sm:text-2xl text-white">
                  {currentSlide.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gold px-3 py-1 bg-maroon-deep/80 border border-gold/40">
                  {currentIndex + 1} / {slides.length}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close Lightbox"
                  className="p-2.5 bg-white/10 hover:bg-gold hover:text-maroon text-white rounded-full transition-colors active:scale-95 border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Centered Stage */}
            <div className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-6 overflow-hidden">
              <div className="relative w-full h-full max-h-[85vh]">
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  fill
                  sizes="100vw"
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                  priority
                />
              </div>

              {/* Prev / Next controls in Lightbox */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous"
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-gold text-white hover:text-maroon border border-white/30 flex items-center justify-center transition-all shadow-2xl"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next"
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-gold text-white hover:text-maroon border border-white/30 flex items-center justify-center transition-all shadow-2xl"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Bottom Info */}
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gold/20 text-center sm:text-left">
              <span className="text-xs font-montserrat text-stone-300">
                {currentSlide.subtitle}
              </span>
              <span className="text-[11px] font-mono text-stone-500">
                Press [ESC] to exit fullscreen · Use [←] [→] arrow keys
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
