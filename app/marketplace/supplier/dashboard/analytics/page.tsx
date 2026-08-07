import type { Metadata } from "next";
import { AnalyticsClient } from "@/components/marketplace/supplier/analytics-client";

export const metadata: Metadata = { title: "Analytics" };

export default function SupplierAnalyticsPage() {
  return <AnalyticsClient />;
}
