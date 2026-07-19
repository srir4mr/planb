"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EXPERIENCE_LEVELS = ["Less than 1 year", "1–3 years", "3–5 years", "5+ years", "10+ years"];

export function ApplyForm() {
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
          Welcome to the first step. Our membership team will review your application and reach out within 3–5
          working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" required />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@email.com" required />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="Coimbatore" required />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="motorcycle">Motorcycle</Label>
          <Input id="motorcycle" name="motorcycle" placeholder="Make & model" required />
        </div>
        <div>
          <Label htmlFor="experience">Riding Experience</Label>
          <Select id="experience" name="experience" defaultValue="" required>
            <option value="" disabled>
              Select experience
            </option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="instagram">Instagram Handle</Label>
          <Input id="instagram" name="instagram" placeholder="@yourhandle" />
        </div>
        <div>
          <Label htmlFor="emergency">Emergency Contact</Label>
          <Input id="emergency" name="emergency" placeholder="Name & phone number" required />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Why do you want to join Plan B?</Label>
        <Textarea id="message" name="message" placeholder="Tell us about yourself and your riding style..." />
      </div>

      <Button type="submit" size="lg" variant="primary" className="mt-2 w-full sm:w-auto">
        Apply to Plan B
      </Button>
    </form>
  );
}
