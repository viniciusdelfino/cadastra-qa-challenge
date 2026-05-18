import { Newsletter } from '@/components/layout/Newsletter';
import { FeaturedCollections } from '@/features/products/components/FeaturedCollections';
import { HeroEditorial } from '@/features/products/components/HeroEditorial';
import { ProductSection } from '@/features/products/components/ProductSection';
import {
  getFeaturedCollections,
  getHeroImage,
  getProductsBySection,
} from '@/services/products.service';

export const revalidate = 3600;

export default async function HomePage() {
  const [hero, newArrivals, trending, essentials, featuredCollections] =
    await Promise.all([
      getHeroImage(),
      getProductsBySection('new-arrivals'),
      getProductsBySection('trending'),
      getProductsBySection('essentials'),
      getFeaturedCollections(),
    ]);

  return (
    <>
      <HeroEditorial image={hero} />

      <ProductSection
        title="New Arrivals"
        ctaHref="/collections?section=new-arrivals"
        products={newArrivals}
      />

      <ProductSection
        title="Trending"
        ctaHref="/collections?section=trending"
        products={trending}
      />

      <ProductSection
        title="Essentials"
        ctaHref="/collections?section=essentials"
        products={essentials}
      />

      <FeaturedCollections collections={featuredCollections} />

      <Newsletter />
    </>
  );
}
