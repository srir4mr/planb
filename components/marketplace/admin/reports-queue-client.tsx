"use client";

import { useState } from "react";
import { Flag, Trash2, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportedItem {
  id: string;
  type: "Review" | "Community Post";
  author: string;
  content: string;
  reason: string;
  rating?: number;
}

const INITIAL_REPORTS: ReportedItem[] = [
  {
    id: "rp1",
    type: "Review",
    author: "Anonymous",
    content: "This supplier is a scam don't buy anything ever from these people!!!",
    reason: "Flagged by supplier — no verified purchase, possible competitor review",
    rating: 1,
  },
  {
    id: "rp2",
    type: "Community Post",
    author: "guest_rider99",
    content: "Selling grey-market imports, DM me on WhatsApp for prices, no GST needed",
    reason: "Flagged by 4 members — attempts to route sales off-platform",
  },
  {
    id: "rp3",
    type: "Review",
    author: "Anonymous",
    content: "Product broke after one ride, unusable garbage",
    reason: "Flagged by supplier — no order on file for this reviewer",
    rating: 1,
  },
];

export function ReportsQueueClient() {
  const [reports, setReports] = useState(INITIAL_REPORTS);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="heading-eyebrow">Content Moderation</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">
          Reports {reports.length > 0 && `(${reports.length})`}
        </h1>
      </div>

      {reports.length === 0 ? (
        <p className="text-sm text-foreground-muted">No flagged content.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reports.map((r) => (
            <div key={r.id} className="rounded-md border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Flag className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <div>
                    <p className="font-display text-sm font-bold">
                      {r.type} by {r.author}
                    </p>
                    {r.rating && (
                      <div className="mt-1 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < r.rating! ? "fill-gold text-gold" : "text-foreground-muted"}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="racing" size="sm" onClick={() => setReports((prev) => prev.filter((x) => x.id !== r.id))}>
                    <Trash2 className="h-4 w-4" /> Remove
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReports((prev) => prev.filter((x) => x.id !== r.id))}>
                    <X className="h-4 w-4" /> Dismiss
                  </Button>
                </div>
              </div>
              <p className="mt-3 rounded-sm bg-surface-elevated px-3 py-2 text-sm italic text-foreground-muted">&ldquo;{r.content}&rdquo;</p>
              <p className="mt-2 text-xs text-foreground-muted">{r.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
