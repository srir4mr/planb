export type Difficulty = "Easy" | "Moderate" | "Hard" | "Extreme";

export type PlaceholderTone = "graphite" | "ember" | "racing" | "gold" | "night";

export interface StopInfo {
  name: string;
  time: string;
  location: string;
}

export interface UpcomingRide {
  slug: string;
  destination: string;
  tagline: string;
  date: string;
  time: string;
  distanceKm: number;
  difficulty: Difficulty;
  rideType: string;
  captain: string;
  captainRole: string;
  seatsTotal: number;
  seatsLeft: number;
  tone: PlaceholderTone;
  routeStart: string;
  routeEnd: string;
  routeVia: string[];
  timeline: { time: string; label: string }[];
  fuelStops: StopInfo[];
  breakfastStop: StopInfo;
  lunchStop: StopInfo;
  weather: string;
  checklist: string[];
  rules: string[];
  emergencyContact: { name: string; phone: string };
}

export interface PreviousRide {
  slug: string;
  destination: string;
  date: string;
  distanceKm: number;
  participants: number;
  tone: PlaceholderTone;
  report: string;
  route: string;
  galleryCount: number;
  hasVideo: boolean;
}

export interface GalleryImage {
  id: string;
  tone: PlaceholderTone;
  src?: string;
  alt?: string;
  destination: string;
  year: number;
  ride: string;
  size: "sm" | "md" | "lg";
}

export interface Sponsor {
  name: string;
  tier: "Title" | "Powered By" | "Gear" | "Community";
}

export interface TeamMember {
  name: string;
  role: string;
  bike: string;
  tone: PlaceholderTone;
}
