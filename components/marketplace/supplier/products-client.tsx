"use client";

import { useState, type FormEvent } from "react";
import { Plus, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { StockPill } from "@/components/marketplace/ui/stock-pill";
import { PriceTag } from "@/components/marketplace/ui/price-tag";
import { useSupplierSession } from "@/components/marketplace/supplier-session-provider";
import { products } from "@/lib/marketplace/data/products";
import { categories } from "@/lib/marketplace/data/categories";

interface DraftProduct {
  id: string;
  title: string;
  categoryId: string;
  price: number;
  stockQty: number;
}

export function ProductsClient() {
  const { supplier } = useSupplierSession();
  const [drafts, setDrafts] = useState<DraftProduct[]>([]);
  const [showForm, setShowForm] = useState(false);

  const myProducts = products.filter((p) => p.supplierId === supplier.id);
  const category = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setDrafts((prev) => [
      {
        id: `draft-${Date.now()}`,
        title: String(data.get("title") ?? "Untitled Product"),
        categoryId: String(data.get("category") ?? categories[0].id),
        price: Number(data.get("price") ?? 0),
        stockQty: Number(data.get("stock") ?? 0),
      },
      ...prev,
    ]);
    setShowForm(false);
    e.currentTarget.reset();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="heading-eyebrow">Catalog</p>
          <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Products</h1>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="grid gap-5 rounded-md border border-border bg-surface p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="p-title">Product Title</Label>
            <Input id="p-title" name="title" placeholder="e.g. Adjustable Rearsets" required />
          </div>
          <div>
            <Label htmlFor="p-category">Category</Label>
            <Select id="p-category" name="category" defaultValue={categories[0].id}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="p-price">Price (INR)</Label>
            <Input id="p-price" name="price" type="number" min="0" placeholder="15000" required />
          </div>
          <div>
            <Label htmlFor="p-stock">Stock Quantity</Label>
            <Input id="p-stock" name="stock" type="number" min="0" placeholder="10" required />
          </div>
          <div className="flex items-end">
            <Button type="submit" variant="primary" className="w-full">
              Save Listing
            </Button>
          </div>
          <p className="text-xs text-foreground-muted sm:col-span-2">
            Demo only — fitment mapping (required before a real listing goes live, per §05/§06 of the blueprint) isn&apos;t wired up here.
          </p>
        </form>
      )}

      {drafts.length > 0 && (
        <div className="flex flex-col gap-2">
          {drafts.map((d) => (
            <div key={d.id} className="flex items-center gap-2 rounded-md border border-success/30 bg-success/10 px-4 py-2.5 text-sm text-foreground">
              <CheckCircle2 className="h-4 w-4 text-success" />
              &ldquo;{d.title}&rdquo; saved as draft — pending fitment mapping before going live.
            </div>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-hair bg-surface text-xs uppercase tracking-widest2 text-foreground-muted">
              <th className="px-4 py-3 font-mono font-normal">Product</th>
              <th className="px-4 py-3 font-mono font-normal">Category</th>
              <th className="px-4 py-3 font-mono font-normal">Price</th>
              <th className="px-4 py-3 font-mono font-normal">Stock</th>
              <th className="px-4 py-3 font-mono font-normal">Rating</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((p) => (
              <tr key={p.id} className="border-b border-border-hair last:border-0">
                <td className="px-4 py-3 text-foreground">{p.title}</td>
                <td className="px-4 py-3 text-foreground-muted">{category(p.categoryId)}</td>
                <td className="px-4 py-3">
                  <PriceTag price={p.price} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <StockPill qty={p.stockQty} />
                </td>
                <td className="px-4 py-3 font-mono tabular-nums text-foreground-muted">
                  {p.rating.toFixed(1)} ({p.reviewCount})
                </td>
              </tr>
            ))}
            {myProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-foreground-muted">
                  No live listings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
