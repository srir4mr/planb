import type { Metadata } from "next";
import { SuppliersQueueClient } from "@/components/marketplace/admin/suppliers-queue-client";

export const metadata: Metadata = { title: "Suppliers" };

export default function AdminSuppliersPage() {
  return <SuppliersQueueClient />;
}
