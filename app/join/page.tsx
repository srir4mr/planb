import type { Metadata } from "next";
import { ShieldCheck, Users2, MapPinned } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ApplyForm } from "@/components/join/apply-form";

export const metadata: Metadata = {
  title: "Join Plan B",
  description: "Apply to join Plan B — an elite superbike riding club based in Coimbatore, Tamil Nadu.",
};

const PERKS = [
  { icon: Users2, title: "400+ Member Network", desc: "A vetted, disciplined community of serious riders." },
  { icon: MapPinned, title: "Curated Expeditions", desc: "Marshalled rides across 14+ states, planned to the last detail." },
  { icon: ShieldCheck, title: "Safety First, Always", desc: "Trained road captains, medical support, and strict protocol." },
];

export default function JoinPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-px mx-auto grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="heading-eyebrow">Membership Application</p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tightest md:text-6xl">
              Join Plan B
            </h1>
            <p className="mt-5 max-w-md text-foreground-muted">
              This isn&apos;t an open group chat. Plan B is an exclusive riding community — every application is
              reviewed to keep the roads and the club disciplined.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-6">
            {PERKS.map((perk, i) => (
              <Reveal key={perk.title} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <perk.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold uppercase tracking-tight">{perk.title}</h3>
                    <p className="mt-1 text-sm text-foreground-muted">{perk.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-md border border-border bg-surface p-8 md:p-10">
            <ApplyForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
