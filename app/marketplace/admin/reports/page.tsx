import type { Metadata } from "next";
import { ReportsQueueClient } from "@/components/marketplace/admin/reports-queue-client";

export const metadata: Metadata = { title: "Reports" };

export default function AdminReportsPage() {
  return <ReportsQueueClient />;
}
