import type { Metadata } from "next";
import { OverviewClient } from "@/components/marketplace/supplier/overview-client";

export const metadata: Metadata = {
  title: "Supplier Dashboard",
};

export default function SupplierOverviewPage() {
  return <OverviewClient />;
}
