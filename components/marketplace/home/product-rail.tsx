import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/marketplace/product-card";
import type { Product } from "@/lib/marketplace/types";

interface ProductRailProps {
  eyebrow: string;
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export function ProductRail({ eyebrow, title, products, viewAllHref }: ProductRailProps) {
  if (products.length === 0) return null;

  return (
    <section className="section-y">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="heading-eyebrow">{eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">{title}</h2>
            </div>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest2 text-foreground-muted transition-colors hover:text-accent md:flex"
              >
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
