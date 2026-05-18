import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/features/products/components/ProductDetail';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/services/products.service';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product not found' };
  }

  return {
    title: product.name,
    description: product.description ?? `${product.name} in ${product.material}.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product, 4);

  return (
    <div className="px-margin-mobile py-stack-lg md:px-margin-desktop md:py-section-gap">
      <ProductDetail product={product} />

      {related.length > 0 ? (
        <section className="mt-section-gap">
          <SectionHeader title="You may also like" ctaHref="/collections" />
          <ProductGrid products={related} columns={4} />
        </section>
      ) : null}
    </div>
  );
}
