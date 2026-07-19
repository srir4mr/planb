import type { GalleryImage, Sponsor, TeamMember } from "@/lib/types";

const destinations = ["Coorg", "Hampi", "Munnar", "Yercaud", "Wayanad", "Rameswaram", "Topslip", "Kodaikanal", "Pondicherry", "Ooty"];
const rides = ["Cloud Run", "Heritage Run", "Monsoon Chase", "Summit Run", "Wildside", "Horizon Run", "Trail Run", "Descent", "Coastal Run", "Nilgiri Loop"];
const tones: GalleryImage["tone"][] = ["graphite", "ember", "racing", "gold", "night"];
const sizePattern: GalleryImage["size"][] = ["lg", "sm", "md", "sm", "lg", "md", "sm"];

const featuredImages: GalleryImage[] = [
  {
    id: "feat-distinguished-gentlemans-ride",
    tone: "gold",
    src: "/gallery/distinguished-gentlemans-ride-2025.jpg",
    alt: "Plan B riders lined up at the Distinguished Gentleman's Ride 2025, Coimbatore",
    destination: "Coimbatore",
    year: 2025,
    ride: "Distinguished Gentleman's Ride",
    size: "lg",
  },
  {
    id: "feat-bmw-s1000rr-rain-hills",
    tone: "night",
    src: "/gallery/bmw-s1000rr-rain-hills.jpg",
    alt: "BMW S1000RR parked in the rain against tea estate hills",
    destination: "Munnar",
    year: 2026,
    ride: "Monsoon Chase",
    size: "lg",
  },
  {
    id: "feat-forest-road-formation",
    tone: "ember",
    src: "/gallery/forest-road-formation.jpg",
    alt: "Two Plan B riders in formation on a forest ghat road",
    destination: "Wayanad",
    year: 2026,
    ride: "Wildside",
    size: "md",
  },
  {
    id: "feat-sunset-highway-helmets",
    tone: "racing",
    src: "/gallery/sunset-highway-helmets.jpg",
    alt: "Riders geared up on the highway shoulder at sunset",
    destination: "Rameswaram",
    year: 2026,
    ride: "Horizon Run",
    size: "md",
  },
  {
    id: "feat-club-formal-meetup",
    tone: "graphite",
    src: "/gallery/club-formal-meetup.jpg",
    alt: "Plan B members in formal riding gear beside their motorcycles",
    destination: "Coimbatore",
    year: 2025,
    ride: "Club Meet",
    size: "sm",
  },
];

const generatedImages: GalleryImage[] = Array.from({ length: 31 }).map((_, i) => ({
  id: `img-${i + 1}`,
  tone: tones[i % tones.length],
  destination: destinations[i % destinations.length],
  year: 2024 + (i % 3),
  ride: rides[i % rides.length],
  size: sizePattern[i % sizePattern.length],
}));

export const galleryImages: GalleryImage[] = [...featuredImages, ...generatedImages];

export const sponsors: Sponsor[] = [
  { name: "Akra Performance", tier: "Title" },
  { name: "Torque Labs", tier: "Powered By" },
  { name: "Ridewear Co.", tier: "Gear" },
  { name: "Ferrous Fuel", tier: "Powered By" },
  { name: "Helm & Co.", tier: "Gear" },
  { name: "Redline Tyres", tier: "Community" },
  { name: "Foundry Motoworks", tier: "Community" },
  { name: "Apex Lubricants", tier: "Powered By" },
];

export const team: TeamMember[] = [
  { name: "Arjun Varma", role: "Founder & President", bike: "Ducati Multistrada V4", tone: "ember" },
  { name: "Vikram Rathore", role: "Expedition Lead", bike: "BMW R 1250 GS", tone: "racing" },
  { name: "Karthik Menon", role: "Road Captain", bike: "Triumph Tiger 900", tone: "gold" },
  { name: "Sanjay Iyer", role: "Fleet & Safety Officer", bike: "Kawasaki Versys 1000", tone: "graphite" },
  { name: "Naveen Kumar", role: "Media & Content Lead", bike: "KTM 890 Adventure", tone: "night" },
  { name: "Rahul Menon", role: "Community Manager", bike: "Royal Enfield Himalayan", tone: "ember" },
];
