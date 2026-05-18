import type { Metadata } from 'next';
import Link from 'next/link';
import { CollectionFilters } from '@/features/products/components/CollectionFilters';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { Pagination } from '@/components/ui/Pagination';
import { getAvailableFacets, getPaginatedProducts } from '@/services/products.service';
import type { ProductCategory, ProductSection } from '@/types/product';

interface CollectionsPageProps {
  searchParams: Promise<{
    section?: string;
    category?: string;
    q?: string;
    page?: string;
  }>;
}

const VALID_SECTIONS: ProductSection[] = ['new-arrivals', 'trending', 'essentials'];
const VALID_CATEGORIES: ProductCategory[] = [
  'outerwear',
  'dresses',
  'trousers',
  'shoes',
  'accessories',
  'knitwear',
  'tops',
];

function parseSection(value: string | undefined): ProductSection | undefined {
  if (!value) return undefined;
  return VALID_SECTIONS.includes(value as ProductSection)
    ? (value as ProductSection)
    : undefined;
}

function parseCategory(value: string | undefined): ProductCategory | undefined {
  if (!value) return undefined;
  return VALID_CATEGORIES.includes(value as ProductCategory)
    ? (value as ProductCategory)
    : undefined;
}

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function buildClearQueryHref(params: Record<string, string | undefined>): string {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (!value || key === 'q' || key === 'page') continue;
    next.set(key, value);
  }
  const qs = next.toString();
  return qs ? `/collections?${qs}` : '/collections';
}

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse the current editorial selection.',
};

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const params = await searchParams;
  const section = parseSection(params.section);
  const category = parseCategory(params.category);
  const query = params.q?.trim() || undefined;
  const page = parsePage(params.page);

  const [result, facets] = await Promise.all([
    getPaginatedProducts({ section, category, query }, page),
    getAvailableFacets(),
  ]);

  const paginationSearchParams: Record<string, string | undefined> = {
    section: params.section,
    category: params.category,
    q: query,
  };

  return (
    <div className="px-margin-mobile pt-stack-lg md:px-margin-desktop">
      <header className="border-outline-variant mb-stack-lg border-b pb-stack-lg">
        <div className="flex flex-col justify-between gap-stack-md md:flex-row md:items-end">
          <div>
            <p className="font-body text-label-caps text-secondary mb-2">
              AUTUMN / WINTER 2024
            </p>
            <h1 className="font-display text-headline-xl">Collections</h1>
          </div>
          <p className="font-body text-body-md text-secondary max-w-md">
            Exploring the intersection of architectural form and textile fluidity. A
            curated selection of silhouettes designed for the modern avant-garde.
          </p>
        </div>
      </header>

      {query ? (
        <div className="mb-stack-lg flex flex-wrap items-center gap-stack-md">
          <span className="font-body text-label-caps text-secondary uppercase">
            Showing results for
          </span>
          <span className="font-body text-label-caps text-primary border-primary inline-flex items-center gap-2 border-b pb-1">
            “{query}”
            <Link
              href={buildClearQueryHref(params)}
              aria-label="Clear search"
              className="text-secondary hover:text-primary transition-colors"
            >
              ×
            </Link>
          </span>
          <span className="font-body text-label-caps text-secondary">
            {result.total} {result.total === 1 ? 'item' : 'items'}
          </span>
        </div>
      ) : null}

      <CollectionFilters sections={facets.sections} categories={facets.categories} />

      <ProductGrid
        products={result.items}
        columns={3}
        className="gap-y-section-gap"
        emptyMessage={
          query
            ? `No items match “${query}”. Try a different keyword.`
            : 'No items match the current selection.'
        }
      />

      <Pagination
        currentPage={result.page}
        totalPages={result.totalPages}
        basePath="/collections"
        searchParams={paginationSearchParams}
      />
    </div>
  );
}
