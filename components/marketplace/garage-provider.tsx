"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { GarageVehicle } from "@/lib/marketplace/types";

const STORAGE_KEY = "planb-marketplace-garage-v1";

const SEED_VEHICLE: GarageVehicle = {
  id: "seed-1",
  brand: "BMW Motorrad",
  model: "S1000RR",
  year: 2022,
  variant: undefined,
  color: "Racing Red",
};

interface GarageState {
  vehicles: GarageVehicle[];
  activeVehicleId: string | null;
}

interface GarageContextValue {
  vehicles: GarageVehicle[];
  activeVehicle: GarageVehicle | null;
  addVehicle: (vehicle: Omit<GarageVehicle, "id">) => void;
  removeVehicle: (id: string) => void;
  setActiveVehicleId: (id: string | null) => void;
  ready: boolean;
}

const GarageContext = createContext<GarageContextValue | null>(null);

export function GarageProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GarageState>({ vehicles: [], activeVehicleId: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState(JSON.parse(raw));
      } else {
        setState({ vehicles: [SEED_VEHICLE], activeVehicleId: SEED_VEHICLE.id });
      }
    } catch {
      setState({ vehicles: [SEED_VEHICLE], activeVehicleId: SEED_VEHICLE.id });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const value = useMemo<GarageContextValue>(() => {
    return {
      vehicles: state.vehicles,
      activeVehicle: state.vehicles.find((v) => v.id === state.activeVehicleId) ?? null,
      addVehicle: (vehicle) => {
        const id = `v-${Date.now()}`;
        setState((s) => ({ vehicles: [...s.vehicles, { ...vehicle, id }], activeVehicleId: id }));
      },
      removeVehicle: (id) => {
        setState((s) => {
          const vehicles = s.vehicles.filter((v) => v.id !== id);
          const activeVehicleId = s.activeVehicleId === id ? (vehicles[0]?.id ?? null) : s.activeVehicleId;
          return { vehicles, activeVehicleId };
        });
      },
      setActiveVehicleId: (id) => setState((s) => ({ ...s, activeVehicleId: id })),
      ready,
    };
  }, [state, ready]);

  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}

export function useGarage() {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error("useGarage must be used within GarageProvider");
  return ctx;
}
