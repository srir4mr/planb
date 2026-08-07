"use client";

import Link from "next/link";
import { UserPlus, AlertOctagon, TrendingUp, Users, ListChecks } from "lucide-react";
import { useApplications } from "@/components/marketplace/applications-provider";
import { useOrders } from "@/components/marketplace/orders-provider";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import { COMMISSION_RATE } from "@/lib/marketplace/types";
import { PENDING_LISTINGS } from "@/lib/marketplace/data/pending-listings";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function AdminOverviewClient() {
  const { applications } = useApplications();
  const { orders } = useOrders();

  const pendingApps = applications.filter((a) => a.status === "pending").length;
  const disputes = orders.filter((o) => o.status === "DISPUTED").length;
  const gmv = orders.reduce((s, o) => s + o.total, 0);
  const takeRate = gmv * COMMISSION_RATE;

  const stats = [
    { icon: UserPlus, label: "Pending Applications", value: pendingApps.toString(), href: "/marketplace/admin/suppliers", tone: pendingApps > 0 ? "text-accent" : "text-foreground" },
    { icon: ListChecks, label: "Pending Listings", value: PENDING_LISTINGS.length.toString(), href: "/marketplace/admin/listings", tone: "text-foreground" },
    { icon: AlertOctagon, label: "Open Disputes", value: disputes.toString(), href: "/marketplace/admin/disputes", tone: disputes > 0 ? "text-racing-light" : "text-foreground" },
    { icon: Users, label: "Active Suppliers", value: suppliers.length.toString(), href: "/marketplace/admin/suppliers", tone: "text-foreground" },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="heading-eyebrow">Platform Health</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Overview</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-md border border-border bg-surface p-5 transition-colors hover:border-accent/40">
            <s.icon className="h-4 w-4 text-accent" />
            <p className={`mt-3 font-display text-2xl font-bold tabular-nums ${s.tone}`}>{s.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-surface p-6">
          <TrendingUp className="h-5 w-5 text-accent" />
          <p className="mt-3 font-display text-2xl font-bold tabular-nums">{formatINR(gmv)}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Gross Merchandise Value</p>
        </div>
        <div className="rounded-md border border-accent/30 bg-accent/5 p-6">
          <TrendingUp className="h-5 w-5 text-accent" />
          <p className="mt-3 font-display text-2xl font-bold tabular-nums text-accent">{formatINR(takeRate)}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">
            Platform Take ({(COMMISSION_RATE * 100).toFixed(0)}% commission)
          </p>
        </div>
      </div>

      {orders.length === 0 && (
        <p className="text-sm text-foreground-muted">
          No orders placed yet in this session — checkout something in the marketplace to see live data here.
        </p>
      )}
    </div>
  );
}
