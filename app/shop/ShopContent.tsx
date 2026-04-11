"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import type { Product, ProductCategory, ProductMaterial } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: "Necklaces", value: "necklaces" },
  { label: "Earrings", value: "earrings" },
  { label: "Bracelets", value: "bracelets" },
  { label: "Rings", value: "rings" },
  { label: "Sets", value: "sets" },
];

const MATERIALS: { label: string; value: ProductMaterial }[] = [
  { label: "Gold Plated", value: "gold-plated" },
  { label: "Rose Gold Plated", value: "rose-gold-plated" },
  { label: "Silver Plated", value: "silver-plated" },
  { label: "Oxidised", value: "oxidised" },
];

const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000+", min: 2000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Popular", value: "popular" },
];

// ─── Shop Content ─────────────────────────────────────────────────────────────

interface ShopContentProps {
  allProducts: Product[];
}

export default function ShopContent({ allProducts }: ShopContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") as ProductCategory | null;
  const activeMaterial = searchParams.get("material") as ProductMaterial | null;
  const activePriceRange = searchParams.get("price");
  const activeSort = searchParams.get("sort") || "newest";

  const [drawerOpen, setDrawerOpen] = useState(false);

  const updateURL = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) { params.set(key, value); } else { params.delete(key); }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (activeMaterial) result = result.filter((p) => p.material === activeMaterial);
    if (activePriceRange) {
      const range = PRICE_RANGES[parseInt(activePriceRange, 10)];
      if (range) result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    switch (activeSort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "popular": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [allProducts, activeCategory, activeMaterial, activePriceRange, activeSort]);

  const activeFilterCount = [activeCategory, activeMaterial, activePriceRange].filter(Boolean).length;

  function clearAllFilters() { router.push(pathname, { scroll: false }); }

  // ── Filter panel content (shared between desktop sidebar & mobile drawer) ──
  const filterContent = (
    <div className="flex flex-col gap-6">
      {activeFilterCount > 0 && (
        <button onClick={clearAllFilters} className="text-xs text-gold hover:text-gold-700 font-medium self-start transition-colors">
          Clear all filters ✕
        </button>
      )}
      <FilterGroup title="Category">
        {CATEGORIES.map((cat) => (
          <FilterCheckbox key={cat.value} label={cat.label} checked={activeCategory === cat.value}
            onChange={() => updateURL("category", activeCategory === cat.value ? null : cat.value)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Material">
        {MATERIALS.map((mat) => (
          <FilterCheckbox key={mat.value} label={mat.label} checked={activeMaterial === mat.value}
            onChange={() => updateURL("material", activeMaterial === mat.value ? null : mat.value)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price Range">
        {PRICE_RANGES.map((range, i) => (
          <FilterCheckbox key={i} label={range.label} checked={activePriceRange === String(i)}
            onChange={() => updateURL("price", activePriceRange === String(i) ? null : String(i))} />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-6">

          {/* ── Header ──────────────────────────────────────────── */}
          <FadeIn>
            <div className="flex flex-col gap-4">
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-ivory">Shop</h1>
                  <p className="text-sm text-charcoal-400 mt-1">
                    {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Mobile filter button */}
                  <button onClick={() => setDrawerOpen(true)}
                    className="lg:hidden flex items-center gap-2 h-9 px-4 rounded-lg border border-border text-sm font-medium text-charcoal dark:text-ivory hover:border-gold/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                    </svg>
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </button>
                  <select value={activeSort} onChange={(e) => updateURL("sort", e.target.value)}
                    className="h-9 px-3 rounded-lg border border-border bg-white dark:bg-charcoal-700 text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-gold">
                    {SORT_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                  </select>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Grid layout ─────────────────────────────────────── */}
          <div className="flex gap-8">

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <FadeIn direction="left">
                <div className="sticky top-24">{filterContent}</div>
              </FadeIn>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <FadeIn>
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <span className="text-4xl mb-4" aria-hidden="true">✦</span>
                    <h3 className="font-display text-xl font-semibold text-charcoal dark:text-ivory mb-2">No products found</h3>
                    <p className="text-sm text-charcoal-400 mb-4">Try adjusting your filters or browse all products.</p>
                    <button onClick={clearAllFilters} className="text-sm text-gold font-medium hover:text-gold-700 transition-colors">Clear all filters</button>
                  </div>
                </FadeIn>
              ) : (
                <StaggerChildren stagger={0.06} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <StaggerItem key={product.id}>
                      <ProductCard product={product} />
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* ── Mobile Filter Drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-charcoal-700 shadow-2xl p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-bold text-charcoal dark:text-ivory">Filters</h2>
                <button onClick={() => setDrawerOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-charcoal-400 hover:text-charcoal hover:bg-charcoal-100 transition-colors"
                  aria-label="Close filters">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {filterContent}
              <button onClick={() => setDrawerOpen(false)}
                className="mt-8 w-full h-10 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-700 transition-colors">
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}

// ─── Filter Sub-components ────────────────────────────────────────────────────

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">{title}</h3>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <motion.span
        animate={checked ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.2 }}
        className={`flex items-center justify-center w-4 h-4 rounded border transition-all
          ${checked ? "bg-gold border-gold text-white" : "border-charcoal-200 dark:border-charcoal-500 group-hover:border-gold/60"}`}
      >
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </motion.span>
      <span className="text-sm text-charcoal-400 dark:text-charcoal-300 group-hover:text-charcoal dark:group-hover:text-ivory transition-colors">{label}</span>
    </label>
  );
}
