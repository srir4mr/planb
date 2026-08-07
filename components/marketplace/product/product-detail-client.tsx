"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Wrench,
  Clock,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/marketplace/ui/price-tag";
import { StockPill } from "@/components/marketplace/ui/stock-pill";
import { CompatibilityBadge } from "@/components/marketplace/ui/compatibility-badge";
import { useGarage } from "@/components/marketplace/garage-provider";
import { useCart } from "@/components/marketplace/cart-provider";
import { checkFitment, isUniversal } from "@/lib/marketplace/fitment";
import { reviews as allReviews } from "@/lib/marketplace/data/reviews";
import type { Product } from "@/lib/marketplace/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const { activeVehicle } = useGarage();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [confirmedOnly, setConfirmedOnly] = useState(false);

  const fitment = checkFitment(product, activeVehicle);
  const universal = isUniversal(product);
  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const shownReviews = confirmedOnly ? productReviews.filter((r) => r.fitmentConfirmed) : productReviews;

  const avgRating = useMemo(() => {
    if (productReviews.length === 0) return product.rating;
    return productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length;
  }, [productReviews, product.rating]);

  function handleAdd() {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-14">
      {/* Buy box */}
      <div className="rounded-md border border-border bg-surface p-6">
        <div className="flex items-center gap-1 text-sm text-foreground-muted">
          <Star className="h-4 w-4 fill-gold text-gold" />
          {avgRating.toFixed(1)} <span className="text-foreground-muted/60">({product.reviewCount} reviews)</span>
        </div>

        <div className="mt-3">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <CompatibilityBadge result={fitment} />
          <StockPill qty={product.stockQty} />
        </div>

        {!universal && !activeVehicle && (
          <p className="mt-3 text-xs text-foreground-muted">
            <Link href="/marketplace/garage" className="text-accent underline underline-offset-2">
              Add your bike to your Garage
            </Link>{" "}
            to check if this fits before you buy.
          </p>
        )}

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center rounded-sm border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-foreground-muted transition-colors hover:text-accent"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-mono tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(product.stockQty || 1, q + 1))}
              className="flex h-11 w-11 items-center justify-center text-foreground-muted transition-colors hover:text-accent"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button variant="primary" size="lg" className="flex-1" onClick={handleAdd} disabled={product.stockQty === 0}>
            <ShoppingBag className="h-4 w-4" />
            {added ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Fitment panel */}
      <div>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Fitment</h2>
        {universal ? (
          <p className="mt-4 text-sm text-foreground-muted">Universal fit — not tied to a specific bike, brand, or model.</p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-hair bg-surface text-xs uppercase tracking-widest2 text-foreground-muted">
                  <th className="px-4 py-3 font-mono font-normal">Bike</th>
                  <th className="px-4 py-3 font-mono font-normal">Years</th>
                  <th className="px-4 py-3 font-mono font-normal">OEM Ref</th>
                  <th className="px-4 py-3 font-mono font-normal">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {product.fitment.map((rule, i) => {
                  const isActive = activeVehicle?.brand === rule.bikeBrand && activeVehicle?.model === rule.bikeModel;
                  return (
                    <tr key={i} className={`border-b border-border-hair last:border-0 ${isActive ? "bg-accent/5" : ""}`}>
                      <td className="px-4 py-3 text-foreground">
                        {rule.bikeBrand} {rule.bikeModel}
                        {isActive && <span className="ml-2 text-xs text-accent">(your bike)</span>}
                      </td>
                      <td className="px-4 py-3 text-foreground-muted">
                        {rule.yearFrom}–{rule.yearTo}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground-muted">{rule.oemRef ?? "—"}</td>
                      <td className="px-4 py-3">
                        <Badge variant={rule.confidenceBand >= 90 ? "success" : rule.confidenceBand === 75 ? "accent" : "warning"}>
                          {rule.confidenceBand}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Installation panel */}
      {!universal && fitment.rule && (
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Installation Notes</h2>
          <p className="mt-1 text-xs text-foreground-muted">Specific to your {activeVehicle?.brand} {activeVehicle?.model}</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {fitment.rule.torqueSpec && (
              <div className="rounded-md border border-border bg-surface p-4">
                <Wrench className="h-4 w-4 text-accent" />
                <p className="mt-2 text-sm font-semibold">{fitment.rule.torqueSpec}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Torque spec</p>
              </div>
            )}
            {fitment.rule.installTimeMin && (
              <div className="rounded-md border border-border bg-surface p-4">
                <Clock className="h-4 w-4 text-accent" />
                <p className="mt-2 text-sm font-semibold">~{fitment.rule.installTimeMin} min</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Install time</p>
              </div>
            )}
            {fitment.rule.difficulty && (
              <div className="rounded-md border border-border bg-surface p-4">
                <Gauge className="h-4 w-4 text-accent" />
                <p className="mt-2 text-sm font-semibold">{fitment.rule.difficulty} / 5</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Difficulty</p>
              </div>
            )}
          </div>
          {fitment.rule.warnings && (
            <div className="mt-4 flex items-start gap-2 rounded-md border border-warning/30 bg-warning/10 p-4 text-sm text-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              {fitment.rule.warnings}
            </div>
          )}
        </div>
      )}

      {/* Reviews */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">
            Reviews {productReviews.length > 0 && `(${productReviews.length})`}
          </h2>
          {productReviews.some((r) => r.fitmentConfirmed) && (
            <button
              onClick={() => setConfirmedOnly((v) => !v)}
              className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 transition-colors ${
                confirmedOnly ? "border-accent/40 bg-accent/10 text-accent" : "border-border text-foreground-muted"
              }`}
            >
              <Filter className="h-3 w-3" /> Fitment-confirmed only
            </button>
          )}
        </div>

        {shownReviews.length === 0 ? (
          <p className="mt-5 text-sm text-foreground-muted">No reviews yet — be the first to review this product.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            {shownReviews.map((r) => (
              <div key={r.id} className="rounded-md border border-border bg-surface p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{r.userName}</p>
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold" : "fill-transparent"}`} />
                    ))}
                  </div>
                </div>
                {r.fitmentConfirmed && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Fitment confirmed on their bike
                  </p>
                )}
                <p className="mt-3 text-sm text-foreground-muted">{r.comment}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted/60">
                  {new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} &middot; {r.helpfulCount} found this helpful
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
