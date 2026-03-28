import { Container } from "./Container";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-stone-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              About us
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              We are a garment workshop focused on reliable timelines, consistent sizing, and
              fabrics that feel good to wear every day.
            </p>
          </div>
          <div className="space-y-4 text-stone-600">
            <p>
              <strong className="text-stone-800">Design → production → delivery.</strong> We align
              with your artwork, help choose materials, and keep you updated from sampling to bulk.
            </p>
            <p>
              Whether you need twenty pieces or two thousand, we structure the run so quality stays
              predictable — seams, prints, and packaging included.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
