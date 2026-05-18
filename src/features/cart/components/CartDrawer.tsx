'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { useCart } from '../CartProvider';

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    totalQuantity,
    totalCents,
    currency,
    setQuantity,
    removeItem,
    clear,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Esc') closeCart();
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeCart]);

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        'fixed inset-0 z-[70] transition-opacity duration-300',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <button
        type="button"
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
      />

      <aside
        role="dialog"
        aria-label="Shopping bag"
        aria-modal="true"
        className={cn(
          'bg-background absolute right-0 top-0 flex h-full w-full max-w-md flex-col shadow-xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="border-outline-variant flex items-center justify-between border-b px-stack-lg py-stack-md">
          <div>
            <p className="font-body text-label-caps text-secondary uppercase">
              Shopping bag
            </p>
            <p className="font-display text-headline-md">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="text-primary p-2 opacity-70 transition-opacity hover:opacity-100"
          >
            <Icon name="close" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-stack-md px-stack-lg text-center">
            <Icon name="shopping_bag" className="text-secondary text-[40px]" />
            <p className="font-body text-body-md text-secondary">
              Your bag is empty.
            </p>
            <Link
              href="/collections"
              onClick={closeCart}
              className="font-body text-label-caps text-primary border-primary border-b pb-1 uppercase"
            >
              Browse collections
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[var(--outline-variant)] overflow-y-auto px-stack-lg">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-stack-md py-stack-md">
                  <div className="bg-surface-container-low relative aspect-[3/4] w-20 shrink-0 overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      unoptimized
                      sizes="80px"
                      className={cn('object-cover', item.isGrayscale && 'grayscale')}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-stack-sm">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="font-body text-body-md hover:underline"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.productId)}
                        className="text-secondary hover:text-primary transition-colors"
                      >
                        <Icon name="close" className="text-[18px]" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div
                        className="border-outline-variant flex items-center border"
                        role="group"
                        aria-label={`Quantity for ${item.name}`}
                      >
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          className="px-2 py-1 leading-none"
                        >
                          −
                        </button>
                        <span className="font-body text-label-caps min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-2 py-1 leading-none"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-body text-body-md">
                        {formatPrice(item.priceCents * item.quantity, item.currency)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-outline-variant border-t px-stack-lg py-stack-md">
              <div className="mb-stack-md flex items-center justify-between">
                <span className="font-body text-label-caps text-secondary uppercase">
                  Subtotal
                </span>
                <span className="font-body text-body-lg">
                  {currency ? formatPrice(totalCents, currency) : '—'}
                </span>
              </div>
              <div className="flex flex-col gap-stack-sm">
                <Button variant="solid" className="w-full">
                  Checkout
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="font-body text-label-caps text-secondary hover:text-primary self-center uppercase transition-colors"
                >
                  Clear bag
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
