import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = {
  title: "New product",
};

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/products" className="text-sm font-medium text-amber-800 hover:underline">
        ← Back to products
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">New product</h1>
      <p className="mt-1 text-sm text-stone-600">Fill in the details below. Slug is optional.</p>
      <div className="mt-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
