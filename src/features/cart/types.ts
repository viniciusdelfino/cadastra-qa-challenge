import type { Product, ProductImage } from '@/types/product';

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: Product['currency'];
  image: ProductImage;
  isGrayscale?: boolean;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
