import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { categoryIcon } from "@/lib/marketplace/icon-map";
import { categories } from "@/lib/marketplace/data/categories";
import type { Product } from "@/lib/marketplace/types";
import { cn } from "@/lib/utils";

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  const category = categories.find((c) => c.id === product.categoryId);
  const Icon = categoryIcon(category?.icon ?? "Package");
  return (
    <PlaceholderImage
      tone={product.tone}
      icon={Icon}
      label={product.partBrand}
      className={cn("h-full", className)}
    />
  );
}
