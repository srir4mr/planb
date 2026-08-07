import { products } from "@/lib/marketplace/data/products";
import { categories } from "@/lib/marketplace/data/categories";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import { BIKE_MODELS_BY_BRAND } from "@/lib/marketplace/data/bikes";
import { BIKE_BRANDS, type BikeBrand, type GarageVehicle, type Product } from "@/lib/marketplace/types";
import { checkFitment } from "@/lib/marketplace/fitment";

function resolveBrand(input: string): BikeBrand | null {
  const match = BIKE_BRANDS.find((b) => b.toLowerCase() === input.trim().toLowerCase());
  return match ?? null;
}

function summarizeProduct(product: Product, vehicle: GarageVehicle | null) {
  const fitment = checkFitment(product, vehicle);
  const supplier = suppliers.find((s) => s.id === product.supplierId);
  const category = categories.find((c) => c.id === product.categoryId);
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    partBrand: product.partBrand,
    category: category?.name ?? product.categoryId,
    price: product.price,
    currency: product.currency,
    rating: product.rating,
    reviewCount: product.reviewCount,
    supplier: supplier?.name ?? product.supplierId,
    inStock: product.stockQty > 0,
    fitmentBand: fitment.band,
    fitmentLabel: fitment.label,
  };
}

export function toolListBikeBrands() {
  return { brands: BIKE_BRANDS };
}

export function toolListBikeModels(input: { bikeBrand: string }) {
  const brand = resolveBrand(input.bikeBrand);
  if (!brand) {
    return {
      error: `"${input.bikeBrand}" isn't a brand we carry parts for. Supported brands: ${BIKE_BRANDS.join(", ")}.`,
    };
  }
  return { brand, models: BIKE_MODELS_BY_BRAND[brand] };
}

export function toolListCategories() {
  return { categories: categories.map((c) => ({ id: c.id, name: c.name })) };
}

interface SearchProductsInput {
  query?: string;
  categoryId?: string;
  bikeBrand?: string;
  bikeModel?: string;
  year?: number;
  maxPrice?: number;
  onlyConfirmedFit?: boolean;
}

export function toolSearchProducts(input: SearchProductsInput, activeVehicle: GarageVehicle | null) {
  let vehicle: GarageVehicle | null = activeVehicle;

  if (input.bikeBrand && input.bikeModel && input.year) {
    const brand = resolveBrand(input.bikeBrand);
    if (!brand) {
      return {
        error: `"${input.bikeBrand}" isn't a brand we carry parts for. Supported brands: ${BIKE_BRANDS.join(", ")}.`,
      };
    }
    vehicle = { id: "query-vehicle", brand, model: input.bikeModel, year: input.year };
  }

  let results = products;
  if (input.categoryId) results = results.filter((p) => p.categoryId === input.categoryId);
  if (typeof input.maxPrice === "number") results = results.filter((p) => p.price <= input.maxPrice!);
  if (input.query) {
    const q = input.query.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.partBrand.toLowerCase().includes(q)
    );
  }

  let summarized = results.map((p) => summarizeProduct(p, vehicle));
  if (vehicle && input.onlyConfirmedFit) {
    summarized = summarized.filter((s) => s.fitmentBand >= 75);
  }
  summarized.sort((a, b) => (vehicle ? b.fitmentBand - a.fitmentBand : 0) || b.rating - a.rating);

  return {
    vehicleUsed: vehicle ? `${vehicle.year} ${vehicle.brand} ${vehicle.model}` : null,
    resultCount: summarized.length,
    results: summarized.slice(0, 12),
  };
}

interface CheckFitmentInput {
  product_id: string;
  bikeBrand?: string;
  bikeModel?: string;
  year?: number;
}

export function toolCheckFitment(input: CheckFitmentInput, activeVehicle: GarageVehicle | null) {
  const product = products.find((p) => p.id === input.product_id || p.slug === input.product_id);
  if (!product) {
    return { error: `No product found with id/slug "${input.product_id}". Use search_products to find the correct id first.` };
  }

  let vehicle: GarageVehicle | null = activeVehicle;
  if (input.bikeBrand && input.bikeModel && input.year) {
    const brand = resolveBrand(input.bikeBrand);
    if (!brand) {
      return {
        error: `"${input.bikeBrand}" isn't a brand we carry parts for. Supported brands: ${BIKE_BRANDS.join(", ")}.`,
      };
    }
    vehicle = { id: "query-vehicle", brand, model: input.bikeModel, year: input.year };
  }

  if (!vehicle) {
    return { error: "No bike specified and the customer has none saved in their garage. Ask for the bike's brand, model, and year." };
  }

  const result = checkFitment(product, vehicle);
  return {
    product: { id: product.id, slug: product.slug, title: product.title, price: product.price },
    vehicle: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
    band: result.band,
    label: result.label,
    fits: result.band >= 75,
    manufacturerConfirmed: result.band >= 90,
    oemRef: result.rule?.oemRef ?? null,
    torqueSpec: result.rule?.torqueSpec ?? null,
    installTimeMin: result.rule?.installTimeMin ?? null,
    difficulty: result.rule?.difficulty ?? null,
    warnings: result.rule?.warnings ?? null,
  };
}
