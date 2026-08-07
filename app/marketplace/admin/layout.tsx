import { AdminSidebar } from "@/components/marketplace/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <div className="mb-8 rounded-sm border border-racing/30 bg-racing/10 px-4 py-2.5 text-xs text-racing-light">
          Demo admin console — not gated behind real authentication or roles (see blueprint §17 Security Architecture).
        </div>
        <div className="flex flex-col gap-10 lg:flex-row">
          <AdminSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
