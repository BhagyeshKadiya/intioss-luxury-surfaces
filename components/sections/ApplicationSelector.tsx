"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { APPLICATION_SPACES } from "@/data/applications";
import { ArrowRight, ChevronRight } from "lucide-react";

export function ApplicationSelector() {
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(APPLICATION_SPACES[0].id);

  return (
    <section className="relative py-24 sm:py-32 bg-maroon-deep text-ivory overflow-hidden border-y border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-gold mb-3 block">
              Application Curation
            </span>
            <h2 className="font-marcellus text-3xl sm:text-5xl text-ivory tracking-wide">
              Find your stone by space.
            </h2>
          </div>
          <p className="font-poppins text-xs sm:text-sm text-ivory/70 max-w-md">
            Every room demands a distinct geological chemistry—from high-density non-etching
            quartzites for modern chef kitchens to translucent bookmatched marble for double-height salons.
          </p>
        </div>
      </div>

      {/* Horizontal Accordion / Drag Row of Tall Portrait Tiles */}
      <div className="w-full overflow-x-auto pb-8 pt-4 px-4 sm:px-6 lg:px-8 scrollbar-none">
        <div className="flex gap-4 min-w-max h-[480px] sm:h-[560px]">
          {APPLICATION_SPACES.map((space) => {
            const isHovered = hoveredTileId === space.id;
            return (
              <motion.div
                key={space.id}
                onMouseEnter={() => setHoveredTileId(space.id)}
                className={`relative overflow-hidden rounded-none border border-gold/30 cursor-pointer transition-all duration-700 ease-out select-none ${
                  isHovered ? "w-[300px] sm:w-[380px]" : "w-[120px] sm:w-[150px]"
                }`}
              >
                {/* Full-Bleed Image Background */}
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover transition-transform duration-700 ease-out"
                />

                {/* Scrim Gradient */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isHovered
                      ? "bg-gradient-to-t from-maroon-deep via-maroon-deep/60 to-transparent opacity-95"
                      : "bg-maroon-deep/70 opacity-80"
                  }`}
                />

                {/* Unhovered Vertical / Condensed State */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 ${
                    isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <h3 className="font-marcellus text-lg sm:text-xl text-ivory writing-mode-vertical-rl rotate-180 tracking-widest whitespace-nowrap">
                    {space.title}
                  </h3>
                </div>

                {/* Hovered Expanded State */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold mb-1">
                    Architectural Space
                  </span>
                  <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory mb-2">
                    {space.title}
                  </h3>
                  <p className="font-poppins text-xs text-ivory/80 leading-relaxed mb-6">
                    {space.tagline}
                  </p>

                  {/* 3 Recommended Stones with Direct Links */}
                  <div className="space-y-2 mb-6">
                    <span className="font-montserrat text-[10px] uppercase tracking-wider text-gold/90 block">
                      Recommended Slabs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {space.recommendedStones.map((stone) => (
                        <Link
                          key={stone.slug}
                          href={`/products/${stone.slug}`}
                          className="bg-black/40 hover:bg-gold hover:text-maroon text-ivory text-[11px] font-montserrat px-2.5 py-1 border border-gold/30 transition-colors"
                        >
                          {stone.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Explore Link passing pre-applied application filter */}
                  <Link
                    href={`/products?application=${encodeURIComponent(space.title)}`}
                    className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-gold hover:text-white transition-colors group"
                  >
                    <span>Explore {space.title} Stones</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
