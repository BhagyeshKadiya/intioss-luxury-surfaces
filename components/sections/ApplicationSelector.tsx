"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { APPLICATION_SPACES } from "@/data/applications";
import { ArrowUpRight } from "lucide-react";

// Architectural Bento Grid layout metadata for 7 spaces (12-column layout on desktop)
const BENTO_LAYOUTS = [
  // 01: Flooring (Expansive feature living card - 8 cols)
  {
    colSpan: "lg:col-span-8",
    height: "h-80 sm:h-[420px] lg:h-[460px]",
    badge: "01",
  },
  // 02: Bathroom (Master Ensuite / Spa - 4 cols)
  {
    colSpan: "lg:col-span-4",
    height: "h-80 sm:h-[420px] lg:h-[460px]",
    badge: "02",
  },
  // 03: Kitchen Countertop (4 cols)
  {
    colSpan: "lg:col-span-4",
    height: "h-72 sm:h-[360px] lg:h-[400px]",
    badge: "03",
  },
  // 04: Table Top (4 cols)
  {
    colSpan: "lg:col-span-4",
    height: "h-72 sm:h-[360px] lg:h-[400px]",
    badge: "04",
  },
  // 05: Wall Cladding — Interior (4 cols)
  {
    colSpan: "lg:col-span-4",
    height: "h-72 sm:h-[360px] lg:h-[400px]",
    badge: "05",
  },
  // 06: Wall Cladding — Exterior (6 cols)
  {
    colSpan: "lg:col-span-6",
    height: "h-72 sm:h-[360px] lg:h-[400px]",
    badge: "06",
  },
  // 07: Exterior Flooring (6 cols)
  {
    colSpan: "lg:col-span-6",
    height: "h-72 sm:h-[360px] lg:h-[400px]",
    badge: "07",
  },
];

export function ApplicationSelector() {
  return (
    <section className="relative py-20 sm:py-32 bg-maroon-deep text-ivory overflow-hidden border-y border-gold/30">
      {/* Ambient Radial Luxury Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gold/20 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-gold font-semibold">
                Architectural Spaces & Form
              </span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-wide">
              Find Your Stone by Space
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/40 bg-black/20 hover:bg-gold hover:text-maroon-deep text-xs font-montserrat uppercase tracking-[0.2em] text-gold transition-all duration-300 shadow-sm active:scale-95 shrink-0 self-start sm:self-end"
          >
            <span>View All Applications</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 7 Spaces Architectural Bento Grid with Staggered Motion */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-7">
          {APPLICATION_SPACES.map((space, index) => {
            const layout = BENTO_LAYOUTS[index] || {
              colSpan: "lg:col-span-4",
              height: "h-72 sm:h-96",
              badge: `0${index + 1}`,
            };

            return (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${layout.colSpan}`}
              >
                <Link
                  href={`/products?application=${encodeURIComponent(space.title)}`}
                  className={`group relative ${layout.height} w-full block overflow-hidden border border-gold/30 bg-maroon transition-all duration-500 hover:border-gold hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] active:scale-[0.985]`}
                >
                  {/* Photograph with Luxury Smooth Scale */}
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Multi-stage Luxury Scrim (Clear center, rich bottom shadow for title contrast) */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(20, 8, 14, 0.45) 0%, rgba(20, 8, 14, 0.1) 40%, rgba(20, 8, 14, 0.88) 100%)",
                    }}
                  />

                  {/* Diagonal Light Sheen Glare Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                  </div>

                  {/* Top Header: Badge + Space Index */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon-deep/80 backdrop-blur-md border border-gold/30 rounded-full font-montserrat text-[10px] uppercase tracking-[0.22em] text-ivory/90 group-hover:border-gold group-hover:text-gold transition-colors">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      <span>{layout.badge}</span>
                    </span>
                  </div>

                  {/* Architectural Corner Accent Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/40 group-hover:w-5 group-hover:h-5 group-hover:border-gold transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/40 group-hover:w-5 group-hover:h-5 group-hover:border-gold transition-all duration-300 pointer-events-none" />

                  {/* Bottom Strip: Space Title & Circular Arrow Button */}
                  <div className="relative z-20 h-full p-5 sm:p-7 flex items-end justify-between">
                    <div>
                      <h3 className="font-marcellus text-xl sm:text-3xl text-ivory font-normal tracking-wide group-hover:text-gold transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                        {space.title}
                      </h3>
                    </div>

                    {/* Circular Interactive Arrow Button */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold/50 bg-maroon-deep/70 backdrop-blur-md flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-maroon-deep group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(221,182,43,0.5)] transition-all duration-300 shrink-0 ml-3">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
