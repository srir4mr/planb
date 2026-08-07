import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { categories } from "@/lib/marketplace/data/categories";
import { categoryIcon } from "@/lib/marketplace/icon-map";

export function CategoryGrid() {
  return (
    <section className="section-y">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Shop By Category</p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
            Popular Categories
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((c) => {
              const Icon = categoryIcon(c.icon);
              return (
                <Link
                  key={c.id}
                  href={`/marketplace/c/${c.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-md border border-border bg-surface p-6 text-center transition-colors duration-300 hover:border-accent/50"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-foreground">{c.name}</span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
