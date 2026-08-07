"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, ListChecks, AlertOctagon, ShieldAlert, Flag, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/marketplace/admin", label: "Overview", icon: LayoutGrid },
  { href: "/marketplace/admin/suppliers", label: "Suppliers", icon: Users },
  { href: "/marketplace/admin/listings", label: "Listings", icon: ListChecks },
  { href: "/marketplace/admin/disputes", label: "Disputes", icon: AlertOctagon },
  { href: "/marketplace/admin/fraud", label: "Fraud", icon: ShieldAlert },
  { href: "/marketplace/admin/reports", label: "Reports", icon: Flag },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-64">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-racing-light">Internal</p>
        <h2 className="mt-1 font-display text-lg font-bold uppercase tracking-tight">Admin Console</h2>
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
