import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';
import productsData from '../data/products.json';

const products = productsData as Product[];

interface BundleState {
  items: CartItem[];
  expandedStep: number;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  setExpandedStep: (step: number) => void;
  nextStep: () => void;
  getCategoryQuantity: (category: string) => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

export const useBundleStore = create<BundleState>()(
  persist(
    (set, get) => ({
      items: [],
      expandedStep: 1,

      setQuantity: (productId, variantId, quantity) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === productId && item.variantId === variantId
          );

          const newItems = [...state.items];

          if (existingItemIndex >= 0) {
            if (quantity === 0) {
              newItems.splice(existingItemIndex, 1);
            } else {
              newItems[existingItemIndex].quantity = quantity;
            }
          } else if (quantity > 0) {
            newItems.push({ productId, variantId, quantity });
          }

          return { items: newItems };
        }),

      setExpandedStep: (step) => set({ expandedStep: step }),

      nextStep: () =>
        set((state) => ({
          expandedStep: Math.min(state.expandedStep + 1, 4),
        })),

      getCategoryQuantity: (category) => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (product?.category === category) {
            return total + item.quantity;
          }
          return total;
        }, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return total;
          const variant = product.variants.find((v) => v.id === item.variantId);
          const price = variant?.priceOverride ?? product.basePrice;
          const comparePrice = variant?.compareAtPriceOverride ?? product.compareAtPrice ?? price;
          return total + comparePrice * item.quantity;
        }, 0);
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return total;
          const variant = product.variants.find((v) => v.id === item.variantId);
          const price = variant?.priceOverride ?? product.basePrice;
          return total + price * item.quantity;
        }, 0);
      },

      getDiscount: () => {
        return get().getSubtotal() - get().getTotal();
      },
    }),
    {
      name: 'bundle-storage',
    }
  )
);
