import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Gauge,
  Signal,
  User,
  Users,
  Fuel,
  Coffee,
  UtensilsCrossed,
  CloudSun,
  ShieldCheck,
  Phone,
  MapPin,
  CheckSquare,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { RideRegisterForm } from "@/components/rides/register-form";
import { upcomingRides } from "@/lib/data/rides";
import { Mountain } from "lucide-react";

export function generateStaticParams() {
  return upcomingRides.map((ride) => ({ slug: ride.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ride = upcomingRides.find((r) => r.slug === params.slug);
  if (!ride) return {};
  return {
    title: `${ride.destination} — ${ride.tagline}`,
    description: `Join Plan B's ride to ${ride.destination} on ${ride.date}. ${ride.distanceKm}km, ${ride.difficulty} difficulty.`,
  };
}

export default function RideDetailPage({ params }: { params: { slug: string } }) {
  const ride = upcomingRides.find((r) => r.slug === params.slug);
  if (!ride) notFound();

  return (
    <div className="pb-24">
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
        <PlaceholderImage tone={ride.tone} icon={Mountain} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <div className="container-px relative z-10 mx-auto pb-14 pt-32">
          <div className="flex gap-2">
            <Badge variant="accent">{ride.difficulty}</Badge>
            <Badge variant="default">{ride.rideType}</Badge>
          </div>
          <p className="mt-5 font-mono text-sm uppercase tracking-widest2 text-accent">{ride.tagline}</p>
          <h1 className="mt-2 font-display text-5xl font-bold uppercase tracking-tightest md:text-7xl">
            {ride.destination}
          </h1>
        </div>
      </section>

      <div className="container-px mx-auto mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-14">
          <Reveal>
            <div className="grid grid-cols-2 gap-6 rounded-md border border-border bg-surface p-6 sm:grid-cols-4">
              <Stat icon={Calendar} label="Date" value={new Date(ride.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} />
              <Stat icon={Clock} label="Flag-off" value={ride.time} />
              <Stat icon={Gauge} label="Distance" value={`${ride.distanceKm} km`} />
              <Stat icon={Signal} label="Difficulty" value={ride.difficulty} />
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Route</h2>
            <div className="mt-6 rounded-md border border-border bg-surface p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-accent" /> {ride.routeStart}
                </span>
                {ride.routeVia.map((stop) => (
                  <span key={stop} className="flex items-center gap-3 text-foreground-muted">
                    <span className="h-px w-8 bg-border" /> {stop}
                  </span>
                ))}
                <span className="flex items-center gap-3 font-semibold text-accent">
                  <span className="h-px w-8 bg-border" />
                  <MapPin className="h-4 w-4" /> {ride.routeEnd}
                </span>
              </div>
              <div className="mt-6 flex h-48 items-center justify-center rounded-sm border border-dashed border-border text-sm text-foreground-muted">
                Route map preview
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Timeline</h2>
            <div className="mt-6 flex flex-col gap-6 border-l border-border pl-6">
              {ride.timeline.map((item) => (
                <div key={item.time} className="relative">
                  <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  <p className="font-mono text-xs uppercase tracking-widest2 text-accent">{item.time}</p>
                  <p className="mt-1 text-sm text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Stops</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <StopCard icon={Coffee} title="Breakfast" stop={ride.breakfastStop} />
              <StopCard icon={UtensilsCrossed} title="Lunch" stop={ride.lunchStop} />
              {ride.fuelStops.map((stop) => (
                <StopCard key={stop.name + stop.time} icon={Fuel} title="Fuel Stop" stop={stop} />
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-surface p-6">
                <div className="flex items-center gap-2 text-foreground">
                  <CloudSun className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight">Weather</h3>
                </div>
                <p className="mt-3 text-sm text-foreground-muted">{ride.weather}</p>
              </div>
              <div className="rounded-md border border-border bg-surface p-6">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckSquare className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight">Checklist</h3>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                  {ride.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-md border border-racing/30 bg-racing/5 p-6">
              <div className="flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-racing-light" />
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">Ride Rules</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                {ride.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-racing-light" /> {rule}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 border-t border-racing/20 pt-4 text-sm text-foreground">
                <Phone className="h-4 w-4 text-racing-light" />
                Emergency: {ride.emergencyContact.name} &middot; {ride.emergencyContact.phone}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <div className="rounded-md border border-border bg-surface p-7">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">Ride Captain</p>
                <Badge variant={ride.seatsLeft < 10 ? "racing" : "success"}>{ride.seatsLeft} seats left</Badge>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-elevated">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{ride.captain}</p>
                  <p className="text-xs text-foreground-muted">{ride.captainRole}</p>
                </div>
              </div>

              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${((ride.seatsTotal - ride.seatsLeft) / ride.seatsTotal) * 100}%` }}
                />
              </div>
              <p className="mt-2 flex items-center gap-1 text-xs text-foreground-muted">
                <Users className="h-3.5 w-3.5" /> {ride.seatsTotal - ride.seatsLeft} of {ride.seatsTotal} registered
              </p>

              <div className="mt-7 border-t border-border-hair pt-7">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest2 text-foreground-muted">
                  Register for this ride
                </p>
                <RideRegisterForm rideName={ride.destination} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div>
      <Icon className="h-4 w-4 text-accent" />
      <p className="mt-2 font-display text-lg font-bold">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">{label}</p>
    </div>
  );
}

function StopCard({
  icon: Icon,
  title,
  stop,
}: {
  icon: typeof Coffee;
  title: string;
  stop: { name: string; time: string; location: string };
}) {
  return (
    <div className="rounded-md border border-border bg-surface p-5">
      <div className="flex items-center gap-2 text-accent">
        <Icon className="h-4 w-4" />
        <p className="font-mono text-[10px] uppercase tracking-widest2">{title}</p>
      </div>
      <p className="mt-2 font-semibold text-foreground">{stop.name}</p>
      <p className="text-xs text-foreground-muted">
        {stop.location} &middot; {stop.time}
      </p>
    </div>
  );
}
