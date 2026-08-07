import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ProductImage } from "@/components/marketplace/ui/product-image";
import { SupplierTierBadge } from "@/components/marketplace/ui/supplier-tier-badge";
import { ProductCard } from "@/components/marketplace/product-card";
import { ProductDetailClient } from "@/components/marketplace/product/product-detail-client";
import { products } from "@/lib/marketplace/data/products";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import { categories } from "@/lib/marketplace/data/categories";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  return { title: product.title, description: product.description };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const supplier = suppliers.find((s) => s.id === product.supplierId);
  const category = categories.find((c) => c.id === product.categoryId);
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <p className="mb-8 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">
          <Link href="/marketplace" className="hover:text-accent">Marketplace</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/marketplace/c/${category.slug}`} className="hover:text-accent">{category.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{product.title}</span>
        </p>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="aspect-square overflow-hidden rounded-md border border-border">
              <ProductImage product={product} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-widest2 text-accent">{product.partBrand}</p>
            <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground-muted">{product.description}</p>

            {supplier && (
              <Link
                href={`/marketplace/b/${supplier.slug}`}
                className="mt-6 flex items-center justify-between gap-4 rounded-md border border-border bg-surface p-4 transition-colors hover:border-accent/50"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{supplier.name}</p>
                  <p className="mt-1 flex items-center gap-3 text-xs text-foreground-muted">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {supplier.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {supplier.location}
                    </span>
                  </p>
                </div>
                <SupplierTierBadge supplier={supplier} />
              </Link>
            )}

            {product.specs.length > 0 && (
              <div className="mt-6 divide-y divide-border-hair rounded-md border border-border">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-foreground-muted">{s.label}</span>
                    <span className="font-medium text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <ProductDetailClient product={product} />
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Related Products</h2>
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
