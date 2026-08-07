import type { Metadata } from "next";
import { MessagesClient } from "@/components/marketplace/supplier/messages-client";

export const metadata: Metadata = { title: "Messages" };

export default function SupplierMessagesPage() {
  return <MessagesClient />;
}
