"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createProductAction,
  updateProductAction,
} from "@/app/actions/products";
import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "@/lib/validations/product";
import type { Product } from "@/types/product";

type Props =
  | { mode: "create"; product?: undefined }
  | { mode: "edit"; product: Product };

function toFormValues(p: Product): ProductFormInput {
  return {
    name: p.name,
    slug: p.slug ?? "",
    category: p.category,
    description: p.description ?? "",
    price: p.price,
    image_url: p.image_url ?? "",
  };
}

export function ProductForm(props: Props) {
  const router = useRouter();
  const defaults: ProductFormInput =
    props.mode === "edit"
      ? toFormValues(props.product)
      : {
          name: "",
          slug: "",
          category: "",
          description: "",
          price: 0,
          image_url: "",
        };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaults,
  });

  async function onSubmit(data: ProductFormValues) {
    if (props.mode === "create") {
      const res = await createProductAction(data);
      if (res.ok) {
        toast.success("Product created");
        router.push("/admin/products");
        router.refresh();
        return;
      }
      if ("fieldErrors" in res && res.fieldErrors) {
        toast.error(res.error);
        return;
      }
      toast.error(res.error);
      return;
    }

    const res = await updateProductAction(props.product.id, data);
    if (res.ok) {
      toast.success("Product updated");
      router.push("/admin/products");
      router.refresh();
      return;
    }
    toast.error(res.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-stone-700">
          Slug (optional)
        </label>
        <input
          id="slug"
          {...register("slug")}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          placeholder="auto from name if empty"
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-stone-700">
          Category
        </label>
        <input
          id="category"
          {...register("category")}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          placeholder="e.g. T-Shirt, Uniform, Jacket"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-stone-700">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-stone-700">
          Price (IDR)
        </label>
        <input
          id="price"
          type="number"
          step="1"
          min={0}
          {...register("price", { valueAsNumber: true })}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-stone-700">
          Image URL
        </label>
        <input
          id="image_url"
          type="url"
          {...register("image_url")}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          placeholder="https://…"
        />
        {errors.image_url && (
          <p className="mt-1 text-sm text-red-600">{errors.image_url.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-amber-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : props.mode === "create" ? "Create" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-stone-300 px-6 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
