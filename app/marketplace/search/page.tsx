import type { Metadata } from "next";
import { Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrowseGrid } from "@/components/marketplace/browse/browse-grid";
import { products } from "@/lib/marketplace/data/products";
import type { ProductTag } from "@/lib/marketplace/types";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Plan B Marketplace by part, brand, OEM number, or bike.",
};

interface SearchPageProps {
  searchParams: { q?: string; category?: string; brand?: string; model?: string; year?: string; tag?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category, brand, model, year, tag } = searchParams;
  let results = products;

  if (category) results = results.filter((p) => p.categoryId === category);
  if (tag) results = results.filter((p) => p.tags.includes(tag as ProductTag));
  if (brand) results = results.filter((p) => p.fitment.some((f) => f.bikeBrand === brand));
  if (model) results = results.filter((p) => p.fitment.some((f) => f.bikeModel === model));
  if (year) {
    const y = Number(year);
    results = results.filter((p) => p.fitment.length === 0 || p.fitment.some((f) => y >= f.yearFrom && y <= f.yearTo));
  }
  if (q) {
    const needle = q.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.partBrand.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.fitment.some((f) => f.oemRef?.toLowerCase().includes(needle))
    );
  }

  const hasFilters = Boolean(q || category || brand || model || year || tag);

  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Search</p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
            {hasFilters ? `Results for "${q ?? "your search"}"` : "Search the Marketplace"}
          </h1>

          <form action="/marketplace/search" method="get" className="mt-6 flex max-w-lg gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <Input name="q" defaultValue={q ?? ""} placeholder="Search parts, OEM number, or brand..." className="pl-11" />
            </div>
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>
        </Reveal>

        <div className="mt-12">
          <BrowseGrid products={results} />
        </div>
      </div>
    </div>
  );
}
