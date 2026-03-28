import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Container } from "./Container";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  return (
    <section id="products" className="scroll-mt-20 bg-stone-50 py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Featured products
          </h2>
          <p className="mt-3 text-lg text-stone-600">
            A sample of what we produce — uniforms, tees, jackets, and custom orders.
          </p>
        </div>
        {products.length === 0 ? (
          <p className="mt-10 text-stone-600">No products yet. Check back soon.</p>
        ) : (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
