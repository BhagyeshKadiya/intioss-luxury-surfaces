"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { StoneProduct } from "@/lib/types";

export interface FilterState {
  category: string[];
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
}

const COLOR_SWATCHES: Record<string, string> = {
  White: "#FFFFFF",
  Beige: "#E6DEC8",
  Grey: "#949494",
  Black: "#1A1A1A",
  Green: "#2D5A43",
  Pink: "#D8A49B",
  Brown: "#593D2E",
  Blue: "#1F4E79",
  "Gold-Yellow": "#D4AF37",
  Multi: "linear-gradient(135deg, #FAF7F2 25%, #541B2A 50%, #DDB62B 75%)",
};

export function ProductFilters({
  filterState,
  onFilterChange,
  onClearAll,
  allProducts,
}: ProductFiltersProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
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
    <div className="space-y-6 select-none font-poppins">
      {/* Header & Active Filter Count */}
      <div className="flex items-center justify-between pb-3 border-b border-gold/30">
        <div className="flex items-center gap-2">
          <span className="font-montserrat text-xs uppercase tracking-[0.2em] font-semibold text-maroon">
            Filters
          </span>
          {totalActiveFilters > 0 && (
            <span className="bg-gold text-maroon text-[10px] font-semibold px-1.5 py-0.2 rounded-none">
              {totalActiveFilters}
            </span>
          )}
        </div>
        {totalActiveFilters > 0 && (
          <button
            onClick={onClearAll}
            className="text-[11px] font-montserrat uppercase tracking-wider text-grey hover:text-maroon underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-2">
          {Object.entries(filterState).map(([k, vals]) =>
            vals.map((val: string) => (
              <span
                key={`${k}-${val}`}
                className="inline-flex items-center gap-1 bg-white text-maroon text-[10px] font-montserrat px-2 py-1 border border-gold/40 shadow-sm"
              >
                <span>{val}</span>
                <button
                  onClick={() => handleToggle(k as keyof FilterState, val)}
                  aria-label={`Remove ${val}`}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {/* 1. Category Filter */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("category")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
            Product Category
          </span>
          {collapsedGroups["category"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["category"] && (
          <div className="mt-3 space-y-1.5">
            {[
              "Natural Stones",
              "Semi-Precious Stones",
              "Exclusive Table Tops — Stone",
              "Mosaics",
              "Stone Veneers",
              "Artefacts",
            ].map((cat) => {
              const count = getCount("category", cat);
              const checked = filterState.category.includes(cat);
              const disabled = count === 0;
              return (
                <label
                  key={cat}
                  className={`flex items-center justify-between text-xs cursor-pointer py-1 px-1 rounded-sm transition-colors ${
                    checked ? "bg-gold/10 font-semibold" : ""
                  } ${
                    disabled ? "opacity-35 pointer-events-none" : "hover:text-maroon hover:bg-ivory"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggle("category", cat)}
                      className="accent-[#541B2A] rounded-none cursor-pointer"
                    />
                    <span className={checked ? "font-medium text-maroon" : "text-grey"}>
                      {cat}
                    </span>
                  </div>
                  <span className="text-[10px] text-grey/60 font-montserrat">({count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Color Family Swatches */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("color")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
            Colour Family
          </span>
          {collapsedGroups["color"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["color"] && (
          <div className="mt-3 grid grid-cols-5 gap-2">
            {Object.entries(COLOR_SWATCHES).map(([color, swatch]) => {
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
                  className={`relative flex flex-col items-center p-1 border transition-all ${
                    checked
                      ? "border-maroon ring-1 ring-gold shadow-sm"
                      : "border-gold/20 hover:border-gold"
                  } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div
                    className="w-5 h-5 rounded-none border border-black/10 shadow-inner"
                    style={{
                      background: swatch.startsWith("linear") ? swatch : swatch,
                    }}
                  />
                  <span className="text-[8px] font-montserrat text-grey mt-1 truncate max-w-full">
                    {color}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Origin with search */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("origin")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
            Origin
          </span>
          {collapsedGroups["origin"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["origin"] && (
          <div className="mt-3 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-grey absolute left-2 top-2" />
              <input
                type="text"
                placeholder="Search origin..."
                value={originSearch}
                onChange={(e) => setOriginSearch(e.target.value)}
                className="w-full pl-7 pr-2 py-1 text-xs bg-white border border-gold/30 rounded-none focus:outline-none focus:border-gold"
              />
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {[
                "Italy",
                "Brazil",
                "India",
                "Spain",
                "Turkey",
                "South Africa",
                "Greece",
                "Iran",
              ]
                .filter((o) => o.toLowerCase().includes(originSearch.toLowerCase()))
                .map((origin) => {
                  const count = getCount("origin", origin);
                  const checked = filterState.origin.includes(origin);
                  const disabled = count === 0;
                  return (
                    <label
                      key={origin}
                      className={`flex items-center justify-between text-xs cursor-pointer py-0.5 ${
                        disabled ? "opacity-35 pointer-events-none" : "hover:text-maroon"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleToggle("origin", origin)}
                          className="accent-[#541B2A] rounded-none cursor-pointer"
                        />
                        <span className={checked ? "font-medium text-maroon" : "text-grey"}>
                          {origin}
                        </span>
                      </div>
                      <span className="text-[10px] text-grey/60 font-montserrat">({count})</span>
                    </label>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Finish Filter */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("finishes")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
            Finish
          </span>
          {collapsedGroups["finishes"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["finishes"] && (
          <div className="mt-3 space-y-1.5">
            {["Polished", "Honed", "Leathered", "Brushed", "Antique", "Flamed"].map((fin) => {
              const count = getCount("finishes", fin);
              const checked = filterState.finishes.includes(fin);
              const disabled = count === 0;
              return (
                <label
                  key={fin}
                  className={`flex items-center justify-between text-xs cursor-pointer py-0.5 ${
                    disabled ? "opacity-35 pointer-events-none" : "hover:text-maroon"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggle("finishes", fin)}
                      className="accent-[#541B2A] rounded-none cursor-pointer"
                    />
                    <span className={checked ? "font-medium text-maroon" : "text-grey"}>
                      {fin}
                    </span>
                  </div>
                  <span className="text-[10px] text-grey/60 font-montserrat">({count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Application Area */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("applications")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
            Application
          </span>
          {collapsedGroups["applications"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["applications"] && (
          <div className="mt-3 space-y-1.5">
            {[
              "Flooring",
              "Wall Cladding",
              "Countertop",
              "Facade",
              "Staircase",
              "Bathroom",
              "Pooja Room",
              "Outdoor",
            ].map((app) => {
              const count = getCount("applications", app);
              const checked = filterState.applications.includes(app);
              const disabled = count === 0;
              return (
                <label
                  key={app}
                  className={`flex items-center justify-between text-xs cursor-pointer py-0.5 ${
                    disabled ? "opacity-35 pointer-events-none" : "hover:text-maroon"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggle("applications", app)}
                      className="accent-[#541B2A] rounded-none cursor-pointer"
                    />
                    <span className={checked ? "font-medium text-maroon" : "text-grey"}>
                      {app}
                    </span>
                  </div>
                  <span className="text-[10px] text-grey/60 font-montserrat">({count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Veining & Pattern */}
      <div className="border-b border-gold/20 pb-4">
        <button
          onClick={() => toggleGroup("veining")}
          className="w-full flex items-center justify-between py-1 text-left"
        >
          <span className="font-marcellus text-sm text-maroon uppercase tracking-wider">
            Veining & Pattern
          </span>
          {collapsedGroups["veining"] ? (
            <ChevronDown className="w-4 h-4 text-gold" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gold" />
          )}
        </button>

        {!collapsedGroups["veining"] && (
          <div className="mt-3 space-y-1.5">
            {["Bookmatch-ready", "Dramatic", "Veined", "Uniform", "Cloudy"].map((v) => {
              const count = getCount("veining", v);
              const checked = filterState.veining.includes(v);
              const disabled = count === 0;
              return (
                <label
                  key={v}
                  className={`flex items-center justify-between text-xs cursor-pointer py-0.5 ${
                    disabled ? "opacity-35 pointer-events-none" : "hover:text-maroon"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggle("veining", v)}
                      className="accent-[#541B2A] rounded-none cursor-pointer"
                    />
                    <span className={checked ? "font-medium text-maroon" : "text-grey"}>
                      {v}
                    </span>
                  </div>
                  <span className="text-[10px] text-grey/60 font-montserrat">({count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
