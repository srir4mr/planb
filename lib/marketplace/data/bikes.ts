import type { BikeBrand } from "@/lib/marketplace/types";

export const BIKE_MODELS_BY_BRAND: Record<BikeBrand, string[]> = {
  "BMW Motorrad": ["S1000RR", "S1000R", "R1250GS", "M1000RR"],
  Ducati: ["Panigale V4", "Monster", "Multistrada V4", "Streetfighter V4"],
  Aprilia: ["RSV4", "Tuono V4", "RS 660"],
  Kawasaki: ["Ninja ZX-10R", "Z900", "Versys 1000"],
  Honda: ["CBR1000RR-R", "CB650R", "Africa Twin"],
  Yamaha: ["YZF-R1", "MT-09", "Tenere 700"],
  KTM: ["1290 Super Duke R", "390 Duke", "890 Adventure"],
  Suzuki: ["GSX-R1000", "Hayabusa", "V-Strom 800"],
  Triumph: ["Street Triple 765", "Tiger 900", "Speed Triple 1200"],
  "Royal Enfield": ["Himalayan", "Continental GT 650", "Interceptor 650"],
  CFMoto: ["800NK", "650MT", "300SS"],
  Benelli: ["TNT 600i", "Leoncino 500", "TRK 502"],
  "Harley-Davidson": ["Sportster S", "Pan America 1250", "Nightster"],
};

export const YEAR_OPTIONS = Array.from({ length: 12 }).map((_, i) => 2026 - i);
