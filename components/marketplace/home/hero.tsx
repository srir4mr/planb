import { SearchHero } from "@/components/marketplace/home/search-hero";

export function MarketplaceHero() {
  return (
    <section className="relative overflow-hidden border-b border-border-hair bg-surface/40 pb-16 pt-16 md:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="container-px relative mx-auto flex flex-col items-center text-center">
        <span className="heading-eyebrow">Plan B Marketplace</span>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold uppercase leading-[0.98] tracking-tightest md:text-6xl">
          Parts that fit your bike. <span className="metallic-text">Guaranteed.</span>
        </h1>
        <p className="mt-5 max-w-xl text-balance text-foreground-muted">
          Sourced from verified suppliers, distributors, and OEM partners — matched to your exact make, model, and year before you ever hit checkout.
        </p>

        <div className="mt-10 w-full">
          <SearchHero />
        </div>
      </div>
    </section>
  );
}
