"use client";

import { motion } from "framer-motion";
import { Compass, ShieldCheck, Users2, Flame } from "lucide-react";
import { Stagger, staggerItem } from "@/components/reveal";

const VALUES = [
  { icon: ShieldCheck, title: "Discipline", desc: "Every ride runs on protocol — formation, marshals, safety non-negotiable." },
  { icon: Flame, title: "Passion", desc: "We ride because the road demands it, not because it's convenient." },
  { icon: Users2, title: "Brotherhood", desc: "No rider left behind. Plan B is a family that happens to ride superbikes." },
  { icon: Compass, title: "Exploration", desc: "New states, new roads, new stories. We chase the horizon, always." },
];

export function ValuesGrid() {
  return (
    <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {VALUES.map((v) => (
        <motion.div
          key={v.title}
          variants={staggerItem}
          className="rounded-md border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent/40"
        >
          <v.icon className="h-6 w-6 text-accent" />
          <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight">{v.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{v.desc}</p>
        </motion.div>
      ))}
    </Stagger>
  );
}
