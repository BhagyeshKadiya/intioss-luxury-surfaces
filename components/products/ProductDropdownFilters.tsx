"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Palette,
  Building2,
  Wrench,
  Globe,
  SlidersHorizontal,
} from "lucide-react";
import { StoneProduct } from "@/lib/types";
import { CATEGORY_TYPES_MAP } from "@/data/categoryTypes";
import { FilterState, APPLICATION_OPTIONS } from "./ProductFilters";

interface ProductDropdownFiltersProps {
  filterState: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
  allProducts: StoneProduct[];
}

// 6 Primary Products (clean, luxury naming without emojis)
export const PRIMARY_PRODUCTS = [
  {
    id: "Natural Stones",
    name: "Natural Stones",
    shortName: "Natural Stone",
    categoryTag: "NATURAL",
    subtitle: "Marble, Quartzite, Granite, Onyx, Travertine, Basalt",
  },
  {
    id: "Semi-Precious Stones",
    name: "Semi-Precious Stones",
    shortName: "Semi-Precious",
    categoryTag: "PRECIOUS",
    subtitle: "Gemstones, Agate, Quartz, Jasper, Mother of Pearl",
  },
  {
    id: "Exclusive Table Tops — Stone",
    name: "Exclusive Table Tops",
    shortName: "Table Tops",
    categoryTag: "TABLE TOPS",
    subtitle: "Bespoke stone dining, coffee & conference tables",
  },
  {
    id: "Stone Veneers",
    name: "Stone Veneers",
    shortName: "Stone Veneer",
    categoryTag: "VENEERS",
    subtitle: "Ultra-thin flexible natural stone veneer sheets",
  },
  {
    id: "Stone Art",
    name: "Stone Art & Sculptures",
    shortName: "Stone Art",
    categoryTag: "ART & 3D",
    subtitle: "Inlays, murals, 3D hand-carved statues & artefacts",
  },
  {
    id: "Mosaics",
    name: "Mosaics & Medallions",
    shortName: "Mosaics",
    categoryTag: "MOSAICS",
    subtitle: "Hand-cut gemstone mosaics & waterjet floor medallions",
  },
];

const ALL_PRODUCT_IDS = PRIMARY_PRODUCTS.map((p) => p.id);

const COLOR_SWATCHES: Record<string, { bg: string; border: string }> = {
  White: { bg: "#FFFFFF", border: "#D1D5DB" },
  Beige: { bg: "#E6DEC8", border: "#C8BFA8" },
  Grey: { bg: "#949494", border: "#737373" },
  Black: { bg: "#1A1A1A", border: "#000000" },
  Green: { bg: "#2D5A43", border: "#1F3E2E" },
  Pink: { bg: "#D8A49B", border: "#B5837B" },
  Brown: { bg: "#593D2E", border: "#3D2A1F" },
  Blue: { bg: "#1F4E79", border: "#143350" },
  "Gold-Yellow": { bg: "#D4AF37", border: "#A68620" },
  Red: { bg: "#A8222A", border: "#7A151C" },
  Multi: {
    bg: "linear-gradient(135deg, #FAF7F2 25%, #541B2A 50%, #DDB62B 75%)",
    border: "#DDB62B",
  },
};

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

const VEINING_OPTIONS = [
  "Bookmatch-ready",
  "Dramatic",
  "Intricate Inlay",
  "Artisanal Mosaic",
  "Hand-Sculpted",
  "Veined",
  "Uniform",
];

// Clean 99acres-Style Luxury Tick Box Item with Mouse-Wheel Safe Container
function DropdownTickItem({
  checked,
  onChange,
  label,
  subtitle,
  categoryTag,
  count,
  badgeText,
}: {
  checked: boolean;
  onChange: () => void;
  label: React.ReactNode;
  subtitle?: string;
  categoryTag?: string;
  count?: number | string;
  badgeText?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`group w-full flex items-center justify-between py-2 px-3 rounded-xl text-left transition-all duration-150 cursor-pointer ${
        checked
          ? "bg-gold/15 text-maroon-deep font-semibold border border-gold/40 shadow-xs"
          : "hover:bg-[#FAF7F2] text-stone-700 hover:text-maroon-deep border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Custom 99acres-style styled checkbox */}
        <div
          className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-all duration-150 shrink-0 ${
            checked
              ? "bg-maroon-deep border-gold text-gold shadow-[0_0_8px_rgba(221,182,43,0.3)]"
              : "bg-white border-stone-300 group-hover:border-gold shadow-xs"
          }`}
        >
          <motion.svg
            initial={false}
            animate={{
              scale: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="w-2.5 h-2.5 stroke-[3] text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-xs text-maroon-deep tracking-tight font-medium group-hover:text-maroon">
              {label}
            </span>
            {categoryTag && (
              <span className="text-[9px] font-mono tracking-wider text-stone-500 bg-stone-100 px-1 py-0.5 rounded uppercase">
                {categoryTag}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[10px] font-montserrat text-stone-500 font-normal truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        {badgeText && (
          <span className="text-[9px] font-montserrat uppercase tracking-wider text-gold-dark bg-gold/15 px-1.5 py-0.5 rounded border border-gold/30">
            {badgeText}
          </span>
        )}
        {count !== undefined && (
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
              checked
                ? "bg-maroon-deep text-gold font-bold"
                : "bg-stone-100 text-stone-500 group-hover:bg-gold/20 group-hover:text-maroon-deep"
            }`}
          >
            {count}
          </span>
        )}
      </div>
    </button>
  );
}

export function ProductDropdownFilters({
  filterState,
  onFilterChange,
  onClearAll,
  allProducts,
}: ProductDropdownFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const getCount = (key: keyof FilterState, value: string) => {
    return allProducts.filter((p) => {
      if (key === "finishes") return p.finishes.includes(value as any);
      if (key === "applications") return p.applications.includes(value as any);
      if (key === "thicknesses") return p.thicknesses.includes(value as any);
      if (key === "category") return p.category === value;
      if (key === "subCategory") {
        const s = value.toLowerCase().replace(/[\s-]/g, "");
        const prodSub = (p.subCategory || "").toLowerCase().replace(/[\s-]/g, "");
        const prodName = p.name.toLowerCase().replace(/[\s-]/g, "");
        const prodDesc = (p.description || "").toLowerCase().replace(/[\s-]/g, "");
        return (
          prodSub.includes(s) ||
          s.includes(prodSub) ||
          prodName.includes(s) ||
          prodDesc.includes(s)
        );
      }
      if (key === "colorFamily") return p.colorFamily === value;
      if (key === "origin") return p.origin.toLowerCase().includes(value.toLowerCase());
      if (key === "veining") return p.veining === value;
      return true;
    }).length;
  };

  // 1. Primary Product Multi-toggle (Filter 1)
  const handleProductToggle = (prodId: string) => {
    const exists = filterState.category.includes(prodId);
    let nextCategories: string[];
    let nextSubCategories = [...filterState.subCategory];

    if (exists) {
      // Deselecting product -> also prune sub-products that belonged to it
      nextCategories = filterState.category.filter((c) => c !== prodId);
      const childTypes = CATEGORY_TYPES_MAP[prodId] || [];
      nextSubCategories = nextSubCategories.filter((s) => !childTypes.includes(s));
    } else {
      nextCategories = [...filterState.category, prodId];
    }

    onFilterChange({
      ...filterState,
      category: nextCategories,
      subCategory: nextSubCategories,
    });
  };

  // "All Products" Toggle
  const isAllProductsSelected =
    filterState.category.length === 0 ||
    filterState.category.length === ALL_PRODUCT_IDS.length;

  const handleAllProductsToggle = () => {
    if (isAllProductsSelected && filterState.category.length > 0) {
      // Clear all
      onFilterChange({
        ...filterState,
        category: [],
        subCategory: [],
      });
    } else {
      // Select all 6 products
      onFilterChange({
        ...filterState,
        category: [...ALL_PRODUCT_IDS],
      });
    }
  };

  // 2. Sub-Product Multi-toggle (Filter 2)
  const handleSubProductToggle = (parentProdId: string, subProduct: string) => {
    const exists = filterState.subCategory.includes(subProduct);
    const nextSubCategories = exists
      ? filterState.subCategory.filter((s) => s !== subProduct)
      : [...filterState.subCategory, subProduct];

    let nextCategories = filterState.category;
    if (!exists && filterState.category.length > 0 && !filterState.category.includes(parentProdId)) {
      nextCategories = [...filterState.category, parentProdId];
    }

    onFilterChange({
      ...filterState,
      category: nextCategories,
      subCategory: nextSubCategories,
    });
  };

  // Generic multi-toggle for Color, Finish, Origin, etc.
  const handleToggle = (key: keyof FilterState, value: string) => {
    const current = filterState[key];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    onFilterChange({ ...filterState, [key]: updated });
  };

  // Categories currently active to populate Filter 2
  const activeProductCategories = useMemo(() => {
    if (filterState.category.length > 0) {
      return filterState.category;
    }
    // If no category selected, show all 6 categories' sub-products
    return Object.keys(CATEGORY_TYPES_MAP);
  }, [filterState.category]);

  // All available sub-products for currently active categories
  const allCurrentSubProducts = useMemo(() => {
    const list: string[] = [];
    activeProductCategories.forEach((cat) => {
      const subs = CATEGORY_TYPES_MAP[cat] || [];
      subs.forEach((s) => {
        if (!list.includes(s)) list.push(s);
      });
    });
    return list;
  }, [activeProductCategories]);

  const isAllSubProductsSelected =
    allCurrentSubProducts.length > 0 &&
    allCurrentSubProducts.every((s) => filterState.subCategory.includes(s));

  const handleAllSubProductsToggle = () => {
    if (isAllSubProductsSelected) {
      // Clear sub-products
      onFilterChange({ ...filterState, subCategory: [] });
    } else {
      // Select all available sub-products
      onFilterChange({
        ...filterState,
        subCategory: [...allCurrentSubProducts],
      });
    }
  };

  const totalActive = Object.values(filterState).flat().length;

  return (
    <div ref={containerRef} className="relative w-full z-30 select-none">
      {/* Mobile backdrop to dismiss dropdown on outside tap */}
      {openDropdown !== null && (
        <div
          onClick={() => setOpenDropdown(null)}
          className="fixed inset-0 bg-black/15 z-40 sm:hidden"
        />
      )}

      {/* 99acres-Style Responsive Dropdown Buttons Bar (Inside Branded Box) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 py-1">
        
        {/* ======================================================== */}
        {/* FILTER 1: ALL PRODUCTS + 6 COLLECTIONS (MULTI-SELECT) */}
        {/* ======================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("products")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer border shadow-xs ${
              filterState.category.length > 0 || openDropdown === "products"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.category.length === 0
                ? "All Products"
                : filterState.category.length === 1
                ? filterState.category[0].replace(" — Stone", "")
                : `Products (${filterState.category.length})`}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "products" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Filter 1 Popover: Mouse-Wheel Safe Container with data-lenis-prevent */}
          <AnimatePresence>
            {openDropdown === "products" && (
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl overscroll-contain"
              >
                {/* 99acres-Style Popover Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gold/25 mb-3">
                  <div>
                    <span className="font-marcellus text-sm text-maroon-deep font-semibold block">
                      Product Collections
                    </span>
                    <span className="text-[10px] font-montserrat text-stone-500">
                      Select multiple collections or all products
                    </span>
                  </div>
                  {filterState.category.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({
                          ...filterState,
                          category: [],
                          subCategory: [],
                        })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Mouse-Wheel Enabled Scrollable List with data-lenis-prevent */}
                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="max-h-[340px] overflow-y-auto overscroll-contain luxury-scrollbar pr-1 space-y-1.5"
                >
                  {/* Option 0: "All Products" Master Toggle */}
                  <div className="bg-[#FAF7F2] rounded-xl border border-gold/30 hover:border-gold/60 transition-all p-0.5">
                    <DropdownTickItem
                      checked={filterState.category.length === ALL_PRODUCT_IDS.length || filterState.category.length === 0}
                      onChange={handleAllProductsToggle}
                      label="All Products"
                      categoryTag="ALL 6"
                      subtitle="Display all stone collections & surfaces"
                      count={allProducts.length}
                    />
                  </div>

                  <div className="w-full h-px bg-gold/20 my-1" />

                  {/* The 6 Primary Products (No Emojis) */}
                  {PRIMARY_PRODUCTS.map((prod) => {
                    const isChecked = filterState.category.includes(prod.id);
                    const count = getCount("category", prod.id);

                    return (
                      <div
                        key={prod.id}
                        className={`rounded-xl transition-all ${
                          isChecked
                            ? "bg-gold/10 border border-gold/50 shadow-2xs"
                            : "bg-white hover:bg-[#FAF7F2] border border-stone-200 hover:border-gold/30"
                        }`}
                      >
                        <DropdownTickItem
                          checked={isChecked}
                          onChange={() => handleProductToggle(prod.id)}
                          label={prod.name}
                          categoryTag={prod.categoryTag}
                          subtitle={prod.subtitle}
                          count={count > 0 ? count : undefined}
                          badgeText={count === 0 ? "Bespoke" : undefined}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* 99acres-Style Sticky Footer with Apply Button */}
                <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] font-montserrat text-stone-500">
                    {filterState.category.length === 0
                      ? "All products active"
                      : `${filterState.category.length} of 6 selected`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-5 py-2 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep hover:bg-maroon text-gold font-bold rounded-xl border border-gold shadow transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* FILTER 2: SUB-PRODUCTS (DEPENDENT ON FILTER 1) */}
        {/* ======================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("subProducts")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer border shadow-xs ${
              filterState.subCategory.length > 0 || openDropdown === "subProducts"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.subCategory.length === 0
                ? "Sub-Products"
                : filterState.subCategory.length === 1
                ? filterState.subCategory[0]
                : `Sub-Products (${filterState.subCategory.length})`}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "subProducts" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Filter 2 Popover: Mouse-Wheel Safe Container with data-lenis-prevent */}
          <AnimatePresence>
            {openDropdown === "subProducts" && (
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl overscroll-contain"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gold/25 mb-3">
                  <div className="min-w-0">
                    <span className="font-marcellus text-sm text-maroon-deep font-semibold block truncate">
                      Sub-Products & Varieties
                    </span>
                    <span className="text-[10px] font-montserrat text-gold-dark block truncate">
                      {filterState.category.length === 0
                        ? "All collections (Select products in Filter 1 to narrow)"
                        : filterState.category.length === 1
                        ? `Varieties for ${filterState.category[0].replace(" — Stone", "")}`
                        : `Varieties for ${filterState.category.length} selected collections`}
                    </span>
                  </div>
                  {filterState.subCategory.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, subCategory: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer shrink-0 ml-2"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Sub-Products List with data-lenis-prevent and Mouse-Wheel Scrolling */}
                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="max-h-[340px] overflow-y-auto overscroll-contain luxury-scrollbar pr-1 space-y-3"
                >
                  {/* Option: "All Sub-Products" Toggle */}
                  <div className="bg-[#FAF7F2] rounded-xl border border-gold/30 hover:border-gold/60 transition-all p-0.5">
                    <DropdownTickItem
                      checked={isAllSubProductsSelected}
                      onChange={handleAllSubProductsToggle}
                      label="All Sub-Products"
                      subtitle="Select all stone types in current collections"
                      count={allCurrentSubProducts.length}
                    />
                  </div>

                  {activeProductCategories.map((parentCat) => {
                    const subProducts = CATEGORY_TYPES_MAP[parentCat] || [];
                    if (subProducts.length === 0) return null;

                    const activeSubsInGroup = subProducts.filter((s) =>
                      filterState.subCategory.includes(s)
                    ).length;

                    return (
                      <div
                        key={parentCat}
                        className="bg-[#FAF7F2]/50 rounded-xl p-2.5 border border-gold/25"
                      >
                        {/* Parent Collection Header */}
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gold/20 px-1">
                          <span className="text-[11px] font-raleway uppercase tracking-[0.15em] text-maroon-deep font-bold">
                            {parentCat.replace(" — Stone", "")}
                          </span>
                          {activeSubsInGroup > 0 && (
                            <span className="text-[9px] font-mono font-bold bg-gold text-maroon px-2 py-0.5 rounded-full shadow-2xs">
                              {activeSubsInGroup} selected
                            </span>
                          )}
                        </div>

                        {/* Sub-product Checkboxes */}
                        <div className="space-y-1">
                          {subProducts.map((sub) => {
                            const isChecked = filterState.subCategory.includes(sub);
                            const count = getCount("subCategory", sub);

                            return (
                              <DropdownTickItem
                                key={sub}
                                checked={isChecked}
                                onChange={() =>
                                  handleSubProductToggle(parentCat, sub)
                                }
                                label={sub}
                                count={count > 0 ? count : undefined}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 99acres-Style Sticky Footer with Apply Button */}
                <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] font-montserrat text-stone-500">
                    {filterState.subCategory.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-5 py-2 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep hover:bg-maroon text-gold font-bold rounded-xl border border-gold shadow transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* FILTER 3: COLOR PALETTE */}
        {/* ======================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("color")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer border shadow-xs ${
              filterState.colorFamily.length > 0 || openDropdown === "color"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.colorFamily.length > 0
                ? `Color (${filterState.colorFamily.length})`
                : "Color"}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "color" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Color Popover */}
          <AnimatePresence>
            {openDropdown === "color" && (
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl overscroll-contain"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gold/25 mb-3">
                  <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                    Color Palette
                  </span>
                  {filterState.colorFamily.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, colorFamily: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="max-h-[300px] overflow-y-auto overscroll-contain luxury-scrollbar pr-1 grid grid-cols-4 gap-2"
                >
                  {Object.entries(COLOR_SWATCHES).map(([color, swatch]) => {
                    const isSelected = filterState.colorFamily.includes(color);
                    const count = getCount("colorFamily", color);

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleToggle("colorFamily", color)}
                        className={`flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-maroon-deep text-gold border-gold shadow-sm scale-105"
                            : "bg-[#FAF7F2]/60 hover:bg-gold/15 text-stone-700 border-gold/30 hover:border-gold"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border shadow-xs relative flex items-center justify-center transition-transform"
                          style={{
                            background: swatch.bg,
                            borderColor: swatch.border,
                          }}
                        >
                          {isSelected && (
                            <Check
                              className={`w-3.5 h-3.5 stroke-[3] ${
                                color === "White" || color === "Beige"
                                  ? "text-maroon-deep"
                                  : "text-white"
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[10px] font-montserrat mt-1.5 truncate max-w-full font-medium">
                          {color}
                        </span>
                        <span className="text-[8px] font-mono text-stone-400">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] font-montserrat text-stone-500">
                    {filterState.colorFamily.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-5 py-2 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep hover:bg-maroon text-gold font-bold rounded-xl border border-gold shadow transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* FILTER 4: APPLICATIONS */}
        {/* ======================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("application")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer border shadow-xs ${
              filterState.applications.length > 0 || openDropdown === "application"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.applications.length > 0
                ? `Application (${filterState.applications.length})`
                : "Application"}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "application" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Application Popover */}
          <AnimatePresence>
            {openDropdown === "application" && (
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl overscroll-contain"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gold/25 mb-3">
                  <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                    Applications
                  </span>
                  {filterState.applications.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, applications: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="max-h-[300px] overflow-y-auto overscroll-contain luxury-scrollbar pr-1 space-y-1"
                >
                  {APPLICATION_OPTIONS.map((app) => {
                    const isChecked = filterState.applications.includes(app);
                    const count = getCount("applications", app);
                    return (
                      <DropdownTickItem
                        key={app}
                        checked={isChecked}
                        onChange={() => handleToggle("applications", app)}
                        label={app}
                        count={count > 0 ? count : undefined}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] font-montserrat text-stone-500">
                    {filterState.applications.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-5 py-2 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep hover:bg-maroon text-gold font-bold rounded-xl border border-gold shadow transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* FILTER 5: FINISH */}
        {/* ======================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("finish")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer border shadow-xs ${
              filterState.finishes.length > 0 || openDropdown === "finish"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.finishes.length > 0
                ? `Finish (${filterState.finishes.length})`
                : "Finish"}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "finish" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Finish Popover */}
          <AnimatePresence>
            {openDropdown === "finish" && (
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl overscroll-contain"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gold/25 mb-3">
                  <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                    Surface Finishes
                  </span>
                  {filterState.finishes.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, finishes: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="max-h-[300px] overflow-y-auto overscroll-contain luxury-scrollbar pr-1 space-y-1"
                >
                  {FINISH_OPTIONS.map((f) => {
                    const isChecked = filterState.finishes.includes(f);
                    const count = getCount("finishes", f);
                    return (
                      <DropdownTickItem
                        key={f}
                        checked={isChecked}
                        onChange={() => handleToggle("finishes", f)}
                        label={f}
                        count={count > 0 ? count : undefined}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] font-montserrat text-stone-500">
                    {filterState.finishes.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-5 py-2 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep hover:bg-maroon text-gold font-bold rounded-xl border border-gold shadow transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* FILTER 6: ORIGIN */}
        {/* ======================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("origin")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer border shadow-xs ${
              filterState.origin.length > 0 || openDropdown === "origin"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.origin.length > 0
                ? `Origin (${filterState.origin.length})`
                : "Origin"}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "origin" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Origin Popover */}
          <AnimatePresence>
            {openDropdown === "origin" && (
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl overscroll-contain"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gold/25 mb-3">
                  <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                    Quarry Origin
                  </span>
                  {filterState.origin.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, origin: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="max-h-[300px] overflow-y-auto overscroll-contain luxury-scrollbar pr-1 space-y-1"
                >
                  {ORIGIN_COUNTRIES.map((country) => {
                    const isChecked = filterState.origin.includes(country);
                    const count = getCount("origin", country);
                    return (
                      <DropdownTickItem
                        key={country}
                        checked={isChecked}
                        onChange={() => handleToggle("origin", country)}
                        label={country}
                        count={count > 0 ? count : undefined}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] font-montserrat text-stone-500">
                    {filterState.origin.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-5 py-2 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep hover:bg-maroon text-gold font-bold rounded-xl border border-gold shadow transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* FILTER 7: PATTERN & VEINING */}
        {/* ======================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("veining")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer border shadow-xs ${
              filterState.veining.length > 0 || openDropdown === "veining"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.veining.length > 0
                ? `Pattern (${filterState.veining.length})`
                : "Pattern"}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "veining" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Veining Popover */}
          <AnimatePresence>
            {openDropdown === "veining" && (
              <motion.div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl overscroll-contain"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gold/25 mb-3">
                  <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                    Veining & Pattern
                  </span>
                  {filterState.veining.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, veining: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="max-h-[300px] overflow-y-auto overscroll-contain luxury-scrollbar pr-1 space-y-1"
                >
                  {VEINING_OPTIONS.map((v) => {
                    const isChecked = filterState.veining.includes(v);
                    const count = getCount("veining", v);
                    return (
                      <DropdownTickItem
                        key={v}
                        checked={isChecked}
                        onChange={() => handleToggle("veining", v)}
                        label={v}
                        count={count > 0 ? count : undefined}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[11px] font-montserrat text-stone-500">
                    {filterState.veining.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-5 py-2 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep hover:bg-maroon text-gold font-bold rounded-xl border border-gold shadow transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
