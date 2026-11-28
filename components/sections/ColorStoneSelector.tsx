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
  solidColor: string;
}

export const COLOR_PALETTES: ColorPaletteItem[] = [
  {
    id: "white",
    name: "White",
    query: "White",
    solidColor: "#FFFFFF",
  },
  {
    id: "beige",
    name: "Beige",
    query: "Beige",
    solidColor: "#E5D3B8",
  },
  {
    id: "grey",
    name: "Grey",
    query: "Grey",
    solidColor: "#7E848E",
  },
  {
    id: "black",
    name: "Black",
    query: "Black",
    solidColor: "#141418",
  },
  {
    id: "gold",
    name: "Gold",
    query: "Gold",
    solidColor: "#D4AF37",
  },
  {
    id: "blue",
    name: "Blue",
    query: "Blue",
    solidColor: "#1E4FA3",
  },
  {
    id: "green",
    name: "Green",
    query: "Green",
    solidColor: "#0B6644",
  },
  {
    id: "pink",
    name: "Pink",
    query: "Pink",
    solidColor: "#D96B84",
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
              Select by Interior &amp; Architectural Usage
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark animate-pulse" />
          </div>

          {/* Main Heading - One-Liner */}
          <h2 className="font-marcellus text-[clamp(1.35rem,3.8vw,3.5rem)] whitespace-nowrap text-maroon-deep font-normal tracking-wide leading-tight text-center">
            Select Your Stone by Color
          </h2>
        </div>

        {/* ONE-FRAME BALANCED RECTANGULAR COLOR GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
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
                style={{ backgroundColor: palette.solidColor }}
                className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-gold/45 hover:border-gold transition-all duration-300 shadow-[0_6px_22px_rgba(84,27,42,0.08)] hover:shadow-[0_18px_38px_rgba(84,27,42,0.18)] hover:-translate-y-1 cursor-pointer overflow-hidden h-[220px] sm:h-[240px] lg:h-[260px]"
              >
                {/* Architectural Corner Brackets */}
                <div className="flex items-center justify-between w-full pointer-events-none">
                  <div className="w-3 h-3 border-t-2 border-l-2 border-gold/60 group-hover:w-4 group-hover:h-4 group-hover:border-gold transition-all duration-300" />
                  <div className="w-3 h-3 border-t-2 border-r-2 border-gold/60 group-hover:w-4 group-hover:h-4 group-hover:border-gold transition-all duration-300" />
                </div>

                {/* Floating Rounded Brand Magenta Box with Surrounding Space */}
                <div className="relative w-full bg-[#541B2A]/95 border border-gold/60 rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#2B0A13]/80 group-hover:bg-gold border border-gold/50 group-hover:border-gold font-montserrat text-xs sm:text-[13px] uppercase tracking-[0.16em] font-semibold text-ivory group-hover:text-[#541B2A] transition-all duration-200 shadow-xs">
                    {palette.name}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#2B0A13]/70 border border-gold/45 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-[#541B2A] transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
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
