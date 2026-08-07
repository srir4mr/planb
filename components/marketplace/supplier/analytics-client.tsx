"use client";

import { TrendingUp, ShoppingCart, Wallet, Star } from "lucide-react";
import { useSupplierSession } from "@/components/marketplace/supplier-session-provider";
import { useOrders } from "@/components/marketplace/orders-provider";
import { COMMISSION_RATE, type OrderStatus } from "@/lib/marketplace/types";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

const STATUS_LIST: OrderStatus[] = ["HELD", "SHIPPED", "RELEASED", "DISPUTED", "REFUNDED"];

export function AnalyticsClient() {
  const { supplier } = useSupplierSession();
  const { orders } = useOrders();

  const lines = orders.flatMap((o) => o.items.filter((i) => i.supplierId === supplier.id).map((i) => ({ ...i, orderStatus: o.status })));
  const revenue = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);
  const orderCount = new Set(
    orders.filter((o) => o.items.some((i) => i.supplierId === supplier.id)).map((o) => o.id)
  ).size;
  const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0;

  const byProduct = new Map<string, number>();
  for (const l of lines) byProduct.set(l.title, (byProduct.get(l.title) ?? 0) + l.qty * l.unitPrice);
  const topProducts = [...byProduct.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxProductRevenue = topProducts[0]?.[1] ?? 1;

  const statusCounts = STATUS_LIST.map((status) => ({
    status,
    count: orders.filter((o) => o.status === status && o.items.some((i) => i.supplierId === supplier.id)).length,
  }));
  const maxStatusCount = Math.max(...statusCounts.map((s) => s.count), 1);

  const stats = [
    { icon: ShoppingCart, label: "Total Orders", value: orderCount.toString() },
    { icon: TrendingUp, label: "Gross Revenue", value: formatINR(revenue) },
    { icon: Wallet, label: "Avg Order Value", value: formatINR(avgOrderValue) },
    { icon: Star, label: "Rating", value: supplier.rating.toFixed(1) },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="heading-eyebrow">Performance</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Analytics</h1>
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

      <div className="rounded-md border border-border bg-surface p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">Revenue by Product</p>
        {topProducts.length === 0 ? (
          <p className="mt-4 text-sm text-foreground-muted">No sales data yet.</p>
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            {topProducts.map(([title, value]) => (
              <div key={title}>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{title}</span>
                  <span className="font-mono tabular-nums text-foreground-muted">{formatINR(value)}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
                  <div className="h-full bg-accent" style={{ width: `${(value / maxProductRevenue) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-md border border-border bg-surface p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">Orders by Status</p>
        <div className="mt-5 flex flex-col gap-4">
          {statusCounts.map(({ status, count }) => (
            <div key={status}>
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{status}</span>
                <span className="font-mono tabular-nums text-foreground-muted">{count}</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
                <div className="h-full bg-gold" style={{ width: `${(count / maxStatusCount) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-foreground-muted">
        Estimated net after {(COMMISSION_RATE * 100).toFixed(0)}% platform commission: <strong className="text-foreground">{formatINR(revenue * (1 - COMMISSION_RATE))}</strong>
      </p>
    </div>
  );
}
