"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { suppliers } from "@/lib/marketplace/data/suppliers";
import type { Supplier } from "@/lib/marketplace/types";

const STORAGE_KEY = "planb-marketplace-viewing-supplier";

interface SupplierSessionValue {
  supplier: Supplier;
  setSupplierId: (id: string) => void;
  ready: boolean;
}

const SupplierSessionContext = createContext<SupplierSessionValue | null>(null);

export function SupplierSessionProvider({ children }: { children: ReactNode }) {
  const [supplierId, setSupplierId] = useState(suppliers[0].id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw && suppliers.some((s) => s.id === raw)) setSupplierId(raw);
    } catch {
      // ignore malformed storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, supplierId);
  }, [supplierId, ready]);

  const value = useMemo<SupplierSessionValue>(() => {
    return {
      supplier: suppliers.find((s) => s.id === supplierId) ?? suppliers[0],
      setSupplierId,
      ready,
    };
  }, [supplierId, ready]);

  return <SupplierSessionContext.Provider value={value}>{children}</SupplierSessionContext.Provider>;
}

export function useSupplierSession() {
  const ctx = useContext(SupplierSessionContext);
  if (!ctx) throw new Error("useSupplierSession must be used within SupplierSessionProvider");
  return ctx;
}
