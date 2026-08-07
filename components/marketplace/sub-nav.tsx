"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Bike, Plus, ShoppingBag } from "lucide-react";
import { useGarage } from "@/components/marketplace/garage-provider";
import { useCart } from "@/components/marketplace/cart-provider";
import { categories } from "@/lib/marketplace/data/categories";
import { cn } from "@/lib/utils";

export function MarketplaceSubNav() {
  const pathname = usePathname();
  const { vehicles, activeVehicle, setActiveVehicleId } = useGarage();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-20 z-40 border-b border-border-hair bg-background/95 backdrop-blur-xl">
      <div className="container-px mx-auto flex h-14 items-center gap-6">
        <div className="relative hidden min-w-0 flex-1 md:block">
          <nav className="no-scrollbar flex items-center gap-5 overflow-x-auto">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/marketplace/c/${c.slug}`}
                className={cn(
                  "shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest2 transition-colors hover:text-accent",
                  pathname === `/marketplace/c/${c.slug}` ? "text-accent" : "text-foreground-muted"
                )}
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
        </div>
        <span className="flex-1 md:hidden" />

        <Link
          href="/marketplace/cart"
          className="relative shrink-0 rounded-sm border border-border p-2 text-foreground-muted transition-colors hover:border-accent/50 hover:text-accent"
          aria-label="Cart"
        >
          <ShoppingBag className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-bold text-background">
              {totalItems}
            </span>
          )}
        </Link>

        <div className="relative shrink-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-foreground transition-colors hover:border-accent/50"
          >
            <Bike className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="hidden max-w-[160px] truncate sm:inline">
              {activeVehicle ? `${activeVehicle.brand} ${activeVehicle.model}` : "Add your bike"}
            </span>
            <span className="max-w-[90px] truncate sm:hidden">
              {activeVehicle ? activeVehicle.model : "Add bike"}
            </span>
            <ChevronDown className="h-3 w-3 shrink-0 text-foreground-muted" />
          </button>

          {open && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border border-border bg-surface p-2 shadow-xl">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setActiveVehicleId(v.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-surface-elevated",
                    activeVehicle?.id === v.id ? "text-accent" : "text-foreground"
                  )}
                >
                  <span>
                    {v.brand} {v.model}
                  </span>
                  <span className="font-mono text-xs text-foreground-muted">{v.year}</span>
                </button>
              ))}
              <Link
                href="/marketplace/garage"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-sm border-t border-border-hair px-3 py-2 pt-3 text-sm text-accent"
              >
                <Plus className="h-3.5 w-3.5" /> Manage Garage
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
