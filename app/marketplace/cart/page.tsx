import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CartClient } from "./cart-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Plan B Marketplace cart.",
};

export default function CartPage() {
  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <Reveal>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">Your Cart</h1>
        </Reveal>
        <div className="mt-10">
          <CartClient />
        </div>
      </div>
    </div>
  );
}
