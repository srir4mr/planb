"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Send, X, Sparkles, Loader2, AlertTriangle, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useGarage } from "@/components/marketplace/garage-provider";
import { Button } from "@/components/ui/button";
import { CompatibilityBadge } from "@/components/marketplace/ui/compatibility-badge";
import { PriceTag } from "@/components/marketplace/ui/price-tag";
import { products } from "@/lib/marketplace/data/products";
import type { ConfidenceBand } from "@/lib/marketplace/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  isError?: boolean;
}

interface Citation {
  tool: string;
  input: unknown;
  result: {
    results?: { id: string; fitmentBand: ConfidenceBand; fitmentLabel: string }[];
    band?: ConfidenceBand;
    label?: string;
    product?: { id: string };
    error?: string;
  };
}

const SUGGESTIONS = [
  "I have a 2021 BMW S1000RR — what fits it?",
  "Does the carbon front fender fit my bike?",
  "Best brake pads under ₹10,000",
];

function citationProductIds(citations?: Citation[]): string[] {
  if (!citations) return [];
  const ids = new Set<string>();
  for (const c of citations) {
    if (c.result?.results) {
      for (const r of c.result.results.slice(0, 4)) ids.add(r.id);
    }
    if (c.result?.product?.id) ids.add(c.result.product.id);
  }
  return Array.from(ids);
}

function CitationProducts({ citations }: { citations?: Citation[] }) {
  const ids = citationProductIds(citations);
  if (ids.length === 0) return null;
  const items = ids.map((id) => products.find((p) => p.id === id)).filter((p): p is (typeof products)[number] => !!p);
  if (items.length === 0) return null;

  return (
    <div className="mt-3 flex flex-col gap-2">
      {items.map((p) => {
        const fitment = citations
          ?.flatMap((c) => c.result?.results ?? (c.result?.product?.id === p.id ? [{ id: p.id, fitmentBand: c.result.band!, fitmentLabel: c.result.label! }] : []))
          .find((r) => r.id === p.id);
        return (
          <Link
            key={p.id}
            href={`/marketplace/p/${p.slug}`}
            className="flex items-center gap-3 rounded-sm border border-border-hair bg-surface-elevated p-2.5 transition-colors hover:border-accent/50"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-foreground">{p.title}</p>
              <div className="mt-1 flex items-center gap-2">
                <PriceTag price={p.price} size="sm" />
                <span className="flex items-center gap-0.5 text-[10px] text-foreground-muted">
                  <Star className="h-2.5 w-2.5 fill-gold text-gold" /> {p.rating.toFixed(1)}
                </span>
              </div>
            </div>
            {fitment && <CompatibilityBadge result={{ band: fitment.fitmentBand, label: fitment.fitmentLabel }} />}
          </Link>
        );
      })}
    </div>
  );
}

export function AiAssistant() {
  const pathname = usePathname();
  const { activeVehicle } = useGarage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/marketplace/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          activeVehicle,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.error ?? "Something went wrong.", isError: true }]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply, citations: data.citations }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Couldn't reach the assistant — check your connection and try again.", isError: true }]);
    } finally {
      setLoading(false);
    }
  }

  const isBackOffice = pathname.startsWith("/marketplace/supplier/dashboard") || pathname.startsWith("/marketplace/admin");
  if (isBackOffice) return null;

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-lg shadow-black/40 transition-colors hover:bg-accent-light"
        whileTap={{ scale: 0.92 }}
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[70] flex h-[70vh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-md border border-border bg-surface shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-4 py-3">
              <Sparkles className="h-4 w-4 text-accent" />
              <div className="min-w-0">
                <p className="font-display text-sm font-bold uppercase tracking-tightest text-foreground">Fitment Assistant</p>
                <p className="truncate text-[11px] text-foreground-muted">
                  {activeVehicle ? `Riding: ${activeVehicle.year} ${activeVehicle.brand} ${activeVehicle.model}` : "No bike saved yet"}
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div>
                  <p className="text-xs leading-relaxed text-foreground-muted">
                    Ask me what parts fit your bike, or whether a specific product will work — I only answer using Plan B&apos;s real
                    fitment data.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-sm border border-border-hair bg-surface-elevated px-3 py-2 text-left text-xs text-foreground-muted transition-colors hover:border-accent/50 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "ml-6" : "mr-2"}>
                  <div
                    className={
                      m.role === "user"
                        ? "rounded-sm bg-accent/10 px-3 py-2 text-sm text-foreground"
                        : m.isError
                          ? "flex items-start gap-2 rounded-sm border border-racing/40 bg-racing/10 px-3 py-2 text-sm text-racing-light"
                          : "rounded-sm border border-border-hair bg-surface-elevated px-3 py-2 text-sm text-foreground"
                    }
                  >
                    {m.isError && <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  </div>
                  {m.role === "assistant" && !m.isError && <CitationProducts citations={m.citations} />}
                </div>
              ))}

              {loading && (
                <div className="mr-2 flex items-center gap-2 rounded-sm border border-border-hair bg-surface-elevated px-3 py-2 text-xs text-foreground-muted">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking fitment data…
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. I have a 2021 S1000RR..."
                className="h-10 flex-1 rounded-sm border border-border-hair bg-surface-elevated px-3 text-sm text-foreground placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none"
              />
              <Button type="submit" size="sm" disabled={loading || !input.trim()} aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
