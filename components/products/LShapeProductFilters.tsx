"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Building2,
  Wrench,
  Globe,
  SlidersHorizontal,
  Search,
  X,
  Grid3X3,
  LayoutGrid,
} from "lucide-react";
import { StoneProduct } from "@/lib/types";
import { CATEGORY_TYPES_MAP } from "@/data/categoryTypes";
import { FilterState, APPLICATION_OPTIONS } from "./ProductFilters";

export const PRIMARY_PRODUCTS = [
  { id: "Natural Stones", name: "Natural Stones", shortName: "Natural Stone" },
  { id: "Semi-Precious Stones", name: "Semi-Precious Stones", shortName: "Semi-Precious" },
  { id: "Exclusive Table Tops — Stone", name: "Exclusive Table Tops", shortName: "Table Tops" },
  { id: "Stone Veneers", name: "Stone Veneers", shortName: "Stone Veneers" },
  { id: "Stone Art", name: "Stone Art & Sculptures", shortName: "Stone Art" },
  { id: "Mosaics", name: "Mosaics & Medallions", shortName: "Mosaics" },
];

const ALL_PRODUCT_IDS = PRIMARY_PRODUCTS.map((p) => p.id);

export const COLOR_PALETTE_OPTIONS: {
  name: string;
  label: string;
  bg: string;
  border: string;
}[] = [
  { name: "White", label: "White", bg: "#FFFFFF", border: "#D6D3D1" },
  { name: "Beige", label: "Beige", bg: "#E5D3B8", border: "#CBB597" },
  { name: "Grey", label: "Grey", bg: "#8A8F98", border: "#6B7280" },
  { name: "Black", label: "Black", bg: "#18181B", border: "#09090B" },
  { name: "Gold-Yellow", label: "Gold", bg: "#D4AF37", border: "#A68620" },
  { name: "Brown", label: "Brown", bg: "#634130", border: "#442B1E" },
  { name: "Green", label: "Green", bg: "#1E563B", border: "#133D29" },
  { name: "Blue", label: "Blue", bg: "#1E4E8C", border: "#133563" },
  { name: "Pink", label: "Pink", bg: "#D98A92", border: "#B56A72" },
  { name: "Red", label: "Red", bg: "#A3222A", border: "#78151C" },
  {
    name: "Multi",
    label: "Multi",
    bg: "linear-gradient(135deg, #FAF7F2 25%, #541B2A 55%, #DDB62B 85%)",
    border: "#DDB62B",
  },
];

const EXTRA_SWATCH_MAP: Record<string, { bg: string; border: string }> = {
  purple: { bg: "#6D28D9", border: "#4C1D95" },
  violet: { bg: "#7C3AED", border: "#5B21B6" },
  amethyst: { bg: "#7E22CE", border: "#581C87" },
  lavender: { bg: "#C084FC", border: "#9333EA" },
  teal: { bg: "#0F766E", border: "#115E59" },
  turquoise: { bg: "#0D9488", border: "#115E59" },
  cyan: { bg: "#0891B2", border: "#155E75" },
  copper: { bg: "#B45309", border: "#78350F" },
  bronze: { bg: "#92400E", border: "#713F12" },
  rust: { bg: "#9A3412", border: "#7C2D12" },
  terracotta: { bg: "#C2410C", border: "#9A3412" },
  orange: { bg: "#EA580C", border: "#C2410C" },
  peach: { bg: "#FDBA74", border: "#FB923C" },
  cream: { bg: "#FEF3C7", border: "#E5D3B8" },
  ivory: { bg: "#FAF7F2", border: "#D6CFC2" },
  yellow: { bg: "#EAB308", border: "#CA8A04" },
  amber: { bg: "#D97706", border: "#B45309" },
  silver: { bg: "#CBD5E1", border: "#94A3B8" },
  charcoal: { bg: "#334155", border: "#1E293B" },
  emerald: { bg: "#047857", border: "#065F46" },
  rose: { bg: "#E11D48", border: "#9F1239" },
  maroon: { bg: "#541B2A", border: "#300C16" },
};

function resolveDynamicColorSwatch(colorName: string): { bg: string; border: string } {
  const lower = colorName.trim().toLowerCase();
  for (const [key, val] of Object.entries(EXTRA_SWATCH_MAP)) {
    if (lower.includes(key)) return val;
  }
  return { bg: lower, border: "#DDB62B" };
}

const FINISH_OPTIONS = [
  "Polished",
  "Honed",
  "Leathered",
  "Translucent Backlit",
  "Hand-Carved",
  "Waterjet Precision",
  "Brushed",
  "Antique",
];

const ORIGIN_COUNTRIES = [
  "Italy",
  "Greece",
  "Brazil",
  "India",
  "Spain",
  "Turkey",
  "South Africa",
];

const PATTERN_OPTIONS = [
  "Bookmatch-ready",
  "Dramatic",
  "Intricate Inlay",
  "Artisanal Mosaic",
  "Hand-Sculpted",
  "Veined",
  "Uniform",
];

interface TopLFilterBarProps {
  filterState: FilterState;
  onFilterChange: (next: FilterState) => void;
  onClearAll: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: "featured" | "name-asc" | "name-desc";
  onSortChange: (sort: "featured" | "name-asc" | "name-desc") => void;
  density: "comfortable" | "compact";
  onDensityChange: (d: "comfortable" | "compact") => void;
  totalResults: number;
  totalProducts: number;
  activeFiltersCount: number;
  allProducts: StoneProduct[];
  onRemoveFilter: (key: keyof FilterState, val: string) => void;
}

function PopoverTickItem({
  checked,
  onClick,
  label,
  count,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
  count?: number | string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className={`group w-full flex items-center justify-between py-2 px-3 rounded-xl text-left text-xs font-montserrat transition-all cursor-pointer ${
        checked
          ? "bg-gold/15 text-maroon-deep font-semibold border border-gold/40"
          : "hover:bg-[#FAF7F2] text-stone-700 hover:text-maroon-deep border border-transparent"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className={`w-4 h-4 rounded-[4px] flex items-center justify-center border shrink-0 transition-colors ${
            checked
              ? "bg-maroon-deep border-gold text-gold"
              : "bg-white border-stone-300 group-hover:border-gold"
          }`}
        >
          {checked && <Check className="w-3 h-3 stroke-[3]" />}
        </span>
        <span className="truncate">{label}</span>
      </div>
      {count !== undefined && (
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ml-2 shrink-0 ${
            checked
              ? "bg-maroon-deep text-gold font-bold"
              : "bg-stone-100 text-stone-500 group-hover:bg-gold/20 group-hover:text-maroon-deep"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function TopLFilterBar({
  filterState,
  onFilterChange,
  onClearAll,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  density,
  onDensityChange,
  totalResults,
  totalProducts,
  activeFiltersCount,
  allProducts,
  onRemoveFilter,
}: TopLFilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<"category" | "subCategory" | "application" | null>(
    null
  );
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const current = filterState[key];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    onFilterChange({ ...filterState, [key]: updated });
  };

  const handleCategoryToggle = (catId: string) => {
    const exists = filterState.category.includes(catId);
    if (exists) {
      const childTypes = CATEGORY_TYPES_MAP[catId] || [];
      onFilterChange({
        ...filterState,
        category: filterState.category.filter((c) => c !== catId),
        subCategory: filterState.subCategory.filter((s) => !childTypes.includes(s)),
      });
    } else {
      onFilterChange({
        ...filterState,
        category: [...filterState.category, catId],
      });
    }
  };

  const isAllCategories =
    filterState.category.length === 0 || filterState.category.length === ALL_PRODUCT_IDS.length;

  const activeCategoriesForSubs = useMemo(() => {
    return filterState.category.length > 0 ? filterState.category : Object.keys(CATEGORY_TYPES_MAP);
  }, [filterState.category]);

  const allCurrentSubProducts = useMemo(() => {
    const list: string[] = [];
    activeCategoriesForSubs.forEach((cat) => {
      (CATEGORY_TYPES_MAP[cat] || []).forEach((s) => {
        if (!list.includes(s)) list.push(s);
      });
    });
    return list;
  }, [activeCategoriesForSubs]);

  const getProductCountForCategory = (catId: string) => {
    const count = allProducts.filter((p) => p.category === catId).length;
    return count > 0 ? count : "Bespoke";
  };

  const getProductCountForSub = (sub: string) => {
    const s = sub.toLowerCase().replace(/[\s-]/g, "");
    return allProducts.filter((p) => {
      const pSub = (p.subCategory || "").toLowerCase().replace(/[\s-]/g, "");
      const pName = p.name.toLowerCase().replace(/[\s-]/g, "");
      return pSub.includes(s) || s.includes(pSub) || pName.includes(s);
    }).length;
  };

  const getProductCountForApp = (app: string) => {
    return allProducts.filter((p) =>
      p.applications.some(
        (a) => a.toLowerCase().includes(app.toLowerCase()) || app.toLowerCase().includes(a.toLowerCase())
      )
    ).length;
  };

  // Automatically discover any new colorFamily added to products that isn't already in COLOR_PALETTE_OPTIONS
  const dynamicColorOptions = useMemo(() => {
    const options = [...COLOR_PALETTE_OPTIONS];
    const knownKeys = new Set<string>();
    options.forEach((opt) => {
      knownKeys.add(opt.name.toLowerCase());
      knownKeys.add(opt.label.toLowerCase());
    });

    allProducts.forEach((p) => {
      const raw = (p.colorFamily || "").trim();
      if (!raw) return;
      const lower = raw.toLowerCase();
      if (!knownKeys.has(lower)) {
        knownKeys.add(lower);
        const swatch = resolveDynamicColorSwatch(raw);
        options.push({
          name: raw,
          label: raw,
          bg: swatch.bg,
          border: swatch.border,
        });
      }
    });

    return options;
  }, [allProducts]);

  return (
    <div
      ref={barRef}
      className="bg-white border border-gold/50 rounded-3xl p-4 sm:p-6 shadow-[0_14px_44px_rgba(48,12,22,0.08)] relative z-40 overflow-visible"
    >
      {/* ROW 1: Color Selection Palette (Left) + Search Filter (Right, Same Row & Baseline Aligned) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-gold/25">
        {/* Color Selection Palette */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 h-4">
            <span className="text-[10px] font-montserrat uppercase tracking-[0.22em] text-gold-dark font-bold">
              Color Palette
            </span>
            {filterState.colorFamily.length > 0 && (
              <span className="text-[10px] font-mono bg-maroon-deep text-gold px-2 py-0.5 rounded-full font-bold">
                {filterState.colorFamily.length} selected
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 min-h-[38px]">
            {dynamicColorOptions.map((swatch) => {
              const selected = filterState.colorFamily.includes(swatch.name);
              return (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => toggleArrayFilter("colorFamily", swatch.name)}
                  title={swatch.label}
                  className={`group inline-flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-full border text-[11px] font-montserrat leading-none transition-all cursor-pointer ${
                    selected
                      ? "bg-maroon-deep text-ivory border-gold shadow-sm font-semibold scale-[1.03]"
                      : "bg-[#FAF7F2] hover:bg-white text-stone-700 border-gold/30 hover:border-gold"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center shadow-2xs"
                    style={{
                      background: swatch.bg,
                      borderColor: selected ? "#DDB62B" : swatch.border,
                    }}
                  >
                    {selected && (
                      <Check
                        className={`w-2.5 h-2.5 stroke-[3] ${
                          swatch.name === "White" || swatch.name === "Beige"
                            ? "text-maroon-deep"
                            : "text-white"
                        }`}
                      />
                    )}
                  </span>
                  <span>{swatch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Same Row: Search Input */}
        <div className="w-full lg:w-72 xl:w-84 shrink-0">
          <label className="flex items-center text-[10px] font-montserrat uppercase tracking-[0.22em] text-stone-500 font-semibold mb-2 h-4">
            Search Catalog
          </label>
          <div className="relative h-[38px]">
            <Search className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stone, origin, type, or vein..."
              className="w-full h-full bg-[#FAF7F2] border border-gold/45 hover:border-gold focus:bg-white pl-10 pr-9 text-xs font-montserrat text-maroon-deep placeholder:text-stone-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all rounded-full shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-maroon-deep cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ROW 2: Product Category, Sub-Category & Application Dropdowns + Sort & View */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pt-4">
        {/* Left: Product Category, Sub-Category, Application */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* 1. Product Category Multi-Select */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                filterState.category.length > 0 || openDropdown === "category"
                  ? "bg-maroon-deep text-ivory border-gold shadow-sm"
                  : "bg-white text-stone-700 border-gold/45 hover:border-gold hover:text-maroon-deep"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>
                {isAllCategories
                  ? "Product Category (All)"
                  : filterState.category.length === 1
                  ? filterState.category[0].replace(" — Stone", "")
                  : `Product Category (${filterState.category.length})`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gold transition-transform duration-200 ${
                  openDropdown === "category" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdown === "category" && (
                <motion.div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border-2 border-gold/60 rounded-2xl shadow-[0_24px_56px_-10px_rgba(48,12,22,0.28)] p-3.5 z-[100] overscroll-contain"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gold/20">
                    <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                      Product Categories
                    </span>
                    <button
                      type="button"
                      onClick={() => onFilterChange({ ...filterState, category: [], subCategory: [] })}
                      className="text-[11px] font-montserrat text-gold-dark hover:text-maroon-deep underline cursor-pointer"
                    >
                      Show All
                    </button>
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                    <PopoverTickItem
                      checked={isAllCategories}
                      onClick={() => onFilterChange({ ...filterState, category: [], subCategory: [] })}
                      label="All Products"
                      count={allProducts.length}
                    />
                    {PRIMARY_PRODUCTS.map((prod) => (
                      <PopoverTickItem
                        key={prod.id}
                        checked={filterState.category.includes(prod.id)}
                        onClick={() => handleCategoryToggle(prod.id)}
                        label={prod.name}
                        count={getProductCountForCategory(prod.id)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Sub-Category Multi-Select */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "subCategory" ? null : "subCategory")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                filterState.subCategory.length > 0 || openDropdown === "subCategory"
                  ? "bg-maroon-deep text-ivory border-gold shadow-sm"
                  : "bg-white text-stone-700 border-gold/45 hover:border-gold hover:text-maroon-deep"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>
                {filterState.subCategory.length === 0
                  ? "Sub-Category"
                  : filterState.subCategory.length === 1
                  ? filterState.subCategory[0]
                  : `Sub-Category (${filterState.subCategory.length})`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gold transition-transform duration-200 ${
                  openDropdown === "subCategory" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdown === "subCategory" && (
                <motion.div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white border-2 border-gold/60 rounded-2xl shadow-[0_24px_56px_-10px_rgba(48,12,22,0.28)] p-3.5 z-[100] overscroll-contain"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gold/20">
                    <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                      Sub-Categories & Varieties
                    </span>
                    <button
                      type="button"
                      onClick={() => onFilterChange({ ...filterState, subCategory: [] })}
                      className="text-[11px] font-montserrat text-gold-dark hover:text-maroon-deep underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {activeCategoriesForSubs.map((cat) => {
                      const subs = CATEGORY_TYPES_MAP[cat] || [];
                      if (subs.length === 0) return null;
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="px-2 pt-1 text-[10px] font-montserrat uppercase tracking-wider text-gold-dark font-bold">
                            {cat.replace(" — Stone", "")}
                          </div>
                          {subs.map((sub) => (
                            <PopoverTickItem
                              key={`${cat}-${sub}`}
                              checked={filterState.subCategory.includes(sub)}
                              onClick={() => toggleArrayFilter("subCategory", sub)}
                              label={sub}
                              count={getProductCountForSub(sub)}
                            />
                          ))}
                        </div>
                      );
                    })}
                    {allCurrentSubProducts.length === 0 && (
                      <p className="text-xs font-montserrat text-stone-500 py-4 text-center">
                        No sub-categories available.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Application Multi-Select */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "application" ? null : "application")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                filterState.applications.length > 0 || openDropdown === "application"
                  ? "bg-maroon-deep text-ivory border-gold shadow-sm"
                  : "bg-white text-stone-700 border-gold/45 hover:border-gold hover:text-maroon-deep"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>
                {filterState.applications.length === 0
                  ? "Application"
                  : filterState.applications.length === 1
                  ? filterState.applications[0]
                  : `Application (${filterState.applications.length})`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gold transition-transform duration-200 ${
                  openDropdown === "application" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdown === "application" && (
                <motion.div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border-2 border-gold/60 rounded-2xl shadow-[0_24px_56px_-10px_rgba(48,12,22,0.28)] p-3.5 z-[100] overscroll-contain"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gold/20">
                    <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                      Architectural Applications
                    </span>
                    <button
                      type="button"
                      onClick={() => onFilterChange({ ...filterState, applications: [] })}
                      className="text-[11px] font-montserrat text-gold-dark hover:text-maroon-deep underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                    {APPLICATION_OPTIONS.map((app) => (
                      <PopoverTickItem
                        key={app}
                        checked={filterState.applications.includes(app)}
                        onClick={() => toggleArrayFilter("applications", app)}
                        label={app}
                        count={getProductCountForApp(app)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Count, Reset, Sort & Density */}
        <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3 text-xs font-montserrat">
          <span className="text-stone-600 font-medium">
            Showing <strong className="text-maroon-deep font-bold">{totalResults}</strong> of{" "}
            {totalProducts}
          </span>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-maroon hover:text-white bg-gold/15 hover:bg-maroon border border-gold/45 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-gold-dark" />
              <span>Reset ({activeFiltersCount})</span>
            </button>
          )}

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "featured" | "name-asc" | "name-desc")}
            aria-label="Sort stones"
            className="bg-[#FAF7F2] border border-gold/40 text-xs font-montserrat text-maroon py-1.5 px-3 rounded-full focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="featured">Featured Curation</option>
            <option value="name-asc">Name (A – Z)</option>
            <option value="name-desc">Name (Z – A)</option>
          </select>

          <div className="hidden sm:flex items-center border border-gold/35 bg-white rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => onDensityChange("comfortable")}
              className={`px-2.5 py-1.5 flex items-center gap-1 text-[11px] font-montserrat uppercase tracking-wider cursor-pointer transition-colors ${
                density === "comfortable" ? "bg-maroon text-gold font-semibold" : "text-stone-600"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>2 Col</span>
            </button>
            <button
              type="button"
              onClick={() => onDensityChange("compact")}
              className={`px-2.5 py-1.5 flex items-center gap-1 text-[11px] font-montserrat uppercase tracking-wider cursor-pointer transition-colors ${
                density === "compact" ? "bg-maroon text-gold font-semibold" : "text-stone-600"
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>3 Col</span>
            </button>
          </div>
        </div>
      </div>

      {/* ROW 3 (Conditional): Active Filter Badges */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-gold/20">
          <span className="text-[10px] font-raleway uppercase tracking-[0.2em] text-stone-500 mr-1 font-semibold">
            Active:
          </span>
          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-[#FAF7F2] border border-gold/40 text-maroon rounded-full">
              <span>&ldquo;{searchQuery}&rdquo;</span>
              <button onClick={() => onSearchChange("")} className="hover:text-gold cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filterState.colorFamily.map((c) => (
            <span
              key={`c-${c}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-maroon-deep text-ivory border border-gold rounded-full"
            >
              <span>{c}</span>
              <button onClick={() => onRemoveFilter("colorFamily", c)} className="hover:text-gold cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filterState.category.map((cat) => (
            <span
              key={`cat-${cat}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-maroon-deep text-ivory border border-gold rounded-full"
            >
              <span>{cat.replace(" — Stone", "")}</span>
              <button onClick={() => onRemoveFilter("category", cat)} className="hover:text-gold cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filterState.subCategory.map((sub) => (
            <span
              key={`sub-${sub}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-gold text-maroon font-semibold rounded-full"
            >
              <span>{sub}</span>
              <button onClick={() => onRemoveFilter("subCategory", sub)} className="hover:text-maroon-deep cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filterState.applications.map((app) => (
            <span
              key={`app-${app}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-[#FAF7F2] text-maroon border border-gold/40 rounded-full"
            >
              <span>{app}</span>
              <button onClick={() => onRemoveFilter("applications", app)} className="hover:text-gold cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filterState.finishes.map((f) => (
            <span
              key={`f-${f}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-[#FAF7F2] text-maroon border border-gold/40 rounded-full"
            >
              <span>{f}</span>
              <button onClick={() => onRemoveFilter("finishes", f)} className="hover:text-gold cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filterState.origin.map((o) => (
            <span
              key={`o-${o}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-[#FAF7F2] text-maroon border border-gold/40 rounded-full"
            >
              <span>{o}</span>
              <button onClick={() => onRemoveFilter("origin", o)} className="hover:text-gold cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filterState.veining.map((v) => (
            <span
              key={`v-${v}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] bg-[#FAF7F2] text-maroon border border-gold/40 rounded-full"
            >
              <span>{v}</span>
              <button onClick={() => onRemoveFilter("veining", v)} className="hover:text-gold cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function SideLFilterRail({
  filterState,
  onFilterChange,
  allProducts,
}: {
  filterState: FilterState;
  onFilterChange: (next: FilterState) => void;
  allProducts: StoneProduct[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSideFilter = (key: "finishes" | "origin" | "veining", value: string) => {
    const current = filterState[key];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    onFilterChange({ ...filterState, [key]: updated });
  };

  const sideActiveCount =
    filterState.finishes.length + filterState.origin.length + filterState.veining.length;

  const content = (
    <div className="space-y-6">
      {/* 1. Finish Multi-Selector */}
      <div className="pb-5 border-b border-gold/25">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-gold-dark" />
            <h3 className="font-montserrat text-xs uppercase tracking-[0.18em] text-maroon-deep font-bold">
              Finish
            </h3>
          </div>
          {filterState.finishes.length > 0 && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filterState, finishes: [] })}
              className="text-[10px] font-montserrat text-gold-dark hover:text-maroon-deep underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1">
          {FINISH_OPTIONS.map((fin) => {
            const count = allProducts.filter((p) => p.finishes.some((f) => f === fin)).length;
            return (
              <PopoverTickItem
                key={fin}
                checked={filterState.finishes.includes(fin)}
                onClick={() => toggleSideFilter("finishes", fin)}
                label={fin}
                count={count}
              />
            );
          })}
        </div>
      </div>

      {/* 2. Origin Multi-Selector */}
      <div className="pb-5 border-b border-gold/25">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-gold-dark" />
            <h3 className="font-montserrat text-xs uppercase tracking-[0.18em] text-maroon-deep font-bold">
              Origin
            </h3>
          </div>
          {filterState.origin.length > 0 && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filterState, origin: [] })}
              className="text-[10px] font-montserrat text-gold-dark hover:text-maroon-deep underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1">
          {ORIGIN_COUNTRIES.map((country) => {
            const count = allProducts.filter((p) =>
              p.origin.toLowerCase().includes(country.toLowerCase())
            ).length;
            return (
              <PopoverTickItem
                key={country}
                checked={filterState.origin.includes(country)}
                onClick={() => toggleSideFilter("origin", country)}
                label={country}
                count={count}
              />
            );
          })}
        </div>
      </div>

      {/* 3. Pattern / Veining Multi-Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold-dark" />
            <h3 className="font-montserrat text-xs uppercase tracking-[0.18em] text-maroon-deep font-bold">
              Pattern
            </h3>
          </div>
          {filterState.veining.length > 0 && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filterState, veining: [] })}
              className="text-[10px] font-montserrat text-gold-dark hover:text-maroon-deep underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1">
          {PATTERN_OPTIONS.map((pat) => {
            const count = allProducts.filter((p) => p.veining === pat).length;
            return (
              <PopoverTickItem
                key={pat}
                checked={filterState.veining.includes(pat)}
                onClick={() => toggleSideFilter("veining", pat)}
                label={pat}
                count={count}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <aside className="w-full lg:w-[275px] xl:w-[295px] shrink-0">
      {/* Mobile Collapsible Toggle */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gold/50 rounded-2xl text-xs font-montserrat uppercase tracking-wider font-semibold text-maroon-deep shadow-xs cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gold-dark" />
            <span>Finish · Origin · Pattern</span>
            {sideActiveCount > 0 && (
              <span className="bg-maroon-deep text-gold px-2 py-0.5 rounded-full text-[10px] font-bold">
                {sideActiveCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gold-dark transition-transform ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2 bg-white border border-gold/45 rounded-2xl p-4 shadow-md"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sticky Vertical Arm of the L-Shape */}
      <div className="hidden lg:block sticky top-24 bg-white border border-gold/45 rounded-3xl p-5 shadow-[0_12px_36px_rgba(48,12,22,0.06)]">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-gold/25">
          <span className="font-raleway text-[10px] uppercase tracking-[0.22em] text-gold-dark font-bold">
            Refine Specifications
          </span>
          {sideActiveCount > 0 && (
            <span className="text-[10px] font-mono bg-maroon-deep text-gold px-2 py-0.5 rounded-full font-bold">
              {sideActiveCount}
            </span>
          )}
        </div>
        {content}
      </div>
    </aside>
  );
}
