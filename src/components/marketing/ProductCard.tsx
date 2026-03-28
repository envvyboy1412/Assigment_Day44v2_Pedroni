import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-amber-200 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {product.image_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.image_url}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full min-h-[12rem] items-center justify-center text-sm text-stone-500">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900">
          {product.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-stone-900">{product.name}</h3>
        {product.description && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-stone-600">{product.description}</p>
        )}
        <p className="mt-4 text-base font-semibold text-stone-900">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </article>
  );
}
