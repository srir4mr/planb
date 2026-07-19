"use client";

import { useMemo, useState } from "react";
import { Camera, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryTile } from "@/components/ui/gallery-tile";
import { Select } from "@/components/ui/select";
import type { GalleryImage } from "@/lib/types";

const sizeHeight: Record<GalleryImage["size"], string> = {
  sm: "h-48",
  md: "h-64",
  lg: "h-96",
};

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [destination, setDestination] = useState("all");
  const [year, setYear] = useState("all");
  const [ride, setRide] = useState("all");
  const [active, setActive] = useState<GalleryImage | null>(null);

  const destinations = useMemo(() => Array.from(new Set(images.map((i) => i.destination))).sort(), [images]);
  const years = useMemo(() => Array.from(new Set(images.map((i) => i.year))).sort((a, b) => b - a), [images]);
  const rides = useMemo(() => Array.from(new Set(images.map((i) => i.ride))).sort(), [images]);

  const filtered = images.filter(
    (img) =>
      (destination === "all" || img.destination === destination) &&
      (year === "all" || img.year === Number(year)) &&
      (ride === "all" || img.ride === ride)
  );

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div className="w-44">
          <Select value={destination} onChange={(e) => setDestination(e.target.value)} aria-label="Filter by destination">
            <option value="all">All Destinations</option>
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-36">
          <Select value={year} onChange={(e) => setYear(e.target.value)} aria-label="Filter by year">
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-48">
          <Select value={ride} onChange={(e) => setRide(e.target.value)} aria-label="Filter by ride">
            <option value="all">All Rides</option>
            {rides.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
        <p className="ml-auto self-center font-mono text-xs uppercase tracking-widest2 text-foreground-muted">
          {filtered.length} photos
        </p>
      </div>

      <div className="mt-10 columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4">
        {filtered.map((img) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            className={`group relative mb-3 block w-full overflow-hidden rounded-sm md:mb-4 ${sizeHeight[img.size]}`}
          >
            <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
              <GalleryTile image={img} icon={Camera} className="h-full" />
            </div>
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground">
                {img.destination} &middot; {img.year}
              </p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-20 text-center text-foreground-muted">No photos match these filters.</p>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[70vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <GalleryTile image={active} icon={Camera} className="h-full rounded-md" sizes="768px" />
              <button
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest2 text-foreground">
                {active.destination} &middot; {active.ride} &middot; {active.year}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
