import Link from "next/link";
import { Calendar, Gauge, User, Users, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Countdown } from "@/components/countdown";
import { upcomingRides } from "@/lib/data/rides";
import { Mountain } from "lucide-react";

export function UpcomingRideFeature() {
  const ride = upcomingRides[0];

  return (
    <section className="section-y">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="heading-eyebrow">Next Departure</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
                Upcoming Ride
              </h2>
            </div>
            <Link href="/upcoming-rides" className="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest2 text-foreground-muted transition-colors hover:text-accent md:flex">
              View All Rides <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid overflow-hidden rounded-md border border-border bg-surface md:grid-cols-2">
            <div className="relative h-72 md:h-full">
              <PlaceholderImage tone={ride.tone} icon={Mountain} label={ride.rideType} className="h-full" />
              <div className="absolute left-5 top-5">
                <Badge variant="accent">{ride.difficulty}</Badge>
              </div>
            </div>

            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest2 text-accent">{ride.tagline}</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
                  {ride.destination}
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-5 text-sm">
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <Calendar className="h-4 w-4 text-accent" />
                    {new Date(ride.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <Gauge className="h-4 w-4 text-accent" />
                    {ride.distanceKm} km
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <User className="h-4 w-4 text-accent" />
                    {ride.captain}
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <Users className="h-4 w-4 text-accent" />
                    {ride.seatsLeft} seats left
                  </div>
                </div>

                <div className="mt-8 border-t border-border-hair pt-6">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">
                    Flag-off in
                  </p>
                  <Countdown target={`${ride.date}T${convertTo24(ride.time)}`} />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/upcoming-rides/${ride.slug}`} className="flex-1">
                  <Button variant="primary" className="w-full">
                    Register Now
                  </Button>
                </Link>
                <Link href={`/upcoming-rides/${ride.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Ride Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function convertTo24(time: string) {
  const [t, meridiem] = time.split(" ");
  let [h, m] = t.split(":").map(Number);
  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}
