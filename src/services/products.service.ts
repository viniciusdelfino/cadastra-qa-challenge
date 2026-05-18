import { productsRepository } from '@/repositories/products.repository';
import type {
  FeaturedCollection,
  Product,
  ProductCategory,
  ProductSection,
} from '@/types/product';

export interface ProductFilters {
  section?: ProductSection;
  category?: ProductCategory;
  query?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const DEFAULT_PAGE_SIZE = 6;

export async function getProductsBySection(
  section: ProductSection,
): Promise<Product[]> {
  return productsRepository.findBySection(section);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return productsRepository.findBySlug(slug);
}

export async function getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const products = await productsRepository.list();
  const query = filters.query?.trim();

  return products.filter((product) => {
    if (filters.section && product.section !== filters.section) return false;
    if (filters.category && product.category !== filters.category) return false;
    if (query) {
      const haystack =
        `${product.name} ${product.material} ${product.category}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export async function getPaginatedProducts(
  filters: ProductFilters = {},
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<PaginatedResult<Product>> {
  const all = await getAllProducts(filters);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const items = all.slice(start, start + pageSize);

  return { items, page: currentPage, pageSize, total, totalPages };
}

export async function getFeaturedCollections(): Promise<FeaturedCollection[]> {
  return productsRepository.listFeaturedCollections();
}

export async function getHeroImage() {
  return productsRepository.getHeroImage();
}

export async function getRelatedProducts(
  product: Product,
  limit = 3,
): Promise<Product[]> {
  const products = await productsRepository.findBySection(product.section);
  return products.filter((item) => item.id !== product.id).slice(0, limit);
}

export interface FilterFacet<T extends string> {
  value: T;
  count: number;
}

export async function getAvailableFacets(): Promise<{
  sections: FilterFacet<ProductSection>[];
  categories: FilterFacet<ProductCategory>[];
}> {
  const products = await productsRepository.list();
  const sectionCounts = new Map<ProductSection, number>();
  const categoryCounts = new Map<ProductCategory, number>();

  for (const product of products) {
    sectionCounts.set(product.section, (sectionCounts.get(product.section) ?? 0) + 1);
    categoryCounts.set(
      product.category,
      (categoryCounts.get(product.category) ?? 0) + 1,
    );
  }

  return {
    sections: Array.from(sectionCounts, ([value, count]) => ({ value, count })).sort(
      (a, b) => a.value.localeCompare(b.value),
    ),
    categories: Array.from(categoryCounts, ([value, count]) => ({ value, count })).sort(
      (a, b) => a.value.localeCompare(b.value),
    ),
  };
}
