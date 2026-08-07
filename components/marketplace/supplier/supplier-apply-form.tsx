"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/marketplace/data/categories";

export function SupplierApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md border border-success/30 bg-success/10 px-8 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Application Received</h2>
        <p className="max-w-sm text-foreground-muted">
          Our supplier onboarding team will review your GST and brand authorization documents and get back to you within 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="s-business">Business Name</Label>
          <Input id="s-business" placeholder="Legal entity name" required />
        </div>
        <div>
          <Label htmlFor="s-gst">GST Number</Label>
          <Input id="s-gst" placeholder="22AAAAA0000A1Z5" required />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="s-contact">Contact Person</Label>
          <Input id="s-contact" placeholder="Full name" required />
        </div>
        <div>
          <Label htmlFor="s-phone">Phone</Label>
          <Input id="s-phone" type="tel" placeholder="+91 00000 00000" required />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="s-email">Email</Label>
          <Input id="s-email" type="email" placeholder="you@company.com" required />
        </div>
        <div>
          <Label htmlFor="s-category">Primary Category</Label>
          <Select id="s-category" defaultValue="">
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="s-brand-auth">Brand Authorization / OEM Relationship</Label>
        <Textarea id="s-brand-auth" placeholder="Describe your relationship with the brands you'll list — distributor, importer, manufacturer, authorized dealer..." />
      </div>
      <Button type="submit" size="lg" variant="primary" className="mt-2 w-full sm:w-auto">
        Submit Application
      </Button>
    </form>
  );
}
