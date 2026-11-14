"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { APPLICATION_SPACES } from "@/data/applications";
import { ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import { HexagonBackground } from "@/components/brand/HexagonBackground";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";

export function ApplicationSelector() {
  const [activeId, setActiveId] = useState<string>(APPLICATION_SPACES[0].id);

  return (
    <section
      id="space-selector"
      className="relative w-full bg-[#140409] text-ivory py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-gold/25 select-none"
      aria-label="Find Your Stone by Architectural Space"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gold/10 rounded-full blur-[170px]" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-maroon-deep/50 rounded-full blur-[160px]" />
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
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-white/5 border border-gold/40 shadow-[0_2px_12px_rgba(221,182,43,0.18)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Select by Space • Architectural Applications
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          {/* Main Heading */}
          <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide leading-tight text-center">
            Find Your Stone by Space.
          </h2>

          {/* Subtitle */}
          <p className="font-jost text-base sm:text-lg text-ivory/80 mt-2.5 max-w-xl leading-relaxed text-center">
            Monolithic surfaces engineered for high-impact architectural environments. Hover to expand each architectural application.
          </p>
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
                  onClick={() => setActiveId(space.id)}
                  layout
                  transition={{
                    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 shrink-0 select-none ${
                    isExpanded
                      ? "flex-[3.6] border-gold shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(221,182,43,0.3)] ring-1 ring-gold/40"
                      : "flex-1 border-white/10 hover:border-gold/50 shadow-lg opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Background Space Image */}
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

                    {/* Gradient Overlay for Text Legibility & Luxury Mood */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#100306] via-[#100306]/75 to-[#100306]/35 transition-opacity duration-500 ${
                        isExpanded ? "opacity-90" : "opacity-85 group-hover:opacity-70"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#18060B]/70 via-transparent to-[#100306] pointer-events-none" />
                  </div>

                  {/* Corner Architectural Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/40 group-hover:w-4 group-hover:h-4 group-hover:border-gold transition-all duration-300 pointer-events-none z-20" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/40 group-hover:w-4 group-hover:h-4 group-hover:border-gold transition-all duration-300 pointer-events-none z-20" />

                  {/* Index Badge */}
                  <div className="absolute top-4 right-4 z-20 pointer-events-none">
                    <span
                      className={`font-marcellus text-2xl transition-colors ${
                        isExpanded ? "text-gold" : "text-white/30 group-hover:text-gold/50"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* COLLAPSED VERTICAL SLAT (When not expanded on Desktop) */}
                  {!isExpanded && (
                    <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                      <div className="w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />

                      {/* Rotated Space Title */}
                      <div className="transform -rotate-90 origin-bottom-left translate-x-10 translate-y-3 whitespace-nowrap">
                        <span className="font-marcellus text-xl xl:text-2xl tracking-wider text-ivory/90 group-hover:text-gold transition-colors block">
                          {space.title}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-ivory/60 group-hover:text-gold group-hover:border-gold group-hover:bg-gold/15 transition-all self-end">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* EXPANDED VIEW CONTENT (When hovered/active) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col justify-end"
                      >
                        {/* Space Category Pill */}
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-gold/40 rounded-full font-montserrat text-[10px] uppercase tracking-[0.22em] text-gold font-semibold shadow-sm">
                            <Sparkles className="w-3 h-3 text-gold" />
                            <span>Architectural Space 0{idx + 1}</span>
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-marcellus text-2xl sm:text-3xl lg:text-4xl text-ivory tracking-wide drop-shadow-md">
                          {space.title}
                        </h3>
                        <p className="font-jost text-sm sm:text-base text-ivory/80 mt-2 max-w-md line-clamp-2 leading-relaxed">
                          {space.tagline}
                        </p>

                        {/* Recommended Stones Chips */}
                        {space.recommendedStones && space.recommendedStones.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-montserrat uppercase tracking-wider text-gold/70 mr-1 font-medium">
                              Curated:
                            </span>
                            {space.recommendedStones.slice(0, 3).map((st) => (
                              <Link
                                key={st.slug}
                                href={`/products/${st.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-gold/25 border border-white/15 hover:border-gold/50 text-[11px] font-jost text-ivory/90 hover:text-gold transition-colors"
                              >
                                {st.name}
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Action CTA Button */}
                        <div className="mt-5 pt-2">
                          <Link
                            href={`/products?application=${encodeURIComponent(space.title)}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold hover:bg-gold-light text-[#140409] font-montserrat text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-[0_4px_16px_rgba(221,182,43,0.35)] hover:scale-105"
                          >
                            <span>Explore {space.title} Stones</span>
                            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile & Small Tablet Vertical Accordion Layout */}
          <div className="flex lg:hidden flex-col gap-3 w-full">
            {APPLICATION_SPACES.map((space, idx) => {
              const isExpanded = activeId === space.id;

              return (
                <motion.div
                  key={space.id}
                  onClick={() => setActiveId(space.id)}
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
                  {/* Background Image */}
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
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#100306] via-[#100306]/80 to-[#100306]/40 transition-opacity duration-300 ${
                        isExpanded ? "opacity-90" : "opacity-85"
                      }`}
                    />
                  </div>

                  {/* Collapsed Mobile Bar */}
                  {!isExpanded && (
                    <div className="absolute inset-0 p-4 sm:p-5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-3.5">
                        <span className="font-marcellus text-lg text-gold">0{idx + 1}</span>
                        <div>
                          <h3 className="font-marcellus text-lg sm:text-xl text-ivory group-hover:text-gold transition-colors">
                            {space.title}
                          </h3>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gold">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* Expanded Mobile View */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-end"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-montserrat text-[10px] uppercase tracking-widest text-gold font-semibold">
                            Space 0{idx + 1}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        </div>
                        <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory">
                          {space.title}
                        </h3>
                        <p className="font-jost text-xs sm:text-sm text-ivory/80 mt-1 line-clamp-2">
                          {space.tagline}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                          <Link
                            href={`/products?application=${encodeURIComponent(space.title)}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-[#140409] font-montserrat text-xs uppercase tracking-wider font-semibold"
                          >
                            <span>Explore Stones</span>
                            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </Link>
                          <span className="text-[11px] font-montserrat text-ivory/60 uppercase tracking-wider">
                            Tap to browse
                          </span>
                        </div>
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
