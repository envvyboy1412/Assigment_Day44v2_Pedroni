import Link from "next/link";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";

export const metadata = {
  title: "Products",
};

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">Products</h1>
          <p className="mt-1 text-sm text-stone-600">Create, edit, or remove catalog items.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-amber-800 px-5 text-sm font-semibold text-white hover:bg-amber-900"
        >
          Add product
        </Link>
      </div>
      <div className="mt-8">
        <AdminProductsTable />
      </div>
    </div>
  );
}
