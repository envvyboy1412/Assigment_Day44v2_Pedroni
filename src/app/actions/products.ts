"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/validations/product";

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createProductAction(
  raw: unknown
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and ANON_KEY to .env.local." };
  }
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "You must be signed in." };
  }

  const { name, slug, category, description, price, image_url } = parsed.data;
  const finalSlug = slug || slugFromName(name) || `product-${Date.now()}`;

  const { error } = await supabase.from("products").insert({
    name,
    slug: finalSlug,
    category,
    description: description ?? null,
    price,
    image_url: image_url ?? null,
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function updateProductAction(
  id: string,
  raw: unknown
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured." };
  }
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "You must be signed in." };
  }

  const { name, slug, category, description, price, image_url } = parsed.data;
  const finalSlug = slug || slugFromName(name) || `product-${Date.now()}`;

  const { error } = await supabase
    .from("products")
    .update({
      name,
      slug: finalSlug,
      category,
      description: description ?? null,
      price,
      image_url: image_url ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  return { ok: true };
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured." };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "You must be signed in." };
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { ok: true };
}
