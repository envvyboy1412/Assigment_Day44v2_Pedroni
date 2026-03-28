import { AboutSection } from "@/components/marketing/AboutSection";
import { CategoryStrip } from "@/components/marketing/CategoryStrip";
import { ContactSection } from "@/components/marketing/ContactSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProductGrid } from "@/components/marketing/ProductGrid";
import { getProducts } from "@/lib/data/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <ProductGrid products={products} />
      <AboutSection />
      <ContactSection />
    </>
  );
}
