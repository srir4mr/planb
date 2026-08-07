import type { Metadata } from "next";
import { ListingsQueueClient } from "@/components/marketplace/admin/listings-queue-client";

export const metadata: Metadata = { title: "Listings" };

export default function AdminListingsPage() {
  return <ListingsQueueClient />;
}
