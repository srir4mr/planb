import type { Metadata } from "next";
import { AdminOverviewClient } from "@/components/marketplace/admin/admin-overview-client";

export const metadata: Metadata = { title: "Admin Console" };

export default function AdminOverviewPage() {
  return <AdminOverviewClient />;
}
