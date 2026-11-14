"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowUpRight,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  Compass,
  MessageSquare,
} from "lucide-react";
import { IntiossHexagon } from "@/components/brand/IntiossHexagon";
import { getWhatsAppUrl } from "@/lib/config";

export interface ColorStoneItem {
  id: string;
  name: string;
  slug?: string;
  category: string;
  origin: string;
  image: string;
  highlight: string;
  applications: string[];
  specs?: string;
  href: string;
}

export interface ColorFamilyData {
  id: string;
  name: string;
  subtitle: string;
  count: string;
  swatchGradient: string;
  swatchBorder: string;
  accentGlow: string;
  mood: string;
  description: string;
  bestSuitedFor: string[];
  stones: ColorStoneItem[];
}

export const COLOR_FAMILIES: ColorFamilyData[] = [
  {
    id: "white",
    name: "White & Crystalline",
    subtitle: "Purity, Optical Luminosity & Grandeur",
    count: "12+ Varieties",
    swatchGradient: "from-white via-[#F8F9FA] to-[#E5E7EB]",
    swatchBorder: "border-white/80 ring-white/50",
    accentGlow: "rgba(255, 255, 255, 0.25)",
    mood: "Luminous, expansive & timeless minimal luxury",
    description:
      "Celebrated across Greek and Roman antiquities, pure white calcite marbles and crystalline quartzites maximize ambient light reflection, creating breathtaking, expansive sanctuaries.",
    bestSuitedFor: ["Living Room Flooring", "Master Bathrooms", "Minimalist Wall Claddings", "Spa Vanities"],
    stones: [
      {
        id: "thassos-white",
        name: "Thassos White Marble",
        slug: "thassos-white-marble",
        category: "Natural Marble",
        origin: "Island of Thassos, Greece",
        image: "/images/stones/thassos/thassos-slab.png",
        highlight: "Purest Snow-White · Zero Veins",
        applications: ["Flooring", "Bathrooms", "Wall Cladding"],
        specs: "290 × 173 cm · 20mm",
        href: "/products/thassos-white-marble",
      },
      {
        id: "statuario-classic",
        name: "Statuario Classic Marble",
        slug: "statuario-marble",
        category: "Calcite Marble",
        origin: "Carrara, Tuscany, Italy",
        image: "/images/stones/statuario/statuario-slab.png",
        highlight: "Bold Raven-Charcoal Veins",
        applications: ["Living Foyers", "Feature Walls", "Islands"],
        specs: "292 × 191 cm · 20mm",
        href: "/products/statuario-marble",
      },
      {
        id: "calacatta-borghini",
        name: "Calacatta Borghini",
        category: "Italian Calacatta",
        origin: "Carrara, Italy",
        image: "/images/stones/calacatta-borghini.jpg",
        highlight: "Warm Grey & Honey Ribbon Flow",
        applications: ["Kitchen Islands", "Master Baths"],
        specs: "Monolithic Slabs · 20mm",
        href: "/products?category=Natural+Stones",
      },
      {
        id: "super-spider",
        name: "Super Spider Marble",
        slug: "super-spider-marble",
        category: "Exotic Marble",
        origin: "Imported Quarry",
        image: "/images/stones/super-spider/super-spider-slab.png",
        highlight: "Micro-Spider Web Veining Matrix",
        applications: ["Accent Walls", "Flooring Inlays"],
        specs: "280 × 165 cm · 18mm",
        href: "/products/super-spider-marble",
      },
    ],
  },
  {
    id: "gold-yellow",
    name: "Gold & Amber Honey",
    subtitle: "Regal Warmth, Amber Inclusions & Radiance",
    count: "7+ Varieties",
    swatchGradient: "from-[#FCD34D] via-[#DDB62B] to-[#B45309]",
    swatchBorder: "border-[#DDB62B] ring-[#DDB62B]/50",
    accentGlow: "rgba(221, 182, 43, 0.35)",
    mood: "Warm, opulent, sun-drenched and majestic",
    description:
      "Infused with rare iron oxide and amber calcite crystallizations, gold and honey-toned stones bring royal warmth and radiant light into dining salons, grand lobbies, and statement bars.",
    bestSuitedFor: ["Feature Walls", "Bespoke Dining Tops", "Backlit Bar Counters", "Executive Lounges"],
    stones: [
      {
        id: "golden-statuario",
        name: "Golden Statuario Marble",
        slug: "golden-statuario-marble",
        category: "Prestige Marble",
        origin: "Carrara, Tuscany, Italy",
        image: "/images/stones/golden-statuario/golden-statuario-slab.png",
        highlight: "Honey Gold Veining on Pure Calcite",
        applications: ["Feature Wall", "Dining Table", "Bath"],
        specs: "284 × 178 cm · 20mm",
        href: "/products/golden-statuario-marble",
      },
      {
        id: "tiger-eye",
        name: "Tiger Eye Gemstone",
        category: "Semi-Precious Gemstone",
        origin: "Exotic Gemstone Mines",
        image: "/images/stones/tiger-eye.jpg",
        highlight: "Chatoyant Silky Gold Luminescence",
        applications: ["Backlit Countertops", "Wall Inlays"],
        specs: "Cut-to-Size Monolith",
        href: "/products?category=Semi-Precious+Stones",
      },
      {
        id: "golden-statuario-atelier",
        name: "Golden Statuario (Atelier Block)",
        category: "Calcite Marble",
        origin: "Carrara, Italy",
        image: "/images/stones/golden-statuario.jpg",
        highlight: "Continuous Mirror Bookmatch Pairs",
        applications: ["Atrium Walls", "Executive Foyers"],
        specs: "Consecutive Block Slabs",
        href: "/products/golden-statuario-marble",
      },
    ],
  },
  {
    id: "beige",
    name: "Beige & Warm Crema",
    subtitle: "Earthy Warmth, Serenity & Classical Calm",
    count: "8+ Varieties",
    swatchGradient: "from-[#F5EBE0] via-[#E6CCB2] to-[#DDB892]",
    swatchBorder: "border-[#DDB892] ring-[#DDB892]/40",
    accentGlow: "rgba(221, 184, 146, 0.3)",
    mood: "Soothing, grounded, organic and Mediterranean",
    description:
      "Characterized by gentle travertine pores, sedimentary fossils, and creamy champagne hues, beige marbles provide serene organic tactile surfaces favored by contemporary quiet-luxury architecture.",
    bestSuitedFor: ["Monolithic Flooring", "Villa Patios & Pools", "Minimalist Fireplaces", "Corridors"],
    stones: [
      {
        id: "white-travertine",
        name: "White Travertine Navona",
        category: "Sedimentary Travertine",
        origin: "Tivoli, Italy",
        image: "/images/stones/white-travertine.jpg",
        highlight: "Natural Pores & Vein-Cut Bands",
        applications: ["Flooring", "Fireplaces", "Patios"],
        specs: "Honed / Filled Profile",
        href: "/products?category=Natural+Stones",
      },
      {
        id: "patagonia-quartzite",
        name: "Patagonia Exotic Quartzite",
        category: "Exotic Quartzite",
        origin: "Brazil",
        image: "/images/stones/patagonia-quartzite.jpg",
        highlight: "Translucent Quartz & Feldspar Islands",
        applications: ["Backlit Bars", "Sculptural Tops"],
        specs: "Mohs 7 · Heat Proof",
        href: "/products?category=Natural+Stones",
      },
      {
        id: "montano-pulchiano",
        name: "Montano Pulchiano Crema",
        slug: "montano-pulchiano-marble",
        category: "Italian Marble",
        origin: "Italy",
        image: "/images/stones/montano-pulchiano/montano-pulchiano-slab.png",
        highlight: "Warm Cream Matrix with Amber Ribbons",
        applications: ["Living Foyers", "Wall Cladding"],
        specs: "275 × 168 cm · 18mm",
        href: "/products/montano-pulchiano-marble",
      },
    ],
  },
  {
    id: "grey",
    name: "Grey & Silver Mist",
    subtitle: "Contemporary Restraint, Architectural Depth",
    count: "10+ Varieties",
    swatchGradient: "from-[#9CA3AF] via-[#6B7280] to-[#4B5563]",
    swatchBorder: "border-[#9CA3AF] ring-[#9CA3AF]/40",
    accentGlow: "rgba(156, 163, 175, 0.3)",
    mood: "Sophisticated, modern, masculine and tailored",
    description:
      "A staple of international high-rise architecture, grey and silver marbles provide calm chromatic neutrality while showcasing intricate white quartz veins and dramatic clouds of mineral depth.",
    bestSuitedFor: ["Modern Penthouse Floors", "Feature Walls", "Executive Conference Suites", "Vanities"],
    stones: [
      {
        id: "silver-travertine",
        name: "Silver Travertine",
        category: "Architectural Travertine",
        origin: "Tivoli, Italy",
        image: "/images/stones/silver-travertine.jpg",
        highlight: "Linear Silver & Titanium Vein Flow",
        applications: ["Exterior Facades", "Living Floors"],
        specs: "Cross-cut / Vein-cut",
        href: "/products?category=Natural+Stones",
      },
      {
        id: "statuario-rb4384",
        name: "Statuario RB-4384 (Charcoal Grey)",
        slug: "statuario-rb4384-marble",
        category: "Calcite Marble",
        origin: "Carrara, Italy",
        image: "/images/stones/statuario-rb4384/statuario-rb4384-slab.png",
        highlight: "High-Contrast Charcoal & Silver Webs",
        applications: ["Living Areas", "Feature Walls"],
        specs: "254 × 180 cm · 20mm",
        href: "/products/statuario-rb4384-marble",
      },
      {
        id: "montano-pulchiano-86978",
        name: "Montano Pulchiano (Silver Grey)",
        slug: "montano-pulchiano-86978-marble",
        category: "Imported Marble",
        origin: "Italy",
        image: "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-slab.png",
        highlight: "Muted Silver-Grey Cloud Dynamics",
        applications: ["Bathroom Cladding", "Vanities"],
        specs: "Consecutive Lot 86978",
        href: "/products/montano-pulchiano-86978-marble",
      },
    ],
  },
  {
    id: "black",
    name: "Black & Cosmic Charcoal",
    subtitle: "Dramatic Mystery, Contrast & Gravitas",
    count: "7+ Varieties",
    swatchGradient: "from-[#374151] via-[#1F2937] to-[#111827]",
    swatchBorder: "border-[#4B5563] ring-[#374151]/50",
    accentGlow: "rgba(55, 65, 81, 0.4)",
    mood: "Intense, dramatic, prestigious and sculptural",
    description:
      "Deep obsidian matrices interwoven with contrasting white and gold calcite veins create sculptural high-contrast statements for powder rooms, monolithic fireplaces, and executive cocktail bars.",
    bestSuitedFor: ["Powder Rooms", "Monolithic Fireplaces", "Cocktail Bars", "Kitchen Islands"],
    stones: [
      {
        id: "statuario-rb599a",
        name: "Statuario RB599A (Raven Black Veins)",
        slug: "statuario-rb599a-marble",
        category: "Calcite Marble",
        origin: "Carrara, Italy",
        image: "/images/stones/statuario-rb599a/statuario-rb599a-slab.png",
        highlight: "Monumental 125\" Raven Black Striations",
        applications: ["Double-Height Atriums", "Living Walls"],
        specs: "318 × 196 cm · 20mm",
        href: "/products/statuario-rb599a-marble",
      },
      {
        id: "emperador-dark",
        name: "Emperador Dark",
        category: "Spanish Marble",
        origin: "Spain",
        image: "/images/stones/emperador-dark.jpg",
        highlight: "Deep Espresso Matrix with Spider Calcite",
        applications: ["Flooring Borders", "Vanity Slabs"],
        specs: "Polished Mirror Surface",
        href: "/products?category=Natural+Stones",
      },
      {
        id: "paunazo-charcoal",
        name: "Paunazo Quartzite (Charcoal Accent)",
        slug: "paunazo-quartzite",
        category: "Metamorphic Quartzite",
        origin: "Exotic Import",
        image: "/images/stones/paunazo/paunazo-feature-wall.png",
        highlight: "Deep Midnight Mineral Flow · Mohs 7",
        applications: ["Waterfall Islands", "Feature Walls"],
        specs: "Acid & Scratch Proof",
        href: "/products/paunazo-quartzite",
      },
    ],
  },
  {
    id: "blue",
    name: "Exotic Blue & Gemstones",
    subtitle: "Celestial Azure, Lapis & Coastal Radiance",
    count: "6+ Varieties",
    swatchGradient: "from-[#60A5FA] via-[#2563EB] to-[#1E3A8A]",
    swatchBorder: "border-[#3B82F6] ring-[#2563EB]/40",
    accentGlow: "rgba(37, 99, 235, 0.35)",
    mood: "Celestial, rare, vibrant and hypnotic",
    description:
      "Formed by sodalite, dumortierite, and lazurite minerals, natural blue stones are among the rarest geological treasures on earth, transforming statement powder rooms and backlit bars into works of art.",
    bestSuitedFor: ["Backlit Statement Walls", "Powder Room Vanities", "Private Bar Lounges", "Art Inlays"],
    stones: [
      {
        id: "blue-agate",
        name: "Blue Agate Gemstone",
        category: "Semi-Precious Gemstone",
        origin: "Brazil Gemstone Mines",
        image: "/images/stones/blue-agate.jpg",
        highlight: "Translucent Deep Azure Geode Rings",
        applications: ["Backlit Feature Walls", "Bar Tops"],
        specs: "Custom Cut-to-Size Profile",
        href: "/products?category=Semi-Precious+Stones",
      },
      {
        id: "ice-berg",
        name: "Ice Berg Quartzite",
        category: "Exotic Quartzite",
        origin: "Exotic Quarry",
        image: "/images/stones/ice-berg.jpg",
        highlight: "Glacial Ice Blue Translucent Matrix",
        applications: ["Spa Vanities", "Kitchen Tops"],
        specs: "Mohs 7 · Backlit Ready",
        href: "/products?category=Natural+Stones",
      },
      {
        id: "white-crystal-quartz",
        name: "White Crystal Luminescence",
        slug: "white-crystal-quartz",
        category: "Pure Quartzite",
        origin: "Brazil",
        image: "/images/stones/white-crystal-quartz/white-crystal-quartz-slab.png",
        highlight: "Backlit Crystalline Quartz Radiance",
        applications: ["Backlit Wall Panels", "Bar Fronts"],
        specs: "278 × 182 cm · 20mm",
        href: "/products/white-crystal-quartz",
      },
    ],
  },
  {
    id: "green",
    name: "Emerald & Forest Green",
    subtitle: "Botanical Opulence, Serenity & Jade Depth",
    count: "5+ Varieties",
    swatchGradient: "from-[#34D399] via-[#059669] to-[#064E3B]",
    swatchBorder: "border-[#10B981] ring-[#059669]/40",
    accentGlow: "rgba(5, 150, 105, 0.35)",
    mood: "Botanical, restorative, lush and regal",
    description:
      "Rich with serpentine and chlorite veins, green marbles and translucent emerald onyx infuse architectural interiors with botanical harmony, biophilic serenity, and museum-grade prestige.",
    bestSuitedFor: ["Spa Sanctuaries", "Executive Library Cladding", "Dining Tabletops", "Foyer Murals"],
    stones: [
      {
        id: "emerald-green-onyx",
        name: "Emerald Green Onyx",
        category: "Translucent Onyx",
        origin: "Exotic Quarry",
        image: "/images/stones/emerald-green-onyx.jpg",
        highlight: "Translucent Jade Crystal Stratification",
        applications: ["Backlit Screens", "Bespoke Basin"],
        specs: "Backlight Translucent",
        href: "/products?category=Natural+Stones",
      },
      {
        id: "amethyst-composite",
        name: "Amethyst & Emerald Mineral",
        category: "Semi-Precious Stone",
        origin: "Exotic Gemstone Mines",
        image: "/images/products/amethyst_slab_1791259421373.jpg",
        highlight: "Hand-Assembled Natural Gem Matrix",
        applications: ["Sculptural Murals", "Dining Table"],
        specs: "Bespoke Jewelry Slab",
        href: "/products?category=Semi-Precious+Stones",
      },
      {
        id: "green-carving-inlay",
        name: "Verde Botanical Inlays",
        category: "Artisanal Stone",
        origin: "INTIOSS Atelier",
        image: "/images/services/cnc-waterjet.jpg",
        highlight: "5-Axis Waterjet Green Marble Inlays",
        applications: ["Floor Medallions", "Wall Murals"],
        specs: "Sub-Millimeter Tolerance",
        href: "/services#cnc-waterjet",
      },
    ],
  },
  {
    id: "pink-multi",
    name: "Pink, Rose & Multicolor Exotics",
    subtitle: "Warm Copper, Fluid Veins & Living Geology",
    count: "8+ Varieties",
    swatchGradient: "from-[#FDA4AF] via-[#E11D48] to-[#9F1239]",
    swatchBorder: "border-[#F43F5E] ring-[#E11D48]/40",
    accentGlow: "rgba(225, 29, 72, 0.35)",
    mood: "Romantic, energetic, unique and artistic",
    description:
      "Uniting rare rose calcite ribbons with exotic copper, violet, and multi-hued metamorphic striations, these stones represent the avant-garde pinnacle of contemporary architectural luxury.",
    bestSuitedFor: ["Dramatic Dining Monoliths", "Powder Rooms", "Artisan Columns", "Boutique Lobbies"],
    stones: [
      {
        id: "paunazo-multi",
        name: "Paunazo Exotic Quartzite",
        slug: "paunazo-quartzite",
        category: "Metamorphic Quartzite",
        origin: "Exotic Quarry",
        image: "/images/stones/paunazo/paunazo-slab.png",
        highlight: "Multicolor Fluid Veining · Mohs 7",
        applications: ["Waterfall Islands", "Table Tops"],
        specs: "302 × 195 cm · 20mm",
        href: "/products/paunazo-quartzite",
      },
      {
        id: "michael-angelo",
        name: "Michael Angelo Marble",
        slug: "michael-angelo-marble",
        category: "Carrara Exotic",
        origin: "Carrara, Tuscany, Italy",
        image: "/images/stones/michael-angelo/michael-angelo-slab.png",
        highlight: "Blush Rose & Copper Vein Contrast",
        applications: ["Vanity Slabs", "Feature Walls"],
        specs: "270 × 160 cm · 18mm",
        href: "/products/michael-angelo-marble",
      },
      {
        id: "michael-angelo-atelier",
        name: "Michael Angelo (Atelier Slab)",
        category: "Calcite Marble",
        origin: "Carrara, Italy",
        image: "/images/stones/michael-angelo.jpg",
        highlight: "Dramatic Warm Rose & Gold Swirls",
        applications: ["Living Foyers", "Accent Slabs"],
        specs: "Calibrated Slabs",
        href: "/products/michael-angelo-marble",
      },
    ],
  },
  {
    id: "brown",
    name: "Brown & Imperial Bronze",
    subtitle: "Heirloom Depth, Petrified Timber & Grounded Warmth",
    count: "6+ Varieties",
    swatchGradient: "from-[#A16207] via-[#78350F] to-[#451A03]",
    swatchBorder: "border-[#92400E] ring-[#78350F]/40",
    accentGlow: "rgba(120, 53, 15, 0.4)",
    mood: "Heirloom, rich, masculine and enduring",
    description:
      "Evoking ancient fossilized forests and rich espresso marble quarries, brown and bronze stones bestow timeless warmth, grounding balance, and tactile depth to library salons and dining spaces.",
    bestSuitedFor: ["Executive Library Flooring", "Dining Monoliths", "Fireplace Mantels", "Bar Cladding"],
    stones: [
      {
        id: "petrified-wood",
        name: "Petrified Wood Monolith",
        category: "Fossilized Semi-Precious",
        origin: "Ancient Fossil Formations",
        image: "/images/stones/petrified-wood.jpg",
        highlight: "Millions of Years of Mineralized Wood",
        applications: ["Statement Table Tops", "Sculptures"],
        specs: "Rare Gemstone Slabs",
        href: "/products?category=Exclusive+Table+Tops+%E2%80%94+Stone",
      },
      {
        id: "paunazo-table",
        name: "Paunazo Bronze Table Slab",
        slug: "paunazo-quartzite",
        category: "Table Top Stone",
        origin: "Exotic Import",
        image: "/images/stones/paunazo/paunazo-table-top.png",
        highlight: "Warm Bronze & Gold Chamfer Edge",
        applications: ["Dining Tables", "Conference Slabs"],
        specs: "Custom Monolith Profile",
        href: "/products/paunazo-quartzite",
      },
      {
        id: "emperador-dark-brown",
        name: "Bronze Emperador Dark",
        category: "Spanish Marble",
        origin: "Spain",
        image: "/images/stones/emperador-dark.jpg",
        highlight: "Rich Espresso with Fine Bronze Veining",
        applications: ["Flooring Accents", "Vanity Slabs"],
        specs: "Polished Architectural Cut",
        href: "/products?category=Natural+Stones",
      },
    ],
  },
];

export function ColorStoneSelector() {
  const [activeColorId, setActiveColorId] = useState<string>("white");
  const swatchesRef = useRef<HTMLDivElement>(null);

  const activeFamily =
    COLOR_FAMILIES.find((c) => c.id === activeColorId) || COLOR_FAMILIES[0];

  const handleSelectColor = (id: string) => {
    setActiveColorId(id);
  };

  return (
    <section
      id="color-selector"
      className="relative w-full bg-[#140409] text-ivory py-20 sm:py-28 overflow-hidden border-b border-gold/25"
      aria-label="Select Stones Color Wise"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[170px] transition-colors duration-1000"
          style={{ backgroundColor: activeFamily.accentGlow }}
        />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-maroon-deep/50 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#DDB62B_1px,transparent_1px)] [background-size:36px_36px] opacity-10" />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Tag / Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-white/5 border border-gold/40 shadow-[0_2px_12px_rgba(221,182,43,0.18)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <IntiossHexagon size={15} useVector={true} enablePrismaticGlint={true} />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
              Select Color Wise • Chromatic Stone Palette
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          {/* Main Heading */}
          <h2 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal tracking-wide leading-tight text-center">
            Curate by Earth&apos;s Spectrum.
          </h2>

          {/* Subtitle */}
          <p className="font-jost text-base sm:text-lg lg:text-xl text-ivory/80 mt-3 max-w-2xl leading-relaxed text-center">
            From pure crystalline snow-whites to royal golden ambers and deep cosmic blacks, discover rare architectural stones categorized by nature&apos;s living hues.
          </p>

          {/* Luxury Horizontal Color Palette Swatches Strip */}
          <div
            ref={swatchesRef}
            className="mt-10 w-full flex items-center justify-start lg:justify-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 scrollbar-none select-none px-2"
          >
            {COLOR_FAMILIES.map((color) => {
              const isSelected = activeColorId === color.id;

              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => handleSelectColor(color.id)}
                  aria-label={`Select ${color.name} stones`}
                  className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer border ${
                    isSelected
                      ? "bg-black/90 border-gold shadow-[0_4px_24px_rgba(221,182,43,0.45)] scale-105 ring-1 ring-gold"
                      : "bg-black/50 border-white/15 hover:border-gold/60 hover:bg-white/5 shadow-md"
                  }`}
                >
                  {/* Color Swatch Dot with Gradient */}
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${color.swatchGradient} border ${color.swatchBorder} shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  />

                  {/* Color Name */}
                  <span
                    className={`font-montserrat text-xs sm:text-[13px] tracking-wider uppercase font-semibold transition-colors ${
                      isSelected ? "text-gold font-bold" : "text-ivory/80 group-hover:text-ivory"
                    }`}
                  >
                    {color.name.split(" ")[0]}
                  </span>

                  {/* Stones Count Badge */}
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-montserrat ${
                      isSelected
                        ? "bg-gold text-maroon-deep font-bold"
                        : "bg-white/10 text-ivory/60 group-hover:text-gold"
                    }`}
                  >
                    {color.stones.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE COLOR SHOWCASE BOARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeColorId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Color Palette Information Banner */}
            <div className="relative mb-8 sm:mb-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-black/80 via-black/50 to-transparent border border-gold/30 backdrop-blur-md shadow-xl overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full bg-gradient-to-br ${activeFamily.swatchGradient} border-2 border-gold shadow-md`}
                  />
                  <span className="text-xs font-montserrat uppercase tracking-[0.2em] text-gold font-bold">
                    {activeFamily.name} Palette
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-jost text-ivory/70 italic">
                    {activeFamily.mood}
                  </span>
                </div>

                <h3 className="font-marcellus text-2xl sm:text-3xl text-ivory">
                  {activeFamily.subtitle}
                </h3>

                <p className="font-jost text-sm sm:text-base text-ivory/80 leading-relaxed">
                  {activeFamily.description}
                </p>

                {/* Recommended Spaces Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] font-montserrat uppercase tracking-wider text-gold/80 font-semibold mr-1">
                    Optimal Applications:
                  </span>
                  {activeFamily.bestSuitedFor.map((app) => (
                    <span
                      key={app}
                      className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-montserrat text-ivory/90 tracking-wide"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Concierge Inquiry Button for this Color Range */}
              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={getWhatsAppUrl(`Hello INTIOSS Concierge, I would like to explore your curated slabs in the ${activeFamily.name} palette for my project.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-montserrat text-xs uppercase tracking-[0.16em] font-bold shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire {activeFamily.name.split(" ")[0]} Slabs</span>
                </a>

                <Link
                  href="/book-match"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-gold/15 border border-gold/40 text-ivory hover:text-gold font-montserrat text-xs uppercase tracking-[0.14em] font-medium transition-all"
                >
                  <Compass className="w-3.5 h-3.5 text-gold" />
                  <span>Bookmatch Simulator</span>
                </Link>
              </div>
            </div>

            {/* Curated Stones Grid for the Selected Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {activeFamily.stones.map((stone, idx) => (
                <motion.div
                  key={stone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.35 }}
                  className="group relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 hover:border-gold/60 shadow-lg hover:shadow-[0_16px_36px_rgba(221,182,43,0.22)] transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Slab Preview Image Container with Zoom */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
                    <Image
                      src={stone.image}
                      alt={stone.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Geological Category Badge on Top-Left */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/75 border border-gold/40 text-[10px] font-montserrat uppercase tracking-wider text-gold font-semibold backdrop-blur-md">
                        {stone.category}
                      </span>
                    </div>

                    {/* Quick View Button on Hover Top-Right */}
                    <Link
                      href={stone.href}
                      aria-label={`View details of ${stone.name}`}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/30 hover:border-gold text-white hover:text-gold flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 duration-200"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Origin Tag on Bottom-Left of Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-montserrat text-ivory/80">
                      <span className="tracking-wide">{stone.origin}</span>
                      {stone.specs && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-xs">
                          {stone.specs.split("·")[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Details Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Signature Highlight Badge */}
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-gold font-medium block mb-1">
                        {stone.highlight}
                      </span>

                      {/* Stone Name */}
                      <h4 className="font-marcellus text-xl text-ivory group-hover:text-gold transition-colors leading-snug">
                        {stone.name}
                      </h4>
                    </div>

                    {/* Applications Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stone.applications.map((app) => (
                        <span
                          key={app}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-montserrat text-ivory/70 tracking-wider"
                        >
                          {app}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={stone.href}
                        className="inline-flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider text-gold hover:text-gold-light font-semibold transition-colors"
                      >
                        <span>View Stone Slabs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={getWhatsAppUrl(`Hi INTIOSS, I am inquiring about the availability and pricing of ${stone.name} (${stone.origin}).`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-montserrat text-ivory/60 hover:text-white transition-colors"
                      >
                        Hold Lot →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Bar: Palette Guidance & Direct Catalogue Link */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-montserrat text-ivory/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="tracking-wider uppercase">
              Click any color swatch above to filter rare geological marbles, quartzites & onyx
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="tracking-wider uppercase text-gold font-semibold">
              8 Curated Color Families
            </span>
            <span className="text-white/20">|</span>
            <Link
              href="/products"
              className="text-ivory hover:text-gold transition-colors tracking-wider uppercase font-semibold underline underline-offset-4 decoration-gold/50"
            >
              Browse Complete Multi-Color Inventory →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
