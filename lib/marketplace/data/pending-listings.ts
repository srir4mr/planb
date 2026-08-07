export interface PendingListing {
  id: string;
  title: string;
  supplierName: string;
  categoryId: string;
  price: number;
  submittedAt: string;
  issue?: string;
}

export const PENDING_LISTINGS: PendingListing[] = [
  {
    id: "pl-1",
    title: "Adjustable Rearset Kit",
    supplierName: "Forge Composites",
    categoryId: "accessories",
    price: 18500,
    submittedAt: "2026-08-05",
  },
  {
    id: "pl-2",
    title: "Race Radiator Guard",
    supplierName: "Ironclad Protection",
    categoryId: "crash-protection",
    price: 6200,
    submittedAt: "2026-08-04",
    issue: "Missing fitment mapping — no compatible bikes listed",
  },
  {
    id: "pl-3",
    title: "Bar-End Mirrors",
    supplierName: "Halo Optics",
    categoryId: "accessories",
    price: 2400,
    submittedAt: "2026-08-03",
  },
  {
    id: "pl-4",
    title: "Steering Damper",
    supplierName: "Summit Suspension Labs",
    categoryId: "suspension",
    price: 34500,
    submittedAt: "2026-08-02",
    issue: "OEM reference number not verified",
  },
];
