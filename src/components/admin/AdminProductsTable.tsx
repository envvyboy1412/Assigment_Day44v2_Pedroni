"use client";

import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProductAction } from "@/app/actions/products";
import type { Product } from "@/types/product";
import { Pencil, Trash2 } from "lucide-react";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export function AdminProductsTable() {
  const queryClient = useQueryClient();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProductAction(id);
      if (!res.ok) throw new Error(res.error);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-stone-200" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );
  }

  const products = data ?? [];

  if (products.length === 0) {
    return (
      <p className="text-stone-600">
        No products yet.{" "}
        <Link href="/admin/products/new" className="font-medium text-amber-800 underline">
          Add your first product
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
          <tr>
            <th className="px-4 py-3 font-medium">Image</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-stone-50/80">
              <td className="px-4 py-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-stone-100">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                      unoptimized
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-xs text-stone-400">
                      —
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 font-medium text-stone-900">{p.name}</td>
              <td className="px-4 py-3 text-stone-600">{p.category}</td>
              <td className="px-4 py-3 text-stone-800">
                Rp {p.price.toLocaleString("id-ID")}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100"
                    aria-label={`Edit ${p.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50"
                    aria-label={`Delete ${p.name}`}
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(p.id, p.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
