"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Order, OrderStatus } from "@/lib/marketplace/types";

const STORAGE_KEY = "planb-marketplace-orders-v1";

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status" | "statusHistory">) => Order;
  setStatus: (orderId: string, status: OrderStatus, disputeReason?: string) => void;
  ready: boolean;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  const value = useMemo<OrdersContextValue>(() => {
    return {
      orders,
      addOrder: (order) => {
        const now = new Date().toISOString();
        const newOrder: Order = {
          ...order,
          id: `PB-${Date.now().toString(36).toUpperCase()}`,
          createdAt: now,
          status: "HELD",
          statusHistory: [{ status: "HELD", at: now }],
        };
        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
      },
      setStatus: (orderId, status, disputeReason) => {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status,
                  disputeReason: status === "DISPUTED" ? disputeReason ?? o.disputeReason : o.disputeReason,
                  statusHistory: [...o.statusHistory, { status, at: new Date().toISOString() }],
                }
              : o
          )
        );
      },
      ready,
    };
  }, [orders, ready]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
