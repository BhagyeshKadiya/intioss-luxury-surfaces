"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { APPLICATION_SPACES } from "@/data/applications";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// Cinematic Card Hover & Zoom In / Zoom Out Motion Variants
const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
  hover: {
    y: -8,
    scale: 1.015,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
};

const imageZoomMotionVariants: Variants = {
  rest: {
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
  hover: {
    scale: [1, 1.20, 1.07, 1.18],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export function ApplicationSelector() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = APPLICATION_SPACES.length;

  // Responsive items visible: mobile = 1, tablet = 2, desktop = 3
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, totalSlides - visibleCount);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Gentle auto-slide timer every 5.5s unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-20 sm:py-32 bg-maroon-deep text-ivory overflow-hidden border-y border-gold/30 select-none"
    >
      {/* Ambient Radial Luxury Glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gold/20 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-gold font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Architectural Spaces
              </span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-wide">
              Find Your Stone by Space
            </h2>
          </div>

          {/* Slider Navigation Buttons + View All link */}
          <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-end">
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-gold hover:text-white transition-colors"
            >
              <span>View All Applications</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Prev / Next Slider Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Space"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/40 hover:border-gold bg-black/30 hover:bg-gold hover:text-maroon-deep text-ivory flex items-center justify-center transition-all duration-300 shadow-md active:scale-90"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Space"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/40 hover:border-gold bg-black/30 hover:bg-gold hover:text-maroon-deep text-ivory flex items-center justify-center transition-all duration-300 shadow-md active:scale-90"
              >
                <ChevronRight className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Carousel Track */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -45) {
              handleNext();
            } else if (info.offset.x > 45) {
              handlePrev();
            }
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Animated Sliding Window */}
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: `-${currentIndex * (100 / visibleCount)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
                mass: 0.8,
              }}
              className="flex gap-5 sm:gap-6"
            >
              {APPLICATION_SPACES.map((space, index) => {
                const isActive = index >= currentIndex && index < currentIndex + visibleCount;

                return (
                  <div
                    key={space.id}
                    style={{
                      flex: `0 0 calc(${100 / visibleCount}% - ${((visibleCount - 1) * 24) / visibleCount}px)`,
                    }}
                    className="shrink-0 transition-opacity duration-500"
                  >
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      variants={cardHoverVariants}
                      className="group relative h-[390px] sm:h-[470px] lg:h-[510px] w-full block overflow-hidden border border-gold/30 bg-maroon transition-colors duration-500 hover:border-gold hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(221,182,43,0.35)] cursor-pointer"
                    >
                      {/* Entire Card Clickable Link */}
                      <Link
                        href={`/products?application=${encodeURIComponent(space.title)}`}
                        className="absolute inset-0 z-30 block"
                        aria-label={`Explore ${space.title}`}
                      />

                      {/* High-Resolution Stone Photography with Dynamic Zoom-In / Zoom-Out Motion */}
                      <motion.div
                        variants={imageZoomMotionVariants}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                      >
                        <Image
                          src={space.image}
                          alt={space.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </motion.div>

                      {/* Multi-stage Scrim Overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(20, 8, 14, 0.45) 0%, rgba(20, 8, 14, 0.1) 40%, rgba(20, 8, 14, 0.88) 100%)",
                        }}
                      />

                      {/* Diagonal Sheen Glare Reflection Animation on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/18 to-transparent transform -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                      </div>

                      {/* Top Header Badge: Index number */}
                      <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon-deep/80 backdrop-blur-md border border-gold/30 rounded-full font-montserrat text-[10px] uppercase tracking-[0.22em] text-ivory/90 group-hover:border-gold group-hover:text-gold transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>0{index + 1}</span>
                        </span>
                      </div>

                      {/* Architectural Corner Accent Brackets */}
                      <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-gold/40 group-hover:w-5 group-hover:h-5 group-hover:border-gold transition-all duration-300 pointer-events-none" />
                      <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-gold/40 group-hover:w-5 group-hover:h-5 group-hover:border-gold transition-all duration-300 pointer-events-none" />

                      {/* Bottom Space Title & Circular Interactive Button */}
                      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7 flex items-end justify-between pointer-events-none">
                        <div>
                          <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory font-normal tracking-wide group-hover:text-gold group-hover:translate-x-1.5 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                            {space.title}
                          </h3>
                        </div>

                        {/* Circular Arrow Button */}
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold/50 bg-maroon-deep/70 backdrop-blur-md flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-maroon-deep group-hover:scale-115 group-hover:shadow-[0_0_18px_rgba(221,182,43,0.6)] transition-all duration-300 shrink-0 ml-3">
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Pagination Indicators & Counter */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gold/15">
          {/* Slide Indicator Bar & Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to space ${idx + 1}`}
                className="p-1 focus:outline-none"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-gold shadow-[0_0_8px_#DDB62B]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Current Slide Counter */}
          <div className="flex items-center gap-3">
            <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-ivory/70">
              Space <span className="text-gold font-semibold">0{currentIndex + 1}</span> of{" "}
              <span className="text-ivory/90">0{totalSlides}</span>
            </span>

            {/* Mobile Swipe Hint */}
            <span className="sm:hidden text-[10px] font-montserrat uppercase tracking-wider text-ivory/50">
              · Swipe to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
