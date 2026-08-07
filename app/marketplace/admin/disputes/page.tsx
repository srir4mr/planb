import type { Metadata } from "next";
import { DisputesQueueClient } from "@/components/marketplace/admin/disputes-queue-client";

export const metadata: Metadata = { title: "Disputes" };

export default function AdminDisputesPage() {
  return <DisputesQueueClient />;
}
