"use client";

import { Check, X, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SupplierTierBadge } from "@/components/marketplace/ui/supplier-tier-badge";
import { useApplications } from "@/components/marketplace/applications-provider";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import { categories } from "@/lib/marketplace/data/categories";

export function SuppliersQueueClient() {
  const { applications, setStatus } = useApplications();
  const pending = applications.filter((a) => a.status === "pending");
  const reviewed = applications.filter((a) => a.status !== "pending");
  const category = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="heading-eyebrow">Verification Queue</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Suppliers</h1>
      </div>

      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">
          Pending Applications {pending.length > 0 && `(${pending.length})`}
        </h2>
        {pending.length === 0 ? (
          <p className="mt-4 text-sm text-foreground-muted">
            No pending applications — submit one from the{" "}
            <a href="/marketplace/supplier" className="text-accent underline underline-offset-2">
              Become a Supplier
            </a>{" "}
            page to see this queue in action.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {pending.map((a) => (
              <div key={a.id} className="rounded-md border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold">{a.businessName}</p>
                    <p className="mt-1 text-xs text-foreground-muted">
                      GST {a.gst} &middot; {category(a.categoryId)} &middot; {a.contactName} &middot; {a.phone}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => setStatus(a.id, "approved")}>
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setStatus(a.id, "rejected")}>
                      <X className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                </div>
                {a.brandAuth && <p className="mt-3 text-sm text-foreground-muted">{a.brandAuth}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {reviewed.length > 0 && (
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">Recently Reviewed</h2>
          <div className="mt-4 flex flex-col gap-2">
            {reviewed.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-md border border-border-hair bg-surface px-4 py-3 text-sm">
                <span className="text-foreground">{a.businessName}</span>
                <Badge variant={a.status === "approved" ? "success" : "racing"}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">Active Suppliers ({suppliers.length})</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {suppliers.map((s) => (
            <div key={s.id} className="rounded-md border border-border-hair bg-surface p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{s.name}</p>
                <span className="flex items-center gap-1 text-xs text-foreground-muted">
                  <Star className="h-3 w-3 fill-gold text-gold" /> {s.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-foreground-muted">
                <MapPin className="h-3 w-3" /> {s.location}
              </p>
              <div className="mt-3">
                <SupplierTierBadge supplier={s} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
