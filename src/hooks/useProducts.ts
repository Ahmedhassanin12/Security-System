import { useMemo } from 'react';
import productsData from '../data/products.json';
import type { Product } from '../types';

/**
 * Custom hook to encapsulate product data fetching.
 * In a real application, this would fetch from an API (e.g., using React Query).
 */
export const useProducts = () => {
  const products = useMemo(() => productsData as Product[], []);

  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter((product) => product.category === category);
  };

  return {
    products,
    getProductById,
    getProductsByCategory,
  };
};
