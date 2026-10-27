"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { ProductHoldModal } from "./ProductHoldModal";

interface ProductStickyBarProps {
  product: {
    slug: string;
    name: string;
    origin: string;
    applications: string[];
  };
}

export function ProductStickyBar({ product }: ProductStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollPosition = Math.ceil(window.innerHeight + scrollY);
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      // Only reveal sticky bar after scrolling past the hero gallery (~480px)
      // and hide it near footer to prevent blocking footer CTAs
      const pastGallery = scrollY > 480;
      const nearBottom = documentHeight - scrollPosition < 600;

      if (pastGallery && !nearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-[74px] sm:bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gold/40 shadow-2xl py-3 sm:py-4 px-4 sm:px-8 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-marcellus text-lg text-maroon">{product.name}</span>
          <span className="text-xs font-raleway text-grey uppercase tracking-wider">
            · {product.origin}
          </span>
        </div>

        <div className="w-full sm:w-auto flex items-center justify-end gap-3">
          <Link
            href={`/book-match?stone=${product.slug}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-4 sm:px-6 py-2.5 sm:py-3 font-montserrat text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold border border-gold shadow transition-colors shrink-0 whitespace-nowrap"
          >
            <Layers className="w-4 h-4 text-gold shrink-0" />
            <span className="whitespace-nowrap">Bookmatch This Slab</span>
          </Link>

          <ProductHoldModal
            productName={product.name}
            productOrigin={product.origin}
            applications={product.applications}
          />
        </div>
      </div>
    </div>
  );
}
