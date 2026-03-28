import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { isSupabaseConfigured } from "@/lib/env";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-100">
      {!isSupabaseConfigured() && (
        <div className="border-b border-amber-200 bg-amber-100 px-4 py-2 text-center text-sm text-amber-950">
          <strong>Demo mode:</strong> add{" "}
          <code className="rounded bg-amber-200/80 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-amber-200/80 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run{" "}
          <code className="rounded bg-amber-200/80 px-1">supabase/schema.sql</code>, then create an
          admin user in Supabase Auth to enable sign-in and CRUD.
        </div>
      )}
      <div className="flex flex-1 flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
