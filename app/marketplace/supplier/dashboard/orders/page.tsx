import type { Metadata } from "next";
import { SupplierOrdersClient } from "@/components/marketplace/supplier/supplier-orders-client";

export const metadata: Metadata = { title: "Orders" };

export default function SupplierOrdersPage() {
  return <SupplierOrdersClient />;
}
