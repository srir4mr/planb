import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ValuesGrid } from "@/components/about/values-grid";
import { TeamGrid } from "@/components/about/team-grid";
import { team } from "@/lib/data/gallery";
import { Bike } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission, and people behind Plan B — an elite superbike riding club in Coimbatore.",
};

export default function AboutPage() {
  return (
    <div className="pb-24">
      <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden">
        <PlaceholderImage tone="night" icon={Bike} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/20" />
        <div className="container-px relative z-10 mx-auto pb-14 pt-32">
          <p className="heading-eyebrow">Established in Coimbatore</p>
          <h1 className="mt-4 font-display text-5xl font-bold uppercase tracking-tightest md:text-7xl">
            About Plan B
          </h1>
        </div>
      </section>

      <div className="container-px mx-auto mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="heading-eyebrow">Our Story</p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest">
            When Plan A Wasn&apos;t Enough
          </h2>
          <p className="mt-5 leading-relaxed text-foreground-muted">
            Plan B started in 2020 as six riders refusing to let their machines gather dust on weekdays. What began
            as informal Sunday breakfast runs around Coimbatore grew into a full-fledged riding community — one
            built on precision, discipline, and an unapologetic love for the open road.
          </p>
          <p className="mt-4 leading-relaxed text-foreground-muted">
            Today, Plan B is home to over 400 riders across Tamil Nadu, running structured expeditions to 14 states
            and counting. We are not a casual meetup. We are a club engineered around the machine — piston,
            throttle, and tarmac.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="heading-eyebrow">Why Plan B Exists</p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest">
            Beyond The Daily Commute
          </h2>
          <p className="mt-5 leading-relaxed text-foreground-muted">
            Superbikes deserve more than traffic lights and school runs. Plan B exists to give serious riders a
            structured, safe, and premium platform to actually ride — properly marshalled expeditions, technical
            terrain, and a community that understands what it takes to control 200+ horsepower on an open highway.
          </p>
          <div className="mt-8 rounded-md border border-accent/30 bg-accent/5 p-6">
            <p className="font-mono text-xs uppercase tracking-widest2 text-accent">Our Mission</p>
            <p className="mt-3 leading-relaxed text-foreground">
              To build India&apos;s most disciplined superbike riding community — one that rides far, rides safe,
              and rides together.
            </p>
          </div>
        </Reveal>
      </div>

      <section className="section-y">
        <div className="container-px mx-auto">
          <Reveal>
            <p className="text-center heading-eyebrow">What We Stand For</p>
            <h2 className="mt-4 text-center font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
              Core Values
            </h2>
          </Reveal>

          <ValuesGrid />
        </div>
      </section>

      <section className="section-y border-t border-border-hair bg-surface/50">
        <div className="container-px mx-auto">
          <Reveal>
            <p className="text-center heading-eyebrow">The People</p>
            <h2 className="mt-4 text-center font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
              Meet The Team
            </h2>
          </Reveal>

          <TeamGrid team={team} />
        </div>
      </section>
    </div>
  );
}
