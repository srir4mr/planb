"use client";

import { Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSupplierSession } from "@/components/marketplace/supplier-session-provider";
import { useOrders } from "@/components/marketplace/orders-provider";
import type { OrderStatus } from "@/lib/marketplace/types";

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

export function SupplierOrdersClient() {
  const { supplier } = useSupplierSession();
  const { orders, setStatus } = useOrders();

  const myOrders = orders
    .map((o) => ({ order: o, lines: o.items.filter((i) => i.supplierId === supplier.id) }))
    .filter((x) => x.lines.length > 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="heading-eyebrow">Fulfillment</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Orders</h1>
      </div>

      {myOrders.length === 0 ? (
        <p className="text-sm text-foreground-muted">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {myOrders.map(({ order, lines }) => (
            <div key={order.id} className="rounded-md border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">{order.id}</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} &middot; {order.customerName || "Customer"}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANT[order.status]}>{order.status}</Badge>
              </div>

              <div className="mt-4 flex flex-col gap-1.5 border-t border-border-hair pt-4">
                {lines.map((l) => (
                  <div key={l.productId} className="flex justify-between text-sm text-foreground-muted">
                    <span>
                      {l.title} &times; {l.qty}
                    </span>
                    <span className="font-mono tabular-nums text-foreground">{formatINR(l.unitPrice * l.qty)}</span>
                  </div>
                ))}
              </div>

              {order.status === "HELD" && (
                <div className="mt-4 border-t border-border-hair pt-4">
                  <Button variant="primary" size="sm" onClick={() => setStatus(order.id, "SHIPPED")}>
                    <Truck className="h-4 w-4" /> Mark as Shipped
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
