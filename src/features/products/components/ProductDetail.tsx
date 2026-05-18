import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { cn } from '@/lib/cn';
import { AddToCartButton } from '@/features/cart/components/AddToCartButton';
import type { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article className="grid grid-cols-1 gap-gutter md:grid-cols-2">
      <div className="bg-surface-container-low relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn('object-cover', product.isGrayscale && 'grayscale')}
        />
      </div>

      <div className="flex flex-col gap-stack-lg md:py-stack-lg">
        <header>
          <p className="font-body text-label-caps text-secondary mb-2 uppercase">
            {product.category}
          </p>
          <h1 className="font-display text-headline-xl mb-stack-md">{product.name}</h1>
          <Price
            priceCents={product.priceCents}
            currency={product.currency}
            className="font-body text-body-lg"
          />
        </header>

        {product.description ? (
          <p className="font-body text-body-md text-on-surface-variant max-w-md">
            {product.description}
          </p>
        ) : null}

        <dl className="font-body text-label-caps text-secondary grid grid-cols-2 gap-stack-md">
          <div>
            <dt className="mb-1 uppercase">Material</dt>
            <dd className="text-primary">{product.material}</dd>
          </div>
          <div>
            <dt className="mb-1 uppercase">Reference</dt>
            <dd className="text-primary">{product.id.toUpperCase()}</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-stack-md">
          <AddToCartButton product={product} />
          <Button variant="ghost">Reserve in store</Button>
        </div>
      </div>
    </article>
  );
}
