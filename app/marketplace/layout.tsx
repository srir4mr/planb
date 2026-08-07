import type { Metadata } from "next";
import { GarageProvider } from "@/components/marketplace/garage-provider";
import { CartProvider } from "@/components/marketplace/cart-provider";
import { OrdersProvider } from "@/components/marketplace/orders-provider";
import { ApplicationsProvider } from "@/components/marketplace/applications-provider";
import { MarketplaceSubNav } from "@/components/marketplace/sub-nav";

export const metadata: Metadata = {
  title: {
    default: "Marketplace",
    template: "%s | Plan B Marketplace",
  },
  description: "Plan B Marketplace — sourced from verified suppliers, matched to your exact bike.",
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <GarageProvider>
      <CartProvider>
        <OrdersProvider>
          <ApplicationsProvider>
            <div className="pt-20">
              <MarketplaceSubNav />
              {children}
            </div>
          </ApplicationsProvider>
        </OrdersProvider>
      </CartProvider>
    </GarageProvider>
  );
}
