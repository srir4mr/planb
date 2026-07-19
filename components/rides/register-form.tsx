"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function RideRegisterForm({ rideName }: { rideName: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-success/30 bg-success/10 px-6 py-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-success" />
        <p className="font-display text-lg font-bold uppercase tracking-tight">You&apos;re In</p>
        <p className="max-w-xs text-sm text-foreground-muted">
          Your seat for {rideName} is reserved. The Road Captain will contact you with final briefing details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="reg-name">Full Name</Label>
          <Input id="reg-name" name="name" placeholder="Your name" required />
        </div>
        <div>
          <Label htmlFor="reg-phone">Phone</Label>
          <Input id="reg-phone" name="phone" type="tel" placeholder="+91 00000 00000" required />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="reg-bike">Motorcycle</Label>
          <Input id="reg-bike" name="bike" placeholder="e.g. Ducati Panigale V4" required />
        </div>
        <div>
          <Label htmlFor="reg-email">Email</Label>
          <Input id="reg-email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <Button type="submit" size="lg" variant="primary" className="mt-2">
        Confirm Registration
      </Button>
    </form>
  );
}
