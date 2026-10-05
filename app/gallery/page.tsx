"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getWhatsAppUrl } from "@/lib/config";

interface GalleryItem {
  id: string;
  category: "Living" | "Kitchen" | "Bath" | "Facade" | "Hospitality" | "Commercial";
  title: string;
  stoneUsed: string;
  location: string;
  projectType: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "Living",
    title: "Double-Height Bookmatched Salon",
    stoneUsed: "Golden Statuario Italian Marble",
    location: "Worli, South Mumbai",
    projectType: "Private Duplex Penthouse",
    image: "/images/usecases/Intioss_Golden-Statuario_Living-Room-Flooring_03.png",
  },
  {
    id: "g2",
    category: "Kitchen",
    title: "Monolithic Waterfall Chef's Island & Backsplash",
    stoneUsed: "Ice Berg Metamorphic Quartzite",
    location: "Bodakdev, Ahmedabad",
    projectType: "Private Estate Villa",
    image: "/images/usecases/Intioss_Ice-Berg_Kitchen-Countertop-Backsplash_05.png",
  },
  {
    id: "g3",
    category: "Bath",
    title: "Portoro Gold Deep Obsidian Cladding",
    stoneUsed: "Michael Angelo (Portoro Gold)",
    location: "Malabar Hill, Mumbai",
    projectType: "Heritage Master Ensuite",
    image: "/images/usecases/Intioss_Michael-Angelo_Bathroom-Wall-Cladding_04.png",
  },
  {
    id: "g4",
    category: "Bath",
    title: "Pure Vein Italian Marble Bathroom Cladding",
    stoneUsed: "Golden Statuario Carrara",
    location: "Cuffe Parade, Mumbai",
    projectType: "Presidential Sky Villa",
    image: "/images/usecases/Intioss_Golden-Statuario_Bathroom-Wall-Cladding_04.png",
  },
  {
    id: "g5",
    category: "Facade",
    title: "Ventilated Engineered Stone Cladding",
    stoneUsed: "Navona Travertine & Titanium 30mm",
    location: "Alibaug Coastline",
    projectType: "Waterfront Architectural Villa",
    image: "/images/services/stone-facades.jpg",
  },
  {
    id: "g6",
    category: "Hospitality",
    title: "Backlit Emerald Onyx Cocktail Feature Bar",
    stoneUsed: "Emerald Green Onyx",
    location: "Bandra Kurla Complex (BKC)",
    projectType: "Private Members Club",
    image: "/images/stones/emerald-green-onyx.jpg",
  },
  {
    id: "g7",
    category: "Commercial",
    title: "Grand Entrance Vestibule Feature Wall",
    stoneUsed: "Tiger Eye Gold Gemstone",
    location: "SG Highway, Ahmedabad",
    projectType: "Diamond Trading Conglomerate",
    image: "/images/usecases/Intioss_Tiger-Eye_Entrance-Feature-Wall_04.png",
  },
  {
    id: "g8",
    category: "Living",
    title: "Monolithic Sawn Dining Table Top",
    stoneUsed: "White Navona Travertine",
    location: "Juhu Beach Estate, Mumbai",
    projectType: "Architectural Villa",
    image: "/images/usecases/Intioss_White-Travertine_Dining-Table-Top_05.png",
  },
  {
    id: "g9",
    category: "Commercial",
    title: "Fossilised Wood Mosaic Executive Boardroom",
    stoneUsed: "Petrified Wood Mosaic 20mm",
    location: "Nariman Point, Mumbai",
    projectType: "Family Office Headquarters",
    image: "/images/usecases/Intioss_Petrified-Wood-Mosaic_Dining-Table-Top_04.png",
  },
  {
    id: "g10",
    category: "Hospitality",
    title: "Luminous Crystalline Quartzite Reception",
    stoneUsed: "Patagonia Quartzite Translucent",
    location: "Sindhu Bhavan Road, Ahmedabad",
    projectType: "Boutique Luxury Hotel",
    image: "/images/stones/patagonia-quartzite.jpg",
  },
];

const CATEGORIES = ["All", "Living", "Kitchen", "Bath", "Facade", "Hospitality", "Commercial"] as const;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-raleway font-light text-xs sm:text-sm uppercase tracking-[0.3em] text-grey mb-3 block">
            Architectural Portfolio
          </span>
          <h1 className="font-marcellus text-3xl sm:text-5xl text-maroon">
            Marble Use Cases & Master Installations
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-grey mt-4 leading-relaxed">
            Realised projects across South Mumbai and Gujarat. Explore how custom quarry yields, continuous bookmatching, and precision engineering manifest across diverse spaces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-montserrat uppercase tracking-[0.15em] border transition-all ${
                selectedCategory === cat
                  ? "bg-maroon text-white border-gold font-semibold shadow-sm"
                  : "bg-white text-grey border-gold/30 hover:border-gold hover:text-maroon"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveItem(item)}
                className="group relative bg-white border border-gold/30 overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-maroon-deep/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-maroon flex items-center justify-center shadow">
                      <ZoomIn className="w-5 h-5 text-maroon" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-maroon-deep/90 text-ivory text-[9px] font-montserrat uppercase px-2 py-0.5 border border-gold/40">
                    {item.category}
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-5">
                  <span className="font-raleway text-[10px] uppercase tracking-wider text-gold block">
                    {item.stoneUsed}
                  </span>
                  <h3 className="font-marcellus text-lg text-maroon group-hover:text-maroon-deep transition-colors mt-0.5">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-poppins text-grey border-t border-gold/15 pt-2">
                    <span>{item.location}</span>
                    <span className="font-montserrat text-[10px] text-maroon font-medium">
                      {item.projectType}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveItem(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-5xl w-full bg-maroon-deep text-ivory border-2 border-gold shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  aria-label="Close Lightbox"
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-ivory hover:text-gold border border-gold/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Image (8 cols) */}
                  <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] bg-black">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Caption & Metadata (4 cols) */}
                  <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gold/30">
                    <div>
                      <span className="font-raleway text-[10px] uppercase tracking-[0.25em] text-gold block mb-1">
                        Installation Case Study
                      </span>
                      <h3 className="font-marcellus text-2xl text-ivory">
                        {activeItem.title}
                      </h3>

                      <div className="mt-6 space-y-3 font-poppins text-xs divide-y divide-gold/20">
                        <div className="pt-2">
                          <span className="font-raleway text-ivory/60 uppercase block text-[10px]">
                            Stone Specified:
                          </span>
                          <span className="font-montserrat font-medium text-gold text-sm">
                            {activeItem.stoneUsed}
                          </span>
                        </div>
                        <div className="pt-2">
                          <span className="font-raleway text-ivory/60 uppercase block text-[10px]">
                            Location:
                          </span>
                          <span className="text-ivory">{activeItem.location}</span>
                        </div>
                        <div className="pt-2">
                          <span className="font-raleway text-ivory/60 uppercase block text-[10px]">
                            Scope:
                          </span>
                          <span className="text-ivory">{activeItem.projectType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <a
                        href={getWhatsAppUrl(`Hello INTIOSS, I saw the ${activeItem.title} installation in your gallery and would like to discuss a similar execution.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-maroon text-white hover:bg-gold hover:text-maroon py-3 text-xs font-montserrat uppercase tracking-[0.2em] font-semibold border border-gold transition-colors"
                      >
                        <span>Replicate This Look</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
