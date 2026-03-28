import Link from "next/link";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-semibold text-stone-900">Atelier Konveksi</p>
            <p className="mt-2 max-w-sm text-sm text-stone-600">
              Custom garments, uniforms, and promotional apparel — produced with care for teams and
              brands.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/#products" className="text-stone-600 hover:text-amber-800">
              Products
            </Link>
            <Link href="/#contact" className="text-stone-600 hover:text-amber-800">
              Contact
            </Link>
            <Link href="https://github.com/envvyboy1412/Assigment_Day44v2_Pedroni" className="text-stone-600 hover:text-amber-800">
              Github Project
            </Link>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Atelier Konveksi. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
