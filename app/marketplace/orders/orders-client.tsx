"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, CheckCircle2, AlertTriangle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useOrders } from "@/components/marketplace/orders-provider";
import type { Order, OrderStatus } from "@/lib/marketplace/types";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

const STATUS_BADGE: Record<OrderStatus, "accent" | "success" | "racing" | "warning" | "default"> = {
  HELD: "accent",
  SHIPPED: "warning",
  DELIVERED: "success",
  RELEASED: "success",
  DISPUTED: "racing",
  REFUNDED: "warning",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  HELD: "Payment Held in Escrow",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  RELEASED: "Delivered — Escrow Released",
  DISPUTED: "Dispute Under Review",
  REFUNDED: "Refunded",
};

function OrderCard({ order }: { order: Order }) {
  const { setStatus } = useOrders();
  const [disputing, setDisputing] = useState(false);
  const [reason, setReason] = useState("");

  const canAct = order.status === "HELD" || order.status === "SHIPPED";

  return (
    <div className="rounded-md border border-border bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">{order.id}</p>
          <p className="mt-1 text-sm text-foreground-muted">
            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
        <Badge variant={STATUS_BADGE[order.status]}>{STATUS_LABEL[order.status]}</Badge>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-border-hair pt-4">
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm text-foreground-muted">
            <span>
              {item.title} &times; {item.qty}
            </span>
            <span className="font-mono tabular-nums text-foreground">{formatINR(item.unitPrice * item.qty)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-hair pt-4">
        <span className="font-semibold text-foreground">Total</span>
        <span className="font-mono text-lg font-semibold tabular-nums text-foreground">{formatINR(order.total)}</span>
      </div>

      {order.disputeReason && (
        <div className="mt-4 flex items-start gap-2 rounded-md border border-racing/30 bg-racing/10 p-3 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-racing-light" />
          {order.disputeReason}
        </div>
      )}

      {canAct && !disputing && (
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary" size="sm" onClick={() => setStatus(order.id, "RELEASED")}>
            <CheckCircle2 className="h-4 w-4" /> Confirm Delivery
          </Button>
          <Button variant="outline" size="sm" onClick={() => setDisputing(true)}>
            Report an Issue
          </Button>
        </div>
      )}

      {canAct && disputing && (
        <div className="mt-5 flex flex-col gap-3">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="What went wrong? (wrong item, damaged, doesn't fit...)"
            className="min-h-20"
          />
          <div className="flex gap-3">
            <Button
              variant="racing"
              size="sm"
              onClick={() => {
                setStatus(order.id, "DISPUTED", reason || "No reason provided");
                setDisputing(false);
              }}
            >
              Submit Dispute
            </Button>
            <Button variant="outline" size="sm" onClick={() => setDisputing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function OrdersClient() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-border py-24 text-center">
        <Package className="h-10 w-10 text-foreground-muted" />
        <p className="text-foreground-muted">You haven&apos;t placed any orders yet.</p>
        <Link href="/marketplace">
          <Button variant="primary">
            <ShoppingBag className="h-4 w-4" /> Browse the Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} />
      ))}
    </div>
  );
}
