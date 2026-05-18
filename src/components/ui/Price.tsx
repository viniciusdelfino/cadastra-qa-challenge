import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';

interface PriceProps {
  priceCents: number;
  currency: 'USD' | 'BRL' | 'EUR';
  className?: string;
}

export function Price({ priceCents, currency, className }: PriceProps) {
  return (
    <span className={cn(className)}>{formatPrice(priceCents, currency)}</span>
  );
}
