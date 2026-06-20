import { useMemo } from 'react';
import { useBundleStore } from '../store/useBundleStore';
import { useProducts } from './useProducts';

/**
 * Custom hook to compute derived cart totals.
 * Isolates computational logic from the components and optimizes re-renders.
 */
export const useCartTotals = () => {
  const items = useBundleStore((state) => state.items);
  const { products } = useProducts();

  const totals = useMemo(() => {
    let subtotal = 0;
    let total = 0;

    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const variant = product.variants.find((v) => v.id === item.variantId);
      const price = variant?.priceOverride ?? product.basePrice;
      const comparePrice = variant?.compareAtPriceOverride ?? product.compareAtPrice ?? price;

      subtotal += comparePrice * item.quantity;
      total += price * item.quantity;
    });

    const discount = subtotal - total;

    return { subtotal, total, discount };
  }, [items, products]);

  return totals;
};
