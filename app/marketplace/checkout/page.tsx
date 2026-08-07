import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure escrow checkout on Plan B Marketplace.",
};

export default function CheckoutPage() {
  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <Reveal>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">Checkout</h1>
        </Reveal>
        <div className="mt-10">
          <CheckoutClient />
        </div>
      </div>
    </div>
  );
}
