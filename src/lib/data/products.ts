import { mockProducts } from "@/lib/mock-data";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

function mapRow(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: row.slug != null ? String(row.slug) : null,
    category: String(row.category),
    description: row.description != null ? String(row.description) : null,
    price: Number(row.price),
    image_url: row.image_url != null ? String(row.image_url) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return mockProducts;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProducts:", error.message);
    return mockProducts;
  }
  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return mockProducts.find((p) => p.id === id) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getProductById:", error.message);
    return null;
  }
  if (!data) return null;
  return mapRow(data as Record<string, unknown>);
}
