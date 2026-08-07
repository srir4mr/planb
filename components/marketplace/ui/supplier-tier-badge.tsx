import { BadgeCheck, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Supplier } from "@/lib/marketplace/types";

const TIER_STYLE: Record<Supplier["tier"], string> = {
  Verified: "border-border-hair bg-surface text-foreground-muted",
  Gold: "border-gold/40 bg-gold/10 text-gold",
  "OEM Partner": "border-accent/40 bg-accent/10 text-accent-light",
  "Premium Partner": "border-racing/40 bg-racing/10 text-racing-light",
};

export function SupplierTierBadge({ supplier, className }: { supplier: Supplier; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2",
          TIER_STYLE[supplier.tier]
        )}
      >
        <BadgeCheck className="h-3 w-3" /> {supplier.tier}
      </span>
      {supplier.badges.includes("Fast Shipping") && (
        <span className="inline-flex items-center gap-1 rounded-sm border border-border-hair bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">
          <Zap className="h-3 w-3" /> Fast Shipping
        </span>
      )}
      {supplier.badges.includes("Trusted Supplier") && (
        <span className="inline-flex items-center gap-1 rounded-sm border border-border-hair bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">
          <ShieldCheck className="h-3 w-3" /> Trusted
        </span>
      )}
    </div>
  );
}
