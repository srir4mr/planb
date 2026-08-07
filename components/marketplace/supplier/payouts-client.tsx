"use client";

import { Wallet, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSupplierSession } from "@/components/marketplace/supplier-session-provider";
import { useOrders } from "@/components/marketplace/orders-provider";
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

export function PayoutsClient() {
  const { supplier } = useSupplierSession();
  const { orders } = useOrders();

  const rows = orders
    .map((o) => ({ order: o, gross: o.items.filter((i) => i.supplierId === supplier.id).reduce((s, i) => s + i.qty * i.unitPrice, 0) }))
    .filter((r) => r.gross > 0)
    .map((r) => ({ ...r, commission: r.gross * COMMISSION_RATE, net: r.gross * (1 - COMMISSION_RATE) }));

  const pending = rows.filter((r) => r.order.status === "HELD" || r.order.status === "SHIPPED").reduce((s, r) => s + r.net, 0);
  const available = rows.filter((r) => r.order.status === "RELEASED").reduce((s, r) => s + r.net, 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="heading-eyebrow">Escrow Ledger</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Payouts</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-success/30 bg-success/10 p-6">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <p className="mt-3 font-display text-2xl font-bold tabular-nums text-success">{formatINR(available)}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Available for payout</p>
        </div>
        <div className="rounded-md border border-border bg-surface p-6">
          <Clock className="h-5 w-5 text-accent" />
          <p className="mt-3 font-display text-2xl font-bold tabular-nums text-foreground">{formatINR(pending)}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Pending in escrow</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-hair bg-surface text-xs uppercase tracking-widest2 text-foreground-muted">
              <th className="px-4 py-3 font-mono font-normal">Order</th>
              <th className="px-4 py-3 font-mono font-normal">Gross</th>
              <th className="px-4 py-3 font-mono font-normal">Commission ({(COMMISSION_RATE * 100).toFixed(0)}%)</th>
              <th className="px-4 py-3 font-mono font-normal">Net</th>
              <th className="px-4 py-3 font-mono font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.order.id} className="border-b border-border-hair last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-foreground-muted">{r.order.id}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-foreground">{formatINR(r.gross)}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-foreground-muted">-{formatINR(r.commission)}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-foreground">{formatINR(r.net)}</td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_VARIANT[r.order.status]}>{r.order.status}</Badge>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-foreground-muted">
                  <Wallet className="mx-auto mb-2 h-6 w-6" />
                  No escrow activity yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
