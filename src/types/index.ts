export const ProductCategory = {
  CAMERAS: 'cameras',
  PLAN: 'plan',
  SENSORS: 'sensors',
  EXTRAS: 'extras',
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export interface Variant {
  id: string;
  name: string;
  color?: string; // Hex color code
  priceOverride?: number;
  compareAtPriceOverride?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  discountBadge?: string;
  imageUrl: string;
  learnMoreUrl?: string;
  category: ProductCategory;
  variants: Variant[];
  isSubscription?: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}
