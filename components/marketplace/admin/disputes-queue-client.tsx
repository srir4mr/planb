"use client";

import { AlertOctagon, IndianRupee, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/components/marketplace/orders-provider";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function DisputesQueueClient() {
  const { orders, setStatus } = useOrders();
  const disputed = orders.filter((o) => o.status === "DISPUTED");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="heading-eyebrow">Escrow Mediation</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">
          Disputes {disputed.length > 0 && `(${disputed.length})`}
        </h1>
      </div>

      {disputed.length === 0 ? (
        <p className="text-sm text-foreground-muted">
          No open disputes. Report an issue from{" "}
          <a href="/marketplace/orders" className="text-accent underline underline-offset-2">
            My Orders
          </a>{" "}
          to see this queue in action.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {disputed.map((o) => (
            <div key={o.id} className="rounded-md border border-racing/30 bg-racing/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">{o.id}</p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {o.customerName || "Customer"} &middot; {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <span className="font-mono text-lg font-semibold tabular-nums text-foreground">{formatINR(o.total)}</span>
              </div>

              <div className="mt-3 flex items-start gap-2 rounded-md bg-background/40 p-3 text-sm text-foreground">
                <AlertOctagon className="mt-0.5 h-4 w-4 shrink-0 text-racing-light" />
                {o.disputeReason}
              </div>

              <div className="mt-4 flex flex-col gap-1.5 border-t border-racing/20 pt-4 text-sm text-foreground-muted">
                {o.items.map((i) => (
                  <div key={i.productId} className="flex justify-between">
                    <span>
                      {i.title} &times; {i.qty}
                    </span>
                    <span className="font-mono tabular-nums text-foreground">{formatINR(i.unitPrice * i.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="primary" size="sm" onClick={() => setStatus(o.id, "RELEASED")}>
                  <IndianRupee className="h-4 w-4" /> Release to Supplier
                </Button>
                <Button variant="racing" size="sm" onClick={() => setStatus(o.id, "REFUNDED")}>
                  <RotateCcw className="h-4 w-4" /> Refund Customer
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
