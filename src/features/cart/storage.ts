import type { CartItem, CartState } from './types';

export const CART_STORAGE_KEY = 'cadastra-cart:v1';

const EMPTY: CartState = { items: [] };

function isValidItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.name === 'string' &&
    typeof item.priceCents === 'number' &&
    typeof item.currency === 'string' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    typeof item.image === 'object' &&
    item.image !== null
  );
}

export function loadCart(): CartState {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return EMPTY;
    const items = (parsed as { items?: unknown }).items;
    if (!Array.isArray(items)) return EMPTY;
    return { items: items.filter(isValidItem) };
  } catch {
    return EMPTY;
  }
}

export function saveCart(state: CartState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota or serialization errors
  }
}
