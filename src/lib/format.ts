const CURRENCY_LOCALE: Record<string, string> = {
  USD: 'en-US',
  BRL: 'pt-BR',
  EUR: 'de-DE',
};

export function formatPrice(priceCents: number, currency: 'USD' | 'BRL' | 'EUR'): string {
  const locale = CURRENCY_LOCALE[currency] ?? 'en-US';
  const value = priceCents / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
