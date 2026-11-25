"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { HexagonBackground } from "@/components/brand/HexagonBackground";

export interface ColorPaletteItem {
  id: string;
  name: string;
  query: string;
  descriptor: string;
  swatchGradient: string;
  swatchBorder: string;
  glowColor: string;
  accentRing: string;
}

export const COLOR_PALETTES: ColorPaletteItem[] = [
  {
    id: "white",
    name: "White",
    query: "White",
    descriptor: "Crystalline & Calcite",
    swatchGradient: "from-[#FFFFFF] via-[#F8F9FA] to-[#E2E8F0]",
    swatchBorder: "border-white/90 ring-white/40",
    glowColor: "rgba(255, 255, 255, 0.45)",
    accentRing: "group-hover:border-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]",
  },
  {
    id: "beige",
    name: "Beige",
    query: "Beige",
    descriptor: "Travertine & Warm Crema",
    swatchGradient: "from-[#FDFBF7] via-[#EADBCE] to-[#CBB499]",
    swatchBorder: "border-[#EADBCE] ring-[#D4BA9E]/40",
    glowColor: "rgba(224, 195, 163, 0.45)",
    accentRing: "group-hover:border-[#EADBCE] group-hover:shadow-[0_0_30px_rgba(224,195,163,0.4)]",
  },
  {
    id: "grey",
    name: "Grey",
    query: "Grey",
    descriptor: "Silver & Charcoal Mist",
    swatchGradient: "from-[#9CA3AF] via-[#6B7280] to-[#374151]",
    swatchBorder: "border-[#9CA3AF] ring-[#9CA3AF]/40",
    glowColor: "rgba(156, 163, 175, 0.45)",
    accentRing: "group-hover:border-[#9CA3AF] group-hover:shadow-[0_0_30px_rgba(156,163,175,0.4)]",
  },
  {
    id: "black",
    name: "Black",
    query: "Black",
    descriptor: "Cosmic Obsidian & Noir",
    swatchGradient: "from-[#374151] via-[#1F2937] to-[#0A0A0D]",
    swatchBorder: "border-[#4B5563] ring-[#374151]/50",
    glowColor: "rgba(55, 65, 81, 0.55)",
    accentRing: "group-hover:border-[#6B7280] group-hover:shadow-[0_0_30px_rgba(75,85,99,0.5)]",
  },
  {
    id: "gold",
    name: "Gold",
    query: "Gold",
    descriptor: "Amber Honey & Vegas Gold",
    swatchGradient: "from-[#FDE047] via-[#DDB62B] to-[#92400E]",
    swatchBorder: "border-[#DDB62B] ring-[#DDB62B]/50",
    glowColor: "rgba(221, 182, 43, 0.55)",
    accentRing: "group-hover:border-gold group-hover:shadow-[0_0_30px_rgba(221,182,43,0.5)]",
  },
  {
    id: "blue",
    name: "Blue",
    query: "Blue",
    descriptor: "Celestial Azure & Lapis",
    swatchGradient: "from-[#60A5FA] via-[#2563EB] to-[#1E3A8A]",
    swatchBorder: "border-[#3B82F6] ring-[#2563EB]/40",
    glowColor: "rgba(37, 99, 235, 0.5)",
    accentRing: "group-hover:border-[#3B82F6] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.45)]",
  },
  {
    id: "green",
    name: "Green",
    query: "Green",
    descriptor: "Emerald & Serpentine Onyx",
    swatchGradient: "from-[#34D399] via-[#059669] to-[#064E3B]",
    swatchBorder: "border-[#10B981] ring-[#059669]/40",
    glowColor: "rgba(5, 150, 105, 0.5)",
    accentRing: "group-hover:border-[#10B981] group-hover:shadow-[0_0_30px_rgba(5,150,105,0.45)]",
  },
  {
    id: "pink",
    name: "Pink",
    query: "Pink",
    descriptor: "Blush Rose & Michael Angelo",
    swatchGradient: "from-[#FDA4AF] via-[#E11D48] to-[#9F1239]",
    swatchBorder: "border-[#F43F5E] ring-[#E11D48]/40",
    glowColor: "rgba(225, 29, 72, 0.5)",
    accentRing: "group-hover:border-[#F43F5E] group-hover:shadow-[0_0_30px_rgba(225,29,72,0.45)]",
  },
];

export function ColorStoneSelector() {
  return (
    <section
      id="color-selector"
      className="relative w-full bg-[#FAF7F2] text-maroon-deep py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-gold/30"
      aria-label="Select Stones Color Wise"
    >
      {/* Luxury Animated Hexagon Background in Light Theme */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
      />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gold/15 rounded-full blur-[170px]" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-maroon-deep/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-maroon-deep/5 border border-gold/40 shadow-xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-maroon-deep font-semibold">
              Select Color Wise • Chromatic Stone Palette
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
          </div>

          {/* Main Heading - One-Liner */}
          <h2 className="font-marcellus text-[clamp(1.35rem,3.8vw,3.5rem)] whitespace-nowrap text-maroon-deep font-normal tracking-wide leading-tight text-center">
            Curate by Earth&apos;s Spectrum.
          </h2>

          {/* Subtitle */}
          <p className="font-jost text-base sm:text-lg text-stone-600 mt-2.5 max-w-xl leading-relaxed text-center">
            Select any natural shade to explore matching marbles, quartzites, and semi-precious slabs.
          </p>
        </div>

        {/* ONE-FRAME BALANCED COLOR GRID (Fits in single screen frame, no scroll) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {COLOR_PALETTES.map((palette, idx) => (
            <motion.div
              key={palette.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/products?color=${palette.query}`}
                aria-label={`Explore all ${palette.name} stones and marbles`}
                className="group relative flex flex-col items-center justify-between p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white/95 hover:bg-white border border-gold/30 hover:border-gold transition-all duration-300 shadow-[0_4px_20px_rgba(84,27,42,0.06)] hover:shadow-[0_16px_36px_rgba(84,27,42,0.14)] cursor-pointer overflow-hidden text-center h-[240px] sm:h-[260px] lg:h-[280px]"
              >
                {/* Radial Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${palette.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Top Subtle Action Indicator */}
                <div className="relative z-10 w-full flex items-center justify-end">
                  <div className="w-6 h-6 rounded-full bg-maroon-deep/5 border border-gold/30 flex items-center justify-center text-maroon-deep group-hover:text-gold group-hover:border-maroon-deep group-hover:bg-maroon-deep transition-all shadow-xs">
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* BIG COLOR SYMBOL / GEMSTONE DISC */}
                <div className="relative z-10 my-auto">
                  {/* Outer Pulsing Glow Ring */}
                  <div
                    className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
                    style={{ backgroundColor: palette.glowColor }}
                  />

                  {/* Big Stone Disc */}
                  <div
                    className={`relative w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${palette.swatchGradient} border-2 border-gold/40 shadow-[0_6px_22px_rgba(84,27,42,0.18)] group-hover:scale-110 group-hover:border-gold transition-all duration-300 flex items-center justify-center`}
                  >
                    {/* Interior Concentric Luxury Ring */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full border border-black/15 pointer-events-none" />

                    {/* Prismatic Shimmer Accent */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Bottom Color Typography & Descriptor */}
                <div className="relative z-10 w-full space-y-1">
                  <h3 className="font-marcellus text-xl sm:text-2xl text-maroon-deep group-hover:text-gold-dark transition-colors tracking-wide">
                    {palette.name}
                  </h3>
                  <p className="font-jost text-xs sm:text-[13px] text-stone-600 group-hover:text-maroon-deep transition-colors line-clamp-1">
                    {palette.descriptor}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Minimal Guidance */}
        <div className="mt-8 pt-5 border-t border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-montserrat text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-dark" />
            <span className="tracking-wider uppercase">
              Click any color palette to view all matching slabs in catalog
            </span>
          </div>

          <Link
            href="/products"
            className="text-maroon-deep hover:text-gold-dark transition-colors tracking-wider uppercase font-semibold underline underline-offset-4 decoration-gold/50"
          >
            Browse All Stone Collections →
          </Link>
        </div>
      </div>
    </section>
  );
}
