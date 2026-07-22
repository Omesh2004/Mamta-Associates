"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Filter, Leaf, Minus, Plus, Search, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  applications,
  categories,
  certifications,
  products,
  type Product
} from "@/lib/products";
import { ProductModal } from "./ProductModal";
import { ProductVisual } from "./ProductVisual";

type SortMode = "Most Popular" | "Eco-Impact Score";

export function ProductCatalog() {
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(products);
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("Most Popular");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(products.map((product) => [product.id, 0]))
  );

  useEffect(() => {
    let mounted = true;

    fetch("/api/content", { cache: "no-store" })
      .then((response) => response.json())
      .then((content) => {
        if (!mounted || !Array.isArray(content.products)) return;
        setCatalogProducts(content.products);
        setQuantities((current) => ({
          ...Object.fromEntries(content.products.map((product: Product) => [product.id, 0])),
          ...current
        }));
      })
      .catch(() => {
        setCatalogProducts(products);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    return catalogProducts
      .filter((product) => {
        const haystack = `${product.title} ${product.active} ${product.category} ${product.badges.join(" ")}`.toLowerCase();
        const matchesQuery = haystack.includes(query.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesApplication =
          selectedApplications.length === 0 || selectedApplications.some((item) => product.application.includes(item as Product["application"][number]));
        const matchesCertification =
          selectedCertifications.length === 0 || selectedCertifications.some((item) => product.certifications.includes(item as Product["certifications"][number]));
        return matchesQuery && matchesCategory && matchesApplication && matchesCertification;
      })
      .sort((a, b) => {
        if (sortMode === "Eco-Impact Score") return b.ecoScore - a.ecoScore;
        return b.popularity - a.popularity;
      });
  }, [catalogProducts, query, selectedApplications, selectedCategories, selectedCertifications, sortMode]);

  function toggleFilter(value: string, setter: (next: string[]) => void, current: string[]) {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function updateQuantity(id: string, next: number) {
    setQuantities((current) => ({ ...current, [id]: Math.max(0, next) }));
  }

  const activeFiltersCount =
    selectedCategories.length + selectedApplications.length + selectedCertifications.length;

  function clearAllFilters() {
    setSelectedCategories([]);
    setSelectedApplications([]);
    setSelectedCertifications([]);
    setQuery("");
  }

  const selectedProducts = catalogProducts.filter((p) => (quantities[p.id] || 0) > 0);
  const totalItems = selectedProducts.reduce((acc, p) => acc + quantities[p.id], 0);

  const mailtoSubject = encodeURIComponent("Product Inquiry");
  const mailtoBody = encodeURIComponent(
    `Hello,\n\nI would like to inquire about the following items:\n\n${selectedProducts
      .map((p) => `- ${p.title} (Qty: ${quantities[p.id]})`)
      .join("\n")}\n\nPlease let me know the next steps.\n\nThank you!`
  );
  const mailtoLink = `mailto:omeshmheta70@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <section className="bg-slatewash dark:bg-slate-950 transition-colors duration-500 px-4 py-10 sm:px-6 lg:px-10" id="catalog">
      <div className="mx-auto max-w-7xl">

        {/* ── SEARCH + SORT BAR ── */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/80 dark:border-white/10 bg-white dark:bg-slate-900/50 shadow-lg shadow-emerald-100/40 dark:shadow-none backdrop-blur-sm">
          <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-canopy text-white shadow-sm">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Product Catalog</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">Eco-certified cleaning chemistry</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 lg:max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="h-11 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 pl-11 pr-10 text-sm outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white dark:focus:bg-white/10 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-500/20"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="relative shrink-0">
                <select
                  className="h-11 appearance-none rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 pl-4 pr-9 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-500/20"
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                >
                  <option>Most Popular</option>
                  <option>Eco-Impact Score</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* ── FILTER STRIP ── */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-transparent px-5 py-3 scrollbar-hide">
            <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </span>
            <div className="mx-2 h-4 w-px shrink-0 bg-slate-200" />
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={selectedCategories.includes(cat)}
                onToggle={() => toggleFilter(cat, setSelectedCategories, selectedCategories)}
              />
            ))}
            <div className="mx-1 h-4 w-px shrink-0 bg-slate-200" />
            {applications.map((app) => (
              <FilterChip
                key={app}
                label={app}
                active={selectedApplications.includes(app)}
                onToggle={() => toggleFilter(app, setSelectedApplications, selectedApplications)}
              />
            ))}
            <div className="mx-1 h-4 w-px shrink-0 bg-slate-200" />
            {certifications.map((cert) => (
              <FilterChip
                key={cert}
                label={cert}
                active={selectedCertifications.includes(cert)}
                onToggle={() => toggleFilter(cert, setSelectedCertifications, selectedCertifications)}
              />
            ))}
            {activeFiltersCount > 0 && (
              <button
                className="ml-2 shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* ── RESULT COUNT ── */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Showing <span className="font-bold text-slate-800 dark:text-slate-200">{visibleProducts.length}</span> product{visibleProducts.length !== 1 ? "s" : ""}
            {activeFiltersCount > 0 && <span className="ml-1 text-emerald-600 dark:text-emerald-400">({activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active)</span>}
          </p>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3 w-3" />
              Filtered view
            </span>
          )}
        </div>

        {/* ── PRODUCT GRID ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            layout
          >
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
              >
                <ProductCard
                  product={product}
                  quantity={quantities[product.id] ?? 0}
                  onOpen={() => setActiveProduct(product)}
                  onQuantityChange={(next) => updateQuantity(product.id, next)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {visibleProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-emerald-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-14 text-center backdrop-blur-sm"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-400">
              <Search className="h-6 w-6" />
            </div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">No products match your filters</p>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">Try adjusting or clearing the active filters</p>
            <button
              className="mt-5 rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-canopy"
              onClick={clearAllFilters}
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>

      <ProductModal
        product={activeProduct}
        quantities={quantities}
        onOpenChange={(open) => !open && setActiveProduct(null)}
        onQuantityChange={updateQuantity}
      />

      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-2xl bg-slate-900 px-6 py-4 shadow-2xl shadow-slate-900/40 border border-slate-700/50"
        >
          <div className="text-white">
            <p className="text-sm font-semibold">{totalItems} item{totalItems > 1 ? "s" : ""} selected</p>
          </div>
          <a
            href={mailtoLink}
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-400 active:scale-95 whitespace-nowrap"
          >
            Contact
          </a>
        </motion.div>
      )}
    </section>
  );
}

// ── FILTER CHIP ──────────────────────────────────────────────────────────────
function FilterChip({
  label,
  active,
  onToggle
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
        active
          ? "border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-200 dark:shadow-none"
          : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-emerald-300 dark:hover:border-white/30 hover:text-emerald-700 dark:hover:text-white"
      }`}
    >
      {active && <X className="h-3 w-3" />}
      {label}
    </button>
  );
}

// ── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  quantity,
  onOpen,
  onQuantityChange
}: {
  product: Product;
  quantity: number;
  onOpen: () => void;
  onQuantityChange: (next: number) => void;
}) {
  const ecoTier = product.ecoScore >= 130 ? "High" : product.ecoScore >= 110 ? "Good" : "Standard";
  const ecoColor = ecoTier === "High" ? "text-emerald-600 bg-emerald-50" : ecoTier === "Good" ? "text-teal-600 bg-teal-50" : "text-slate-500 bg-slate-50";

  return (
    <motion.article
      whileHover={{ y: -5, boxShadow: "0 20px 60px -12px rgba(16,72,48,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white dark:border-white/10 bg-white dark:bg-white/5 shadow-md shadow-slate-100 dark:shadow-none backdrop-blur-sm"
    >
      {/* top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-forest via-canopy to-mint" />

      {/* visual */}
      <button className="block w-full overflow-hidden px-5 pt-5" onClick={onOpen} aria-label={`View ${product.title} details`}>
        <div className="overflow-hidden rounded-xl">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <ProductVisual product={product} />
          </motion.div>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
        {/* badges row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-lg bg-forest/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-forest">
            {product.category}
          </span>
          <span className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${ecoColor}`}>
            Eco {ecoTier}
          </span>
        </div>

        {/* title */}
        <button
          className="text-left text-[15px] font-bold leading-snug text-slate-900 dark:text-white transition-colors hover:text-forest dark:hover:text-emerald-400"
          onClick={onOpen}
        >
          {product.title}
        </button>



        <div className="flex flex-wrap gap-1.5">
          {product.badges.slice(0, 3).map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1 rounded-lg border border-emerald-400 dark:border-emerald-500/50 bg-white dark:bg-white/5 px-2 py-1 text-[11px] font-semibold text-forest dark:text-emerald-300">
              <ShieldCheck className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
              {badge}
            </span>
          ))}
        </div>

        {/* divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

        {/* price + qty */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Packaging</p>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{product.caseQty}</p>
          </div>

          {/* quantity stepper */}
          <div>
            <p className="mb-1.5 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Qty</p>
            <div className="flex h-9 items-center overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
              <button
                className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-emerald-50 hover:text-forest"
                onClick={() => onQuantityChange(quantity - 1)}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">{quantity}</span>
              <button
                className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-emerald-50 hover:text-forest"
                onClick={() => onQuantityChange(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="mt-auto flex pt-2">
          <button
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-forest transition hover:border-emerald-400 hover:bg-emerald-100 active:scale-[0.97]"
            onClick={onOpen}
          >
            <FileText className="h-4 w-4" />
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}
