"use client";

import React, { useState, useCallback, useEffect } from "react";
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
          title: "Monolithic Quarry Slab",
          category: "Quarry Slab",
          badge: "Full Slab 119\" x 77\"",
        };
      }
      if (lower.includes("kitchen") || lower.includes("island")) {
        return {
          src,
          title: "Chef's Kitchen Island",
          category: "Kitchen Countertop",
          badge: "Waterfall Island",
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
      if (lower.includes("feature-wall") || lower.includes("living") || lower.includes("cladding")) {
        return {
          src,
          title: "Living Room Feature Wall",
          category: "Wall Cladding",
          badge: "Bookmatched Cladding",
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

  // Fallbacks if fewer than 5 images
  const mainHero = tiles[0];
  const tile1 = tiles[1] || tiles[0];
  const tile2 = tiles[2] || tiles[0];
  const tile3 = tiles[3] || tiles[1] || tiles[0];
  const tile4 = tiles[4] || tiles[2] || tiles[0];

  return (
    <div className="w-full mb-8 select-none">
      {/* 
        ============================================================
        DESKTOP & TABLET HOUZEZ 5-IMAGE BENTO GRID
        ============================================================
      */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 sm:gap-2.5 h-[440px] lg:h-[500px] xl:h-[540px] rounded-xs overflow-hidden bg-stone-900 border border-gold/35 shadow-xl">
        
        {/* 1. Large Main Hero (Left Side: Col 1-2, Row 1-2) */}
        {mainHero && (
          <div
            onClick={() => openLightbox(0)}
            className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer bg-stone-950 transition-all duration-500 hover:ring-1 hover:ring-gold/70"
          >
            <Image
              src={mainHero.src}
              alt={`${product.name} - ${mainHero.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 600px"
              className="object-cover group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            {/* Subtle Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

            {/* Top-Left Category Tag */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon-deep/90 text-ivory text-[10px] font-montserrat uppercase tracking-[0.2em] border border-gold/40 backdrop-blur-sm shadow-md group-hover:border-gold transition-colors">
                <Sparkles className="w-2.5 h-2.5 text-gold" />
                <span>{mainHero.badge}</span>
              </span>
            </div>

            {/* Center Floating Hover Inspect Pill */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/80 text-ivory text-[11px] font-montserrat uppercase tracking-wider font-medium border border-gold/60 backdrop-blur-md shadow-2xl translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>Inspect Full Screen</span>
              </span>
            </div>

            {/* Bottom-Left Title Caption */}
            <div className="absolute bottom-4 left-4 right-4 z-10 group-hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-marcellus text-lg lg:text-2xl text-white group-hover:text-gold transition-colors drop-shadow-md">
                {mainHero.title}
              </h3>
              <p className="font-poppins text-xs text-stone-300 mt-0.5">
                {product.name} · Monolithic 20mm Profile
              </p>
            </div>

            {/* Hover Zoom Icon Pill */}
            <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="p-2 bg-black/60 text-white rounded-full border border-white/20 backdrop-blur-sm group-hover:border-gold">
                <Maximize2 className="w-3.5 h-3.5 text-gold" />
              </div>
            </div>
          </div>
        )}

        {/* 2. Top-Middle Tile (Kitchen Island) */}
        {tile1 && (
          <div
            onClick={() => openLightbox(1)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 transition-all duration-500 hover:ring-1 hover:ring-gold/70"
          >
            <Image
              src={tile1.src}
              alt={`${product.name} - ${tile1.title}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-500" />

            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs group-hover:border-gold transition-colors">
                {tile1.category}
              </span>
            </div>

            {/* Center Floating Hover Inspect Pill */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 text-ivory text-[10px] font-montserrat uppercase tracking-wider border border-gold/60 backdrop-blur-md shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3 h-3 text-gold" />
                <span>View Space</span>
              </span>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
              <h4 className="font-marcellus text-sm lg:text-base text-white group-hover:text-gold transition-colors truncate">
                {tile1.title}
              </h4>
            </div>
          </div>
        )}

        {/* 3. Top-Right Tile (Dining Table) */}
        {tile2 && (
          <div
            onClick={() => openLightbox(2)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 transition-all duration-500 hover:ring-1 hover:ring-gold/70"
          >
            <Image
              src={tile2.src}
              alt={`${product.name} - ${tile2.title}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-500" />

            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs group-hover:border-gold transition-colors">
                {tile2.category}
              </span>
            </div>

            {/* Center Floating Hover Inspect Pill */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 text-ivory text-[10px] font-montserrat uppercase tracking-wider border border-gold/60 backdrop-blur-md shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3 h-3 text-gold" />
                <span>View Space</span>
              </span>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
              <h4 className="font-marcellus text-sm lg:text-base text-white group-hover:text-gold transition-colors truncate">
                {tile2.title}
              </h4>
            </div>
          </div>
        )}

        {/* 4. Bottom-Middle Tile (Master Bathroom) */}
        {tile3 && (
          <div
            onClick={() => openLightbox(3)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 transition-all duration-500 hover:ring-1 hover:ring-gold/70"
          >
            <Image
              src={tile3.src}
              alt={`${product.name} - ${tile3.title}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-500" />

            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs group-hover:border-gold transition-colors">
                {tile3.category}
              </span>
            </div>

            {/* Center Floating Hover Inspect Pill */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 text-ivory text-[10px] font-montserrat uppercase tracking-wider border border-gold/60 backdrop-blur-md shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3 h-3 text-gold" />
                <span>View Space</span>
              </span>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
              <h4 className="font-marcellus text-sm lg:text-base text-white group-hover:text-gold transition-colors truncate">
                {tile3.title}
              </h4>
            </div>
          </div>
        )}

        {/* 5. Bottom-Right Tile (Living Room Feature Wall + View All Photos Button) */}
        {tile4 && (
          <div
            onClick={() => openLightbox(4)}
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-stone-950 transition-all duration-500 hover:ring-1 hover:ring-gold/70"
          >
            <Image
              src={tile4.src}
              alt={`${product.name} - ${tile4.title}`}
              fill
              sizes="(max-width: 1024px) 25vw, 300px"
              className="object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-0.5 bg-black/70 text-gold text-[9px] font-montserrat uppercase tracking-wider border border-gold/30 backdrop-blur-xs group-hover:border-gold transition-colors">
                {tile4.category}
              </span>
            </div>

            {/* Center Floating Hover Inspect Pill */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 text-ivory text-[10px] font-montserrat uppercase tracking-wider border border-gold/60 backdrop-blur-md shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3 h-3 text-gold" />
                <span>View Space</span>
              </span>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 z-10 group-hover:-translate-y-0.5 transition-transform duration-300">
              <h4 className="font-marcellus text-sm lg:text-base text-white group-hover:text-gold transition-colors truncate">
                {tile4.title}
              </h4>
            </div>

            {/* Houzez-Style "View All Photos" Button */}
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
              alt={`${product.name} - ${tiles[mobileSlide].title}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Top Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 bg-maroon-deep/90 text-ivory text-[10px] font-montserrat uppercase tracking-wider border border-gold/40">
                {tiles[mobileSlide].badge}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-16 z-10">
              <h3 className="font-marcellus text-lg text-white">
                {tiles[mobileSlide].title}
              </h3>
              <p className="font-poppins text-xs text-stone-300">
                {product.name}
              </p>
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
        FULL-SCREEN ARCHITECTURAL LIGHTBOX MODAL
        ============================================================
      */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
            onClick={(e) => {
              // Click outside stage closes lightbox
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            {/* Top Toolbar with High-Affordance Back & Close Buttons */}
            <div className="flex items-center justify-between z-20 border-b border-gold/25 pb-3 gap-2">
              {/* Prominent Back to Product Page Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-maroon-deep hover:bg-maroon text-ivory border border-gold/60 shadow-lg text-[11px] sm:text-xs font-montserrat uppercase tracking-wider font-semibold backdrop-blur-md transition-all hover:scale-102 active:scale-95 shrink-0"
                title="Return to Product Details"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-gold" />
                <span>Back to Product Page</span>
              </button>

              {/* Center Title & Counter */}
              <div className="hidden sm:block text-center flex-1 px-4 truncate">
                <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-gold block">
                  {tiles[lightboxIndex].category} · {product.name}
                </span>
                <h3 className="font-marcellus text-base sm:text-lg text-white truncate max-w-md mx-auto">
                  {tiles[lightboxIndex].title} ({lightboxIndex + 1}/{tiles.length})
                </h3>
              </div>

              {/* Right Controls: Zoom & Prominent Close Button */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Zoom Out */}
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                  disabled={zoomLevel <= 1}
                  className="p-1.5 sm:p-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded border border-white/20 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Zoom In */}
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  disabled={zoomLevel >= 2.5}
                  className="p-1.5 sm:p-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded border border-white/20 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                </button>

                {/* Explicit Close Button with Text & Icon */}
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-stone-900 hover:bg-stone-800 text-white hover:text-gold rounded border border-gold/40 text-[11px] sm:text-xs font-montserrat uppercase tracking-wider font-semibold transition-all ml-1 shrink-0 active:scale-95"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4 text-gold" />
                  <span>Close</span>
                </button>
              </div>
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

            {/* Bottom Thumbnails Strip with Secondary Exit Link */}
            <div className="z-20 border-t border-gold/25 pt-2.5 sm:pt-3 flex items-center justify-between gap-3 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={closeLightbox}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white border border-white/25 text-[11px] font-montserrat uppercase tracking-wider rounded-xs shrink-0 transition-colors"
              >
                <ArrowLeft className="w-3 h-3 text-gold" />
                <span>Return to Page</span>
              </button>

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

              <span className="hidden sm:block text-[10px] font-montserrat uppercase text-stone-400 tracking-wider shrink-0">
                Esc to Exit
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
