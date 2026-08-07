import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SupplierTierBadge } from "@/components/marketplace/ui/supplier-tier-badge";
import { BrowseGrid } from "@/components/marketplace/browse/browse-grid";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import { products } from "@/lib/marketplace/data/products";
import { Factory } from "lucide-react";

export function generateStaticParams() {
  return suppliers.map((s) => ({ brand: s.slug }));
}

export function generateMetadata({ params }: { params: { brand: string } }): Metadata {
  const supplier = suppliers.find((s) => s.slug === params.brand);
  if (!supplier) return {};
  return { title: supplier.name, description: `${supplier.name} storefront on Plan B Marketplace.` };
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const supplier = suppliers.find((s) => s.slug === params.brand);
  if (!supplier) notFound();

  const supplierProducts = products.filter((p) => p.supplierId === supplier.id);

  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 rounded-md border border-border bg-surface p-6 sm:flex-row sm:items-center">
            <div className="h-28 w-full shrink-0 overflow-hidden rounded-sm sm:w-40">
              <PlaceholderImage tone={supplier.tone} icon={Factory} className="h-full" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold uppercase tracking-tightest">{supplier.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-gold text-gold" /> {supplier.rating.toFixed(1)} ({supplierProducts.length} listings)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-accent" /> {supplier.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent" /> responds in ~{supplier.responseHours}h
                </span>
              </div>
              <div className="mt-4">
                <SupplierTierBadge supplier={supplier} />
              </div>
            </div>
          </div>
        </Reveal>

        <BrowseGrid products={supplierProducts} />
      </div>
    </div>
  );
}
