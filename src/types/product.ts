export type Product = {
  id: string;
  name: string;
  slug: string | null;
  category: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductInput = {
  name: string;
  slug?: string;
  category: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
};
