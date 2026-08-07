import {
  Layers,
  Shield,
  Disc,
  Wind,
  ShieldCheck,
  Waves,
  Lightbulb,
  HardHat,
  CircleDot,
  Cpu,
  Package,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Layers,
  Shield,
  Disc,
  Wind,
  ShieldCheck,
  Waves,
  Lightbulb,
  HardHat,
  CircleDot,
  Cpu,
  Package,
};

export function categoryIcon(name: string): LucideIcon {
  return CATEGORY_ICONS[name] ?? Package;
}
