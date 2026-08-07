"use client";

import { useState } from "react";
import { ShieldAlert, Eye, Ban, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FraudFlag {
  id: string;
  type: string;
  detail: string;
  severity: "high" | "medium";
  entity: string;
}

const INITIAL_FLAGS: FraudFlag[] = [
  { id: "f1", type: "Duplicate GST", detail: "GST number matches an existing rejected application from 3 months ago", severity: "high", entity: "New applicant — Turbo Moto Traders" },
  { id: "f2", type: "Order Velocity", detail: "14 orders placed from one account within 6 minutes, all shipping to different addresses", severity: "high", entity: "Customer account #8821" },
  { id: "f3", type: "Chargeback Pattern", detail: "3rd payment dispute in 90 days from the same card fingerprint", severity: "medium", entity: "Customer account #6034" },
  { id: "f4", type: "Device Fingerprint", detail: "Same device created 5 supplier accounts in one week", severity: "medium", entity: "Multiple supplier signups" },
];

export function FraudQueueClient() {
  const [flags, setFlags] = useState(INITIAL_FLAGS);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="heading-eyebrow">Risk Signals</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Fraud {flags.length > 0 && `(${flags.length})`}</h1>
        <p className="mt-2 max-w-xl text-sm text-foreground-muted">
          Illustrative queue — real velocity limits, duplicate-GST detection, and device fingerprinting (§17) aren&apos;t wired to live data.
        </p>
      </div>

      {flags.length === 0 ? (
        <p className="text-sm text-foreground-muted">No active flags.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {flags.map((f) => (
            <div key={f.id} className="rounded-md border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <ShieldAlert className={`mt-0.5 h-4 w-4 shrink-0 ${f.severity === "high" ? "text-racing-light" : "text-warning"}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-base font-bold">{f.type}</p>
                      <Badge variant={f.severity === "high" ? "racing" : "warning"}>{f.severity}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-foreground-muted">{f.entity}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="racing" size="sm" onClick={() => setFlags((prev) => prev.filter((x) => x.id !== f.id))}>
                    <Ban className="h-4 w-4" /> Suspend
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setFlags((prev) => prev.filter((x) => x.id !== f.id))}>
                    <X className="h-4 w-4" /> Dismiss
                  </Button>
                </div>
              </div>
              <p className="mt-3 flex items-start gap-2 text-sm text-foreground-muted">
                <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {f.detail}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
