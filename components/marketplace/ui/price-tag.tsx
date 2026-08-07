import { cn } from "@/lib/utils";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

export function PriceTag({ price, compareAtPrice, size = "md", className }: PriceTagProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-2 font-mono tabular-nums", className)}>
      <span className={cn("font-semibold text-foreground", sizes[size])}>{formatINR(price)}</span>
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-xs text-foreground-muted line-through">{formatINR(compareAtPrice)}</span>
      )}
    </span>
  );
}
