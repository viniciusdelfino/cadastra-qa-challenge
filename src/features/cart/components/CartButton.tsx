'use client';

import { Icon } from '@/components/ui/Icon';
import { useCart } from '../CartProvider';

export function CartButton() {
  const { totalQuantity, openCart, hydrated } = useCart();
  const showBadge = hydrated && totalQuantity > 0;
  const label =
    hydrated && totalQuantity > 0
      ? `Shopping bag, ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`
      : 'Shopping bag';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={openCart}
      className="text-primary relative p-2 opacity-70 transition-opacity hover:opacity-100"
    >
      <Icon name="shopping_bag" />
      {showBadge ? (
        <span
          aria-hidden
          className="bg-primary text-on-primary absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none"
        >
          {totalQuantity > 99 ? '99+' : totalQuantity}
        </span>
      ) : null}
    </button>
  );
}
