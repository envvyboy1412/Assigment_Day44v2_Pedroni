import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-amber-50/80 to-stone-50 pb-16 pt-12 sm:pb-24 sm:pt-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-amber-800">
              Garment &amp; convection
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
              Quality apparel for your team, school, and brand
            </h1>
            <p className="mt-5 max-w-xl text-lg text-stone-600">
              From polos and uniforms to jackets and custom tees — we cut, sew, and finish with
              attention to fabric, fit, and deadline.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#products"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-amber-800 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-900"
              >
                View catalog
              </Link>
              <Link
                href="/#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400"
              >
                Get a quote
              </Link>
            </div>
          </div>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-200/60">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
              alt="Fabric and tailoring workspace"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
