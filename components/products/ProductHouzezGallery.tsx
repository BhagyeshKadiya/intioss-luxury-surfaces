"use client";

import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { StoneProduct } from "@/lib/types";
import {
  Grid,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sparkles,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductHouzezGalleryProps {
  product: StoneProduct;
}

interface GalleryTile {
  src: string;
  title: string;
  category: string;
  badge: string;
}

export function ProductHouzezGallery({ product }: ProductHouzezGalleryProps) {
  // Build 5 high-resolution tiles
  const tiles: GalleryTile[] = React.useMemo(() => {
    const list: GalleryTile[] = [];
    const added = new Set<string>();

    const resolveTile = (src: string): GalleryTile => {
      const lower = src.toLowerCase();
      if (lower.includes("slab")) {
        return {
          src,
          title: "The slab",
          category: "The slab",
          badge: "The slab",
        };
      }
      if (lower.includes("kitchen") || lower.includes("island") || lower.includes("countertop")) {
        return {
          src,
          title: "Chef's Kitchen Countertop",
          category: "Kitchen Countertop",
          badge: "Kitchen Countertop",
        };
      }
      if (lower.includes("bath") || lower.includes("vanity") || lower.includes("spa")) {
        return {
          src,
          title: "Master Spa Bathroom",
          category: "Bathroom",
          badge: "Vanity & Cladding",
        };
      }
      if (lower.includes("table") || lower.includes("dining")) {
        return {
          src,
          title: "Bespoke Dining Table",
          category: "Table Top",
          badge: "Monolithic Top",
        };
      }
      if (lower.includes("floor") || lower.includes("flooring")) {
        return {
          src,
          title: "Luminous Marble Flooring",
          category: "Flooring",
          badge: "Seamless Flooring",
        };
      }
      if (lower.includes("feature-wall") || lower.includes("living") || lower.includes("cladding") || lower.includes("wall")) {
        return {
          src,
          title: "Interior Architectural Cladding",
          category: "Wall Cladding",
          badge: "Interior Cladding",
        };
      }
      return {
        src,
        title: "Architectural Installation",
        category: "Interior Space",
        badge: "Natural Stone",
      };
    };

    // Primary slab first
    if (product.primaryImage) {
      list.push(resolveTile(product.primaryImage));
      added.add(product.primaryImage);
    }

    // Gallery images
    if (product.galleryImages && Array.isArray(product.galleryImages)) {
      product.galleryImages.forEach((img) => {
        if (img && !added.has(img)) {
          list.push(resolveTile(img));
          added.add(img);
        }
      });
    }

    // Vein close up
    if (product.veinCloseUpImage && !added.has(product.veinCloseUpImage)) {
      list.push(resolveTile(product.veinCloseUpImage));
      added.add(product.veinCloseUpImage);
    }

    return list.slice(0, 5);
  }, [product]);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
  };

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % tiles.length : null));
    setZoomLevel(1);
  }, [tiles.length]);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + tiles.length) % tiles.length : null
    );
    setZoomLevel(1);
  }, [tiles.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevLightbox, nextLightbox]);

  // Lock body scroll and mark lightbox active to hide background header
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-active");
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.classList.remove("lightbox-active");
      };
    }
  }, [lightboxIndex]);

  // Fallbacks if fewer than 5 images
  const mainHero = tiles[0];
  const tile1 = tiles[1] || tiles[0];
  const tile2 = tiles[2] || tiles[0];
  const tile3 = tiles[3] || tiles[1] || tiles[0];
  const tile4 = tiles[4] || tiles[2] || tiles[0];

  return (
    <div className="w-full mb-12 lg:mb-16 select-none">
      {/* 
        ============================================================
        DESKTOP & TABLET HOUZEZ 5-IMAGE BENTO GRID (REFINED GAPS)
        ============================================================
      */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 sm:gap-3.5 lg:gap-4 h-[450px] lg:h-[510px] xl:h-[550px] rounded-xs bg-transparent">
        
        {/* 1. Large Main Hero (Left Side: Col 1-2, Row 1-2) */}
        {mainHero && (
          <div
            onClick={() => openLightbox(0)}
            className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer bg-stone-950 rounded-xs border border-gold/40 shadow-lg transition-all duration-500 hover:ring-2 hover:ring-gold/80"
          >
            <Image
              src={mainHero.src}
              alt={`${product.name} - ${mainHero.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 600px"
              className="object-cover group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            {/* Top-Left Space Label Only */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center px-2.5 py-1 bg-black/70 text-ivory text-[10px] font-montserrat uppercase tracking-[0.18em] border border-gold/40 backdrop-blur-sm">
                {mainHero.category}
              </span>
            </div>

            {/* Hover Zoom Icon Pill */}
            <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="p-2 bg-black/60 text-white rounded-full border border-white/20 backdrop-blur-sm group-hover:border-gold">
                <Maximize2 className="w-3.5 h-3.5 text-gold" />
              </div>
            </div>
          </div>
        )}

        {/* 2. Top-Middle Tile */}
        {tile1 && (
          <div
            onClick={() => openLightbox(1)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 rounded-xs border border-gold/40 shadow-lg transition-all duration-500 hover:ring-2 hover:ring-gold/80"
          >
            <Image
              src={tile1.src}
              alt={`${product.name} - ${tile1.category}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs">
                {tile1.category}
              </span>
            </div>
          </div>
        )}

        {/* 3. Top-Right Tile */}
        {tile2 && (
          <div
            onClick={() => openLightbox(2)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 rounded-xs border border-gold/40 shadow-lg transition-all duration-500 hover:ring-2 hover:ring-gold/80"
          >
            <Image
              src={tile2.src}
              alt={`${product.name} - ${tile2.category}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs">
                {tile2.category}
              </span>
            </div>
          </div>
        )}

        {/* 4. Bottom-Middle Tile */}
        {tile3 && (
          <div
            onClick={() => openLightbox(3)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 rounded-xs border border-gold/40 shadow-lg transition-all duration-500 hover:ring-2 hover:ring-gold/80"
          >
            <Image
              src={tile3.src}
              alt={`${product.name} - ${tile3.category}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs">
                {tile3.category}
              </span>
            </div>
          </div>
        )}

        {/* 5. Bottom-Right Tile + View All Photos Button */}
        {tile4 && (
          <div
            onClick={() => openLightbox(4)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 rounded-xs border border-gold/40 shadow-lg transition-all duration-500 hover:ring-2 hover:ring-gold/80"
          >
            <Image
              src={tile4.src}
              alt={`${product.name} - ${tile4.category}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs">
                {tile4.category}
              </span>
            </div>

            {/* "View All" Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(0);
              }}
              className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-maroon hover:text-gold-dark text-[11px] font-montserrat uppercase tracking-wider font-semibold border border-gold/50 shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            >
              <Grid className="w-3.5 h-3.5 text-gold-dark" />
              <span>View All ({tiles.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* 
        ============================================================
        MOBILE SWIPEABLE / SLIDER VIEW (for screens < 768px)
        ============================================================
      */}
      <div className="block md:hidden relative w-full h-[320px] bg-stone-900 border border-gold/35 rounded-xs overflow-hidden shadow-lg">
        {tiles[mobileSlide] && (
          <div
            onClick={() => openLightbox(mobileSlide)}
            className="relative w-full h-full cursor-pointer"
          >
            <Image
              src={tiles[mobileSlide].src}
              alt={`${product.name} - ${tiles[mobileSlide].category}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Small Space Label Only */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 bg-black/70 text-ivory text-[10px] font-montserrat uppercase tracking-wider border border-gold/40">
                {tiles[mobileSlide].category}
              </span>
            </div>
          </div>
        )}

        {/* Mobile Next / Prev Arrows */}
        <button
          type="button"
          onClick={() =>
            setMobileSlide((prev) => (prev - 1 + tiles.length) % tiles.length)
          }
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setMobileSlide((prev) => (prev + 1) % tiles.length)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Mobile Counter Pill */}
        <div className="absolute bottom-3 right-3 z-20">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/75 text-white text-[10px] font-montserrat uppercase tracking-wider border border-gold/40 backdrop-blur-xs"
          >
            <Grid className="w-3 h-3 text-gold" />
            <span>{mobileSlide + 1} / {tiles.length}</span>
          </button>
        </div>
      </div>

      {/* 
        ============================================================
        FULL-SCREEN ARCHITECTURAL LIGHTBOX MODAL (PORTAL TO BODY)
        ============================================================
      */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
                style={{ zIndex: 999999 }}
                onClick={(e) => {
                  // Click outside stage closes lightbox
                  if (e.target === e.currentTarget) closeLightbox();
                }}
              >
                {/* Top Toolbar: Product Name (Left), Slab Index (Center), Single Close Button (Right) */}
                <div className="flex items-center justify-between z-20 border-b border-white/15 pb-3 gap-4 px-2">
                  <span className="text-[11px] sm:text-xs font-montserrat uppercase tracking-[0.22em] text-gold font-medium truncate">
                    {product.name}
                  </span>

                  <div className="text-center shrink-0">
                    <span className="font-marcellus text-base sm:text-xl text-white">
                      {tiles[lightboxIndex].category} ({lightboxIndex + 1} of {tiles.length})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-transparent hover:bg-white/10 text-white hover:text-gold border border-white/30 hover:border-gold text-[11px] font-montserrat uppercase tracking-[0.2em] font-medium transition-all shrink-0 cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Close</span>
                  </button>
                </div>

                {/* Main Stage Image (Backdrop click closes) */}
                <div
                  className="relative flex-1 flex items-center justify-center my-3 sm:my-4 overflow-hidden cursor-zoom-out"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) closeLightbox();
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tiles[lightboxIndex].src}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: zoomLevel }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full max-w-6xl max-h-[75vh] cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={tiles[lightboxIndex].src}
                        alt={`${product.name} - ${tiles[lightboxIndex].title}`}
                        fill
                        sizes="100vw"
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Prev Arrow */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-gold border border-white/20 hover:border-gold flex items-center justify-center backdrop-blur-sm transition-all"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Next Arrow */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-gold border border-white/20 hover:border-gold flex items-center justify-center backdrop-blur-sm transition-all"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Bottom Thumbnails Strip (Centered, Clean) */}
                <div className="z-20 border-t border-white/15 pt-2.5 sm:pt-3 flex items-center justify-center overflow-x-auto pb-1">
                  <div className="flex items-center justify-center gap-2 mx-auto overflow-x-auto py-1">
                    {tiles.map((tile, idx) => {
                      const isActive = idx === lightboxIndex;
                      return (
                        <button
                          key={tile.src}
                          type="button"
                          onClick={() => {
                            setLightboxIndex(idx);
                            setZoomLevel(1);
                          }}
                          className={`relative w-14 h-10 sm:w-20 sm:h-14 rounded-xs overflow-hidden shrink-0 border transition-all ${
                            isActive
                              ? "border-gold ring-2 ring-gold/50 scale-105"
                              : "border-white/20 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={tile.src}
                            alt={tile.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
