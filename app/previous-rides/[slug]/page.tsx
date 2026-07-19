import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Gauge, Users, MapPin, PlayCircle, Camera } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { previousRides } from "@/lib/data/rides";

export function generateStaticParams() {
  return previousRides.map((ride) => ({ slug: ride.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ride = previousRides.find((r) => r.slug === params.slug);
  if (!ride) return {};
  return { title: `${ride.destination} — Ride Report`, description: ride.report };
}

export default function PreviousRideDetailPage({ params }: { params: { slug: string } }) {
  const ride = previousRides.find((r) => r.slug === params.slug);
  if (!ride) notFound();

  const gallery = Array.from({ length: 9 }).map((_, i) => i);

  return (
    <div className="pb-24">
      <section className="relative flex h-[65vh] min-h-[440px] items-end overflow-hidden">
        <PlaceholderImage tone={ride.tone} icon={Camera} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <div className="container-px relative z-10 mx-auto pb-14 pt-32">
          <Badge variant="accent">Completed Ride</Badge>
          <h1 className="mt-5 font-display text-5xl font-bold uppercase tracking-tightest md:text-7xl">
            {ride.destination}
          </h1>
          <p className="mt-3 text-foreground-muted">{ride.route}</p>
        </div>
      </section>

      <div className="container-px mx-auto mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-14">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Ride Report</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted">{ride.report}</p>
            {ride.hasVideo && (
              <button className="group mt-7 flex items-center gap-3 rounded-md border border-border bg-surface px-6 py-4 transition-colors hover:border-accent/50">
                <PlayCircle className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                <span className="font-mono text-xs uppercase tracking-widest2">Watch Aftermovie</span>
              </button>
            )}
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tightest">Gallery</h2>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {gallery.map((i) => (
                <div key={i} className={`overflow-hidden rounded-sm ${i % 4 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                  <PlaceholderImage tone={ride.tone} icon={Camera} className="h-full" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <div className="rounded-md border border-border bg-surface p-7">
              <p className="font-mono text-xs uppercase tracking-widest2 text-foreground-muted">Ride Stats</p>
              <div className="mt-5 flex flex-col gap-5">
                <StatRow icon={Calendar} label="Date" value={new Date(ride.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
                <StatRow icon={Gauge} label="Distance" value={`${ride.distanceKm} km`} />
                <StatRow icon={Users} label="Participants" value={`${ride.participants} riders`} />
                <StatRow icon={MapPin} label="Route" value={ride.route} />
                <StatRow icon={Camera} label="Photos" value={`${ride.galleryCount} captured`} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 border-b border-border-hair pb-4 last:border-0 last:pb-0">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">{label}</p>
        <p className="mt-1 text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}
