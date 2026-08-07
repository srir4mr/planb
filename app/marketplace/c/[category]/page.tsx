import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { BrowseGrid } from "@/components/marketplace/browse/browse-grid";
import { categoryIcon } from "@/lib/marketplace/icon-map";
import { categories } from "@/lib/marketplace/data/categories";
import { products } from "@/lib/marketplace/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) return {};
  return { title: category.name, description: `Shop ${category.name} on Plan B Marketplace, matched to your bike.` };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const Icon = categoryIcon(category.icon);
  const categoryProducts = products.filter((p) => p.categoryId === category.id);

  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <Icon className="h-6 w-6 text-accent" />
            </span>
            <div>
              <p className="heading-eyebrow">Category</p>
              <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
                {category.name}
              </h1>
            </div>
          </div>
        </Reveal>

        <BrowseGrid products={categoryProducts} />
      </div>
    </div>
  );
}
