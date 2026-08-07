import type { Metadata } from "next";
import { ProductsClient } from "@/components/marketplace/supplier/products-client";

export const metadata: Metadata = { title: "Products" };

export default function SupplierProductsPage() {
  return <ProductsClient />;
}
