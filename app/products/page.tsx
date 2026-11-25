"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { PRODUCTS } from "@/data/products";
import { StoneProduct } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterState } from "@/components/products/ProductFilters";
import { ProductDropdownFilters } from "@/components/products/ProductDropdownFilters";
import { CompareDrawer } from "@/components/products/CompareDrawer";
import { MoodboardDrawer } from "@/components/products/MoodboardDrawer";
import { BespokeOrderForm } from "@/components/products/BespokeOrderForm";
import { getWhatsAppUrl } from "@/lib/config";
import { motion, AnimatePresence } from "motion/react";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Search,
  MessageSquare,
  Layers,
  X,
  ChevronDown,
  Check,
  Sparkles,
  RotateCcw,
} from "lucide-react";

import { CATEGORY_TYPES_MAP, getTypesForCategory } from "@/data/categoryTypes";

function ProductsContent() {
  const searchParams = useSearchParams();

  // Initial filter state from URL params
  const initialCategory = searchParams.get("category") || "Natural Stones";
  const initialSubCategory = searchParams.get("subCategory") || searchParams.get("type");
  const initialApp = searchParams.get("application");
  const rawColor = searchParams.get("color") || searchParams.get("colorFamily");
  const initialColor = rawColor
    ? rawColor.toLowerCase() === "gold"
      ? "Gold-Yellow"
      : rawColor
    : null;

  const [filterState, setFilterState] = useState<FilterState>({
    category: [initialCategory],
    subCategory: initialSubCategory ? [initialSubCategory] : [],
    colorFamily: initialColor ? [initialColor] : [],
    origin: [],
    finishes: [],
    applications: initialApp ? [initialApp] : [],
    thicknesses: [],
    veining: [],
    priceTier: [],
    availability: [],
  });

  // Sync filters whenever searchParams update
  useEffect(() => {
    const cat = searchParams.get("category");
    const sub = searchParams.get("subCategory") || searchParams.get("type");
    const app = searchParams.get("application");
    const rawCol = searchParams.get("color") || searchParams.get("colorFamily");
    const col = rawCol
      ? rawCol.toLowerCase() === "gold"
        ? "Gold-Yellow"
        : rawCol
      : null;

    if (cat || sub || app || col) {
      setFilterState((prev) => ({
        ...prev,
        ...(cat ? { category: [cat] } : {}),
        ...(sub ? { subCategory: [sub] } : {}),
        ...(app ? { applications: [app] } : {}),
        ...(col ? { colorFamily: [col] } : {}),
      }));
    }
  }, [searchParams]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  // Compare & Moodboard state
  const [compareList, setCompareList] = useState<StoneProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [moodboard, setMoodboard] = useState<StoneProduct[]>([]);
  const [isMoodboardOpen, setIsMoodboardOpen] = useState(false);

  // Load moodboard from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("intioss_moodboard");
      if (saved) {
        const parsedSlugs: string[] = JSON.parse(saved);
        const matched = PRODUCTS.filter((p) => parsedSlugs.includes(p.slug));
        setMoodboard(matched);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save moodboard to localStorage
  const handleToggleMoodboard = (product: StoneProduct) => {
    setMoodboard((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const updated = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
      localStorage.setItem("intioss_moodboard", JSON.stringify(updated.map((p) => p.slug)));
      return updated;
    });
  };

  const handleToggleCompare = (product: StoneProduct) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 stones simultaneously.");
        return prev;
      }
      setIsCompareOpen(true);
      return [...prev, product];
    });
  };

  // Fuse.js search index
  const fuse = useMemo(() => {
    return new Fuse(PRODUCTS, {
      keys: ["name", "origin", "category", "subCategory", "colorFamily", "description", "veining"],
      threshold: 0.35,
    });
  }, []);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    // Search query with typo tolerance
    if (searchQuery.trim()) {
      list = fuse.search(searchQuery).map((res) => res.item);
    }

    // Filter by category
    if (filterState.category.length > 0) {
      list = list.filter((p) =>
        filterState.category.includes(p.category) ||
        (p.subCategory && filterState.category.includes(p.subCategory))
      );
    }

    // Filter by subCategory / Types
    if (filterState.subCategory.length > 0) {
      list = list.filter((p) => {
        return filterState.subCategory.some((sub) => {
          const s = sub.toLowerCase().replace(/[\s-]/g, "");
          const prodSub = (p.subCategory || "").toLowerCase().replace(/[\s-]/g, "");
          const prodName = p.name.toLowerCase().replace(/[\s-]/g, "");
          const prodDesc = (p.description || "").toLowerCase().replace(/[\s-]/g, "");

          return (
            prodSub.includes(s) ||
            s.includes(prodSub) ||
            prodName.includes(s) ||
            prodDesc.includes(s)
          );
        });
      });
    }

    // Filter by color family
    if (filterState.colorFamily.length > 0) {
      list = list.filter((p) => {
        return filterState.colorFamily.some((c) => {
          const query = c.toLowerCase();
          const prodColor = (p.colorFamily || "").toLowerCase();
          if (prodColor === query || prodColor.includes(query) || query.includes(prodColor)) {
            return true;
          }
          if (
            (query.includes("black") || query.includes("white")) &&
            p.description?.toLowerCase().includes("black and white")
          ) {
            return true;
          }
          if (p.description?.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)) {
            return true;
          }
          return false;
        });
      });
    }

    // Filter by origin
    if (filterState.origin.length > 0) {
      list = list.filter((p) =>
        filterState.origin.some((o) => p.origin.toLowerCase().includes(o.toLowerCase()))
      );
    }

    // Filter by finishes
    if (filterState.finishes.length > 0) {
      list = list.filter((p) => p.finishes.some((f) => filterState.finishes.includes(f)));
    }

    // Filter by applications
    if (filterState.applications.length > 0) {
      list = list.filter((p) =>
        p.applications.some((a) =>
          filterState.applications.some(
            (filterApp) =>
              filterApp.toLowerCase().includes(a.toLowerCase()) ||
              a.toLowerCase().includes(filterApp.toLowerCase())
          )
        )
      );
    }

    // Filter by veining
    if (filterState.veining.length > 0) {
      list = list.filter((p) => filterState.veining.includes(p.veining));
    }

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0; // featured default
    });
  }, [filterState, searchQuery, sortBy, fuse]);

  const clearAllFilters = () => {
    setFilterState({
      category: ["Natural Stones"],
      subCategory: [],
      colorFamily: [],
      origin: [],
      finishes: [],
      applications: [],
      thicknesses: [],
      veining: [],
      priceTier: [],
      availability: [],
    });
    setSearchQuery("");
  };

  const removeFilter = (key: keyof FilterState, val: string) => {
    setFilterState((prev) => {
      if (key === "category") {
        const childTypes = CATEGORY_TYPES_MAP[val] || [];
        const nextSubs = prev.subCategory.filter((s) => !childTypes.includes(s));
        return {
          ...prev,
          category: prev.category.filter((c) => c !== val),
          subCategory: nextSubs,
        };
      }
      return {
        ...prev,
        [key]: prev[key].filter((v) => v !== val),
      };
    });
  };

  const activeFiltersCount = useMemo(() => {
    return (
      filterState.category.length +
      filterState.subCategory.length +
      filterState.colorFamily.length +
      filterState.origin.length +
      filterState.finishes.length +
      filterState.applications.length +
      filterState.veining.length +
      (searchQuery.trim() ? 1 : 0)
    );
  }, [filterState, searchQuery]);

  // Multi-Select Category Toggle
  const handleCategoryToggle = (cat: string) => {
    setFilterState((prev) => {
      const exists = prev.category.includes(cat);
      if (exists) {
        // Deselecting category -> remove it and any child types
        const childTypes = CATEGORY_TYPES_MAP[cat] || [];
        const nextSubs = prev.subCategory.filter((s) => !childTypes.includes(s));
        return {
          ...prev,
          category: prev.category.filter((c) => c !== cat),
          subCategory: nextSubs,
        };
      } else {
        // Selecting category
        return {
          ...prev,
          category: [...prev.category, cat],
        };
      }
    });
  };

  // Multi-Select Subcategory / Type Toggle
  const handleSubCategoryToggle = (subCat: string, parentCat?: string) => {
    setFilterState((prev) => {
      const exists = prev.subCategory.includes(subCat);
      const nextSubs = exists
        ? prev.subCategory.filter((s) => s !== subCat)
        : [...prev.subCategory, subCat];

      // Auto-include parent category if categories are filtered
      let nextCats = prev.category;
      if (!exists && parentCat && prev.category.length > 0 && !prev.category.includes(parentCat)) {
        nextCats = [...prev.category, parentCat];
      }

      return {
        ...prev,
        category: nextCats,
        subCategory: nextSubs,
      };
    });
  };

  const handleApplicationPillClick = (app: string) => {
    setFilterState((prev) => {
      const exists = prev.applications.includes(app);
      return {
        ...prev,
        applications: exists ? prev.applications.filter((a) => a !== app) : [...prev.applications, app],
      };
    });
  };

  const APPLICATION_PILLS = [
    "Flooring",
    "Bathroom",
    "Kitchen Countertop",
    "Table Top",
    "Wall Cladding — Interior",
    "Wall Cladding — Exterior",
    "Exterior Flooring",
    "Feature Wall",
  ];

  const ORDER_BASIS_CATEGORIES = [
    "Exclusive Table Tops — Stone",
    "Mosaics",
    "Stone Veneers",
    "Stone Art",
    "Artefacts",
  ];

  const CATEGORY_PILLS = [
    {
      id: "Natural Stones",
      label: "Natural Stones",
      count: PRODUCTS.filter((p) => p.category === "Natural Stones").length,
    },
    {
      id: "Semi-Precious Stones",
      label: "Semi-Precious Stones",
      count: PRODUCTS.filter((p) => p.category === "Semi-Precious Stones").length,
    },
    {
      id: "Exclusive Table Tops — Stone",
      label: "Table Tops",
      count: "On Request",
    },
    {
      id: "Stone Veneers",
      label: "Stone Veneers",
      count: "On Request",
    },
    {
      id: "Stone Art",
      label: "Stone Art",
      count: "On Request",
    },
    {
      id: "Mosaics",
      label: "Mosaics",
      count: "On Request",
    },
  ];

  // Dynamic available types across all selected categories (or all categories if none selected)
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


  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-20 relative">
      {/* Editorial Header & Branded Filter Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 relative z-40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gold/30 pb-4">
          <div className="flex items-center gap-2 text-[11px] font-raleway uppercase tracking-[0.25em] text-stone-600 font-medium">
            <Link href="/" className="hover:text-gold-dark transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gold-dark font-semibold">Surface Catalog</span>
          </div>

          {/* Right Header Area: Search Bar */}
          <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-3">
            <div className="w-full sm:w-72 md:w-80 relative">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stone, origin, type, or vein..."
                className="w-full bg-white border border-gold/40 hover:border-gold pl-9 pr-8 py-2 text-xs font-montserrat text-maroon placeholder:text-stone-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all rounded-full shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-maroon transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* INTIOSS ATELIER PROPER BRANDED FILTER BOX */}
        <div className="mt-8 bg-white border border-gold/50 rounded-3xl p-5 sm:p-7 shadow-[0_16px_50px_rgba(48,12,22,0.08)] relative z-40 overflow-visible">
          {/* Box Branding Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gold/25">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_10px_rgba(221,182,43,0.9)] shrink-0 animate-pulse" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-raleway text-xs uppercase tracking-[0.25em] text-gold-dark font-bold">
                    INTIOSS ATELIER
                  </span>
                  <span className="text-stone-300 font-light hidden xs:inline">•</span>
                  <span className="font-marcellus text-base text-maroon-deep font-semibold tracking-tight">
                    Bespoke Surface Selector
                  </span>
                </div>
                <p className="text-[11px] font-montserrat text-stone-500 mt-0.5">
                  Filter by collection, variety, color, application, finish & quarry origin
                </p>
              </div>
            </div>

            {/* Live Count & Reset */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs font-montserrat pt-1 sm:pt-0">
              <span className="text-stone-600 text-xs font-medium">
                Showing <strong className="text-maroon-deep font-bold">{filteredProducts.length}</strong> of {PRODUCTS.length} curated slabs
              </span>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-maroon hover:text-white bg-gold/15 hover:bg-maroon border border-gold/40 transition-all cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-3 h-3 text-gold-dark" />
                  <span>Reset All ({activeFiltersCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Dropdown Pills Row */}
          <ProductDropdownFilters
            filterState={filterState}
            onFilterChange={setFilterState}
            onClearAll={clearAllFilters}
            allProducts={PRODUCTS}
          />

          {/* Active Filter Dismissible Badges Bar (Inside the Branded Box) */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3.5 border-t border-gold/20">
              <span className="text-[10px] font-raleway uppercase tracking-[0.2em] text-stone-500 mr-1 font-semibold">
                Active Selection:
              </span>
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white border border-gold/40 text-maroon rounded-full shadow-xs">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button onClick={() => setSearchQuery("")} className="hover:text-gold cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterState.category.map((cat) => (
                <span
                  key={`cat-${cat}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-maroon-deep text-ivory border border-gold rounded-full shadow-xs font-medium"
                >
                  <span>{cat.replace(" — Stone", "")}</span>
                  <button onClick={() => removeFilter("category", cat)} className="hover:text-gold cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterState.subCategory.map((sub) => (
                <span
                  key={`sub-${sub}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-gold text-maroon font-bold border border-maroon/20 rounded-full shadow-xs"
                >
                  <span>{sub}</span>
                  <button onClick={() => removeFilter("subCategory", sub)} className="hover:text-maroon-deep cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterState.colorFamily.map((col) => (
                <span
                  key={`col-${col}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 rounded-full shadow-xs"
                >
                  <span>{col}</span>
                  <button onClick={() => removeFilter("colorFamily", col)} className="hover:text-gold cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterState.finishes.map((f) => (
                <span
                  key={`f-${f}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 rounded-full shadow-xs"
                >
                  <span>{f}</span>
                  <button onClick={() => removeFilter("finishes", f)} className="hover:text-gold cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterState.applications.map((app) => (
                <span
                  key={`app-${app}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 rounded-full shadow-xs"
                >
                  <span>{app}</span>
                  <button onClick={() => removeFilter("applications", app)} className="hover:text-gold cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterState.veining.map((v) => (
                <span
                  key={`v-${v}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 rounded-full shadow-xs"
                >
                  <span>{v}</span>
                  <button onClick={() => removeFilter("veining", v)} className="hover:text-gold cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterState.origin.map((orig) => (
                <span
                  key={`orig-${orig}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 rounded-full shadow-xs"
                >
                  <span>{orig}</span>
                  <button onClick={() => removeFilter("origin", orig)} className="hover:text-gold cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Box Bottom Toolbar: Sort & Layout Density Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 mt-3.5 border-t border-gold/20">
            <span className="text-[11px] font-montserrat text-stone-500">
              Interactive Atelier Controls
            </span>

            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              {/* Sort Select */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-montserrat text-stone-500 uppercase tracking-wider">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort stones"
                  className="bg-white border border-gold/40 text-xs font-montserrat text-maroon py-1.5 px-3 rounded-full focus:outline-none focus:border-gold cursor-pointer shadow-2xs"
                >
                  <option value="featured">Featured Curation</option>
                  <option value="name-asc">Name (A – Z)</option>
                  <option value="name-desc">Name (Z – A)</option>
                </select>
              </div>

              {/* Density Toggle (Desktop) */}
              <div className="hidden sm:flex items-center border border-gold/30 bg-white rounded-lg overflow-hidden shadow-2xs">
                <button
                  onClick={() => setDensity("comfortable")}
                  aria-label="2 Columns Showcase"
                  title="2 Columns Luxury Showcase"
                  className={`p-1.5 flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider px-3 transition-colors ${
                    density === "comfortable"
                      ? "bg-maroon text-gold font-semibold"
                      : "text-grey hover:text-maroon"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>2 Col</span>
                </button>
                <button
                  onClick={() => setDensity("compact")}
                  aria-label="3 Columns Compact"
                  title="3 Columns Compact"
                  className={`p-1.5 flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider px-3 transition-colors ${
                    density === "compact"
                      ? "bg-maroon text-gold font-semibold"
                      : "text-grey hover:text-maroon"
                  }`}
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span>3 Col</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout with Generous Luxury Distance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18 lg:mt-24 relative z-10">
        {/* Full-width Product Grid */}
        <div className="w-full relative z-10">
          {filterState.category.length === 1 &&
              ORDER_BASIS_CATEGORIES.includes(filterState.category[0]) && (
                <BespokeOrderForm
                  categoryName={filterState.category[0]}
                  variant="full"
                  className="mb-8"
                />
              )}

            {filteredProducts.length === 0 ? (
              // Empty State with Sourcing on Request WhatsApp CTA
              <div className="bg-white border border-gold/30 p-12 sm:p-16 text-center shadow-sm">
                <span className="font-jost text-xs uppercase tracking-[0.25em] text-gold block mb-2 font-medium">
                  {PRODUCTS.length === 0 ? "Catalog Update" : "Search & Filter"}
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-maroon">
                  {PRODUCTS.length === 0
                    ? "Curated Collections Arriving Soon"
                    : "No surfaces match the selected filters."}
                </h3>
                <p className="font-jost text-xs sm:text-sm text-grey mt-3 max-w-lg mx-auto leading-relaxed">
                  {PRODUCTS.length === 0
                    ? "We are currently updating our bespoke inventory. We source rare Italian marbles, quartzites, onyxes, and semi-precious slabs directly from quarries worldwide for custom projects."
                    : "We source stones through long-standing relationships with quarries worldwide. If you are looking for a specific marble, onyx, or quartzite, our concierge can assist you directly."}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={getWhatsAppUrl("Hello INTIOSS, I am inquiring about a specific stone requirement.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-6 py-3.5 font-montserrat text-xs uppercase tracking-[0.2em] font-medium border border-gold shadow transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                  {PRODUCTS.length > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs font-montserrat uppercase tracking-wider text-grey hover:text-maroon underline cursor-pointer"
                    >
                      Clear Filter Parameters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              // Product Cards Grid: 2 marble products per row by default
              <motion.div
                layout
                className={`grid gap-6 sm:gap-8 ${
                  density === "compact"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                }`}
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      key={product.id}
                    >
                      <ProductCard
                        product={product}
                        isSavedToMoodboard={moodboard.some((p) => p.id === product.id)}
                        isSelectedForCompare={compareList.some((p) => p.id === product.id)}
                        onToggleMoodboard={handleToggleMoodboard}
                        onToggleCompare={handleToggleCompare}
                        density={density}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
        </div>
      </div>

      {/* Floating Compare Drawer */}
      <CompareDrawer
        compareList={compareList}
        isOpen={isCompareOpen}
        onToggleOpen={() => setIsCompareOpen(!isCompareOpen)}
        onRemove={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onClear={() => setCompareList([])}
      />

      {/* Moodboard Shortlist Drawer */}
      <MoodboardDrawer
        moodboard={moodboard}
        isOpen={isMoodboardOpen}
        onClose={() => setIsMoodboardOpen(false)}
        onRemove={(id) => {
          setMoodboard((prev) => {
            const updated = prev.filter((p) => p.id !== id);
            localStorage.setItem("intioss_moodboard", JSON.stringify(updated.map((p) => p.slug)));
            return updated;
          });
        }}
        onClear={() => {
          setMoodboard([]);
          localStorage.removeItem("intioss_moodboard");
        }}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <span className="font-raleway text-xs uppercase tracking-widest text-gold animate-pulse">
            Loading INTIOSS Slabs...
          </span>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
