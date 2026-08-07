"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SupplierApplication, SupplierApplicationStatus } from "@/lib/marketplace/types";

const STORAGE_KEY = "planb-marketplace-applications-v1";

interface ApplicationsContextValue {
  applications: SupplierApplication[];
  addApplication: (app: Omit<SupplierApplication, "id" | "createdAt" | "status">) => void;
  setStatus: (id: string, status: SupplierApplicationStatus) => void;
  ready: boolean;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<SupplierApplication[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setApplications(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications, ready]);

  const value = useMemo<ApplicationsContextValue>(() => {
    return {
      applications,
      addApplication: (app) => {
        const newApp: SupplierApplication = {
          ...app,
          id: `APP-${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          status: "pending",
        };
        setApplications((prev) => [newApp, ...prev]);
      },
      setStatus: (id, status) => {
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      },
      ready,
    };
  }, [applications, ready]);

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error("useApplications must be used within ApplicationsProvider");
  return ctx;
}
