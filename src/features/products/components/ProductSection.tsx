import { ProductGrid } from '@/features/products/components/ProductGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Product } from '@/types/product';

interface ProductSectionProps {
  title: string;
  ctaHref?: string;
  products: Product[];
}

export function ProductSection({ title, ctaHref, products }: ProductSectionProps) {
  return (
    <section className="mt-section-gap px-margin-mobile md:px-margin-desktop">
      <SectionHeader title={title} ctaHref={ctaHref} />
      <ProductGrid products={products} columns={4} />
    </section>
  );
}
