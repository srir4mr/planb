import type { GalleryImage, Sponsor, TeamMember } from "@/lib/types";

const destinations = ["Coorg", "Hampi", "Munnar", "Yercaud", "Wayanad", "Rameswaram", "Topslip", "Kodaikanal", "Pondicherry", "Ooty"];
const rides = ["Cloud Run", "Heritage Run", "Monsoon Chase", "Summit Run", "Wildside", "Horizon Run", "Trail Run", "Descent", "Coastal Run", "Nilgiri Loop"];
const tones: GalleryImage["tone"][] = ["graphite", "ember", "racing", "gold", "night"];
const sizePattern: GalleryImage["size"][] = ["lg", "sm", "md", "sm", "lg", "md", "sm"];

export const galleryImages: GalleryImage[] = Array.from({ length: 36 }).map((_, i) => ({
  id: `img-${i + 1}`,
  tone: tones[i % tones.length],
  destination: destinations[i % destinations.length],
  year: 2024 + (i % 3),
  ride: rides[i % rides.length],
  size: sizePattern[i % sizePattern.length],
}));

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
