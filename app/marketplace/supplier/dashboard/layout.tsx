import { SupplierSessionProvider } from "@/components/marketplace/supplier-session-provider";
import { DashboardSidebar } from "@/components/marketplace/supplier/dashboard-sidebar";

export default function SupplierDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SupplierSessionProvider>
      <div className="pb-24 pt-10">
        <div className="container-px mx-auto">
          <div className="mb-8 rounded-sm border border-warning/30 bg-warning/10 px-4 py-2.5 text-xs text-warning">
            Demo dashboard — no real authentication. Switch suppliers with the selector below to preview any account.
          </div>
          <div className="flex flex-col gap-10 lg:flex-row">
            <DashboardSidebar />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </div>
    </SupplierSessionProvider>
  );
}
