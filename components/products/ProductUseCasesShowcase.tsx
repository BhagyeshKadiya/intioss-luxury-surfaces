"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { StoneProduct } from "@/lib/types";
import { getWhatsAppUrl } from "@/lib/config";
import {
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UseCaseItem {
  id: string;
  category: "Flooring" | "Kitchen Countertop" | "Bathroom" | "Table Top" | "Wall Cladding — Interior" | "Monolithic Slab";
  filterCategory: "All" | "Flooring" | "Kitchen" | "Bathroom" | "Table Top" | "Wall Cladding";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  architecturalHighlights: string[];
}

interface ProductUseCasesShowcaseProps {
  product: StoneProduct;
}

export function ProductUseCasesShowcase({ product }: ProductUseCasesShowcaseProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<UseCaseItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Automatically parse all images into verified Use Cases
  const useCases: UseCaseItem[] = React.useMemo(() => {
    const items: UseCaseItem[] = [];
    const images = product.galleryImages || [product.primaryImage];

    images.forEach((img) => {
      const lower = img.toLowerCase();

      if (lower.includes("floor") || lower.includes("flooring")) {
        items.push({
          id: `${product.id}-flooring`,
          category: "Flooring",
          filterCategory: "Flooring",
          title: "Monolithic Flooring & Salon",
          subtitle: `Expansive living room and penthouse flooring in ${product.name}`,
          description:
            "Monolithic large-format calibration creates an expansive, cooling, palace-grade floor underfoot. Natural crystalline reflectance maximizes ambient light while the veining disguises everyday dust and foot traffic.",
          image: img,
          architecturalHighlights: [
            "Continuous vein layout across expansive floorplates",
            "Naturally cool underfoot with excellent radiant heating conductivity",
            "High compressive strength and dense calcitic matrix",
          ],
        });
      } else if (lower.includes("kitchen") || lower.includes("island") || lower.includes("countertop")) {
        items.push({
          id: `${product.id}-kitchen`,
          category: "Kitchen Countertop",
          filterCategory: "Kitchen",
          title: "Chef's Kitchen Waterfall Island",
          subtitle: `Seamless mitered waterfall island & countertops in ${product.name}`,
          description:
            "Mitered 45-degree edge profiles allow continuous veining to cascade from the horizontal prep surface down to the floor. Treated with breathable fluoropolymer sealers for everyday culinary heat and stain resistance.",
          image: img,
          architecturalHighlights: [
            "Seamless waterfall mitered returns",
            "Under-mount sink and induction cooktop integration",
            "Superior heat resistance up to 260°C (500°F)",
          ],
        });
      } else if (lower.includes("bath") || lower.includes("vanity") || lower.includes("spa")) {
        items.push({
          id: `${product.id}-bathroom`,
          category: "Bathroom",
          filterCategory: "Bathroom",
          title: "Master Spa Bathroom & Floating Vanity",
          subtitle: `Five-star master ensuite retreat in ${product.name}`,
          description:
            "Transforms residential master bathrooms into boutique spa sanctuaries. Luminous crystalline background provides high reflectance in vanity settings while impermeable nano-sealers safeguard against steam and bath soaps.",
          image: img,
          architecturalHighlights: [
            "Floating cantilevered stone vanities",
            "Bookmatched full-height shower enclosure walls",
            "Moisture-impermeable crystalline structure",
          ],
        });
      } else if (lower.includes("table") || lower.includes("dining")) {
        items.push({
          id: `${product.id}-table-top`,
          category: "Table Top",
          filterCategory: "Table Top",
          title: "Bespoke Dining & Centerpiece Table",
          subtitle: `One-of-a-kind sculptural stone table in ${product.name}`,
          description:
            "Each dining and cocktail table top is precision-gangsawn from hand-selected slabs with custom chamfered, bullnose, or reverse shark-nose edge profiles, creating a timeless architectural focal point.",
          image: img,
          architecturalHighlights: [
            "Architectural shark-nose and reverse-miter edge detailing",
            "Stain-resistant fluoropolymer penetrating finish",
            "Sculptural natural stone conversation centerpiece",
          ],
        });
      } else if (lower.includes("cladding") || lower.includes("feature-wall") || lower.includes("wall")) {
        items.push({
          id: `${product.id}-cladding`,
          category: "Wall Cladding — Interior",
          filterCategory: "Wall Cladding",
          title: "Interior Accent Wall & Fireplace Cladding",
          subtitle: `Double-height bookmatched feature facade in ${product.name}`,
          description:
            "Consecutive slabs cut from the same quarry block achieve mirror-image bookmatch symmetry. Perfect for double-height foyer atriums, living room feature walls, and bespoke fireplace facades.",
          image: img,
          architecturalHighlights: [
            "Mirror-image bookmatch vein symmetry",
            "Mechanical anchoring system for high-load interior walls",
            "Dramatic acoustic and thermal mass performance",
          ],
        });
      }
    });

    return items;
  }, [product]);

  const categories = ["All", "Flooring", "Kitchen", "Bathroom", "Table Top", "Wall Cladding"];

  const filteredUseCases =
    selectedFilter === "All"
      ? useCases
      : useCases.filter((item) => item.filterCategory === selectedFilter);

  // Lightbox navigation
  const currentIndex = activeItem ? useCases.findIndex((u) => u.id === activeItem.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setActiveItem(useCases[currentIndex - 1]);
      setZoomLevel(1);
    } else {
      setActiveItem(useCases[useCases.length - 1]);
      setZoomLevel(1);
    }
  }, [currentIndex, useCases]);

  const handleNext = useCallback(() => {
    if (currentIndex < useCases.length - 1) {
      setActiveItem(useCases[currentIndex + 1]);
      setZoomLevel(1);
    } else {
      setActiveItem(useCases[0]);
      setZoomLevel(1);
    }
  }, [currentIndex, useCases]);

  // Keyboard navigation for lightbox
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

  if (useCases.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-gold/30 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Curated Use Cases & Applications
            </span>
          </div>
          <h2 className="font-marcellus text-3xl sm:text-4xl text-maroon">
            Realized Architectural Spaces in {product.name}
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Witness how monolithic {product.name} slabs transform luxury environments—from expansive continuous salon floorings and chef&apos;s waterfall islands to spa ensuites, bespoke dining tables, and full-height accent walls.
          </p>
        </div>

        {/* Use Case Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const hasMatches = cat === "All" || useCases.some((u) => u.filterCategory === cat);
            if (!hasMatches) return null;

            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 text-xs font-montserrat uppercase tracking-[0.14em] transition-all rounded-xs border ${
                  isSelected
                    ? "bg-maroon text-gold border-gold font-semibold shadow-xs"
                    : "bg-white/80 text-stone-700 hover:text-maroon border-gold/30 hover:border-gold"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Use Cases as per Use Case Wise */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredUseCases.map((useCase) => (
          <div
            key={useCase.id}
            className="group relative bg-white border border-gold/30 rounded-xs overflow-hidden shadow-sm hover:border-gold hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            {/* Image Container with Hover Motion */}
            <div
              onClick={() => {
                setActiveItem(useCase);
                setZoomLevel(1);
              }}
              className="relative aspect-[16/11] w-full overflow-hidden cursor-pointer bg-stone-900"
            >
              <Image
                src={useCase.image}
                alt={`${product.name} - ${useCase.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Application Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-maroon-deep/90 text-gold text-[10px] font-montserrat uppercase tracking-[0.16em] font-semibold border border-gold/40 backdrop-blur-xs shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>{useCase.category}</span>
                </span>
              </div>

              {/* Inspect Button Icon */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-full bg-black/60 text-white border border-white/20 hover:border-gold backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-gold" />
                </div>
              </div>

              {/* Center Inspect Prompt */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/85 text-ivory text-[10px] font-montserrat uppercase tracking-wider font-medium border border-gold/60 backdrop-blur-md shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-3 h-3 text-gold" />
                  <span>Inspect Full Resolution</span>
                </span>
              </div>

              {/* Bottom Image Title */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <h3 className="font-marcellus text-lg sm:text-xl text-white group-hover:text-gold transition-colors drop-shadow-sm">
                  {useCase.title}
                </h3>
              </div>
            </div>

            {/* Content & Architectural Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
              <div>
                <p className="font-poppins text-xs text-stone-600 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Bullet Architectural Highlights */}
                <div className="mt-4 pt-3 border-t border-gold/20 space-y-1.5">
                  {useCase.architecturalHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] font-poppins text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="mt-5 pt-4 border-t border-gold/20 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveItem(useCase);
                    setZoomLevel(1);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider font-semibold text-maroon hover:text-gold transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </button>

                <a
                  href={getWhatsAppUrl(
                    `Hello INTIOSS, I am interested in specifying ${product.name} for a ${useCase.category} application.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-maroon text-gold hover:bg-maroon-deep text-[11px] font-montserrat uppercase tracking-wider font-semibold border border-gold/40 transition-colors shadow-2xs"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Inquire for Space</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Portaled directly to document.body) */}
      {mounted &&
        activeItem &&
        createPortal(
          <div
            id="usecase-lightbox-overlay"
            style={{ zIndex: 999999 }}
            className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/92 backdrop-blur-md"
          >
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => {
                setActiveItem(null);
                setZoomLevel(1);
              }}
            />

            {/* Main Modal Card */}
            <div className="relative z-10 max-w-5xl w-full bg-maroon-deep text-ivory border-2 border-gold shadow-2xl overflow-hidden rounded-xs flex flex-col lg:flex-row max-h-[92vh]">
              {/* Image View (Left / Top) */}
              <div className="relative lg:w-7/12 bg-black flex items-center justify-center min-h-[320px] sm:min-h-[420px] lg:min-h-[540px] overflow-hidden">
                <div
                  className="relative w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[540px] transition-transform duration-300 flex items-center justify-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <Image
                    src={activeItem.image}
                    alt={`${product.name} - ${activeItem.title}`}
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
                  aria-label="Previous Use Case"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-ivory hover:text-gold border border-gold/40 flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Use Case"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-ivory hover:text-gold border border-gold/40 flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Metadata & Inquiry Panel (Right / Bottom) */}
              <div className="relative lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gold/30 bg-maroon-deep overflow-y-auto">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveItem(null);
                    setZoomLevel(1);
                  }}
                  aria-label="Close Preview"
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
                      Space {currentIndex + 1} of {useCases.length}
                    </span>
                  </div>

                  <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory mt-1">
                    {activeItem.title}
                  </h3>
                  <p className="font-poppins text-xs text-gold/90 mt-1">
                    {product.name} &middot; {product.category}
                  </p>

                  <p className="font-poppins text-xs sm:text-sm text-stone-300 leading-relaxed mt-4">
                    {activeItem.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-5 pt-4 border-t border-gold/25 space-y-2">
                    <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-gold font-semibold block">
                      Architectural Advantages
                    </span>
                    {activeItem.architecturalHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-poppins text-ivory/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Specs Summary */}
                  <div className="mt-5 pt-4 border-t border-gold/25 grid grid-cols-2 gap-3 text-[11px] font-poppins">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-montserrat">
                        Dimensions
                      </span>
                      <span className="text-ivory font-medium">
                        {product.specs.dimensions || "20mm Standard Profile"}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-montserrat">
                        Vein Pattern
                      </span>
                      <span className="text-gold font-medium">{product.veining}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-gold/30 space-y-2.5">
                  <a
                    href={getWhatsAppUrl(
                      `Hello INTIOSS, I am viewing the ${activeItem.title} installation for ${product.name} and would like to check slab availability and get an architectural consultation.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-maroon font-montserrat uppercase tracking-[0.16em] text-xs font-semibold py-3 px-4 border border-gold transition-all duration-200 shadow-sm active:scale-98"
                  >
                    <PhoneCall className="w-4 h-4 text-maroon" />
                    <span>Inquire for This Space on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveItem(null);
                      setZoomLevel(1);
                    }}
                    className="w-full text-center text-xs font-montserrat uppercase tracking-wider text-stone-300 hover:text-white py-1 transition-colors"
                  >
                    &larr; Back to Product Page
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
