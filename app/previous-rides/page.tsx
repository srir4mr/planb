import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Gauge, Users, PlayCircle, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { previousRides } from "@/lib/data/rides";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Previous Rides",
  description: "A beautiful archive of Plan B's completed superbike rides, reports, and galleries.",
};

export default function PreviousRidesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">The Archive</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase tracking-tightest md:text-6xl">
            Previous Rides
          </h1>
          <p className="mt-5 max-w-xl text-foreground-muted">
            Every ride leaves a story. Explore the roads Plan B has already conquered.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {previousRides.map((ride, i) => (
            <Reveal key={ride.slug} delay={i * 0.06}>
              <Link
                href={`/previous-rides/${ride.slug}`}
                className="group grid overflow-hidden rounded-md border border-border bg-surface sm:grid-cols-2"
              >
                <div className="relative h-56 overflow-hidden sm:h-full">
                  <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
                    <PlaceholderImage tone={ride.tone} icon={Camera} className="h-full" />
                  </div>
                  {ride.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle className="h-10 w-10 text-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">
                    {ride.destination}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm text-foreground-muted">{ride.report}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs text-foreground-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {new Date(ride.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Gauge className="h-3.5 w-3.5 text-accent" /> {ride.distanceKm} km
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-accent" /> {ride.participants}
                    </span>
                  </div>
                  <span className="mt-5 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest2 text-accent">
                    Read Story <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
