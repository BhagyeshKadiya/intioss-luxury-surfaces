"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "@/data/services";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const PRODUCT_CATEGORIES = [
  {
    title: "Natural Stones",
    slug: "Marble",
    subtitle: "Italian Marbles, Quartzites & Travertines",
    image: "/images/stones/golden-statuario.jpg",
    count: "180+ Varieties",
  },
  {
    title: "Semi-Precious Stones",
    slug: "Semi-Precious",
    subtitle: "Rare Agates, Amethyst & Petrified Wood",
    image: "/images/stones/blue-agate.jpg",
    count: "40+ Gemstones",
  },
  {
    title: "Stone Table Tops",
    slug: "Countertop",
    subtitle: "Monolithic Dining & Executive Conference Slabs",
    image: "/images/stones/petrified-wood.jpg",
    count: "Bespoke Edges",
  },
  {
    title: "Mosaics",
    slug: "Mosaics",
    subtitle: "Precision Waterjet & Gemstone Floor Medallions",
    image: "/images/stones/michael-angelo.jpg",
    count: "Custom Patterns",
  },
  {
    title: "Stone Veneers",
    slug: "Veneers",
    subtitle: "Ultra-Thin Flexible Slate & Translucent Backlit Panels",
    image: "/images/stones/tiger-eye.jpg",
    count: "1.5mm to 3mm",
  },
  {
    title: "Artefacts",
    slug: "Artefacts",
    subtitle: "Hand-Carved Stone Basins, Mandirs & Sculptures",
    image: "/images/stones/white-travertine.jpg",
    count: "Monolithic Pieces",
  },
];

export function ProductsServicesToggle() {
  const [activeTab, setActiveTab] = useState<"products" | "services">("products");
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState(0);

  return (
    <section className="relative py-24 sm:py-32 bg-ivory text-maroon overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-3">
            Core Disciplines
          </span>
          <h2 className="font-marcellus text-3xl sm:text-5xl text-maroon font-normal tracking-wide max-w-2xl">
            Sourced from the Earth. Refined for Architecture.
          </h2>

          {/* Segmented Control with Sliding Gold Indicator */}
          <div className="mt-10 inline-flex items-center p-1 bg-maroon-deep/5 rounded-none border border-gold/40 relative">
            <button
              onClick={() => setActiveTab("products")}
              className={`relative z-10 px-8 py-3 text-xs sm:text-sm font-montserrat uppercase tracking-[0.2em] font-medium transition-colors ${
                activeTab === "products" ? "text-maroon font-semibold" : "text-grey hover:text-maroon"
              }`}
            >
              Products
              {activeTab === "products" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  className="absolute inset-0 bg-white border border-gold shadow-sm -z-10"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`relative z-10 px-8 py-3 text-xs sm:text-sm font-montserrat uppercase tracking-[0.2em] font-medium transition-colors ${
                activeTab === "services" ? "text-maroon font-semibold" : "text-grey hover:text-maroon"
              }`}
            >
              Services
              {activeTab === "services" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  className="absolute inset-0 bg-white border border-gold shadow-sm -z-10"
                />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "products" ? (
            <motion.div
              key="products-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Products 6-Category Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCT_CATEGORIES.map((cat, idx) => (
                  <Link
                    key={cat.title}
                    href={`/products?category=${encodeURIComponent(cat.slug)}`}
                    className="group relative block overflow-hidden bg-white border border-gold/25 transition-all duration-500 hover:border-gold shadow-sm hover:shadow-xl"
                  >
                    {/* Image with slow 1.04 zoom on hover */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      {/* Gentle scrim on hover */}
                      <div className="absolute inset-0 bg-maroon-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Pill Tag */}
                      <div className="absolute top-4 left-4 bg-maroon-deep/90 text-ivory text-[10px] font-montserrat uppercase tracking-widest px-2.5 py-1 border border-gold/40">
                        {cat.count}
                      </div>

                      {/* Arrow Icon */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-none bg-white text-maroon flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2 shadow">
                        <ArrowUpRight className="w-4 h-4 text-maroon" />
                      </div>
                    </div>

                    {/* Card Content with gold hairline reveal */}
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <h3 className="font-marcellus text-xl text-maroon group-hover:text-maroon-deep transition-colors">
                        {cat.title}
                      </h3>
                      <p className="font-poppins text-xs text-grey mt-1">
                        {cat.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Discreet View All Link */}
              <div className="text-center mt-12">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-maroon hover:text-gold transition-colors font-medium border-b border-gold/40 pb-1"
                >
                  <span>Explore Complete Catalog (280+ Varieties)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="services-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left: Interactive Services List (7 Cols) */}
              <div className="lg:col-span-7 divide-y divide-gold/20 border-y border-gold/20">
                {SERVICES.map((srv, idx) => {
                  const isHovered = hoveredServiceIndex === idx;
                  return (
                    <div
                      key={srv.id}
                      onMouseEnter={() => setHoveredServiceIndex(idx)}
                      className={`group py-6 px-4 transition-all duration-300 cursor-pointer ${
                        isHovered ? "bg-white shadow-sm border-l-2 border-gold" : "hover:bg-white/50"
                      }`}
                    >
                      <Link href={`/services#${srv.slug}`} className="block">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="font-raleway text-[11px] uppercase tracking-widest text-gold font-medium">
                              0{idx + 1}
                            </span>
                            <h3 className="font-marcellus text-xl sm:text-2xl text-maroon group-hover:text-maroon-deep transition-colors mt-0.5">
                              {srv.title}
                            </h3>
                            <p className="font-poppins text-xs text-grey mt-2 line-clamp-2 leading-relaxed">
                              {srv.shortDesc}
                            </p>
                          </div>
                          <div
                            className={`p-2 transition-transform duration-300 ${
                              isHovered ? "text-gold translate-x-1" : "text-grey/40"
                            }`}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Right: Large Image Preview Swapping on Hover (5 Cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/40 shadow-xl bg-maroon-deep">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredServiceIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={SERVICES[hoveredServiceIndex].image}
                        alt={SERVICES[hoveredServiceIndex].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-transparent to-transparent" />

                      <div className="absolute bottom-6 left-6 right-6 text-ivory">
                        <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold block mb-1">
                          Service Focus
                        </span>
                        <h4 className="font-marcellus text-lg text-ivory">
                          {SERVICES[hoveredServiceIndex].title}
                        </h4>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Discreet View All Link */}
              <div className="lg:col-span-12 text-center mt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.2em] text-maroon hover:text-gold transition-colors font-medium border-b border-gold/40 pb-1"
                >
                  <span>View All 6 Turnkey Architectural Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
