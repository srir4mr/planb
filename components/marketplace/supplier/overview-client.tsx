"use client";

import Link from "next/link";
import { Package, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSupplierSession } from "@/components/marketplace/supplier-session-provider";
import { useOrders } from "@/components/marketplace/orders-provider";
import { products } from "@/lib/marketplace/data/products";
import { COMMISSION_RATE, type OrderStatus } from "@/lib/marketplace/types";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

const STATUS_VARIANT: Record<OrderStatus, "accent" | "success" | "racing" | "warning" | "default"> = {
  HELD: "accent",
  SHIPPED: "warning",
  DELIVERED: "success",
  RELEASED: "success",
  DISPUTED: "racing",
  REFUNDED: "warning",
};

export function OverviewClient() {
  const { supplier } = useSupplierSession();
  const { orders } = useOrders();

  const myProducts = products.filter((p) => p.supplierId === supplier.id);
  const myOrders = orders
    .map((o) => ({ order: o, lines: o.items.filter((i) => i.supplierId === supplier.id) }))
    .filter((x) => x.lines.length > 0);

  const revenue = myOrders.reduce((sum, { lines }) => sum + lines.reduce((s, l) => s + l.qty * l.unitPrice, 0), 0);
  const netRevenue = revenue * (1 - COMMISSION_RATE);

  const stats = [
    { icon: Package, label: "Active Listings", value: myProducts.length.toString() },
    { icon: ShoppingCart, label: "Orders", value: myOrders.length.toString() },
    { icon: TrendingUp, label: "Gross Revenue", value: formatINR(revenue) },
    { icon: Star, label: "Rating", value: supplier.rating.toFixed(1) },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="heading-eyebrow">Welcome back</p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tightest">{supplier.name}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md border border-border bg-surface p-5">
            <s.icon className="h-4 w-4 text-accent" />
            <p className="mt-3 font-display text-xl font-bold tabular-nums">{s.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-accent/30 bg-accent/5 p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Estimated Net (after {(COMMISSION_RATE * 100).toFixed(0)}% commission)</p>
        <p className="mt-2 font-display text-2xl font-bold tabular-nums text-accent">{formatINR(netRevenue)}</p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold uppercase tracking-tightest">Recent Orders</h2>
          <Link href="/marketplace/supplier/dashboard/orders" className="font-mono text-xs uppercase tracking-widest2 text-accent">
            View All
          </Link>
        </div>

        {myOrders.length === 0 ? (
          <p className="mt-5 text-sm text-foreground-muted">No orders yet for your listings.</p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-hair bg-surface text-xs uppercase tracking-widest2 text-foreground-muted">
                  <th className="px-4 py-3 font-mono font-normal">Order</th>
                  <th className="px-4 py-3 font-mono font-normal">Items</th>
                  <th className="px-4 py-3 font-mono font-normal">Value</th>
                  <th className="px-4 py-3 font-mono font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.slice(0, 5).map(({ order, lines }) => (
                  <tr key={order.id} className="border-b border-border-hair last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-foreground-muted">{order.id}</td>
                    <td className="px-4 py-3 text-foreground">{lines.map((l) => l.title).join(", ")}</td>
                    <td className="px-4 py-3 font-mono tabular-nums text-foreground">
                      {formatINR(lines.reduce((s, l) => s + l.qty * l.unitPrice, 0))}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[order.status]}>{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
