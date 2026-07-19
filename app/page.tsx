import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { UpcomingRideFeature } from "@/components/home/upcoming-ride-feature";
import { RecentRide } from "@/components/home/recent-ride";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { Sponsors } from "@/components/home/sponsors";
import { InstagramFeed } from "@/components/home/instagram-feed";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <UpcomingRideFeature />
      <RecentRide />
      <GalleryPreview />
      <Sponsors />
      <InstagramFeed />
    </>
  );
}
