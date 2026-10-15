"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoneProduct } from "@/lib/types";
import { formatPriceTier } from "@/lib/utils";
import { getProductWhatsAppUrl } from "@/lib/config";
import { Scale, MessageSquare, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const isOrderBasis = [
    "Exclusive Table Tops — Stone",
    "Mosaics",
    "Stone Veneers",
    "Artefacts",
  ].includes(product.category);

  // Collect all unique available photos for the scrollable photo carousel
  const images = useMemo(() => {
    const list: string[] = [];
    if (product.primaryImage) list.push(product.primaryImage);
    if (product.veinCloseUpImage && product.veinCloseUpImage !== product.primaryImage) {
      list.push(product.veinCloseUpImage);
    }
    if (product.galleryImages && Array.isArray(product.galleryImages)) {
      product.galleryImages.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : ["/images/stones/golden-statuario.jpg"];
  }, [product]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const whatsappUrl = isOrderBasis
    ? `https://wa.me/919930171094?text=${encodeURIComponent(
        `Hello INTIOSS Concierge, I would like to enquire about bespoke ${product.name} (Available on Request / Order Basis).`
      )}`
    : getProductWhatsAppUrl(product.name);

  return (
    <Link
      href={`/products/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-gold/25 hover:border-gold transition-all duration-500 shadow-sm hover:shadow-xl overflow-hidden cursor-pointer"
    >
      {/* Image / Bespoke Canvas Container */}
      <div className={`relative w-full overflow-hidden bg-stone-100 ${density === "compact" ? "aspect-square" : "aspect-[4/3]"}`}>
        {isOrderBasis ? (
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-deep via-maroon to-[#2b0f14] flex flex-col items-center justify-center p-6 text-center text-ivory">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <span className="text-[10px] font-raleway uppercase tracking-[0.25em] text-gold font-medium mb-1">
              Available on Request
            </span>
            <span className="font-marcellus text-sm text-ivory/95">
              Bespoke Order Basis
            </span>
            <span className="text-[9px] font-montserrat text-ivory/60 mt-1 italic">
              Photos updating soon
            </span>
          </div>
        ) : (
          <>
            {/* Active Slab Image with smooth transition */}
            <Image
              key={images[activeImageIdx]}
              src={images[activeImageIdx]}
              alt={`${product.name} Natural Stone Slab - View ${activeImageIdx + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />

            {/* Scrollable Photo Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center border border-white/30 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-30 shadow-md active:scale-90"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center border border-white/30 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-30 shadow-md active:scale-90"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Photo Pagination Dot Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 pointer-events-none">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`transition-all duration-300 rounded-full ${
                        activeImageIdx === idx
                          ? "w-3 h-1 bg-gold shadow-sm"
                          : "w-1 h-1 bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          <span className="bg-maroon-deep/90 text-ivory text-[9px] font-montserrat uppercase tracking-wider px-2 py-0.5 border border-gold/40 backdrop-blur-sm">
            {product.origin}
          </span>
          {product.veining === "Bookmatch-ready" && (
            <span className="bg-gold text-maroon text-[8px] font-montserrat uppercase font-semibold tracking-wider px-1.5 py-0.5 shadow-sm">
              Bookmatch Ready
            </span>
          )}
        </div>

        {/* Price Tier Badge (Zero Rupee Symbol) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="bg-white/95 text-maroon text-[10px] font-montserrat font-medium px-2 py-0.5 border border-gold/30 shadow-sm">
            {formatPriceTier(product.priceTier)}
          </span>
        </div>

        {/* Quick Action Floating Bar: always accessible on mobile, slide up on desktop hover */}
        <div
          className={`absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-20 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-90 sm:opacity-0 translate-y-0 sm:translate-y-3 sm:pointer-events-none"
          }`}
        >
          {/* Compare (Scale) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare(product);
            }}
            aria-label="Compare Stone"
            className={`p-2 rounded-none border text-xs flex items-center gap-1 backdrop-blur-md transition-all active:scale-90 ${
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
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            }}
            aria-label="Enquire on WhatsApp"
            className="p-2 bg-maroon text-white hover:bg-maroon-deep border border-gold flex items-center gap-1 text-[10px] font-montserrat uppercase tracking-wider transition-all active:scale-90 shadow"
          >
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Enquire</span>
          </button>
        </div>
      </div>

      {/* Card Body - Entire box is clickable to open product page */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-raleway uppercase tracking-wider text-grey mb-1">
            <span className="truncate max-w-[65%] font-medium text-gold/90">
              {product.subCategory || product.category}
            </span>
            <span>{product.colorFamily}</span>
          </div>

          <h3 className="font-marcellus text-xl text-maroon group-hover:text-gold transition-colors">
            {product.name}
          </h3>

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

        {/* Clean Luxury Footer without redundant "Details" button */}
        <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between">
          <span className="text-[10px] font-montserrat text-gold font-medium">
            {isOrderBasis ? "Available on Request" : product.availability}
          </span>
          <span className="text-[10px] font-montserrat uppercase tracking-wider text-maroon/70 group-hover:text-gold transition-colors font-medium">
            View Stone Collection →
          </span>
        </div>
      </div>
    </Link>
  );
}
