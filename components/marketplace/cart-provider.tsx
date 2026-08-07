"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/lib/marketplace/data/products";

const STORAGE_KEY = "planb-marketplace-cart-v1";

interface CartLine {
  productId: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  items: { product: (typeof products)[number]; qty: number }[];
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  ready: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => ({ product: products.find((p) => p.id === l.productId), qty: l.qty }))
      .filter((i): i is { product: (typeof products)[number]; qty: number } => Boolean(i.product));

    return {
      lines,
      items,
      addItem: (productId, qty = 1) => {
        setLines((prev) => {
          const existing = prev.find((l) => l.productId === productId);
          if (existing) {
            return prev.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l));
          }
          return [...prev, { productId, qty }];
        });
      },
      removeItem: (productId) => setLines((prev) => prev.filter((l) => l.productId !== productId)),
      setQty: (productId, qty) =>
        setLines((prev) => (qty <= 0 ? prev.filter((l) => l.productId !== productId) : prev.map((l) => (l.productId === productId ? { ...l, qty } : l)))),
      clear: () => setLines([]),
      totalItems: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + i.qty * i.product.price, 0),
      ready,
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
