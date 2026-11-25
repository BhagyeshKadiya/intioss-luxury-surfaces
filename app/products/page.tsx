"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { PRODUCTS } from "@/data/products";
import { StoneProduct } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterState } from "@/components/products/ProductFilters";
import { TopLFilterBar, SideLFilterRail } from "@/components/products/LShapeProductFilters";
import { CompareDrawer } from "@/components/products/CompareDrawer";
import { MoodboardDrawer } from "@/components/products/MoodboardDrawer";
import { BespokeOrderForm } from "@/components/products/BespokeOrderForm";
import { getWhatsAppUrl } from "@/lib/config";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare } from "lucide-react";
import { CATEGORY_TYPES_MAP } from "@/data/categoryTypes";

const ORDER_BASIS_CATEGORIES = [
  "Exclusive Table Tops — Stone",
  "Mosaics",
  "Stone Veneers",
  "Stone Art",
  "Artefacts",
];

function ProductsContent() {
  const searchParams = useSearchParams();

  // Initial filter state from URL params (default to All Products when no ?category= is passed)
  const initialCategory = searchParams.get("category");
  const initialSubCategory = searchParams.get("subCategory") || searchParams.get("type");
  const initialApp = searchParams.get("application");
  const rawColor = searchParams.get("color") || searchParams.get("colorFamily");
  const initialColor = rawColor
    ? rawColor.toLowerCase() === "gold"
      ? "Gold-Yellow"
      : rawColor
    : null;

  const [filterState, setFilterState] = useState<FilterState>({
    category: initialCategory ? [initialCategory] : [],
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

    if (searchQuery.trim()) {
      list = fuse.search(searchQuery).map((res) => res.item);
    }

    if (filterState.category.length > 0) {
      list = list.filter(
        (p) =>
          filterState.category.includes(p.category) ||
          (p.subCategory && filterState.category.includes(p.subCategory))
      );
    }

    if (filterState.subCategory.length > 0) {
      list = list.filter((p) =>
        filterState.subCategory.some((sub) => {
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
        })
      );
    }

    if (filterState.colorFamily.length > 0) {
      list = list.filter((p) =>
        filterState.colorFamily.some((c) => {
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
        })
      );
    }

    if (filterState.origin.length > 0) {
      list = list.filter((p) =>
        filterState.origin.some((o) => p.origin.toLowerCase().includes(o.toLowerCase()))
      );
    }

    if (filterState.finishes.length > 0) {
      list = list.filter((p) => p.finishes.some((f) => filterState.finishes.includes(f)));
    }

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

    if (filterState.veining.length > 0) {
      list = list.filter((p) => filterState.veining.includes(p.veining));
    }

    return [...list].sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
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
    setFilterState((prev) => {
      if (key === "category") {
        const childTypes = CATEGORY_TYPES_MAP[val] || [];
        return {
          ...prev,
          category: prev.category.filter((c) => c !== val),
          subCategory: prev.subCategory.filter((s) => !childTypes.includes(s)),
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

  return (
    <div className="min-h-screen bg-ivory text-maroon pt-24 sm:pt-28 pb-20 relative">
      {/* Breadcrumb Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex items-center justify-between border-b border-gold/30 pb-3">
          <div className="flex items-center gap-2 text-[11px] font-raleway uppercase tracking-[0.25em] text-stone-600 font-medium">
            <Link href="/" className="hover:text-gold-dark transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gold-dark font-semibold">Surface Catalog</span>
          </div>
          <span className="font-marcellus text-sm sm:text-base text-maroon-deep hidden sm:inline">
            INTIOSS Luxury Surfaces
          </span>
        </div>
      </div>

      {/* L-SHAPE HORIZONTAL TOP BAR: Color Palette + Search (Row 1), Category + Sub-Category + Application (Row 2) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <TopLFilterBar
          filterState={filterState}
          onFilterChange={setFilterState}
          onClearAll={clearAllFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          density={density}
          onDensityChange={setDensity}
          totalResults={filteredProducts.length}
          totalProducts={PRODUCTS.length}
          activeFiltersCount={activeFiltersCount}
          allProducts={PRODUCTS}
          onRemoveFilter={removeFilter}
        />
      </div>

      {/* L-SHAPE LOWER BODY: Left Vertical Sidebar (Finish, Origin, Pattern) + Right Product Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Left Arm of L: Finish, Origin, Pattern Multi-Selectors */}
          <SideLFilterRail
            filterState={filterState}
            onFilterChange={setFilterState}
            allProducts={PRODUCTS}
          />

          {/* Right Main Area: Product Grid */}
          <main className="flex-1 w-full min-w-0">
            {filterState.category.length === 1 &&
              ORDER_BASIS_CATEGORIES.includes(filterState.category[0]) && (
                <BespokeOrderForm
                  categoryName={filterState.category[0]}
                  variant="full"
                  className="mb-8"
                />
              )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-gold/35 rounded-3xl p-12 sm:p-16 text-center shadow-sm">
                <span className="font-jost text-xs uppercase tracking-[0.25em] text-gold-dark block mb-2 font-medium">
                  Search & Filter
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-maroon">
                  No surfaces match the selected filters.
                </h3>
                <p className="font-jost text-xs sm:text-sm text-grey mt-3 max-w-lg mx-auto leading-relaxed">
                  We source rare Italian marbles, quartzites, onyxes, and semi-precious slabs
                  directly from quarries worldwide. Our concierge can assist you directly.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={getWhatsAppUrl("Hello INTIOSS, I am inquiring about a specific stone requirement.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white px-6 py-3.5 font-montserrat text-xs uppercase tracking-[0.2em] font-medium border border-gold rounded-full shadow transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-montserrat uppercase tracking-wider text-grey hover:text-maroon underline cursor-pointer"
                  >
                    Clear Filter Parameters
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-6 sm:gap-7 ${
                  density === "compact"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
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
          </main>
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
