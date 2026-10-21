"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoneProduct } from "@/lib/types";

interface SlideItem {
  src: string;
  label: string;
  type: "slab" | "veining" | "installation";
}

interface ProductTopCarouselProps {
  product: StoneProduct;
}

export function ProductTopCarousel({ product }: ProductTopCarouselProps) {
  const slides: SlideItem[] = [];

  // 1. Full slab first
  if (product.primaryImage) {
    slides.push({
      src: product.primaryImage,
      label: "Full Slab",
      type: "slab",
    });
  }

  // 2. Veining close-ups
  if (product.veinCloseUpImage && product.veinCloseUpImage !== product.primaryImage) {
    slides.push({
      src: product.veinCloseUpImage,
      label: "Veining Detail",
      type: "veining",
    });
  }

  // 3. Real installation photos (labeled matching applications)
  const applicationLabels = ["Flooring", "Bathroom", "Table Top", "Kitchen Countertop", "Wall Cladding — Interior", "Wall Cladding — Exterior", "Exterior Flooring"];
  if (product.galleryImages && Array.isArray(product.galleryImages)) {
    product.galleryImages.forEach((img, idx) => {
      if (img && !slides.some((s) => s.src === img)) {
        const assignedLabel = product.applications[idx] || applicationLabels[idx % applicationLabels.length] || "Installation";
        slides.push({
          src: img,
          label: assignedLabel,
          type: "installation",
        });
      }
    });
  }

  // Fallback if empty
  if (slides.length === 0) {
    slides.push({
      src: "/images/stones/golden-statuario.jpg",
      label: "Full Slab",
      type: "slab",
    });
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full mb-12 select-none">
      {/* Main Slide Stage with Neutral Letterbox Background & Object-Contain */}
      <div className="relative w-full h-[440px] sm:h-[540px] md:h-[620px] bg-paper-warm border border-gold/35 shadow-lg overflow-hidden flex items-center justify-center">
        {/* Subtle background texture nuance */}
        <div className="absolute inset-0 bg-stone-200/20 pointer-events-none" />

        {/* Slide Image with Strict Object-Contain preserving Natural Proportions */}
        <div className="relative w-full h-full p-4 sm:p-8 flex items-center justify-center">
          <Image
            key={currentSlide.src}
            src={currentSlide.src}
            alt={`${product.name} - ${currentSlide.label}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-contain"
          />
        </div>

        {/* Slide Type / Application Label Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
          <span className="bg-maroon-deep/90 text-ivory text-[10px] sm:text-xs font-montserrat uppercase tracking-widest px-3 py-1 border border-gold/40 backdrop-blur-md shadow-md">
            {currentSlide.label}
          </span>
          <span className="text-[10px] font-mono text-grey px-2 py-1 bg-white/80 border border-gold/25">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-gold text-maroon hover:text-maroon border border-gold/50 flex items-center justify-center transition-all shadow-md active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-gold text-maroon hover:text-maroon border border-gold/50 flex items-center justify-center transition-all shadow-md active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Bar */}
      {slides.length > 1 && (
        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {slides.map((slide, idx) => (
            <button
              key={`${slide.src}-${idx}`}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-none w-20 h-14 sm:w-24 sm:h-16 rounded-none overflow-hidden border transition-all ${
                currentIndex === idx
                  ? "border-maroon ring-2 ring-gold shadow-md"
                  : "border-gold/30 opacity-70 hover:opacity-100 bg-paper-warm"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                sizes="96px"
                className="object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] font-montserrat uppercase tracking-wider text-white text-center py-0.5 truncate px-1">
                {slide.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
