import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { OrdersClient } from "./orders-client";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track your Plan B Marketplace orders and escrow status.",
};

export default function OrdersPage() {
  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Order History</p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">My Orders</h1>
        </Reveal>
        <div className="mt-10">
          <OrdersClient />
        </div>
      </div>
    </div>
  );
}
