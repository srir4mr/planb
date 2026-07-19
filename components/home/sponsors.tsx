import { Reveal } from "@/components/reveal";
import { sponsors } from "@/lib/data/gallery";

export function Sponsors() {
  return (
    <section className="section-y border-t border-border-hair">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="text-center heading-eyebrow">Backed By</p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
            Our Sponsors
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border-hair sm:grid-cols-4">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group flex flex-col items-center justify-center gap-2 bg-surface px-6 py-10 transition-colors duration-300 hover:bg-surface-elevated"
              >
                <span className="font-display text-lg font-bold uppercase tracking-tight text-foreground-muted grayscale transition-all duration-300 group-hover:text-accent group-hover:grayscale-0">
                  {sponsor.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-foreground-muted/60">
                  {sponsor.tier}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
