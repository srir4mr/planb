import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { galleryImages } from "@/lib/data/gallery";

const preview = galleryImages.slice(0, 7);
const spans = ["row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1", "row-span-2"];

export function GalleryPreview() {
  return (
    <section className="section-y">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="heading-eyebrow">Frames From The Road</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
                Gallery
              </h2>
            </div>
            <Link
              href="/gallery"
              className="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest2 text-foreground-muted transition-colors hover:text-accent md:flex"
            >
              Full Gallery <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid auto-rows-[140px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {preview.map((img, i) => (
              <Link
                key={img.id}
                href="/gallery"
                className={`group relative overflow-hidden rounded-sm ${spans[i % spans.length]}`}
              >
                <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
                  <PlaceholderImage tone={img.tone} icon={Camera} className="h-full" />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-foreground">
                    {img.destination} &middot; {img.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 text-center md:hidden">
          <Link href="/gallery" className="font-mono text-xs uppercase tracking-widest2 text-accent">
            View Full Gallery &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
