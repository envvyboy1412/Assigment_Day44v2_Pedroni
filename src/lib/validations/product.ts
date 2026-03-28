import { z } from "zod";

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z
    .string()
    .max(200)
    .transform((s) => (s.trim() ? slugFromName(s) : undefined)),
  category: z.string().min(1, "Category is required").max(100),
  description: z
    .string()
    .max(5000)
    .transform((s) => (s.trim() ? s : null)),
  price: z.coerce.number().min(0, "Price must be positive"),
  image_url: z
    .string()
    .transform((s) => {
      const t = s.trim();
      return t ? t : null;
    })
    .refine((val) => val === null || /^https?:\/\/.+/i.test(val), {
      message: "Must be a valid URL",
    }),
});

/** Parsed output (after transforms) for server actions */
export type ProductFormValues = z.infer<typeof productSchema>;
/** Form input shape (strings) */
export type ProductFormInput = z.input<typeof productSchema>;
