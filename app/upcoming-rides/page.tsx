import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Gauge, User, Users, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { upcomingRides } from "@/lib/data/rides";
import { Mountain } from "lucide-react";

export const metadata: Metadata = {
  title: "Upcoming Rides",
  description: "Browse and register for Plan B's upcoming superbike rides from Coimbatore.",
};

export default function UpcomingRidesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Ride Calendar</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase tracking-tightest md:text-6xl">
            Upcoming Rides
          </h1>
          <p className="mt-5 max-w-xl text-foreground-muted">
            Every ride is planned, marshalled, and executed with precision. Pick your next departure and register your seat.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {upcomingRides.map((ride, i) => (
            <Reveal key={ride.slug} delay={i * 0.08}>
              <Link
                href={`/upcoming-rides/${ride.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors duration-300 hover:border-accent/50"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
                    <PlaceholderImage tone={ride.tone} icon={Mountain} className="h-full" />
                  </div>
                  <div className="absolute left-4 top-4 flex gap-2">
                    <Badge variant="accent">{ride.difficulty}</Badge>
                    <Badge variant="default">{ride.rideType}</Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs uppercase tracking-widest2 text-accent">{ride.tagline}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tightest">
                    {ride.destination}
                  </h2>

                  <div className="mt-5 flex flex-col gap-2.5 text-sm text-foreground-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      {new Date(ride.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      <span className="text-foreground-muted/50">&middot;</span>
                      <Clock className="h-4 w-4 text-accent" />
                      {ride.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-accent" />
                      {ride.distanceKm} km
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-accent" />
                      {ride.captain}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border-hair pt-5">
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Users className="h-4 w-4 text-accent" />
                      {ride.seatsLeft}/{ride.seatsTotal} seats left
                    </div>
                    <Button size="sm" variant="primary" className="pointer-events-none">
                      Register
                    </Button>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
