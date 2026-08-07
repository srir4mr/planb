"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/marketplace/cart-provider";
import { useOrders } from "@/components/marketplace/orders-provider";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function CheckoutClient() {
  const { items, subtotal, clear } = useCart();
  const { addOrder } = useOrders();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [payment, setPayment] = useState<"upi" | "card" | "netbanking">("upi");
  const shipping = subtotal > 5000 ? 0 : 199;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const address = [data.get("address"), data.get("city"), data.get("state"), data.get("pincode")].filter(Boolean).join(", ");

    const order = addOrder({
      customerName: name,
      phone,
      address,
      items: items.map(({ product, qty }) => ({
        productId: product.id,
        supplierId: product.supplierId,
        title: product.title,
        qty,
        unitPrice: product.price,
      })),
      subtotal,
      shipping,
      total: subtotal + shipping,
    });

    setOrderId(order.id);
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-md border border-success/30 bg-success/10 px-8 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Order Placed</h2>
        <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">{orderId}</p>
        <p className="text-foreground-muted">
          Your payment is held in escrow. Suppliers have been notified and will ship shortly — funds release only after you confirm delivery.
        </p>
        <div className="mt-2 flex gap-3">
          <Link href="/marketplace/orders">
            <Button variant="primary">View My Orders</Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline">Continue Browsing</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-24 text-center text-foreground-muted">
        Your cart is empty — <Link href="/marketplace" className="text-accent underline underline-offset-2">browse the marketplace</Link> first.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-10">
        <div>
          <p className="heading-eyebrow">01 — Shipping Address</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="co-name">Full Name</Label>
              <Input id="co-name" name="name" placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="co-phone">Phone</Label>
              <Input id="co-phone" name="phone" type="tel" placeholder="+91 00000 00000" required />
            </div>
            <div>
              <Label htmlFor="co-pincode">Pincode</Label>
              <Input id="co-pincode" name="pincode" placeholder="641001" required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="co-address">Address</Label>
              <Input id="co-address" name="address" placeholder="House no, street, area" required />
            </div>
            <div>
              <Label htmlFor="co-city">City</Label>
              <Input id="co-city" name="city" placeholder="Coimbatore" required />
            </div>
            <div>
              <Label htmlFor="co-state">State</Label>
              <Input id="co-state" name="state" placeholder="Tamil Nadu" required />
            </div>
          </div>
        </div>

        <div>
          <p className="heading-eyebrow">02 — Payment</p>
          <div className="mt-5 flex flex-col gap-3">
            {(["upi", "card", "netbanking"] as const).map((method) => (
              <label
                key={method}
                className={`flex cursor-pointer items-center justify-between rounded-sm border px-4 py-3 transition-colors ${
                  payment === method ? "border-accent/50 bg-accent/5" : "border-border bg-surface"
                }`}
              >
                <span className="flex items-center gap-3 text-sm text-foreground">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method}
                    onChange={() => setPayment(method)}
                    className="h-4 w-4 accent-accent"
                  />
                  {method === "upi" ? "UPI" : method === "card" ? "Credit / Debit Card" : "Net Banking"}
                </span>
                {method === "upi" && <span className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Recommended</span>}
              </label>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-foreground-muted">
            <Lock className="h-3.5 w-3.5" /> Processed securely via Razorpay — card details never touch Plan B servers.
          </p>
        </div>
      </div>

      <div className="h-fit rounded-md border border-border bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">Order Summary</p>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex justify-between text-foreground-muted">
              <span className="line-clamp-1">
                {product.title} &times; {qty}
              </span>
              <span className="font-mono tabular-nums text-foreground">{formatINR(product.price * qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 border-t border-border-hair pt-4 text-sm">
          <div className="flex justify-between text-foreground-muted">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums text-foreground">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-foreground-muted">
            <span>Shipping</span>
            <span className="font-mono tabular-nums text-foreground">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between border-t border-border-hair pt-4">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-mono text-lg font-semibold tabular-nums text-foreground">{formatINR(subtotal + shipping)}</span>
        </div>
        <Button type="submit" variant="primary" className="mt-6 w-full">
          Place Order
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-foreground-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Protected by Plan B Escrow
        </p>
      </div>
    </form>
  );
}
