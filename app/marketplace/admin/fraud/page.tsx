import type { Metadata } from "next";
import { FraudQueueClient } from "@/components/marketplace/admin/fraud-queue-client";

export const metadata: Metadata = { title: "Fraud" };

export default function AdminFraudPage() {
  return <FraudQueueClient />;
}
