import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { GalleryImage } from "@/lib/types";

interface GalleryTileProps {
  image: GalleryImage;
  icon?: LucideIcon;
  className?: string;
  sizes?: string;
}

export function GalleryTile({ image, icon, className, sizes = "(min-width: 1024px) 25vw, 50vw" }: GalleryTileProps) {
  if (image.src) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image
          src={image.src}
          alt={image.alt ?? `${image.destination} — ${image.ride}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return <PlaceholderImage tone={image.tone} icon={icon} className={className} />;
}
