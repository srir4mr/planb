"use client";

import { useState } from "react";
import { Check, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PENDING_LISTINGS } from "@/lib/marketplace/data/pending-listings";
import { categories } from "@/lib/marketplace/data/categories";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function ListingsQueueClient() {
  const [queue, setQueue] = useState(PENDING_LISTINGS);
  const category = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="heading-eyebrow">Moderation Queue</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Listings {queue.length > 0 && `(${queue.length})`}</h1>
      </div>

      {queue.length === 0 ? (
        <p className="text-sm text-foreground-muted">Queue is clear — nothing pending review.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {queue.map((l) => (
            <div key={l.id} className="rounded-md border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-bold">{l.title}</p>
                  <p className="mt-1 text-xs text-foreground-muted">
                    {l.supplierName} &middot; {category(l.categoryId)} &middot; {formatINR(l.price)} &middot; submitted{" "}
                    {new Date(l.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => setQueue((q) => q.filter((x) => x.id !== l.id))}>
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setQueue((q) => q.filter((x) => x.id !== l.id))}>
                    <X className="h-4 w-4" /> Reject
                  </Button>
                </div>
              </div>
              {l.issue && (
                <div className="mt-3 flex items-start gap-2 rounded-md border border-warning/30 bg-warning/10 p-3 text-sm text-foreground">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" /> {l.issue}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
