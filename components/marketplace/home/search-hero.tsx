"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/marketplace/data/categories";
import { BIKE_BRANDS, type BikeBrand } from "@/lib/marketplace/types";
import { BIKE_MODELS_BY_BRAND, YEAR_OPTIONS } from "@/lib/marketplace/data/bikes";

export function SearchHero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const models = brand ? BIKE_MODELS_BY_BRAND[brand as BikeBrand] : [];

  function handleBrandChange(value: string) {
    setBrand(value);
    setModel("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    if (model) params.set("model", model);
    if (year) params.set("year", year);
    router.push(`/marketplace/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl rounded-md border border-border bg-surface p-5 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search parts, OEM number, or brand..."
            className="pl-11"
          />
        </div>
        <Button type="submit" variant="primary" size="default" className="sm:w-40">
          Search
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Select value={brand} onChange={(e) => handleBrandChange(e.target.value)} aria-label="Bike brand">
          <option value="">Any bike brand</option>
          {BIKE_BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
        <Select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand} aria-label="Bike model">
          <option value="">{brand ? "Any model" : "Select brand first"}</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
        <Select value={year} onChange={(e) => setYear(e.target.value)} aria-label="Year">
          <option value="">Any year</option>
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-2 md:col-span-1" aria-label="Category">
          <option value="">Any category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
    </form>
  );
}
