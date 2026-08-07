"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package, ShoppingCart, BarChart3, Wallet, MessageSquare, ExternalLink } from "lucide-react";
import { Select } from "@/components/ui/select";
import { SupplierTierBadge } from "@/components/marketplace/ui/supplier-tier-badge";
import { useSupplierSession } from "@/components/marketplace/supplier-session-provider";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/marketplace/supplier/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/marketplace/supplier/dashboard/products", label: "Products", icon: Package },
  { href: "/marketplace/supplier/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/marketplace/supplier/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/marketplace/supplier/dashboard/payouts", label: "Payouts", icon: Wallet },
  { href: "/marketplace/supplier/dashboard/messages", label: "Messages", icon: MessageSquare },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { supplier, setSupplierId } = useSupplierSession();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-64">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Viewing as (demo)</p>
        <div className="mt-2">
          <Select value={supplier.id} onChange={(e) => setSupplierId(e.target.value)} aria-label="Switch supplier">
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="mt-3">
          <SupplierTierBadge supplier={supplier} />
        </div>
      </div>

      <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-3 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm transition-colors",
                active ? "bg-accent/10 text-accent" : "text-foreground-muted hover:bg-surface-elevated hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/marketplace"
        className="flex items-center gap-2 border-t border-border-hair pt-4 text-xs text-foreground-muted hover:text-accent"
      >
        <ExternalLink className="h-3.5 w-3.5" /> Back to Marketplace
      </Link>
    </aside>
  );
}
