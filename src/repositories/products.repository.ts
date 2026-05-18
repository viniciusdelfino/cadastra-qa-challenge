import {
  HERO_IMAGE,
  MOCK_FEATURED_COLLECTIONS,
  MOCK_PRODUCTS,
} from '@/features/products/data/products.mock';
import type {
  FeaturedCollection,
  Product,
  ProductCategory,
  ProductSection,
} from '@/types/product';

export interface ProductsRepository {
  list(): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  findBySection(section: ProductSection): Promise<Product[]>;
  findByCategory(category: ProductCategory): Promise<Product[]>;
  listFeaturedCollections(): Promise<FeaturedCollection[]>;
  getHeroImage(): Promise<typeof HERO_IMAGE>;
}

class InMemoryProductsRepository implements ProductsRepository {
  private readonly products: Product[];
  private readonly featured: FeaturedCollection[];

  constructor(products: Product[], featured: FeaturedCollection[]) {
    this.products = products;
    this.featured = featured;
  }

  async list(): Promise<Product[]> {
    return [...this.products];
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.products.find((product) => product.slug === slug) ?? null;
  }

  async findBySection(section: ProductSection): Promise<Product[]> {
    return this.products.filter((product) => product.section === section);
  }

  async findByCategory(category: ProductCategory): Promise<Product[]> {
    return this.products.filter((product) => product.category === category);
  }

  async listFeaturedCollections(): Promise<FeaturedCollection[]> {
    return [...this.featured];
  }

  async getHeroImage(): Promise<typeof HERO_IMAGE> {
    return HERO_IMAGE;
  }
}

export const productsRepository: ProductsRepository = new InMemoryProductsRepository(
  MOCK_PRODUCTS,
  MOCK_FEATURED_COLLECTIONS,
);
