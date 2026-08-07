import { Badge } from "@/components/ui/badge";

export function StockPill({ qty }: { qty: number }) {
  if (qty <= 0) return <Badge variant="racing">Out of stock</Badge>;
  if (qty <= 8) return <Badge variant="warning">Only {qty} left</Badge>;
  return <Badge variant="success">In stock</Badge>;
}
