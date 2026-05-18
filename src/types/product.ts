export type ProductSection = 'new-arrivals' | 'trending' | 'essentials';

export type ProductCategory =
  | 'outerwear'
  | 'dresses'
  | 'trousers'
  | 'shoes'
  | 'accessories'
  | 'knitwear'
  | 'tops';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  material: string;
  priceCents: number;
  currency: 'USD' | 'BRL' | 'EUR';
  category: ProductCategory;
  section: ProductSection;
  image: ProductImage;
  isGrayscale?: boolean;
  description?: string;
}

export interface FeaturedCollection {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description?: string;
  image: ProductImage;
  size: 'large' | 'small';
}
