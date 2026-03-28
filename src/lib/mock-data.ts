import type { Product } from "@/types/product";

const now = new Date().toISOString();

/** Used when Supabase env vars are not set (local demo / build preview). */
export const mockProducts: Product[] = [
  {
    id: "mock-1",
    name: "Corporate Polo Shirt",
    slug: "corporate-polo-shirt",
    category: "Uniform",
    description: "Breathable cotton blend, embroidered logo area.",
    price: 185000,
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    created_at: now,
    updated_at: now,
  },
  {
    id: "mock-2",
    name: "Custom T-Shirt",
    slug: "custom-t-shirt",
    category: "T-Shirt",
    description: "Screen print or DTG — your design, our quality.",
    price: 95000,
    image_url:
      "https://images.unsplash.com/photo-1562157873-818bc0856a76?w=800&q=80",
    created_at: now,
    updated_at: now,
  },
  {
    id: "mock-3",
    name: "Windbreaker Jacket",
    slug: "windbreaker-jacket",
    category: "Jacket",
    description: "Lightweight outer layer for events and teams.",
    price: 320000,
    image_url:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    created_at: now,
    updated_at: now,
  },
  {
    id: "mock-4",
    name: "School Uniform Set",
    slug: "school-uniform-set",
    category: "Uniform",
    description: "Shirt, trousers, and tie packages for institutions.",
    price: 275000,
    image_url:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    created_at: now,
    updated_at: now,
  },
];
