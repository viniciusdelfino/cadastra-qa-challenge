import Image from 'next/image';
import Link from 'next/link';
import { Price } from '@/components/ui/Price';
import { cn } from '@/lib/cn';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col"
      aria-label={`${product.name} – view product`}
    >
      <div className="bg-surface-container mb-stack-md aspect-[3/4] overflow-hidden">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={600}
          height={800}
          className={cn(
            'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105',
            product.isGrayscale && 'grayscale',
          )}
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-body text-body-md">{product.name}</h4>
        <Price
          priceCents={product.priceCents}
          currency={product.currency}
          className="font-body text-label-caps text-secondary"
        />
      </div>
    </Link>
  );
}
