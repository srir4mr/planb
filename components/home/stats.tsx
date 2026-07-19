import { Reveal } from "@/components/reveal";
import { AnimatedCounter } from "@/components/animated-counter";

const STATS = [
  { value: 420, suffix: "+", label: "Members" },
  { value: 68, suffix: "", label: "Rides" },
  { value: 185000, suffix: "+", label: "KM Covered" },
  { value: 14, suffix: "", label: "States Explored" },
  { value: 6, suffix: "", label: "Years Active" },
];

export function Stats() {
  return (
    <section className="border-y border-border-hair bg-surface/50">
      <div className="container-px section-y mx-auto">
        <Reveal>
          <p className="heading-eyebrow text-center">By The Numbers</p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
            The Club In Motion
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-4xl font-bold tabular-nums text-foreground md:text-5xl"
                />
                <span className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
