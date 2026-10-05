"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { getProductWhatsAppUrl } from "@/lib/config";
import { MessageSquare, RefreshCw, Sparkles, Layers, Sliders } from "lucide-react";
import { motion } from "motion/react";

const BOOKMATCH_STONES = PRODUCTS.filter(
  (p) => p.veining === "Bookmatch-ready" || p.category === "Marble" || p.category === "Quartzite"
);

function BookMatchContent() {
  const searchParams = useSearchParams();
  const stoneSlug = searchParams.get("stone");
  
  // Find the stone in bookmatch stones or in all products
  const initialStone = BOOKMATCH_STONES.find((s) => s.slug === stoneSlug) 
    || PRODUCTS.find((s) => s.slug === stoneSlug)
    || BOOKMATCH_STONES[0];

  const [selectedStone, setSelectedStone] = React.useState(initialStone);

  // Sync state when URL parameter changes during client-side navigation
  React.useEffect(() => {
    if (stoneSlug) {
      const stoneFromUrl = BOOKMATCH_STONES.find((s) => s.slug === stoneSlug) || PRODUCTS.find((s) => s.slug === stoneSlug);
      if (stoneFromUrl && stoneFromUrl.id !== selectedStone.id) {
        setSelectedStone(stoneFromUrl);
      }
    }
  }, [stoneSlug]);
  const [matchMode, setMatchMode] = useState<"2-way-horizontal" | "2-way-vertical" | "4-way-quadrant">(
    "4-way-quadrant"
  );
  const [splitSlider, setSplitSlider] = useState(50); // percentage slider

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-3 block">
            Digital Dry-Lay Studio
          </span>
          <h1 className="font-marcellus text-3xl sm:text-5xl text-maroon">
            Interactive Book Match Simulator
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-grey mt-4 leading-relaxed">
            Bookmatching mirrors consecutive slabs sliced from the same marble block, yielding symmetrical butterfly veins. Select a stone below and simulate 2-way and 4-way quadrant reflections.
          </p>
        </div>

        {/* Controls Strip: Stone Picker & Mirror Mode Toggle */}
        <div className="bg-white border border-gold/30 p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Stone Selector */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              <span className="font-montserrat text-xs uppercase tracking-wider text-grey">
                Select Stone:
              </span>
              <div className="flex flex-wrap gap-2">
                {BOOKMATCH_STONES.slice(0, 5).map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => setSelectedStone(stone)}
                    className={`px-3 py-1.5 text-xs font-montserrat border transition-all ${
                      selectedStone.id === stone.id
                        ? "bg-maroon text-white border-gold font-medium"
                        : "bg-ivory border-gold/30 text-grey hover:border-gold hover:text-maroon"
                    }`}
                  >
                    {stone.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mirror Mode Selector */}
            <div className="w-full lg:w-auto flex items-center justify-center gap-2 border border-gold/30 p-1 bg-ivory">
              <button
                onClick={() => setMatchMode("2-way-horizontal")}
                className={`px-3 py-1 text-xs font-montserrat tracking-wider uppercase transition-colors ${
                  matchMode === "2-way-horizontal"
                    ? "bg-maroon text-white font-medium"
                    : "text-grey hover:text-maroon"
                }`}
              >
                2-Way (Horizontal)
              </button>
              <button
                onClick={() => setMatchMode("2-way-vertical")}
                className={`px-3 py-1 text-xs font-montserrat tracking-wider uppercase transition-colors ${
                  matchMode === "2-way-vertical"
                    ? "bg-maroon text-white font-medium"
                    : "text-grey hover:text-maroon"
                }`}
              >
                2-Way (Vertical)
              </button>
              <button
                onClick={() => setMatchMode("4-way-quadrant")}
                className={`px-3 py-1 text-xs font-montserrat tracking-wider uppercase transition-colors ${
                  matchMode === "4-way-quadrant"
                    ? "bg-maroon text-white font-medium"
                    : "text-grey hover:text-maroon"
                }`}
              >
                4-Way (Diamond Quad)
              </button>
            </div>
          </div>

          {/* Reveal Slider Range Input */}
          <div className="mt-6 pt-4 border-t border-gold/20 flex items-center gap-4">
            <span className="text-xs font-montserrat text-grey flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-gold" />
              <span>Mirror Symmetry Split:</span>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={splitSlider}
              onChange={(e) => setSplitSlider(Number(e.target.value))}
              className="flex-1 accent-[#541B2A] cursor-pointer"
            />
            <span className="text-xs font-montserrat text-maroon font-medium w-10 text-right">
              {splitSlider}%
            </span>
          </div>
        </div>

        {/* Visual Mirror Canvas Simulation */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border-2 border-gold shadow-2xl bg-black">
          {matchMode === "4-way-quadrant" && (
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
              {/* Top-Left: Original */}
              <div className="relative w-full h-full overflow-hidden border-r border-b border-gold/40">
                <Image
                  src={selectedStone.primaryImage}
                  alt="Quadrant 1"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Top-Right: Flipped Horizontally */}
              <div className="relative w-full h-full overflow-hidden border-b border-gold/40">
                <Image
                  src={selectedStone.primaryImage}
                  alt="Quadrant 2"
                  fill
                  className="object-cover scale-x-[-1]"
                />
              </div>

              {/* Bottom-Left: Flipped Vertically */}
              <div className="relative w-full h-full overflow-hidden border-r border-gold/40">
                <Image
                  src={selectedStone.primaryImage}
                  alt="Quadrant 3"
                  fill
                  className="object-cover scale-y-[-1]"
                />
              </div>

              {/* Bottom-Right: Flipped Both Horizontally & Vertically */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={selectedStone.primaryImage}
                  alt="Quadrant 4"
                  fill
                  className="object-cover scale-x-[-1] scale-y-[-1]"
                />
              </div>
            </div>
          )}

          {matchMode === "2-way-horizontal" && (
            <div className="grid grid-cols-2 w-full h-full">
              {/* Left Slab */}
              <div
                className="relative h-full overflow-hidden border-r border-gold"
                style={{ width: "100%" }}
              >
                <Image
                  src={selectedStone.primaryImage}
                  alt="Left Slab"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Right Slab (Flipped) */}
              <div className="relative h-full overflow-hidden">
                <Image
                  src={selectedStone.primaryImage}
                  alt="Right Slab"
                  fill
                  className="object-cover scale-x-[-1]"
                />
              </div>
            </div>
          )}

          {matchMode === "2-way-vertical" && (
            <div className="grid grid-rows-2 w-full h-full">
              {/* Top Slab */}
              <div className="relative w-full h-full overflow-hidden border-b border-gold">
                <Image
                  src={selectedStone.primaryImage}
                  alt="Top Slab"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Bottom Slab (Flipped) */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={selectedStone.primaryImage}
                  alt="Bottom Slab"
                  fill
                  className="object-cover scale-y-[-1]"
                />
              </div>
            </div>
          )}

          {/* Watermark Tag */}
          <div className="absolute bottom-4 left-4 bg-maroon-deep/90 text-ivory text-[10px] font-montserrat uppercase tracking-widest px-3 py-1.5 border border-gold/50 backdrop-blur-sm">
            {selectedStone.name} · {matchMode.replace(/-/g, " ").toUpperCase()}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-gold/30 shadow-md">
          <div>
            <span className="font-raleway text-[11px] uppercase tracking-wider text-gold block">
              Bespoke Quarry Block Hold
            </span>
            <h3 className="font-marcellus text-xl text-maroon mt-0.5">
              Request consecutive slabs of {selectedStone.name}
            </h3>
            <p className="font-poppins text-xs text-grey mt-1">
              We arrange a live dry-lay at our Silvassa works so you inspect the actual mirror seams before delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={getProductWhatsAppUrl(`bookmatched ${selectedStone.name} (${matchMode})`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-6 py-3.5 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold border border-gold shadow transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-gold" />
              <span>Enquire About This Match</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookMatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory pt-24 pb-32" />}>
      <BookMatchContent />
    </Suspense>
  );
}
