"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Thread {
  id: string;
  name: string;
  preview: string;
  unread: boolean;
  messages: { from: "them" | "you"; text: string; time: string }[];
}

const THREADS: Thread[] = [
  {
    id: "t1",
    name: "Plan B Ops",
    preview: "Your Gold tier renewal is due in 12 days.",
    unread: true,
    messages: [
      { from: "them", text: "Hi! Your Gold verification tier renews on the 20th — no action needed unless your GST details changed.", time: "9:14 AM" },
      { from: "you", text: "Thanks, all details are still current.", time: "9:20 AM" },
    ],
  },
  {
    id: "t2",
    name: "Vikram R. (Customer)",
    preview: "Does the exhaust need ECU remapping?",
    unread: true,
    messages: [
      { from: "them", text: "Hey, does the full titanium system need an ECU flash to run right, or is it plug and play?", time: "Yesterday" },
      { from: "you", text: "It ships with the race map pre-loaded on a separate flash tool, no tuner visit needed.", time: "Yesterday" },
    ],
  },
  {
    id: "t3",
    name: "Plan B Support",
    preview: "RFQ #4021 matched to your category",
    unread: false,
    messages: [
      { from: "them", text: "A new RFQ for carbon fairings on a 2022 Panigale V4 was routed to you — respond within 48h to stay ranked.", time: "3 days ago" },
    ],
  },
];

export function MessagesClient() {
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const active = THREADS.find((t) => t.id === activeId) ?? THREADS[0];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="heading-eyebrow">Inbox</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">Messages</h1>
      </div>

      <div className="grid overflow-hidden rounded-md border border-border md:grid-cols-[280px_1fr]">
        <div className="divide-y divide-border-hair border-b border-border-hair md:border-b-0 md:border-r">
          {THREADS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={cn(
                "flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors",
                activeId === t.id ? "bg-accent/10" : "hover:bg-surface-elevated"
              )}
            >
              <span className="flex items-center justify-between text-sm font-semibold text-foreground">
                {t.name}
                {t.unread && <span className="h-2 w-2 rounded-full bg-accent" />}
              </span>
              <span className="line-clamp-1 text-xs text-foreground-muted">{t.preview}</span>
            </button>
          ))}
        </div>

        <div className="flex min-h-[360px] flex-col justify-between p-5">
          <div className="flex flex-col gap-4">
            {active.messages.map((m, i) => (
              <div key={i} className={cn("flex flex-col gap-1", m.from === "you" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-sm rounded-md px-4 py-2.5 text-sm",
                    m.from === "you" ? "bg-accent text-background" : "bg-surface-elevated text-foreground"
                  )}
                >
                  {m.text}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">{m.time}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-border-hair pt-4">
            <input
              disabled
              placeholder="Messaging is a demo preview — not wired to a backend"
              className="flex-1 rounded-sm border border-border bg-surface px-3 py-2 text-sm text-foreground-muted placeholder:text-foreground-muted/70"
            />
            <button disabled className="flex h-9 w-9 items-center justify-center rounded-sm bg-surface-elevated text-foreground-muted">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
