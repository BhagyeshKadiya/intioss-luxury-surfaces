"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoneProduct } from "@/lib/types";
import { formatPriceTier } from "@/lib/utils";
import { getProductWhatsAppUrl } from "@/lib/config";
import { Heart, Scale, MessageSquare, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: StoneProduct;
  isSavedToMoodboard: boolean;
  isSelectedForCompare: boolean;
  onToggleMoodboard: (product: StoneProduct) => void;
  onToggleCompare: (product: StoneProduct) => void;
  density?: "comfortable" | "compact";
}

export function ProductCard({
  product,
  isSavedToMoodboard,
  isSelectedForCompare,
  onToggleMoodboard,
  onToggleCompare,
  density = "comfortable",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-gold/25 hover:border-gold transition-all duration-500 shadow-sm hover:shadow-xl overflow-hidden"
    >
      {/* Image Container with Crossfade to Veining Close-up on Hover */}
      <div className={`relative w-full overflow-hidden bg-stone-100 ${density === "compact" ? "aspect-square" : "aspect-[4/3]"}`}>
        {/* Primary Slab Image */}
        <Image
          src={product.primaryImage}
          alt={`${product.name} Natural Stone Slab`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Second Image: Veining Close-Up crossfades in on hover */}
        <Image
          src={product.veinCloseUpImage}
          alt={`${product.name} Texture Close-Up`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ${
            isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-maroon-deep/90 text-ivory text-[9px] font-montserrat uppercase tracking-wider px-2 py-0.5 border border-gold/40 backdrop-blur-sm">
            {product.origin}
          </span>
          {product.veining === "Bookmatch-ready" && (
            <span className="bg-gold text-maroon text-[8px] font-montserrat uppercase font-semibold tracking-wider px-1.5 py-0.5 shadow-sm">
              Bookmatch Ready
            </span>
          )}
        </div>

        {/* Price Tier Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/90 text-maroon text-[10px] font-montserrat font-medium px-2 py-0.5 border border-gold/30 shadow-sm">
            {formatPriceTier(product.priceTier)}
          </span>
        </div>

        {/* Quick Action Floating Bar (Slide up on hover) */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-20 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          {/* Save to Moodboard (Heart) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleMoodboard(product);
            }}
            aria-label="Save to Moodboard"
            className={`p-2 rounded-none border text-xs flex items-center gap-1 backdrop-blur-md transition-colors ${
              isSavedToMoodboard
                ? "bg-maroon text-gold border-gold"
                : "bg-white/95 text-maroon border-gold/40 hover:bg-white hover:text-gold"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSavedToMoodboard ? "fill-gold text-gold" : ""}`} />
            <span className="text-[10px] font-montserrat hidden sm:inline">
              {isSavedToMoodboard ? "Saved" : "Shortlist"}
            </span>
          </button>

          {/* Compare (Scale) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleCompare(product);
            }}
            aria-label="Compare Stone"
            className={`p-2 rounded-none border text-xs flex items-center gap-1 backdrop-blur-md transition-colors ${
              isSelectedForCompare
                ? "bg-gold text-maroon border-maroon font-semibold"
                : "bg-white/95 text-maroon border-gold/40 hover:bg-white hover:text-gold"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="text-[10px] font-montserrat hidden sm:inline">
              {isSelectedForCompare ? "Comparing" : "Compare"}
            </span>
          </button>

          {/* Enquire on WhatsApp */}
          <a
            href={getProductWhatsAppUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="p-2 bg-maroon text-white hover:bg-maroon-deep border border-gold flex items-center gap-1 text-[10px] font-montserrat uppercase tracking-wider transition-colors shadow"
          >
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Enquire</span>
          </a>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-raleway uppercase tracking-wider text-grey mb-1">
            <span>{product.category}</span>
            <span>{product.colorFamily}</span>
          </div>

          <Link href={`/products/${product.slug}`} className="block group/link">
            <h3 className="font-marcellus text-xl text-maroon group-hover/link:text-gold transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Finishes and Applications Chips */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.finishes.slice(0, 2).map((fin) => (
              <span
                key={fin}
                className="bg-ivory border border-gold/30 text-[9px] font-montserrat text-maroon/80 px-1.5 py-0.5"
              >
                {fin}
              </span>
            ))}
            {product.applications.slice(0, 2).map((app) => (
              <span
                key={app}
                className="bg-stone-50 border border-grey/20 text-[9px] font-montserrat text-grey px-1.5 py-0.5"
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Details */}
        <div className="mt-5 pt-3 border-t border-gold/20 flex items-center justify-between">
          <span className="text-[10px] font-montserrat text-grey/80">
            {product.availability}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-montserrat uppercase tracking-wider text-maroon hover:text-gold transition-colors font-medium"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 text-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
