import Link from "next/link";
import { PlayCircle, Gauge, Users, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { previousRides } from "@/lib/data/rides";
import { Camera } from "lucide-react";

export function RecentRide() {
  const ride = previousRides[0];

  return (
    <section className="section-y bg-surface/50 border-y border-border-hair">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">The Last Ride</p>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
            Recent Ride
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border">
              <PlaceholderImage tone={ride.tone} icon={Camera} label={ride.route} className="h-full" />
              <button
                aria-label="Watch aftermovie"
                className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/40"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/40 bg-background/40 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <PlayCircle className="h-8 w-8 text-foreground" />
                </span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-center">
            <h3 className="font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
              {ride.destination}
            </h3>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground-muted">{ride.report}</p>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
              <div>
                <Gauge className="h-4 w-4 text-accent" />
                <p className="mt-2 font-display text-xl font-bold">{ride.distanceKm}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">KM</p>
              </div>
              <div>
                <Users className="h-4 w-4 text-accent" />
                <p className="mt-2 font-display text-xl font-bold">{ride.participants}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Riders</p>
              </div>
              <div>
                <MapPin className="h-4 w-4 text-accent" />
                <p className="mt-2 font-display text-xl font-bold">{ride.galleryCount}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted">Photos</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={`/previous-rides/${ride.slug}`}>
                <Button variant="primary">Read Ride Story</Button>
              </Link>
              <Button variant="outline">
                <PlayCircle className="h-4 w-4" /> Watch Aftermovie
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
