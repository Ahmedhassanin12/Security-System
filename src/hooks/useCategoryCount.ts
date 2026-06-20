import { useMemo } from 'react';
import { useBundleStore } from '../store/useBundleStore';
import { useProducts } from './useProducts';
import type { ProductCategory } from '../types';

/**
 * Custom hook to compute the number of selected items within a specific category.
 */
export const useCategoryCount = (category: ProductCategory) => {
  const items = useBundleStore((state) => state.items);
  const { products } = useProducts();

  const count = useMemo(() => {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product?.category === category) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  }, [items, products, category]);

  return count;
};
