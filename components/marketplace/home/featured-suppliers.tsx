import Link from "next/link";
import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SupplierTierBadge } from "@/components/marketplace/ui/supplier-tier-badge";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import { Factory } from "lucide-react";

export function FeaturedSuppliers() {
  const featured = suppliers.slice(0, 4);

  return (
    <section className="section-y border-y border-border-hair bg-surface/50">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Verified &amp; Trusted</p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
            Featured Suppliers
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => (
              <Link
                key={s.id}
                href={`/marketplace/b/${s.slug}`}
                className="group flex flex-col gap-4 rounded-md border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent/50"
              >
                <div className="h-28 w-full overflow-hidden rounded-sm">
                  <PlaceholderImage tone={s.tone} icon={Factory} className="h-full" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold">{s.name}</h3>
                  <p className="mt-1 text-xs text-foreground-muted">{s.location}</p>
                </div>
                <SupplierTierBadge supplier={s} />
                <div className="mt-auto flex items-center gap-1 border-t border-border-hair pt-3 text-xs text-foreground-muted">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  {s.rating.toFixed(1)} &middot; responds in ~{s.responseHours}h
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
