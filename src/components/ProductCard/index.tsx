import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';
import type { Product } from '../../types';
import { useBundleStore } from '../../store/useBundleStore';
import { VariantSelector } from '../VariantSelector';
import { QuantityStepper } from '../QuantityStepper';
import { images } from '../../utils/assets';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variants[0].id);

  const items = useBundleStore((state) => state.items);
  const setQuantity = useBundleStore((state) => state.setQuantity);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const currentItem = items.find(
    (item) => item.productId === product.id && item.variantId === selectedVariantId
  );

  const quantity = currentItem?.quantity || 0;

  const totalQuantity = items
    .filter((item) => item.productId === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const isSelected = totalQuantity > 0;

  const handleIncrease = () => setQuantity(product.id, selectedVariantId, quantity + 1);
  const handleDecrease = () => setQuantity(product.id, selectedVariantId, Math.max(0, quantity - 1));

  const price = selectedVariant.priceOverride ?? product.basePrice;
  const compareAtPrice = selectedVariant.compareAtPriceOverride ?? product.compareAtPrice;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: "row",
          lg: "column"
        },
        position: 'relative',
        borderColor: isSelected ? 'primary.main' : 'grey.300',
        bgcolor: isSelected ? '#f5f8ff' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }
      }}
    >
      {product.discountBadge && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: '#4338ca',
            color: 'white',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            zIndex: 1
          }}
        >
          {product.discountBadge}
        </Box>
      )}

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 160, bgcolor: 'white', borderBottom: '1px solid', borderColor: 'grey.100' }}>
        <img src={images[product.imageUrl] || product.imageUrl} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.2 }}>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, flexGrow: 1, fontSize: '0.8125rem' }}>
          {product.description}{' '}
          {product.learnMoreUrl && (
            <Link href={product.learnMoreUrl} underline="hover" sx={{ fontWeight: 500 }}>
              Learn More
            </Link>
          )}
        </Typography>

        <VariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onSelectVariant={setSelectedVariantId}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 2 }}>
          <QuantityStepper
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <Box sx={{ textAlign: 'right' }}>
            {compareAtPrice && compareAtPrice > price && (
              <Typography variant="caption" color="text.disabled" sx={{ textDecoration: 'line-through', display: 'block', mb: -0.5 }}>
                ${compareAtPrice.toFixed(2)}
              </Typography>
            )}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isSelected ? 'primary.main' : 'text.primary', display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
              ${price.toFixed(2)}
              {product.isSubscription && <Typography component="span" variant="caption" color="text.secondary">/mo</Typography>}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
