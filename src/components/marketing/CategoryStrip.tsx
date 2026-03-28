import { Shirt, Briefcase, Wind } from "lucide-react";
import { Container } from "./Container";

const items = [
  {
    icon: Shirt,
    title: "T-Shirts & polos",
    body: "Screen print, embroidery, and corporate polos.",
  },
  {
    icon: Briefcase,
    title: "Uniforms",
    body: "Schools, hospitality, and corporate dress codes.",
  },
  {
    icon: Wind,
    title: "Jackets & outerwear",
    body: "Windbreakers, hoodies, and team layers.",
  },
];

export function CategoryStrip() {
  return (
    <section className="border-y border-stone-200 bg-white py-16">
      <Container>
        <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">
          What we make
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-2xl border border-stone-100 bg-stone-50/80 p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-900">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-900">{title}</h3>
              <p className="mt-2 text-sm text-stone-600">{body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
