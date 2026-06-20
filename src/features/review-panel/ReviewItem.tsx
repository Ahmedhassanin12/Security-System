import React from 'react';
import { Box, Typography } from '@mui/material';
import { QuantityStepper } from '../../components/QuantityStepper';
import { useBundleStore } from '../../store/useBundleStore';
import type { Product, Variant } from '../../types';
import { images } from '../../utils/assets';

interface ReviewItemProps {
  product: Product;
  variant: Variant;
  quantity: number;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ product, variant, quantity }) => {
  const setQuantity = useBundleStore(state => state.setQuantity);

  const handleIncrease = () => setQuantity(product.id, variant.id, quantity + 1);
  const handleDecrease = () => setQuantity(product.id, variant.id, Math.max(0, quantity - 1));

  const price = variant.priceOverride ?? product.basePrice;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <img src={images[product.imageUrl] || product.imageUrl} alt={product.name} style={{ width: 40, height: 40, objectFit: 'contain' }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{
          fontWeight: 600, lineHeight: 1.2, fontSize: {
            xs: 12,
            sm: 13,
            md: 14,
            lg: 16
          }
        }}>{product.name}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {variant.color && (
            <Box component="span" sx={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', bgcolor: variant.color, border: '1px solid #ccc' }} />
          )}
          {variant.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <QuantityStepper quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right', color: "primary.main" }}>
          ${(price * quantity).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};
