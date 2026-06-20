import React from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import type { Variant } from '../../types';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariantId: string;
  onSelectVariant: (variantId: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onSelectVariant,
}) => {
  if (variants.length <= 1) return <Box sx={{ height: 28, mt: 1 }} />; // Placeholder for layout consistency

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;
        return (
          <ButtonBase
            key={variant.id}
            onClick={() => onSelectVariant(variant.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              border: isSelected ? '1px solid #1976d2' : '1px solid #e0e0e0',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              bgcolor: isSelected ? '#e3f2fd' : 'background.paper',
              transition: 'all 0.2s',
            }}
          >
            {variant.color && (
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: variant.color,
                  border: '1px solid #ccc',
                }}
              />
            )}
            <Typography variant="caption" sx={{ fontWeight: isSelected ? 600 : 400, color: isSelected ? '#1976d2' : 'text.primary' }}>
              {variant.name}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
};
