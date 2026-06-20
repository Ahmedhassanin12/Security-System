import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types';

interface BundleState {
  items: CartItem[];
  expandedStep: number;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  setExpandedStep: (step: number) => void;
  nextStep: () => void;
}

export const useBundleStore = create<BundleState>()(
  persist(
    (set) => ({
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
              newItems[existingItemIndex] = { ...newItems[existingItemIndex], quantity };
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
    }),
    {
      name: 'bundle-storage',
    }
  )
);
