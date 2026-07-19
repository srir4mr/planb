import { Bike, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlaceholderTone } from "@/lib/types";

const toneStyles: Record<PlaceholderTone, string> = {
  graphite: "from-[#2A2B2E] via-[#17181A] to-[#0A0908]",
  ember: "from-[#5A3013] via-[#231409] to-[#0A0908]",
  racing: "from-[#4A1218] via-[#20090B] to-[#0A0908]",
  gold: "from-[#4A3C1E] via-[#211B0D] to-[#0A0908]",
  night: "from-[#1B1E24] via-[#121316] to-[#0A0908]",
};

const toneIconColor: Record<PlaceholderTone, string> = {
  graphite: "text-foreground/10",
  ember: "text-accent/20",
  racing: "text-racing/25",
  gold: "text-gold/20",
  night: "text-foreground/10",
};

interface PlaceholderImageProps {
  tone?: PlaceholderTone;
  icon?: LucideIcon;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function PlaceholderImage({
  tone = "graphite",
  icon: Icon = Bike,
  label,
  sublabel,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br",
        toneStyles[tone],
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 38px, currentColor 38px, currentColor 39px)",
          color: "#F1EEE6",
        }}
      />
      <div className="grain-overlay" />
      <Icon className={cn("absolute -right-6 -top-6 h-40 w-40 rotate-12", toneIconColor[tone])} strokeWidth={1} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      {(label || sublabel) && (
        <div className="relative z-10 p-5">
          {label && (
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-foreground/70">{label}</p>
          )}
          {sublabel && <p className="mt-1 text-sm text-foreground-muted">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
