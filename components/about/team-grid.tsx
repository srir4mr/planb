"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Stagger, staggerItem } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { TeamMember } from "@/lib/types";

export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <motion.div
          key={member.name}
          variants={staggerItem}
          className="group overflow-hidden rounded-md border border-border bg-surface"
        >
          <div className="relative h-64 overflow-hidden">
            <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
              <PlaceholderImage tone={member.tone} icon={User} className="h-full" />
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">{member.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest2 text-accent">{member.role}</p>
            <p className="mt-3 text-sm text-foreground-muted">{member.bike}</p>
          </div>
        </motion.div>
      ))}
    </Stagger>
  );
}
