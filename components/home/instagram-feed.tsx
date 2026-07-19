import { Instagram, Heart, MessageCircle, Play } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { galleryImages } from "@/lib/data/gallery";

const posts = galleryImages.slice(10, 16).map((img, i) => ({
  ...img,
  isReel: i % 3 === 0,
  likes: 800 + i * 137,
  comments: 20 + i * 4,
}));

export function InstagramFeed() {
  return (
    <section className="section-y">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="heading-eyebrow">@planb.club</p>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
              Follow The Ride
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-sm"
              >
                <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
                  <PlaceholderImage tone={post.tone} icon={post.isReel ? Play : Instagram} className="h-full" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
                    <Heart className="h-4 w-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
                    <MessageCircle className="h-4 w-4" /> {post.comments}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-accent"
          >
            <Instagram className="h-4 w-4" /> @planb.club
          </a>
        </div>
      </div>
    </section>
  );
}
