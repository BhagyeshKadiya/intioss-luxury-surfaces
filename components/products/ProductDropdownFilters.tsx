"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Layers,
  Palette,
  Building2,
  Wrench,
  Globe,
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

// Luxury Tick Box with spring check animation
function DropdownTickItem({
  checked,
  onChange,
  label,
  count,
  isIndented = false,
  badgeText,
}: {
  checked: boolean;
  onChange: () => void;
  label: React.ReactNode;
  count?: number | string;
  isIndented?: boolean;
  badgeText?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`group w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer ${
        isIndented ? "pl-4 text-xs" : "text-xs"
      } ${
        checked
          ? "bg-gold/15 text-maroon-deep font-semibold"
          : "hover:bg-gold/10 text-stone-700 hover:text-maroon-deep"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-all duration-200 shrink-0 ${
            checked
              ? "bg-maroon-deep border-gold text-gold shadow-[0_0_8px_rgba(221,182,43,0.35)]"
              : "bg-white border-gold/40 group-hover:border-gold shadow-xs"
          }`}
        >
          <motion.svg
            initial={false}
            animate={{
              scale: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
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
        <span className="truncate font-montserrat">{label}</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        {badgeText && (
          <span className="text-[9px] font-montserrat uppercase tracking-wider text-gold-dark bg-gold/15 px-1.5 py-0.5 rounded border border-gold/30">
            {badgeText}
          </span>
        )}
        {count !== undefined && (
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
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

  // Expanded categories inside Collections dropdown
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    "Natural Stones": true,
    "Semi-Precious Stones": true,
  });

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

  // Category Multi-toggle
  const handleCategoryToggle = (cat: string) => {
    const exists = filterState.category.includes(cat);
    let nextCategories: string[];
    let nextSubCategories = [...filterState.subCategory];

    if (exists) {
      nextCategories = filterState.category.filter((c) => c !== cat);
      const childTypes = CATEGORY_TYPES_MAP[cat] || [];
      nextSubCategories = nextSubCategories.filter((s) => !childTypes.includes(s));
    } else {
      nextCategories = [...filterState.category, cat];
      setExpandedCats((prev) => ({ ...prev, [cat]: true }));
    }

    onFilterChange({
      ...filterState,
      category: nextCategories,
      subCategory: nextSubCategories,
    });
  };

  // SubCategory Multi-toggle
  const handleSubCategoryToggle = (parentCat: string, subCat: string) => {
    const exists = filterState.subCategory.includes(subCat);
    const nextSubCategories = exists
      ? filterState.subCategory.filter((s) => s !== subCat)
      : [...filterState.subCategory, subCat];

    let nextCategories = filterState.category;
    if (!exists && !filterState.category.includes(parentCat)) {
      nextCategories = [...filterState.category, parentCat];
    }

    onFilterChange({
      ...filterState,
      category: nextCategories,
      subCategory: nextSubCategories,
    });
  };

  // Generic multi-toggle
  const handleToggle = (key: keyof FilterState, value: string) => {
    const current = filterState[key];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    onFilterChange({ ...filterState, [key]: updated });
  };

  // All unique available types for Stone Types dropdown
  const uniqueAvailableTypes = useMemo(() => {
    const catsToQuery =
      filterState.category.length > 0
        ? filterState.category
        : Object.keys(CATEGORY_TYPES_MAP);

    const seen = new Set<string>();
    const res: { type: string; category: string }[] = [];

    catsToQuery.forEach((cat) => {
      const types = CATEGORY_TYPES_MAP[cat] || [];
      types.forEach((t) => {
        if (!seen.has(t)) {
          seen.add(t);
          res.push({ type: t, category: cat });
        }
      });
    });

    return res;
  }, [filterState.category]);

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

      {/* Responsive Flex-Wrap Dropdown Buttons Bar (NO overflow clipping) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 bg-white/95 backdrop-blur-md rounded-2xl border border-gold/40 shadow-xs">
        {/* 1. Category & Collection Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("category")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border shadow-xs ${
              filterState.category.length > 0 || openDropdown === "category"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.category.length > 0
                ? `Collection (${filterState.category.length})`
                : "Collection"}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "category" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Category Dropdown Popover */}
          <AnimatePresence>
            {openDropdown === "category" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/25 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-gold-dark" />
                    <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                      Collections & Subcategories
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
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto luxury-scrollbar pr-1 space-y-2">
                  {Object.entries(CATEGORY_TYPES_MAP).map(([catName, subCats]) => {
                    const isChecked = filterState.category.includes(catName);
                    const isExpanded = expandedCats[catName];
                    const count = getCount("category", catName);
                    const activeSubsInCat = subCats.filter((s) =>
                      filterState.subCategory.includes(s)
                    ).length;

                    return (
                      <div
                        key={catName}
                        className="bg-white rounded-xl border border-gold/30 hover:border-gold/60 transition-all overflow-hidden shadow-2xs"
                      >
                        <div className="flex items-center justify-between pr-2 bg-gradient-to-r from-white via-[#FAF7F2]/50 to-white">
                          <div className="flex-1 min-w-0">
                            <DropdownTickItem
                              checked={isChecked}
                              onChange={() => handleCategoryToggle(catName)}
                              label={
                                <span className="font-semibold text-maroon-deep">
                                  {catName.replace(" — Stone", "")}
                                </span>
                              }
                              count={count > 0 ? count : undefined}
                              badgeText={count === 0 ? "Bespoke" : undefined}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedCats((prev) => ({
                                ...prev,
                                [catName]: !prev[catName],
                              }));
                            }}
                            className="p-1 rounded-md hover:bg-gold/15 text-gold-dark hover:text-maroon transition-all cursor-pointer flex items-center gap-1"
                          >
                            {activeSubsInCat > 0 && (
                              <span className="text-[10px] font-bold text-gold-dark bg-gold/20 px-1 rounded">
                                {activeSubsInCat}
                              </span>
                            )}
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.18 }}
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </motion.div>
                          </button>
                        </div>

                        {/* Indented Subcategory Tick Boxes */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-[#FAF7F2]/60 border-t border-gold/20 p-2 space-y-0.5 border-l-2 border-gold/30 ml-2"
                            >
                              {subCats.map((sub) => {
                                const isSubChecked = filterState.subCategory.includes(sub);
                                const subCount = getCount("subCategory", sub);
                                return (
                                  <DropdownTickItem
                                    key={sub}
                                    checked={isSubChecked}
                                    onChange={() =>
                                      handleSubCategoryToggle(catName, sub)
                                    }
                                    label={sub}
                                    count={subCount > 0 ? subCount : undefined}
                                    isIndented={true}
                                  />
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] font-montserrat text-stone-500">
                    Multi-selection active
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-4 py-1 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep text-gold rounded-lg font-bold border border-gold hover:bg-maroon transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Stone Type Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("types")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border shadow-xs ${
              filterState.subCategory.length > 0 || openDropdown === "types"
                ? "bg-maroon-deep text-ivory border-gold shadow-md"
                : "bg-white text-stone-700 border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-maroon-deep"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>
              {filterState.subCategory.length > 0
                ? `Stone Type (${filterState.subCategory.length})`
                : "Stone Type"}
            </span>
            <motion.div
              animate={{ rotate: openDropdown === "types" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Stone Types Popover */}
          <AnimatePresence>
            {openDropdown === "types" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-72 sm:w-84 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/25 mb-3">
                  <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                    Stone Types & Varieties
                  </span>
                  {filterState.subCategory.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, subCategory: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto luxury-scrollbar pr-1 space-y-1">
                  {uniqueAvailableTypes.map(({ type, category }) => {
                    const isChecked = filterState.subCategory.includes(type);
                    const count = getCount("subCategory", type);
                    return (
                      <DropdownTickItem
                        key={type}
                        checked={isChecked}
                        onChange={() => handleSubCategoryToggle(category, type)}
                        label={type}
                        count={count > 0 ? count : undefined}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] font-montserrat text-stone-500">
                    {filterState.subCategory.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-4 py-1 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep text-gold rounded-lg font-bold border border-gold hover:bg-maroon transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Color Palette Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("color")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border shadow-xs ${
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
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/25 mb-3">
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
                      Clear
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 py-1">
                  {Object.entries(COLOR_SWATCHES).map(
                    ([color, { bg, border }]) => {
                      const checked = filterState.colorFamily.includes(color);
                      const count = getCount("colorFamily", color);
                      const disabled = count === 0;

                      return (
                        <button
                          key={color}
                          type="button"
                          disabled={disabled}
                          onClick={() => handleToggle("colorFamily", color)}
                          className={`group relative flex flex-col items-center p-2 rounded-xl transition-all border ${
                            checked
                              ? "border-maroon-deep bg-gold/15 ring-2 ring-gold shadow-md"
                              : "border-gold/30 hover:border-gold bg-white"
                          } ${
                            disabled
                              ? "opacity-25 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full shadow-inner border relative flex items-center justify-center"
                            style={{
                              background: bg,
                              borderColor: border,
                            }}
                          >
                            {checked && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-gold shadow-xs"
                              />
                            )}
                          </div>
                          <span className="text-[10px] font-montserrat text-stone-700 mt-1 truncate max-w-full">
                            {color}
                          </span>
                          <span className="text-[9px] font-mono text-stone-400">
                            ({count})
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] font-montserrat text-stone-500">
                    {filterState.colorFamily.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-4 py-1 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep text-gold rounded-lg font-bold border border-gold hover:bg-maroon transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Application Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("applications")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border shadow-xs ${
              filterState.applications.length > 0 ||
              openDropdown === "applications"
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
              animate={{ rotate: openDropdown === "applications" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Application Popover */}
          <AnimatePresence>
            {openDropdown === "applications" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/25 mb-3">
                  <span className="font-marcellus text-sm text-maroon-deep font-semibold">
                    Architectural Applications
                  </span>
                  {filterState.applications.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        onFilterChange({ ...filterState, applications: [] })
                      }
                      className="text-[11px] font-montserrat text-stone-500 hover:text-maroon underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto luxury-scrollbar pr-1 space-y-1">
                  {APPLICATION_OPTIONS.map((app) => {
                    const isChecked = filterState.applications.includes(app);
                    const count = getCount("applications", app);
                    if (count === 0) return null;

                    return (
                      <DropdownTickItem
                        key={app}
                        checked={isChecked}
                        onChange={() => handleToggle("applications", app)}
                        label={app}
                        count={count}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] font-montserrat text-stone-500">
                    {filterState.applications.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-4 py-1 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep text-gold rounded-lg font-bold border border-gold hover:bg-maroon transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. Surface Finish Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("finishes")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border shadow-xs ${
              filterState.finishes.length > 0 || openDropdown === "finishes"
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
              animate={{ rotate: openDropdown === "finishes" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-gold shrink-0" />
            </motion.div>
          </button>

          {/* Finish Popover */}
          <AnimatePresence>
            {openDropdown === "finishes" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/25 mb-3">
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
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto luxury-scrollbar pr-1 space-y-1">
                  {FINISH_OPTIONS.map((fin) => {
                    const isChecked = filterState.finishes.includes(fin);
                    const count = getCount("finishes", fin);
                    if (count === 0) return null;

                    return (
                      <DropdownTickItem
                        key={fin}
                        checked={isChecked}
                        onChange={() => handleToggle("finishes", fin)}
                        label={fin}
                        count={count}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] font-montserrat text-stone-500">
                    {filterState.finishes.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-4 py-1 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep text-gold rounded-lg font-bold border border-gold hover:bg-maroon transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 6. Quarry Origin Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("origin")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border shadow-xs ${
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
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/25 mb-3">
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
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto luxury-scrollbar pr-1 space-y-1">
                  {ORIGIN_COUNTRIES.map((orig) => {
                    const isChecked = filterState.origin.includes(orig);
                    const count = getCount("origin", orig);
                    if (count === 0) return null;

                    return (
                      <DropdownTickItem
                        key={orig}
                        checked={isChecked}
                        onChange={() => handleToggle("origin", orig)}
                        label={orig}
                        count={count}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] font-montserrat text-stone-500">
                    {filterState.origin.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-4 py-1 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep text-gold rounded-lg font-bold border border-gold hover:bg-maroon transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 7. Veining & Pattern Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("veining")}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border shadow-xs ${
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
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white border border-gold/50 rounded-2xl shadow-[0_20px_50px_rgba(48,12,22,0.22)] p-4 z-[70] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-gold/25 mb-3">
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
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto luxury-scrollbar pr-1 space-y-1">
                  {VEINING_OPTIONS.map((v) => {
                    const isChecked = filterState.veining.includes(v);
                    const count = getCount("veining", v);
                    if (count === 0) return null;

                    return (
                      <DropdownTickItem
                        key={v}
                        checked={isChecked}
                        onChange={() => handleToggle("veining", v)}
                        label={v}
                        count={count}
                      />
                    );
                  })}
                </div>

                <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between">
                  <span className="text-[10px] font-montserrat text-stone-500">
                    {filterState.veining.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="px-4 py-1 text-xs font-montserrat uppercase tracking-wider bg-maroon-deep text-gold rounded-lg font-bold border border-gold hover:bg-maroon transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reset All Action Button */}
        {totalActive > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="flex-none inline-flex items-center gap-1.5 px-3 py-2 text-xs font-montserrat text-stone-600 hover:text-maroon-deep transition-colors cursor-pointer border border-transparent hover:border-gold/30 rounded-full font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold-dark" />
            <span className="underline">Reset ({totalActive})</span>
          </button>
        )}
      </div>
    </div>
  );
}
