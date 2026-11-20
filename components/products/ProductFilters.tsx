"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight, X, RotateCcw, Check, Sparkles, Layers } from "lucide-react";
import { StoneProduct } from "@/lib/types";
import { CATEGORY_TYPES_MAP } from "@/data/categoryTypes";

export interface FilterState {
  category: string[];
  subCategory: string[];
  colorFamily: string[];
  origin: string[];
  finishes: string[];
  applications: string[];
  thicknesses: string[];
  veining: string[];
  priceTier: string[];
  availability: string[];
}

interface ProductFiltersProps {
  filterState: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
  allProducts: StoneProduct[];
  hideCategorySelectors?: boolean;
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

export const APPLICATION_OPTIONS = [
  "Flooring",
  "Bathroom",
  "Table Top",
  "Kitchen Countertop",
  "Wall Cladding — Interior",
  "Wall Cladding — Exterior",
  "Exterior Flooring",
  "Feature Wall",
];

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

const VEINING_OPTIONS = [
  "Bookmatch-ready",
  "Dramatic",
  "Intricate Inlay",
  "Artisanal Mosaic",
  "Hand-Sculpted",
  "Veined",
  "Uniform",
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

// Luxury Custom Checkbox / Tick Box with Spring Motion
function LuxuryTickBox({
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
        isIndented ? "pl-3 text-xs" : "text-xs"
      } ${
        checked
          ? "bg-maroon-deep/5 text-maroon font-semibold"
          : "hover:bg-gold/10 text-stone-700 hover:text-maroon"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Animated Custom Square Checkbox */}
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
                : "bg-stone-100 text-stone-500 group-hover:bg-gold/20 group-hover:text-maroon"
            }`}
          >
            {count}
          </span>
        )}
      </div>
    </button>
  );
}

export function ProductFilters({
  filterState,
  onFilterChange,
  onClearAll,
  allProducts,
  hideCategorySelectors = false,
}: ProductFiltersProps) {
  // Collapsed state for accordion sections
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    collections: false, // Default open for immediate category access
    color: false,
    applications: false,
    finishes: false,
    veining: true,
    origin: false,
  });

  // Expand state for each category's subcategories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Natural Stones": true,
    "Semi-Precious Stones": true,
  });

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleCategoryExpand = (cat: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Multiple Category Toggle
  const handleCategoryToggle = (cat: string) => {
    const exists = filterState.category.includes(cat);
    let nextCategories: string[];
    let nextSubCategories = [...filterState.subCategory];

    if (exists) {
      // Uncheck category -> remove category and its subcategories
      nextCategories = filterState.category.filter((c) => c !== cat);
      const childTypes = CATEGORY_TYPES_MAP[cat] || [];
      nextSubCategories = nextSubCategories.filter((s) => !childTypes.includes(s));
    } else {
      // Check category -> add to selected categories and auto-expand child tray
      nextCategories = [...filterState.category, cat];
      setExpandedCategories((prev) => ({ ...prev, [cat]: true }));
    }

    onFilterChange({
      ...filterState,
      category: nextCategories,
      subCategory: nextSubCategories,
    });
  };

  // Multiple SubCategory Toggle
  const handleSubCategoryToggle = (parentCat: string, subCat: string) => {
    const exists = filterState.subCategory.includes(subCat);
    const nextSubCategories = exists
      ? filterState.subCategory.filter((s) => s !== subCat)
      : [...filterState.subCategory, subCat];

    // Auto-select parent category if not already selected
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

  // Select all subcategories of a category
  const handleSelectAllSubCategories = (cat: string) => {
    const childTypes = CATEGORY_TYPES_MAP[cat] || [];
    const nextCategories = filterState.category.includes(cat)
      ? filterState.category
      : [...filterState.category, cat];
    const uniqueSubs = Array.from(new Set([...filterState.subCategory, ...childTypes]));

    onFilterChange({
      ...filterState,
      category: nextCategories,
      subCategory: uniqueSubs,
    });
  };

  // Clear subcategories of a category
  const handleClearSubCategories = (cat: string) => {
    const childTypes = CATEGORY_TYPES_MAP[cat] || [];
    const nextSubs = filterState.subCategory.filter((s) => !childTypes.includes(s));

    onFilterChange({
      ...filterState,
      subCategory: nextSubs,
    });
  };

  // Generic multi-toggle handler
  const handleToggle = (key: keyof FilterState, value: string) => {
    const current = filterState[key];
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    onFilterChange({ ...filterState, [key]: updated });
  };

  // Helper to compute live count for an option
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
      if (key === "priceTier") return p.priceTier === value;
      if (key === "availability") return p.availability === value;
      return true;
    }).length;
  };

  const totalActiveFilters = Object.values(filterState).flat().length;

  return (
    <div className="space-y-5 select-none font-poppins pb-8">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-gold/30">
        <div className="flex items-center gap-2">
          <span className="font-montserrat text-xs uppercase tracking-[0.2em] font-bold text-maroon-deep">
            Refine Catalog
          </span>
          {totalActiveFilters > 0 && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-maroon-deep text-gold text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold/40 shadow-xs"
            >
              {totalActiveFilters} Active
            </motion.span>
          )}
        </div>
        {totalActiveFilters > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-[11px] font-montserrat text-stone-500 hover:text-maroon underline transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-gold-dark" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. HIERARCHICAL COLLECTIONS & SUBCATEGORIES TREE (WITH MULTI-SELECT TICK BOXES) */}
      <div className="border-b border-gold/25 pb-4">
        <button
          type="button"
          onClick={() => toggleGroup("collections")}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon-deep uppercase tracking-wider font-semibold group-hover:text-gold-dark transition-colors">
              Collections & Types
            </span>
            {(filterState.category.length > 0 || filterState.subCategory.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse" />
            )}
          </div>
          <motion.div
            animate={{ rotate: collapsedGroups["collections"] ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gold-dark" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {!collapsedGroups["collections"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2.5 space-y-2">
                {Object.entries(CATEGORY_TYPES_MAP).map(([categoryName, subCategories]) => {
                  const isCategoryChecked = filterState.category.includes(categoryName);
                  const isExpanded = expandedCategories[categoryName];
                  const categoryCount = getCount("category", categoryName);
                  const isBespoke = ["Exclusive Table Tops — Stone", "Stone Veneers", "Stone Art", "Mosaics"].includes(categoryName);

                  // Count active subcategories in this category
                  const activeSubCount = subCategories.filter((sub) =>
                    filterState.subCategory.includes(sub)
                  ).length;

                  return (
                    <div
                      key={categoryName}
                      className="bg-white/80 rounded-xl border border-gold/30 hover:border-gold/60 transition-all overflow-hidden shadow-xs"
                    >
                      {/* Parent Category Row */}
                      <div className="flex items-center justify-between pr-2 bg-gradient-to-r from-white via-[#FAF7F2]/50 to-white">
                        <div className="flex-1 min-w-0">
                          <LuxuryTickBox
                            checked={isCategoryChecked}
                            onChange={() => handleCategoryToggle(categoryName)}
                            label={
                              <span className="font-semibold text-maroon-deep">
                                {categoryName.replace(" — Stone", "")}
                              </span>
                            }
                            count={categoryCount > 0 ? categoryCount : undefined}
                            badgeText={categoryCount === 0 && isBespoke ? "Bespoke" : undefined}
                          />
                        </div>

                        {/* Expand / Collapse Subcategories Toggle Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleCategoryExpand(categoryName, e)}
                          aria-label={`Toggle ${categoryName} types`}
                          className="p-1.5 rounded-md hover:bg-gold/15 text-gold-dark hover:text-maroon transition-all cursor-pointer flex items-center gap-1"
                        >
                          {activeSubCount > 0 && (
                            <span className="text-[10px] font-bold text-gold-dark bg-gold/20 px-1 rounded">
                              {activeSubCount}
                            </span>
                          )}
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </motion.div>
                        </button>
                      </div>

                      {/* Child Subcategories Tray with Multi-Select Tick Boxes */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden bg-[#FAF7F2]/60 border-t border-gold/20"
                          >
                            <div className="p-2 space-y-1">
                              {/* Subcategory Micro-Action Header */}
                              <div className="flex items-center justify-between px-2 py-0.5 text-[10px] font-montserrat text-stone-500 uppercase tracking-wider">
                                <span>Specific Types:</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAllSubCategories(categoryName)}
                                    className="hover:text-maroon underline cursor-pointer"
                                  >
                                    All
                                  </button>
                                  <span>·</span>
                                  <button
                                    type="button"
                                    onClick={() => handleClearSubCategories(categoryName)}
                                    className="hover:text-maroon underline cursor-pointer"
                                  >
                                    Clear
                                  </button>
                                </div>
                              </div>

                              {/* Subcategory Tick Boxes List */}
                              <div className="space-y-0.5 border-l-2 border-gold/30 ml-2 pl-1">
                                {subCategories.map((subCat) => {
                                  const isSubChecked = filterState.subCategory.includes(subCat);
                                  const subCount = getCount("subCategory", subCat);

                                  return (
                                    <LuxuryTickBox
                                      key={subCat}
                                      checked={isSubChecked}
                                      onChange={() =>
                                        handleSubCategoryToggle(categoryName, subCat)
                                      }
                                      label={subCat}
                                      count={subCount > 0 ? subCount : undefined}
                                      isIndented={true}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. COLOR PALETTE SWATCHES (MULTI-SELECT) */}
      <div className="border-b border-gold/25 pb-4">
        <button
          type="button"
          onClick={() => toggleGroup("color")}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon-deep uppercase tracking-wider font-semibold group-hover:text-gold-dark transition-colors">
              Color Palette
            </span>
            {filterState.colorFamily.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse" />
            )}
          </div>
          <motion.div
            animate={{ rotate: collapsedGroups["color"] ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gold-dark" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {!collapsedGroups["color"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid grid-cols-5 gap-2">
                {Object.entries(COLOR_SWATCHES).map(([color, { bg, border }]) => {
                  const checked = filterState.colorFamily.includes(color);
                  const count = getCount("colorFamily", color);
                  const disabled = count === 0;

                  return (
                    <button
                      key={color}
                      type="button"
                      title={`${color} (${count})`}
                      disabled={disabled}
                      onClick={() => handleToggle("colorFamily", color)}
                      className={`group relative flex flex-col items-center p-1.5 rounded-lg transition-all border ${
                        checked
                          ? "border-maroon-deep bg-gold/15 ring-2 ring-gold shadow-md"
                          : "border-gold/30 hover:border-gold bg-white"
                      } ${disabled ? "opacity-25 cursor-not-allowed" : "cursor-pointer"}`}
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
                      <span className="text-[9px] font-montserrat text-stone-700 mt-1 truncate max-w-full group-hover:text-maroon">
                        {color}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. ARCHITECTURAL APPLICATIONS (MULTI-SELECT TICK BOXES) */}
      <div className="border-b border-gold/25 pb-4">
        <button
          type="button"
          onClick={() => toggleGroup("applications")}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon-deep uppercase tracking-wider font-semibold group-hover:text-gold-dark transition-colors">
              Application Area
            </span>
            {filterState.applications.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse" />
            )}
          </div>
          <motion.div
            animate={{ rotate: collapsedGroups["applications"] ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gold-dark" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {!collapsedGroups["applications"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2.5 space-y-1">
                {APPLICATION_OPTIONS.map((app) => {
                  const checked = filterState.applications.includes(app);
                  const count = getCount("applications", app);
                  if (count === 0) return null;

                  return (
                    <LuxuryTickBox
                      key={app}
                      checked={checked}
                      onChange={() => handleToggle("applications", app)}
                      label={app}
                      count={count}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. SURFACE FINISHES (MULTI-SELECT TICK BOXES) */}
      <div className="border-b border-gold/25 pb-4">
        <button
          type="button"
          onClick={() => toggleGroup("finishes")}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon-deep uppercase tracking-wider font-semibold group-hover:text-gold-dark transition-colors">
              Surface Finishes
            </span>
            {filterState.finishes.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse" />
            )}
          </div>
          <motion.div
            animate={{ rotate: collapsedGroups["finishes"] ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gold-dark" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {!collapsedGroups["finishes"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2.5 space-y-1">
                {FINISH_OPTIONS.map((fin) => {
                  const checked = filterState.finishes.includes(fin);
                  const count = getCount("finishes", fin);
                  if (count === 0) return null;

                  return (
                    <LuxuryTickBox
                      key={fin}
                      checked={checked}
                      onChange={() => handleToggle("finishes", fin)}
                      label={fin}
                      count={count}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. VEINING & PATTERN (MULTI-SELECT TICK BOXES) */}
      <div className="border-b border-gold/25 pb-4">
        <button
          type="button"
          onClick={() => toggleGroup("veining")}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon-deep uppercase tracking-wider font-semibold group-hover:text-gold-dark transition-colors">
              Veining & Pattern
            </span>
            {filterState.veining.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse" />
            )}
          </div>
          <motion.div
            animate={{ rotate: collapsedGroups["veining"] ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gold-dark" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {!collapsedGroups["veining"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2.5 space-y-1">
                {VEINING_OPTIONS.map((v) => {
                  const checked = filterState.veining.includes(v);
                  const count = getCount("veining", v);
                  if (count === 0) return null;

                  return (
                    <LuxuryTickBox
                      key={v}
                      checked={checked}
                      onChange={() => handleToggle("veining", v)}
                      label={v}
                      count={count}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. QUARRY ORIGIN (MULTI-SELECT TICK BOXES) */}
      <div className="border-b border-gold/25 pb-4">
        <button
          type="button"
          onClick={() => toggleGroup("origin")}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon-deep uppercase tracking-wider font-semibold group-hover:text-gold-dark transition-colors">
              Quarry Origin
            </span>
            {filterState.origin.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block animate-pulse" />
            )}
          </div>
          <motion.div
            animate={{ rotate: collapsedGroups["origin"] ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gold-dark" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {!collapsedGroups["origin"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2.5 space-y-1">
                {ORIGIN_COUNTRIES.map((origin) => {
                  const checked = filterState.origin.includes(origin);
                  const count = getCount("origin", origin);
                  if (count === 0) return null;

                  return (
                    <LuxuryTickBox
                      key={origin}
                      checked={checked}
                      onChange={() => handleToggle("origin", origin)}
                      label={origin}
                      count={count}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
