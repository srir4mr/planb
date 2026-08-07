"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BIKE_BRANDS, type BikeBrand } from "@/lib/marketplace/types";
import { BIKE_MODELS_BY_BRAND, YEAR_OPTIONS } from "@/lib/marketplace/data/bikes";

export function RfqForm() {
  const [submitted, setSubmitted] = useState(false);
  const [brand, setBrand] = useState<BikeBrand>("BMW Motorrad");
  const [model, setModel] = useState(BIKE_MODELS_BY_BRAND["BMW Motorrad"][0]);
  const [photos, setPhotos] = useState<string[]>([]);

  function handleBrandChange(next: BikeBrand) {
    setBrand(next);
    setModel(BIKE_MODELS_BY_BRAND[next][0]);
  }

  function handlePhotos(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPhotos((prev) => [...prev, ...files.map((f) => f.name)]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md border border-success/30 bg-success/10 px-8 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight">RFQ Submitted</h2>
        <p className="max-w-sm text-foreground-muted">
          Your request has been sent to suppliers authorized for this category. Quotes typically arrive within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label htmlFor="rfq-brand">Bike Brand</Label>
          <Select id="rfq-brand" value={brand} onChange={(e) => handleBrandChange(e.target.value as BikeBrand)}>
            {BIKE_BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="rfq-model">Model</Label>
          <Select id="rfq-model" value={model} onChange={(e) => setModel(e.target.value)}>
            {BIKE_MODELS_BY_BRAND[brand].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="rfq-year">Year</Label>
          <Select id="rfq-year" defaultValue={YEAR_OPTIONS[0]}>
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="rfq-oem">OEM Part Number (if known)</Label>
        <Input id="rfq-oem" placeholder="e.g. DU-96981234A" />
      </div>

      <div>
        <Label htmlFor="rfq-description">Description</Label>
        <Textarea id="rfq-description" placeholder="Describe the part you're looking for, condition, urgency..." required />
      </div>

      <div>
        <Label htmlFor="rfq-photos">Photos</Label>
        <label
          htmlFor="rfq-photos"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-surface px-4 py-8 text-center transition-colors hover:border-accent/50"
        >
          <Upload className="h-5 w-5 text-accent" />
          <span className="text-sm text-foreground-muted">Click to upload reference photos</span>
        </label>
        <input id="rfq-photos" type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
        {photos.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {photos.map((name, i) => (
              <li key={name + i} className="flex items-center justify-between rounded-sm bg-surface-elevated px-3 py-1.5 text-xs text-foreground-muted">
                {name}
                <button
                  type="button"
                  onClick={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label={`Remove ${name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" size="lg" variant="primary" className="mt-2 w-full sm:w-auto">
        Submit RFQ
      </Button>
    </form>
  );
}
