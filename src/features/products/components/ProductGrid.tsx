import { ProductCard } from '@/features/products/components/ProductCard';
import { cn } from '@/lib/cn';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
  emptyMessage?: string;
}

const COLUMNS_CLASS: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function ProductGrid({
  products,
  columns = 4,
  className,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="font-body text-body-md text-secondary py-stack-lg">{emptyMessage}</p>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 gap-gutter', COLUMNS_CLASS[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
