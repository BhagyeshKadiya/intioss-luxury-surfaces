"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { PRODUCTS } from "@/data/products";
import { StoneProduct } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters, FilterState } from "@/components/products/ProductFilters";
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
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();

  // Initial filter state from URL params
  const initialCategory = searchParams.get("category");
  const initialApp = searchParams.get("application");

  const [filterState, setFilterState] = useState<FilterState>({
    category: initialCategory ? [initialCategory] : [],
    subCategory: [],
    colorFamily: [],
    origin: [],
    finishes: [],
    applications: initialApp ? [initialApp] : [],
    thicknesses: [],
    veining: [],
    priceTier: [],
    availability: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);

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

    // Filter by subCategory
    if (filterState.subCategory.length > 0) {
      list = list.filter((p) =>
        p.subCategory &&
        filterState.subCategory.some(
          (sub) =>
            p.subCategory!.toLowerCase().includes(sub.toLowerCase()) ||
            sub.toLowerCase().includes(p.subCategory!.toLowerCase())
        )
      );
    }

    // Filter by color family
    if (filterState.colorFamily.length > 0) {
      list = list.filter((p) => filterState.colorFamily.includes(p.colorFamily));
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
      category: [],
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
    setFilterState((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== val),
    }));
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

  const handleCategoryPillClick = (cat: string) => {
    if (cat === "ALL") {
      setFilterState((prev) => ({ ...prev, category: [], subCategory: [] }));
    } else {
      setFilterState((prev) => {
        const isSelected = prev.category.length === 1 && prev.category[0] === cat;
        return {
          ...prev,
          category: isSelected ? [] : [cat],
          subCategory: [], // Reset subcategory when switching top category
        };
      });
    }
  };

  const handleSubCategoryPillClick = (subCat: string) => {
    setFilterState((prev) => {
      const exists = prev.subCategory.includes(subCat);
      return {
        ...prev,
        subCategory: exists ? prev.subCategory.filter((s) => s !== subCat) : [...prev.subCategory, subCat],
      };
    });
  };


  const ORDER_BASIS_CATEGORIES = [
    "Exclusive Table Tops — Stone",
    "Mosaics",
    "Stone Veneers",
    "Artefacts",
  ];

  const CATEGORY_PILLS = [
    { id: "ALL", label: "All Collections", count: PRODUCTS.length },
    { id: "Natural Stones", label: "Natural Stones", count: PRODUCTS.filter((p) => p.category === "Natural Stones").length },
    { id: "Semi-Precious Stones", label: "Semi-Precious Stones", count: PRODUCTS.filter((p) => p.category === "Semi-Precious Stones").length },
    { id: "Exclusive Table Tops — Stone", label: "Exclusive Table Tops", count: "On Request" },
    { id: "Mosaics", label: "Mosaics", count: "On Request" },
    { id: "Stone Veneers", label: "Stone Veneers", count: "On Request" },
    { id: "Artefacts", label: "Artefacts", count: "On Request" },
  ];

  // Derive active secondary sub-category pills depending on selected category
  const getSubCategoryPills = () => {
    const activeCat = filterState.category.length === 1 ? filterState.category[0] : null;
    if (activeCat === "Natural Stones") {
      return ["Marble", "Quartzite", "Travertine", "Onyx", "Granite"];
    }
    if (activeCat === "Semi-Precious Stones") {
      return ["Slabs", "Inlays", "Custom tops & furniture"];
    }
    if (activeCat === "Mosaics") {
      return ["Marble", "Semi-precious gemstone", "Hand-cut glass"];
    }
    if (activeCat === "Stone Veneers") {
      return ["Flexible Slate", "Translucent Backlit", "Stone Veneers"];
    }
    if (activeCat === "Artefacts") {
      return ["Artefacts"];
    }
    // Default when ALL or multiple categories
    return ["Marble", "Quartzite", "Travertine", "Onyx", "Granite", "Slabs", "Inlays", "Custom tops & furniture"];
  };

  const subCategoryPills = getSubCategoryPills();


  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-20">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gold/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-raleway uppercase tracking-[0.25em] text-stone-600 mb-2 font-medium">
              <span>Home</span>
              <span>/</span>
              <span className="text-gold-dark font-semibold">Surface Catalog</span>
            </div>
            <h1 className="font-marcellus text-3xl sm:text-5xl text-maroon">
              Luxury Surfaces & Bespoke Stones
            </h1>
            <p className="font-poppins text-xs sm:text-sm text-stone-700 mt-2 max-w-2xl leading-relaxed">
              From rare Italian marble and Brazilian quartzites to luminescent semi-precious slabs, artisan mosaics, flexible stone veneers, and monumental hand-carved artefacts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Filters Toggle Button */}
            <button
              onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
              className="hidden lg:inline-flex items-center gap-2 bg-white px-3.5 py-2 border border-gold/40 text-xs font-montserrat text-maroon hover:border-gold shadow-sm transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <span>{isFilterSidebarOpen ? "Hide Filters" : "Show Filters"}</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-gold text-maroon font-bold text-[10px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Book Match Studio Button */}
            <Link
              href="/book-match"
              className="inline-flex items-center gap-2 bg-white px-3.5 py-2 border border-gold/40 text-xs font-montserrat text-maroon hover:border-gold hover:bg-gold/10 shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Layers className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="font-medium whitespace-nowrap">Book Match</span>
            </Link>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-maroon text-white px-3.5 py-2 text-xs font-montserrat uppercase tracking-wider font-semibold border border-gold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
            </button>
          </div>
        </div>

        {/* Top Horizontal Primary Category Pills Carousel */}
        <div className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-2 scrollbar-hide flex items-center gap-2 sm:gap-3">
          {CATEGORY_PILLS.map((pill) => {
            const isActive =
              (pill.id === "ALL" && filterState.category.length === 0) ||
              (filterState.category.length === 1 && filterState.category[0] === pill.id);
            return (
              <button
                key={pill.id}
                onClick={() => handleCategoryPillClick(pill.id)}
                className={`flex-none inline-flex items-center px-4 py-2.5 text-xs font-montserrat uppercase tracking-wider transition-all border ${
                  isActive
                    ? "bg-maroon-deep text-ivory border-gold shadow-md font-semibold"
                    : "bg-white text-maroon/80 border-gold/30 hover:border-gold hover:text-maroon"
                }`}
              >
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Sub-Category Pills Bar */}
        {subCategoryPills.length > 0 && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-[10px] font-raleway uppercase tracking-[0.2em] text-stone-700 font-semibold flex-shrink-0 mr-1">
              Stone Variety:
            </span>
            {subCategoryPills.map((subCat) => {
              const isActive = filterState.subCategory.includes(subCat);
              const count = PRODUCTS.filter((p) => {
                if (filterState.category.length > 0 && !filterState.category.includes(p.category)) {
                  return false;
                }
                return p.subCategory === subCat;
              }).length;
              if (count === 0 && filterState.category.length > 0) return null;
              return (
                <button
                  key={subCat}
                  onClick={() => handleSubCategoryPillClick(subCat)}
                  className={`flex-none inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-montserrat tracking-wide transition-all border rounded-full ${
                    isActive
                      ? "bg-gold text-maroon border-maroon font-semibold shadow-sm"
                      : "bg-white/80 text-maroon border-gold/25 hover:border-gold"
                  }`}
                >
                  <span>{subCat}</span>
                </button>
              );
            })}
          </div>
        )}


        {/* Toolbar: Search, Result count, Sort & Density */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-grey absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stone, origin, type, or vein..."
              className="w-full bg-white border border-gold/30 pl-9 pr-3 py-2 text-xs text-maroon placeholder:text-grey/50 rounded-none focus:outline-none focus:border-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-grey hover:text-maroon"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <span className="text-xs font-montserrat text-grey">
              Showing <strong className="text-maroon">{filteredProducts.length}</strong> of {PRODUCTS.length} curated products
            </span>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort stones"
                className="bg-white border border-gold/30 text-xs font-montserrat text-maroon py-1.5 px-2 rounded-none focus:outline-none focus:border-gold"
              >
                <option value="featured">Featured Curation</option>
                <option value="name-asc">Name (A – Z)</option>
                <option value="name-desc">Name (Z – A)</option>
              </select>
            </div>

            {/* Density Toggle (Desktop) */}
            <div className="hidden sm:flex items-center border border-gold/30 bg-white">
              <button
                onClick={() => setDensity("comfortable")}
                aria-label="2 Columns Showcase"
                title="2 Columns Luxury Showcase"
                className={`p-1.5 flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider px-3 ${
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
                className={`p-1.5 flex items-center gap-1.5 text-xs font-montserrat uppercase tracking-wider px-3 ${
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

        {/* Active Filter Dismissible Badges Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2 border-t border-gold/20 mt-4">
            <span className="text-[11px] font-raleway uppercase tracking-[0.2em] text-grey mr-1">
              Active Filters:
            </span>
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white border border-gold/40 text-maroon shadow-sm">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button onClick={() => setSearchQuery("")} className="hover:text-gold">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.category.map((cat) => (
              <span
                key={`cat-${cat}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-maroon-deep text-ivory border border-gold shadow-sm font-medium"
              >
                <span>{cat}</span>
                <button onClick={() => removeFilter("category", cat)} className="hover:text-gold">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.subCategory.map((sub) => (
              <span
                key={`sub-${sub}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-gold text-maroon font-semibold border border-maroon/20 shadow-sm"
              >
                <span>{sub}</span>
                <button onClick={() => removeFilter("subCategory", sub)} className="hover:text-maroon/70">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.colorFamily.map((col) => (
              <span
                key={`col-${col}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 shadow-sm"
              >
                <span>Color: {col}</span>
                <button onClick={() => removeFilter("colorFamily", col)} className="hover:text-gold">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.finishes.map((f) => (
              <span
                key={`f-${f}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 shadow-sm"
              >
                <span>Finish: {f}</span>
                <button onClick={() => removeFilter("finishes", f)} className="hover:text-gold">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.applications.map((app) => (
              <span
                key={`app-${app}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 shadow-sm"
              >
                <span>Area: {app}</span>
                <button onClick={() => removeFilter("applications", app)} className="hover:text-gold">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.veining.map((v) => (
              <span
                key={`v-${v}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 shadow-sm"
              >
                <span>Pattern: {v}</span>
                <button onClick={() => removeFilter("veining", v)} className="hover:text-gold">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.origin.map((orig) => (
              <span
                key={`orig-${orig}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-maroon border border-gold/40 shadow-sm"
              >
                <span>Origin: {orig}</span>
                <button onClick={() => removeFilter("origin", orig)} className="hover:text-gold">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 text-xs font-montserrat text-grey hover:text-maroon underline ml-2 cursor-pointer font-medium"
            >
              Clear All ({activeFiltersCount})
            </button>
          </div>
        )}
      </div>

      {/* Main Catalog Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 items-start">
          {/* Desktop Sticky Filter Sidebar */}
          {isFilterSidebarOpen && (
            <aside
              data-lenis-prevent
              className="hidden lg:block w-72 flex-shrink-0 sticky top-24 max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-contain pr-2 bg-white p-5 border border-gold/30 shadow-sm luxury-scrollbar"
            >
              <ProductFilters
                filterState={filterState}
                onFilterChange={setFilterState}
                onClearAll={clearAllFilters}
                allProducts={PRODUCTS}
                hideCategorySelectors={true}
              />
            </aside>
          )}

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
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
                    ? isFilterSidebarOpen
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
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
      </div>

      {/* Mobile Bottom-Sheet Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98]"
            />
            <motion.div
              data-lenis-prevent
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto overscroll-contain luxury-scrollbar bg-ivory text-maroon z-[99] rounded-t-2xl p-6 border-t-2 border-gold shadow-2xl"
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
            >
              {/* iOS Grab Handle */}
              <div className="w-12 h-1 bg-gold/40 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between pb-4 border-b border-gold/30 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-marcellus text-xl text-maroon">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-maroon text-gold text-xs font-semibold px-2 py-0.5 border border-gold/40">
                      {activeFiltersCount} Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs font-montserrat text-stone-700 hover:text-maroon underline font-medium"
                    >
                      Reset All
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="Close filters"
                    className="p-1.5 border border-gold/40 text-maroon hover:border-gold transition-colors active:scale-90"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <ProductFilters
                filterState={filterState}
                onFilterChange={setFilterState}
                onClearAll={clearAllFilters}
                allProducts={PRODUCTS}
                hideCategorySelectors={true}
              />
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-6 bg-maroon hover:bg-maroon-deep text-white py-3.5 text-xs font-montserrat uppercase tracking-[0.2em] font-semibold border border-gold shadow-md active:scale-[0.98] transition-all"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
