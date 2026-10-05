"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { PRODUCTS } from "@/data/products";
import { StoneProduct } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters, FilterState } from "@/components/products/ProductFilters";
import { CompareDrawer } from "@/components/products/CompareDrawer";
import { MoodboardDrawer } from "@/components/products/MoodboardDrawer";
import { getWhatsAppUrl } from "@/lib/config";
import { motion, AnimatePresence } from "motion/react";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Search,
  MessageSquare,
  Heart,
  X,
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();

  // Initial filter state from URL params
  const initialCategory = searchParams.get("category");
  const initialApp = searchParams.get("application");

  const [filterState, setFilterState] = useState<FilterState>({
    category: initialCategory ? [initialCategory] : [],
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
      keys: ["name", "origin", "category", "colorFamily", "description", "veining"],
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
      list = list.filter((p) => filterState.category.includes(p.category));
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

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-20">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gold/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-raleway uppercase tracking-[0.25em] text-grey mb-2">
              <span>Home</span>
              <span>/</span>
              <span className="text-gold">Surface Catalog</span>
            </div>
            <h1 className="font-marcellus text-3xl sm:text-5xl text-maroon">
              Natural Stones & Rare Slabs
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Shortlist button */}
            <button
              onClick={() => setIsMoodboardOpen(true)}
              className="inline-flex items-center gap-2 bg-white px-3.5 py-2 border border-gold/40 text-xs font-montserrat text-maroon hover:border-gold shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
              <span>Shortlist ({moodboard.length})</span>
            </button>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-maroon text-white px-3.5 py-2 text-xs font-montserrat uppercase tracking-wider font-semibold border border-gold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Result count, Search, Sort & Density */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-grey absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stone, origin or vein..."
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

          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xs font-montserrat text-grey">
              Showing <strong className="text-maroon">{filteredProducts.length}</strong> of {PRODUCTS.length} stones
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
                aria-label="Comfortable Grid"
                className={`p-1.5 ${density === "comfortable" ? "bg-maroon text-gold" : "text-grey hover:text-maroon"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDensity("compact")}
                aria-label="Compact Grid"
                className={`p-1.5 ${density === "compact" ? "bg-maroon text-gold" : "text-grey hover:text-maroon"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sticky Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 max-h-[82vh] overflow-y-auto pr-3 bg-white p-5 border border-gold/30 shadow-sm scrollbar-thin">
            <ProductFilters
              filterState={filterState}
              onFilterChange={setFilterState}
              onClearAll={clearAllFilters}
              allProducts={PRODUCTS}
            />
          </aside>

          {/* Product Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              // Empty State with Sourcing on Request WhatsApp CTA
              <div className="bg-white border border-gold/30 p-12 sm:p-16 text-center shadow-sm">
                <span className="font-raleway text-xs uppercase tracking-[0.25em] text-gold block mb-2">
                  Bespoke Procurement
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-maroon">
                  Can&apos;t find what you are looking for?
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-grey mt-3 max-w-lg mx-auto leading-relaxed">
                  With 55+ years of European quarry alliances, we source custom blocks directly from Carrara, Verona, and Brazil on request for architects and private estates.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={getWhatsAppUrl("Hello INTIOSS, I have a specific stone requirement that is not in the online catalog.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-6 py-3.5 font-montserrat text-xs uppercase tracking-[0.2em] font-medium border border-gold shadow transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span>Inquire on WhatsApp for Custom Sourcing</span>
                  </a>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-montserrat uppercase tracking-wider text-grey hover:text-maroon underline"
                  >
                    Clear Filter Parameters
                  </button>
                </div>
              </div>
            ) : (
              // Product Cards Grid
              <motion.div
                layout
                className={`grid gap-6 ${
                  density === "compact"
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-ivory text-maroon z-[99] rounded-t-sm p-6 border-t-2 border-gold shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gold/30 mb-4">
                <span className="font-marcellus text-xl text-maroon">Filters</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 border border-gold/40 text-maroon"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ProductFilters
                filterState={filterState}
                onFilterChange={setFilterState}
                onClearAll={clearAllFilters}
                allProducts={PRODUCTS}
              />
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-6 bg-maroon text-white py-3 text-xs font-montserrat uppercase tracking-[0.2em] font-semibold border border-gold"
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
