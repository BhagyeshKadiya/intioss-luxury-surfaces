"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { APPLICATION_SPACES } from "@/data/applications";
import { ChevronRight } from "lucide-react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export function ApplicationSelector() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string>(APPLICATION_SPACES[0].id);

  return (
    <section
      id="space-selector"
      className="relative w-full bg-gradient-to-b from-maroon-deep via-[#421422] to-maroon-deep text-ivory py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-gold/30 select-none"
      aria-label="Find Your Stone by Architectural Space"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gold/15 rounded-full blur-[170px]" />
        <div className="absolute bottom-0 left-10 w-[600px] h-[600px] bg-[#6B2236]/60 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#DDB62B_1px,transparent_1px)] [background-size:36px_36px] opacity-10" />
      </div>

      {/* Luxury Animated Hexagon Background */}
      <HexagonBackground
        theme="dark"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Header Block matching Unified Luxury Atelier Standard */}
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-white/5 border border-gold/40 shadow-[0_2px_12px_rgba(221,182,43,0.18)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Select by Space • Architectural Applications
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          {/* Main Heading - One-Liner */}
          <h2 className="font-marcellus text-[clamp(1.4rem,3.8vw,3.5rem)] whitespace-nowrap text-ivory font-normal tracking-wide leading-tight text-center">
            Find Your Stone by Space.
          </h2>
        </div>

        {/* ONE-FRAME INTERACTIVE EXPANDING ACCORDION (Fits in single frame, no arrows or scroll needed) */}
        <div className="relative w-full">
          {/* Desktop & Tablet Panoramic Layout (Row with Flex Expansion) */}
          <div className="hidden lg:flex w-full h-[540px] gap-3.5 items-stretch">
            {APPLICATION_SPACES.map((space, idx) => {
              const isExpanded = activeId === space.id;

              return (
                <motion.div
                  key={space.id}
                  onMouseEnter={() => setActiveId(space.id)}
                  onClick={() => router.push(`/products?application=${encodeURIComponent(space.title)}`)}
                  layout
                  transition={{
                    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 shrink-0 select-none ${
                    isExpanded
                      ? "flex-[3.6] border-gold shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(221,182,43,0.3)] ring-1 ring-gold/40"
                      : "flex-1 border-white/15 hover:border-gold/60 shadow-lg"
                  }`}
                >
                  {/* Background Space Image (Pure & Unfaded) */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className={`object-cover object-center transition-transform duration-1000 ease-out ${
                        isExpanded ? "scale-105" : "scale-100 group-hover:scale-110"
                      }`}
                      priority={idx < 3}
                    />
                  </div>

                  {/* Corner Architectural Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/40 group-hover:w-4 group-hover:h-4 group-hover:border-gold transition-all duration-300 pointer-events-none z-20" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/40 group-hover:w-4 group-hover:h-4 group-hover:border-gold transition-all duration-300 pointer-events-none z-20" />

                  {/* COLLAPSED VERTICAL SLAT (When not expanded on Desktop) */}
                  {!isExpanded && (
                    <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                      <div className="w-2 h-2 rounded-full bg-gold/70 group-hover:bg-gold transition-colors" />

                      {/* Rotated Space Title */}
                      <div className="transform -rotate-90 origin-bottom-left translate-x-10 translate-y-3 whitespace-nowrap">
                        <span className="font-marcellus text-xl xl:text-2xl tracking-wider text-ivory group-hover:text-gold transition-colors block drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                          {space.title}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-ivory group-hover:text-gold group-hover:border-gold group-hover:bg-gold/15 transition-all self-end backdrop-blur-sm">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* EXPANDED VIEW CONTENT: ONLY APPLICATION NAME + CURATED TAB */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-end"
                      >
                        {/* Application Name */}
                        <h3 className="font-marcellus text-2xl sm:text-3xl lg:text-4xl text-ivory tracking-wide drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
                          {space.title}
                        </h3>

                        {/* Curated Stones Chips */}
                        {space.recommendedStones && space.recommendedStones.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-montserrat uppercase tracking-wider text-gold mr-1 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                              Curated:
                            </span>
                            {space.recommendedStones.slice(0, 3).map((st) => (
                              <Link
                                key={st.slug}
                                href={`/products/${st.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="px-3 py-1 rounded-full bg-[#1A050B]/75 hover:bg-gold border border-gold/45 hover:border-gold text-[11px] font-jost text-ivory hover:text-maroon-deep transition-all backdrop-blur-md shadow-sm"
                              >
                                {st.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile & Small Tablet Vertical Accordion Layout */}
          <div className="flex lg:hidden flex-col gap-3 w-full">
            {APPLICATION_SPACES.map((space) => {
              const isExpanded = activeId === space.id;

              return (
                <motion.div
                  key={space.id}
                  onClick={() => {
                    if (!isExpanded) {
                      setActiveId(space.id);
                    } else {
                      router.push(`/products?application=${encodeURIComponent(space.title)}`);
                    }
                  }}
                  layout
                  transition={{
                    layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                    isExpanded
                      ? "border-gold shadow-[0_12px_32px_rgba(0,0,0,0.8)] ring-1 ring-gold/40"
                      : "border-white/10 hover:border-gold/40 bg-black/50"
                  } ${isExpanded ? "h-[380px] sm:h-[420px]" : "h-[76px] sm:h-[84px]"}`}
                >
                  {/* Background Image (Pure & Unfaded) */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="100vw"
                      className={`object-cover object-center transition-transform duration-700 ${
                        isExpanded ? "scale-105" : "scale-100"
                      }`}
                    />
                  </div>

                  {/* Collapsed Mobile Bar */}
                  {!isExpanded && (
                    <div className="absolute inset-0 p-4 sm:p-5 flex items-center justify-between z-10">
                      <h3 className="font-marcellus text-lg sm:text-xl text-ivory group-hover:text-gold transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {space.title}
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-black/40 border border-white/25 flex items-center justify-center text-gold backdrop-blur-sm">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Expanded Mobile View: ONLY Application Name + Curated Tab */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-end"
                      >
                        <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                          {space.title}
                        </h3>

                        {space.recommendedStones && space.recommendedStones.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/15 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-montserrat uppercase tracking-wider text-gold mr-1 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                              Curated:
                            </span>
                            {space.recommendedStones.slice(0, 3).map((st) => (
                              <Link
                                key={st.slug}
                                href={`/products/${st.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="px-2.5 py-1 rounded-full bg-[#1A050B]/75 hover:bg-gold border border-gold/45 text-[11px] font-jost text-ivory hover:text-maroon-deep transition-all backdrop-blur-md"
                              >
                                {st.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Minimal Guidance */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-montserrat text-ivory/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="tracking-wider uppercase">
              Hover over any space to expand its architectural curation
            </span>
          </div>

          <Link
            href="/products"
            className="text-ivory hover:text-gold transition-colors tracking-wider uppercase font-semibold underline underline-offset-4 decoration-gold/50"
          >
            Browse All Architectural Applications →
          </Link>
        </div>
      </div>
    </section>
  );
}
