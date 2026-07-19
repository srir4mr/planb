"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Bike } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <PlaceholderImage tone="night" icon={Bike} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 h-28 w-28 md:h-36 md:w-36"
        >
          <Image src="/brand/planb-logo.png" alt="Plan B" fill sizes="144px" className="object-contain" priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tightest text-foreground sm:text-7xl md:text-8xl"
        >
          Ride Beyond
          <br />
          <span className="metallic-text">Limits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-balance text-base text-foreground-muted md:text-lg"
        >
          An elite superbike riding community engineered in Coimbatore. Precision machines, open roads, one brotherhood.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link href="/upcoming-rides">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              Upcoming Ride
            </Button>
          </Link>
          <Link href="/join">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Join Community
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest2">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
