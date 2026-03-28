import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/data/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Not found" };
  return { title: `Edit ${product.name}` };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/products" className="text-sm font-medium text-amber-800 hover:underline">
        ← Back to products
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">Edit product</h1>
      <p className="mt-1 text-sm text-stone-600">{product.name}</p>
      <div className="mt-8">
        <ProductForm mode="edit" product={product} />
      </div>
    </div>
  );
}
