"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  X,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/config";
import { HexagonBackground } from "@/components/brand/HexagonBackground";

// Active status to display all curated realisations
const GALLERY_STATUS: "active" | "pending" = "active";

export type GalleryCategory =
  | "All"
  | "Flooring"
  | "Kitchen"
  | "Bath"
  | "Table Tops"
  | "Wall Cladding"
  | "Quarry Slabs";

interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  stoneUsed: string;
  location: string;
  projectType: string;
  image: string;
  productSlug?: string;
  dimensions?: string;
}

const CATEGORIES: GalleryCategory[] = [
  "All",
  "Flooring",
  "Kitchen",
  "Bath",
  "Table Tops",
  "Wall Cladding",
  "Quarry Slabs",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Build the complete list of gallery items automatically from all products
  const galleryItems: GalleryItem[] = useMemo(() => {
    const list: GalleryItem[] = [];

    // 1. Process all product use-case photos
    PRODUCTS.forEach((product) => {
      const images = product.galleryImages || [product.primaryImage];

      images.forEach((img, idx) => {
        const lower = img.toLowerCase();

        if (lower.includes("floor") || lower.includes("flooring")) {
          list.push({
            id: `${product.id}-flooring`,
            category: "Flooring",
            title: `${product.name} Architectural Flooring`,
            stoneUsed: product.name,
            location: "High-Rise Penthouse & Villa Salon",
            projectType: "Monolithic Living Room & Salon Flooring",
            image: img,
            productSlug: product.slug,
            dimensions: product.specs.dimensions,
          });
        } else if (lower.includes("kitchen") || lower.includes("island") || lower.includes("countertop")) {
          list.push({
            id: `${product.id}-kitchen`,
            category: "Kitchen",
            title: `${product.name} Waterfall Island & Countertop`,
            stoneUsed: product.name,
            location: "Private Residence Culinary Suite",
            projectType: "Chef's Kitchen Waterfall Island",
            image: img,
            productSlug: product.slug,
            dimensions: product.specs.dimensions,
          });
        } else if (lower.includes("bath") || lower.includes("vanity") || lower.includes("spa")) {
          list.push({
            id: `${product.id}-bath`,
            category: "Bath",
            title: `${product.name} Master Spa Bathroom`,
            stoneUsed: product.name,
            location: "Master Ensuite Sanctuary",
            projectType: "Master Spa Vanity & Bookmatch Cladding",
            image: img,
            productSlug: product.slug,
            dimensions: product.specs.dimensions,
          });
        } else if (lower.includes("table") || lower.includes("dining")) {
          list.push({
            id: `${product.id}-table`,
            category: "Table Tops",
            title: `${product.name} Bespoke Dining Table`,
            stoneUsed: product.name,
            location: "Private Dining Salon",
            projectType: "Monolithic Sawn Dining & Center Table",
            image: img,
            productSlug: product.slug,
            dimensions: product.specs.dimensions,
          });
        } else if (lower.includes("cladding") || lower.includes("feature-wall") || lower.includes("wall")) {
          list.push({
            id: `${product.id}-cladding`,
            category: "Wall Cladding",
            title: `${product.name} Interior Accent Wall`,
            stoneUsed: product.name,
            location: "Double-Height Atrium Lounge",
            projectType: "Interior Feature Wall & Fireplace Cladding",
            image: img,
            productSlug: product.slug,
            dimensions: product.specs.dimensions,
          });
        } else if (lower.includes("slab")) {
          list.push({
            id: `${product.id}-slab`,
            category: "Quarry Slabs",
            title: `${product.name} Monolithic Quarry Slab`,
            stoneUsed: product.name,
            location: "INTIOSS Curated Gallery Reserve",
            projectType: product.specs.dimensions || "Monolithic Slab 20mm Profile",
            image: img,
            productSlug: product.slug,
            dimensions: product.specs.dimensions,
          });
        }
      });
    });

    // 2. Specialty installations
    list.push(
      {
        id: "spec-emerald-onyx",
        category: "Wall Cladding",
        title: "Backlit Emerald Onyx Cocktail Feature Bar",
        stoneUsed: "Emerald Green Onyx",
        location: "Mumbai",
        projectType: "Private Executive Lounge",
        image: "/images/stones/emerald-green-onyx.jpg",
      },
      {
        id: "spec-tiger-eye",
        category: "Wall Cladding",
        title: "Grand Entrance Vestibule Feature Wall",
        stoneUsed: "Tiger Eye Gold Gemstone",
        location: "Kishangarh",
        projectType: "Corporate Headquarters",
        image: "/images/usecases/Intioss_Tiger-Eye_Entrance-Feature-Wall_04.png",
      },
      {
        id: "spec-petrified-wood",
        category: "Table Tops",
        title: "Fossilised Wood Mosaic Boardroom Table",
        stoneUsed: "Petrified Wood Mosaic 20mm",
        location: "Mumbai",
        projectType: "Family Office Headquarters",
        image: "/images/usecases/Intioss_Petrified-Wood-Mosaic_Dining-Table-Top_04.png",
      },
      {
        id: "spec-patagonia",
        category: "Wall Cladding",
        title: "Luminous Crystalline Quartzite Reception",
        stoneUsed: "Patagonia Quartzite Translucent",
        location: "Silvassa",
        projectType: "Boutique Hotel Atrium",
        image: "/images/stones/patagonia-quartzite.jpg",
      }
    );

    return list;
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  // Lightbox index tracking
  const currentIndex = activeItem ? filteredItems.findIndex((it) => it.id === activeItem.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setActiveItem(filteredItems[currentIndex - 1]);
      setZoomLevel(1);
    } else {
      setActiveItem(filteredItems[filteredItems.length - 1]);
      setZoomLevel(1);
    }
  }, [currentIndex, filteredItems]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredItems.length - 1) {
      setActiveItem(filteredItems[currentIndex + 1]);
      setZoomLevel(1);
    } else {
      setActiveItem(filteredItems[0]);
      setZoomLevel(1);
    }
  }, [currentIndex, filteredItems]);

  // Keyboard navigation
  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
        setZoomLevel(1);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handlePrev, handleNext]);

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 md:pt-32 pb-32 select-none relative overflow-hidden">
      {/* Precision Static Half Hexagons in Blank Spaces */}
      <HexagonBackground
        theme="light"
        intensity="subtle"
        showPattern={true}
        showFloating={true}
        density="double"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-montserrat font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-dark">
              Architectural Portfolio & Gallery
            </span>
          </div>
          <h1 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-maroon">
            Curated Stone Installations
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-stone-700 mt-4 leading-relaxed">
            Explore authentic installations of monolithic marble, exotic quartzite, and architectural surfaces across residential floorings, chef&apos;s kitchen islands, spa ensuites, bespoke dining tables, and full-height bookmatched cladding.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-14">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat).length;

            const isSelected = selectedFilterCategory(selectedCategory, cat);

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-montserrat uppercase tracking-[0.14em] border transition-all duration-200 active:scale-95 rounded-xs flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-maroon text-gold border-gold font-semibold shadow-xs"
                    : "bg-white text-stone-700 font-medium border-gold/30 hover:border-gold hover:text-maroon"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-xs font-semibold ${
                    isSelected ? "bg-gold/25 text-gold" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => {
                  setActiveItem(item);
                  setZoomLevel(1);
                }}
                className="group relative bg-white border border-gold/30 rounded-xs overflow-hidden cursor-pointer shadow-sm hover:border-gold hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                {/* Image Container with Zoom Motion */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-108 group-hover:brightness-105"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Zoom Badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="w-11 h-11 rounded-full bg-black/80 text-gold border border-gold/60 backdrop-blur-md flex items-center justify-center shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5 text-gold" />
                    </div>
                  </div>

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-maroon-deep/90 text-gold text-[9px] font-montserrat uppercase tracking-wider px-2.5 py-1 border border-gold/40 backdrop-blur-xs font-semibold shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Maximize Icon */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1.5 rounded-full bg-black/60 text-white border border-white/20 hover:border-gold backdrop-blur-sm">
                      <Maximize2 className="w-3.5 h-3.5 text-gold" />
                    </div>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-raleway text-[10px] uppercase tracking-[0.2em] text-gold-dark font-semibold block">
                      {item.stoneUsed}
                    </span>
                    <h3 className="font-marcellus text-lg text-maroon group-hover:text-gold-dark transition-colors mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-[11px] font-poppins text-stone-600">
                    <span className="truncate max-w-[170px]">{item.location}</span>
                    <span className="font-montserrat text-[10px] text-maroon font-semibold uppercase tracking-wider">
                      {item.projectType.split("&")[0].trim()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Full-Screen Lightbox Modal */}
        {mounted &&
          activeItem &&
          createPortal(
            <div
              id="gallery-lightbox-overlay"
              style={{ zIndex: 999999 }}
              className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/92 backdrop-blur-md select-none"
            >
              {/* Backdrop click to close */}
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => {
                  setActiveItem(null);
                  setZoomLevel(1);
                }}
              />

              <div className="relative z-10 max-w-5xl w-full bg-maroon-deep text-ivory border-2 border-gold shadow-2xl overflow-hidden rounded-xs flex flex-col lg:flex-row max-h-[92vh]">
                {/* Image Section (Left) */}
                <div className="relative lg:w-7/12 bg-black flex items-center justify-center min-h-[320px] sm:min-h-[440px] lg:min-h-[560px] overflow-hidden">
                  <div
                    className="relative w-full h-full min-h-[320px] sm:min-h-[440px] lg:min-h-[560px] transition-transform duration-300 flex items-center justify-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Zoom Controls */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-gold/30 px-2 py-1 rounded-xs">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                      disabled={zoomLevel <= 1}
                      className="p-1 text-ivory hover:text-gold disabled:opacity-30"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-montserrat text-gold min-w-[35px] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                      disabled={zoomLevel >= 2.5}
                      className="p-1 text-ivory hover:text-gold disabled:opacity-30"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Left / Right Nav Arrows */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-ivory hover:text-gold border border-gold/40 flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-ivory hover:text-gold border border-gold/40 flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Metadata & Actions (Right) */}
                <div className="relative lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gold/30 bg-maroon-deep overflow-y-auto">
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveItem(null);
                      setZoomLevel(1);
                    }}
                    aria-label="Close Lightbox"
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-ivory hover:text-gold border border-gold/40 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 bg-gold/20 text-gold text-[10px] font-montserrat uppercase tracking-[0.16em] font-semibold border border-gold/40">
                        {activeItem.category}
                      </span>
                      <span className="text-[11px] font-montserrat text-stone-300">
                        {currentIndex + 1} of {filteredItems.length}
                      </span>
                    </div>

                    <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory">
                      {activeItem.title}
                    </h3>

                    <div className="mt-6 space-y-3 font-poppins text-xs divide-y divide-gold/20">
                      <div className="pt-2">
                        <span className="font-raleway text-ivory/60 uppercase block text-[10px]">
                          Natural Stone Specified:
                        </span>
                        <span className="font-montserrat font-medium text-gold text-sm">
                          {activeItem.stoneUsed}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="font-raleway text-ivory/60 uppercase block text-[10px]">
                          Location / Context:
                        </span>
                        <span className="text-ivory">{activeItem.location}</span>
                      </div>
                      <div className="pt-2">
                        <span className="font-raleway text-ivory/60 uppercase block text-[10px]">
                          Architectural Scope:
                        </span>
                        <span className="text-ivory">{activeItem.projectType}</span>
                      </div>
                      {activeItem.dimensions && (
                        <div className="pt-2">
                          <span className="font-raleway text-ivory/60 uppercase block text-[10px]">
                            Slab Dimensions & Profile:
                          </span>
                          <span className="text-gold font-medium">{activeItem.dimensions}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-6 mt-6 border-t border-gold/30 space-y-2.5">
                    {activeItem.productSlug && (
                      <Link
                        href={`/products/${activeItem.productSlug}`}
                        onClick={() => setActiveItem(null)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-maroon font-montserrat uppercase tracking-[0.16em] text-xs font-semibold py-3 px-4 border border-gold transition-all duration-200 shadow-sm active:scale-98"
                      >
                        <span>Explore {activeItem.stoneUsed} Slabs</span>
                        <ArrowRight className="w-3.5 h-3.5 text-maroon" />
                      </Link>
                    )}

                    <a
                      href={getWhatsAppUrl(
                        `Hello INTIOSS, I saw the ${activeItem.title} installation in your gallery and would like to discuss a similar execution for my project.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-maroon-light/60 hover:bg-maroon-light text-ivory hover:text-gold font-montserrat uppercase tracking-[0.16em] text-xs font-semibold py-2.5 px-4 border border-gold/40 transition-all duration-200"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-gold" />
                      <span>Inquire for This Space on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveItem(null);
                        setZoomLevel(1);
                      }}
                      className="w-full text-center text-xs font-montserrat uppercase tracking-wider text-stone-400 hover:text-white py-1 transition-colors"
                    >
                      &larr; Back to Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
}

function selectedFilterCategory(current: GalleryCategory, target: GalleryCategory): boolean {
  return current === target;
}
