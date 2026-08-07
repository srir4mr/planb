import { MarketplaceHero } from "@/components/marketplace/home/hero";
import { CategoryGrid } from "@/components/marketplace/home/category-grid";
import { FeaturedSuppliers } from "@/components/marketplace/home/featured-suppliers";
import { ProductRail } from "@/components/marketplace/home/product-rail";
import { BecomeSupplierCta } from "@/components/marketplace/home/become-supplier-cta";
import { products } from "@/lib/marketplace/data/products";

export default function MarketplaceHomePage() {
  const trending = products.filter((p) => p.tags.includes("trending"));
  const recent = products.filter((p) => p.tags.includes("recent"));
  const communityPicks = products.filter((p) => p.tags.includes("communityPick"));
  const latestLaunches = products.filter((p) => p.tags.includes("latestLaunch"));
  const topDeals = products.filter((p) => p.tags.includes("topDeal"));

  return (
    <>
      <MarketplaceHero />
      <CategoryGrid />
      <ProductRail eyebrow="Right Now" title="Trending Products" products={trending} viewAllHref="/marketplace/search?tag=trending" />
      <FeaturedSuppliers />
      <ProductRail eyebrow="Fresh Stock" title="Recently Added" products={recent} viewAllHref="/marketplace/search?tag=recent" />
      <ProductRail eyebrow="Rider Approved" title="Community Picks" products={communityPicks} viewAllHref="/marketplace/search?tag=communityPick" />
      <ProductRail eyebrow="Just In" title="Latest Launches" products={latestLaunches} viewAllHref="/marketplace/search?tag=latestLaunch" />
      <ProductRail eyebrow="Limited Time" title="Top Deals" products={topDeals} viewAllHref="/marketplace/search?tag=topDeal" />
      <BecomeSupplierCta />
    </>
  );
}
