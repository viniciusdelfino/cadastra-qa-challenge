'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '@/types/product';
import { CART_STORAGE_KEY, loadCart, saveCart } from './storage';
import type { CartItem, CartState } from './types';

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalCents: number;
  currency: CartItem['currency'] | null;
  hydrated: boolean;
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const INITIAL: CartState = { items: [] };

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(INITIAL);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setState(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCart(state);
  }, [state, hydrated]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== CART_STORAGE_KEY) return;
      setState(loadCart());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    setState((prev) => {
      const existing = prev.items.find((item) => item.productId === product.id);
      if (existing) {
        return {
          items: prev.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }
      const newItem: CartItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        priceCents: product.priceCents,
        currency: product.currency,
        image: product.image,
        isGrayscale: product.isGrayscale,
        quantity,
      };
      return { items: [...prev.items, newItem] };
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setState((prev) => ({
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setState((prev) => {
      if (quantity < 0) {
        return { items: prev.items.filter((item) => item.productId !== productId) };
      }
      return {
        items: prev.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      };
    });
  }, []);

  const clear = useCallback(() => setState(INITIAL), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalCents = state.items.reduce(
      (sum, item) => sum + item.priceCents * item.quantity,
      0,
    );
    const currency = state.items[0]?.currency ?? null;
    return {
      items: state.items,
      totalQuantity,
      totalCents,
      currency,
      hydrated,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
      openCart,
      closeCart,
    };
  }, [state, hydrated, isOpen, addItem, removeItem, setQuantity, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
