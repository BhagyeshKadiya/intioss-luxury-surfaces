"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, X, RotateCcw } from "lucide-react";
import { StoneProduct } from "@/lib/types";

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
  Multi: {
    bg: "linear-gradient(135deg, #FAF7F2 25%, #541B2A 50%, #DDB62B 75%)",
    border: "#DDB62B",
  },
};

export function ProductFilters({
  filterState,
  onFilterChange,
  onClearAll,
  allProducts,
  hideCategorySelectors = false,
}: ProductFiltersProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    thickness: true,
    priceTier: true,
  });
  const [originSearch, setOriginSearch] = useState("");

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

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
      if (key === "subCategory") return p.subCategory === value;
      if (key === "colorFamily") return p.colorFamily === value;
      if (key === "origin") return p.origin.toLowerCase().includes(value.toLowerCase());
      if (key === "veining") return p.veining === value;
      if (key === "priceTier") return p.priceTier === value;
      if (key === "availability") return p.availability === value;
      return true;
    }).length;
  };

  const totalActiveFilters = Object.values(filterState).flat().length;

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

  const APPLICATION_OPTIONS = [
    "Flooring",
    "Wall Cladding",
    "Countertop",
    "Bathroom",
    "Pooja Room",
    "Dining & Living",
    "Furniture",
    "Feature Wall",
    "Facade",
    "Outdoor",
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
    "Brazil",
    "India",
    "Spain",
    "Turkey",
    "South Africa",
  ];

  return (
    <div className="space-y-6 select-none font-poppins">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-gold/30">
        <div className="flex items-center gap-2">
          <span className="font-montserrat text-xs uppercase tracking-[0.2em] font-semibold text-maroon">
            Filter Refinement
          </span>
          {totalActiveFilters > 0 && (
            <span className="bg-maroon text-gold text-[10px] font-semibold px-2 py-0.5 border border-gold/40">
              {totalActiveFilters} Active
            </span>
          )}
        </div>
        {totalActiveFilters > 0 && (
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-[11px] font-montserrat text-grey hover:text-maroon underline transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Optional Category Selector (when not displayed on top bar) */}
      {!hideCategorySelectors && (
        <div className="border-b border-gold/20 pb-4">
          <button
            onClick={() => toggleGroup("category")}
            className="w-full flex items-center justify-between py-1 text-left"
          >
            <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
              Collection
            </span>
            {collapsedGroups["category"] ? (
              <ChevronDown className="w-4 h-4 text-gold" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gold" />
            )}
          </button>

          {!collapsedGroups["category"] && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                "Natural Stones",
                "Semi-Precious Stones",
                "Exclusive Table Tops — Stone",
                "Mosaics",
                "Stone Veneers",
                "Artefacts",
              ].map((cat) => {
                const checked = filterState.category.includes(cat);
                const count = getCount("category", cat);
                return (
                  <button
                    key={cat}
                    onClick={() => handleToggle("category", cat)}
                    className={`px-2.5 py-1 text-xs font-montserrat transition-all border ${
                      checked
                        ? "bg-maroon-deep text-ivory border-gold shadow-sm font-medium"
                        : "bg-white text-maroon/80 border-gold/25 hover:border-gold"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="ml-1 text-[10px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Color Palette Swatches */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("color")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
              Color Palette
            </span>
            {filterState.colorFamily.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            )}
          </div>
          {collapsedGroups["color"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["color"] && (
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
                  className={`group relative flex flex-col items-center p-1.5 transition-all border ${
                    checked
                      ? "border-maroon bg-gold/10 ring-1 ring-gold shadow-sm"
                      : "border-gold/20 hover:border-gold bg-white"
                  } ${disabled ? "opacity-25 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div
                    className="w-5 h-5 rounded-full shadow-inner border"
                    style={{
                      background: bg,
                      borderColor: border,
                    }}
                  />
                  <span className="text-[9px] font-montserrat text-grey mt-1 truncate max-w-full group-hover:text-maroon">
                    {color}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Surface Finishes (Tactile Chips) */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("finishes")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
              Surface Finish
            </span>
            {filterState.finishes.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            )}
          </div>
          {collapsedGroups["finishes"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["finishes"] && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {FINISH_OPTIONS.map((fin) => {
              const checked = filterState.finishes.includes(fin);
              const count = getCount("finishes", fin);
              if (count === 0) return null;
              return (
                <button
                  key={fin}
                  onClick={() => handleToggle("finishes", fin)}
                  className={`px-2.5 py-1 text-xs font-montserrat rounded-none transition-all border ${
                    checked
                      ? "bg-maroon text-gold border-gold font-medium shadow-sm"
                      : "bg-white text-maroon/80 border-gold/25 hover:border-gold"
                  }`}
                >
                  <span>{fin}</span>
                  <span className="ml-1 text-[9px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Architectural Application (Tactile Chips) */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("applications")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
              Application Area
            </span>
            {filterState.applications.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            )}
          </div>
          {collapsedGroups["applications"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["applications"] && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {APPLICATION_OPTIONS.map((app) => {
              const checked = filterState.applications.includes(app);
              const count = getCount("applications", app);
              if (count === 0) return null;
              return (
                <button
                  key={app}
                  onClick={() => handleToggle("applications", app)}
                  className={`px-2.5 py-1 text-xs font-montserrat transition-all border ${
                    checked
                      ? "bg-maroon text-gold border-gold font-medium shadow-sm"
                      : "bg-white text-maroon/80 border-gold/25 hover:border-gold"
                  }`}
                >
                  <span>{app}</span>
                  <span className="ml-1 text-[9px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Pattern & Veining */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("veining")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
              Veining & Pattern
            </span>
            {filterState.veining.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            )}
          </div>
          {collapsedGroups["veining"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["veining"] && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {VEINING_OPTIONS.map((v) => {
              const checked = filterState.veining.includes(v);
              const count = getCount("veining", v);
              if (count === 0) return null;
              return (
                <button
                  key={v}
                  onClick={() => handleToggle("veining", v)}
                  className={`px-2.5 py-1 text-xs font-montserrat transition-all border ${
                    checked
                      ? "bg-maroon text-gold border-gold font-medium shadow-sm"
                      : "bg-white text-maroon/80 border-gold/25 hover:border-gold"
                  }`}
                >
                  <span>{v}</span>
                  <span className="ml-1 text-[9px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Quarry Origin */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("origin")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
              Quarry Origin
            </span>
            {filterState.origin.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            )}
          </div>
          {collapsedGroups["origin"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["origin"] && (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {ORIGIN_COUNTRIES.map((origin) => {
                const count = getCount("origin", origin);
                const checked = filterState.origin.includes(origin);
                if (count === 0) return null;
                return (
                  <button
                    key={origin}
                    onClick={() => handleToggle("origin", origin)}
                    className={`px-2.5 py-1 text-xs font-montserrat transition-all border ${
                      checked
                        ? "bg-maroon text-gold border-gold font-medium shadow-sm"
                        : "bg-white text-maroon/80 border-gold/25 hover:border-gold"
                    }`}
                  >
                    <span>{origin}</span>
                    <span className="ml-1 text-[9px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
