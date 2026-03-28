import Link from "next/link";
import { getProducts } from "@/lib/data/products";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Dashboard</h1>
      <p className="mt-2 text-stone-600">
        You have <strong>{products.length}</strong> product{products.length === 1 ? "" : "s"} in
        the catalog.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/admin/products"
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
        >
          Manage products
        </Link>
        <Link
          href="/admin/products/new"
          className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
        >
          Add product
        </Link>
      </div>
    </div>
  );
}
