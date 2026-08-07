import type { ConfidenceBand, FitmentResult, FitmentRule, GarageVehicle, Product } from "@/lib/marketplace/types";

const BAND_LABEL: Record<ConfidenceBand, string> = {
  100: "Confirmed fit",
  90: "Manufacturer confirmed",
  75: "Likely fit",
  50: "Unverified — model match only",
  30: "Community reported, unverified",
  0: "No match on file",
};

export function checkFitment(product: Product, vehicle: GarageVehicle | null): FitmentResult {
  if (product.fitment.length === 0) {
    return { band: 90, label: "Universal fit" };
  }
  if (!vehicle) {
    return { band: 0, label: "Add a bike to check fitment" };
  }

  let best: FitmentRule | undefined;
  for (const r of product.fitment) {
    if (r.bikeBrand !== vehicle.brand || r.bikeModel !== vehicle.model) continue;
    if (vehicle.year < r.yearFrom || vehicle.year > r.yearTo) continue;
    if (r.variant && vehicle.variant && r.variant !== vehicle.variant) continue;
    if (!best || r.confidenceBand > best.confidenceBand) best = r;
  }

  if (!best) return { band: 0, label: BAND_LABEL[0] };
  return { band: best.confidenceBand, label: BAND_LABEL[best.confidenceBand], rule: best };
}

export function isUniversal(product: Product): boolean {
  return product.fitment.length === 0;
}

export function bandTone(band: ConfidenceBand): "success" | "accent" | "warning" | "racing" {
  if (band >= 90) return "success";
  if (band === 75) return "accent";
  if (band === 0) return "racing";
  return "warning";
}
