"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Select } from "@/components/ui/select";
import { ProductCard } from "@/components/marketplace/product-card";
import { useGarage } from "@/components/marketplace/garage-provider";
import { checkFitment } from "@/lib/marketplace/fitment";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import type { Product, SupplierTier } from "@/lib/marketplace/types";

const TIERS: SupplierTier[] = ["OEM Partner", "Premium Partner", "Gold", "Verified"];

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating";

export function BrowseGrid({ products }: { products: Product[] }) {
  const { activeVehicle } = useGarage();
  const [sort, setSort] = useState<SortKey>("relevance");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showAllFitment, setShowAllFitment] = useState(false);
  const [tiers, setTiers] = useState<SupplierTier[]>([]);

  function toggleTier(t: SupplierTier) {
    setTiers((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  const filtered = useMemo(() => {
    let list = products.map((p) => ({ product: p, fitment: checkFitment(p, activeVehicle) }));

    if (!showAllFitment) {
      list = list.filter(({ fitment }) => fitment.band > 0);
    }
    if (inStockOnly) {
      list = list.filter(({ product }) => product.stockQty > 0);
    }
    if (tiers.length > 0) {
      list = list.filter(({ product }) => {
        const supplier = suppliers.find((s) => s.id === product.supplierId);
        return supplier && tiers.includes(supplier.tier);
      });
    }

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.product.price - b.product.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.product.price - a.product.price);
    if (sort === "rating") sorted.sort((a, b) => b.product.rating - a.product.rating);

    return sorted.map((x) => x.product);
  }, [products, activeVehicle, showAllFitment, inStockOnly, tiers, sort]);

  const hiddenCount = products.length - filtered.length;

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="flex flex-col gap-6">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </p>

          <label className="flex items-center gap-2 py-1.5 text-sm text-foreground">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            In stock only
          </label>

          {activeVehicle && (
            <label className="flex items-center gap-2 py-1.5 text-sm text-foreground">
              <input
                type="checkbox"
                checked={showAllFitment}
                onChange={(e) => setShowAllFitment(e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              Show items that don&apos;t fit {activeVehicle.brand} {activeVehicle.model}
            </label>
          )}
        </div>

        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">Supplier tier</p>
          <div className="flex flex-col gap-1.5">
            {TIERS.map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={tiers.includes(t)} onChange={() => toggleTier(t)} className="h-4 w-4 accent-accent" />
                {t}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-foreground-muted">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {!showAllFitment && activeVehicle && hiddenCount > 0 && (
              <span className="ml-1">
                &middot; {hiddenCount} hidden (don&apos;t fit your {activeVehicle.model})
              </span>
            )}
          </p>
          <div className="w-48">
            <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort by">
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-md border border-dashed border-border py-20 text-center text-foreground-muted">
            No products match these filters yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
