"use client";

import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { ProductImage } from "@/components/marketplace/ui/product-image";
import { PriceTag } from "@/components/marketplace/ui/price-tag";
import { StockPill } from "@/components/marketplace/ui/stock-pill";
import { CompatibilityBadge } from "@/components/marketplace/ui/compatibility-badge";
import { useGarage } from "@/components/marketplace/garage-provider";
import { useCart } from "@/components/marketplace/cart-provider";
import { checkFitment } from "@/lib/marketplace/fitment";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import type { Product } from "@/lib/marketplace/types";

export function ProductCard({ product }: { product: Product }) {
  const { activeVehicle } = useGarage();
  const { addItem } = useCart();
  const supplier = suppliers.find((s) => s.id === product.supplierId);
  const fitment = checkFitment(product, activeVehicle);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors duration-300 hover:border-accent/50">
      <Link href={`/marketplace/p/${product.slug}`} className="relative block h-48 overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
          <ProductImage product={product} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-accent">{product.partBrand}</p>
          <Link href={`/marketplace/p/${product.slug}`}>
            <h3 className="mt-1 line-clamp-2 font-display text-base font-semibold leading-snug text-foreground">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1 text-xs text-foreground-muted">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          {product.rating.toFixed(1)}
          <span className="text-foreground-muted/60">({product.reviewCount})</span>
          {supplier && <span className="ml-auto truncate text-foreground-muted/70">{supplier.name}</span>}
        </div>

        <CompatibilityBadge result={fitment} />

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border-hair pt-3">
          <div className="flex flex-col gap-1">
            <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
            <StockPill qty={product.stockQty} />
          </div>
          <button
            onClick={() => addItem(product.id)}
            aria-label={`Add ${product.title} to cart`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-accent text-background transition-colors hover:bg-accent-light"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
