import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { galleryImages } from "@/lib/data/gallery";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A Pinterest-style archive of Plan B's ride photography — filter by destination, year, and ride.",
};

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Visual Archive</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase tracking-tightest md:text-6xl">
            Gallery
          </h1>
          <p className="mt-5 max-w-xl text-foreground-muted">
            Frames from the road — every ride, every mile, captured.
          </p>
        </Reveal>

        <div className="mt-14">
          <GalleryClient images={galleryImages} />
        </div>
      </div>
    </div>
  );
}
