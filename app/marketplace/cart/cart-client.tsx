"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/marketplace/ui/product-image";
import { PriceTag } from "@/components/marketplace/ui/price-tag";
import { useCart } from "@/components/marketplace/cart-provider";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function CartClient() {
  const { items, setQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-border py-24 text-center">
        <ShoppingBag className="h-10 w-10 text-foreground-muted" />
        <p className="text-foreground-muted">Your cart is empty.</p>
        <Link href="/marketplace">
          <Button variant="primary">Browse the Marketplace</Button>
        </Link>
      </div>
    );
  }

  const shipping = subtotal > 5000 ? 0 : 199;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-4">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex gap-4 rounded-md border border-border bg-surface p-4">
            <Link href={`/marketplace/p/${product.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-sm">
              <ProductImage product={product} />
            </Link>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-accent">{product.partBrand}</p>
                  <Link href={`/marketplace/p/${product.slug}`}>
                    <h3 className="font-display text-sm font-semibold text-foreground">{product.title}</h3>
                  </Link>
                </div>
                <button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.title}`} className="text-foreground-muted hover:text-racing">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-sm border border-border">
                  <button onClick={() => setQty(product.id, qty - 1)} className="flex h-8 w-8 items-center justify-center text-foreground-muted hover:text-accent" aria-label="Decrease quantity">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono text-sm tabular-nums">{qty}</span>
                  <button onClick={() => setQty(product.id, qty + 1)} className="flex h-8 w-8 items-center justify-center text-foreground-muted hover:text-accent" aria-label="Increase quantity">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <PriceTag price={product.price * qty} size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit rounded-md border border-border bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">Order Summary</p>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex justify-between text-foreground-muted">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums text-foreground">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-foreground-muted">
            <span>Shipping</span>
            <span className="font-mono tabular-nums text-foreground">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between border-t border-border-hair pt-4">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-mono text-lg font-semibold tabular-nums text-foreground">{formatINR(subtotal + shipping)}</span>
        </div>
        <Link href="/marketplace/checkout" className="mt-6 block">
          <Button variant="primary" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>
        <p className="mt-3 text-center text-[11px] text-foreground-muted">Held in escrow until you confirm delivery</p>
      </div>
    </div>
  );
}
