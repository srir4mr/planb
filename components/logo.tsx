import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 44 }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative shrink-0" style={{ width: size, height: size }}>
        <Image
          src="/brand/planb-logo.png"
          alt="Plan B Superbike Club"
          fill
          sizes={`${size}px`}
          className="object-contain"
          priority
        />
      </span>
      <span className="font-display text-lg font-bold uppercase tracking-tightest text-foreground">
        Plan B
      </span>
    </span>
  );
}
