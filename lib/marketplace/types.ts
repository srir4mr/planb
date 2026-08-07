import type { PlaceholderTone } from "@/lib/types";

export const BIKE_BRANDS = [
  "BMW Motorrad",
  "Ducati",
  "Aprilia",
  "Kawasaki",
  "Honda",
  "Yamaha",
  "KTM",
  "Suzuki",
  "Triumph",
  "Royal Enfield",
  "CFMoto",
  "Benelli",
  "Harley-Davidson",
] as const;

export type BikeBrand = (typeof BIKE_BRANDS)[number];

export interface GarageVehicle {
  id: string;
  brand: BikeBrand;
  model: string;
  year: number;
  variant?: string;
  color?: string;
  vin?: string;
  mods?: string;
}

/** 100/90 = confirmed, 75 = likely, 50/30 = unverified, 0 = no match (hidden by default) */
export type ConfidenceBand = 100 | 90 | 75 | 50 | 30 | 0;

export interface FitmentRule {
  bikeBrand: BikeBrand;
  bikeModel: string;
  yearFrom: number;
  yearTo: number;
  variant?: string;
  oemRef?: string;
  confidenceBand: ConfidenceBand;
  torqueSpec?: string;
  installTimeMin?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  warnings?: string;
}

export interface FitmentResult {
  band: ConfidenceBand;
  label: string;
  rule?: FitmentRule;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export type SupplierTier = "Verified" | "Gold" | "OEM Partner" | "Premium Partner";
export type SupplierBadge = "Fast Shipping" | "Trusted Supplier";

export interface Supplier {
  id: string;
  name: string;
  slug: string;
  tier: SupplierTier;
  badges: SupplierBadge[];
  location: string;
  rating: number;
  responseHours: number;
  tone: PlaceholderTone;
  categories: string[];
}

export type ProductTag = "trending" | "recent" | "communityPick" | "latestLaunch" | "topDeal";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  partBrand: string;
  categoryId: string;
  supplierId: string;
  price: number;
  compareAtPrice?: number;
  currency: "INR";
  stockQty: number;
  weightKg: number;
  tone: PlaceholderTone;
  rating: number;
  reviewCount: number;
  tags: ProductTag[];
  description: string;
  specs: ProductSpec[];
  fitment: FitmentRule[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  fitmentConfirmed: boolean;
  date: string;
  helpfulCount: number;
}
