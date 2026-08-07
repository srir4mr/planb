import type { Metadata } from "next";
import { Users2, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SupplierApplyForm } from "@/components/marketplace/supplier/supplier-apply-form";

export const metadata: Metadata = {
  title: "Become a Supplier",
  description: "Sell your motorcycle parts catalog to Plan B's vetted riding community.",
};

const PERKS = [
  { icon: Users2, title: "A Vetted Buyer Base", desc: "Serious riders, workshops, and dealers — not tire-kickers comparing five tabs on price alone." },
  { icon: ShieldCheck, title: "Fitment-First Listings", desc: "Your parts are matched to the exact bikes they fit, cutting fitment-mismatch returns before they happen." },
  { icon: Wallet, title: "Secure Escrow Payouts", desc: "Get paid on confirmed delivery, not on a promise — funds are held safely until the customer confirms." },
  { icon: TrendingUp, title: "Grow Into Tiers", desc: "Start Verified, earn Gold/OEM Partner status, and unlock Fast Shipping and Trusted Supplier badges as you perform." },
];

const TIERS = [
  { name: "Verified", desc: "GST + basic KYC reviewed" },
  { name: "Gold", desc: "Established catalog + track record" },
  { name: "OEM Partner", desc: "Documented brand authorization" },
  { name: "Premium Partner", desc: "Top-tier volume, service, and reliability" },
];

export default function SupplierMarketingPage() {
  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="heading-eyebrow">For Manufacturers &amp; Distributors</p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tightest md:text-5xl">
              Become a Supplier
            </h1>
            <p className="mt-5 max-w-md text-foreground-muted">
              List your catalog once. We handle fitment matching, secure payments, and a premium storefront — you handle what you do best: making great parts.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-6">
            {PERKS.map((perk, i) => (
              <Reveal key={perk.title} delay={i * 0.06}>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <perk.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold uppercase tracking-tight">{perk.title}</h3>
                    <p className="mt-1 text-sm text-foreground-muted">{perk.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 rounded-md border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">Verification Tiers</p>
              <div className="mt-4 flex flex-col gap-3">
                {TIERS.map((t) => (
                  <div key={t.name} className="flex items-center justify-between border-b border-border-hair pb-3 last:border-0 last:pb-0">
                    <span className="font-semibold text-foreground">{t.name}</span>
                    <span className="text-right text-xs text-foreground-muted">{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-md border border-border bg-surface p-8 md:p-10">
            <SupplierApplyForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
