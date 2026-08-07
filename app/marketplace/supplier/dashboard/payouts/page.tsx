import type { Metadata } from "next";
import { PayoutsClient } from "@/components/marketplace/supplier/payouts-client";

export const metadata: Metadata = { title: "Payouts" };

export default function SupplierPayoutsPage() {
  return <PayoutsClient />;
}
