import React, { useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useBundleStore } from '../../store/useBundleStore';
import { useProducts } from '../../hooks/useProducts';
import { ReviewItem } from './ReviewItem';
import { ReviewPanelHeader } from './ReviewPanelHeader';
import { ReviewPanelTotals } from './ReviewPanelTotals';
import LimitedIcon from "../../assets/limitedIcon.svg"
import { ProductCategory } from '../../types';


const categories = [
  { id: ProductCategory.CAMERAS, label: 'CAMERAS' },
  { id: ProductCategory.SENSORS, label: 'SENSORS' },
  { id: ProductCategory.EXTRAS, label: 'ACCESSORIES' },
  { id: ProductCategory.PLAN, label: 'HOME MONITORING PLAN' },
];

export const ReviewPanel: React.FC = () => {
  const items = useBundleStore((state) => state.items);
  const { products } = useProducts();

  const groupedItems = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      items: items.filter((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product?.category === cat.id;
      }),
    })).filter((cat) => cat.items.length > 0);
  }, [items, products]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1,
          md: 2,
          lg: 4
        },
        bgcolor: '#f8faff',
        border: '1px solid',
        borderColor: 'divider',
        height: 'fit-content',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { md: 1, lg: 6 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <ReviewPanelHeader />

        {groupedItems.map((category) => (
          <Box key={category.id} sx={{ mb: 3 }}>
            <Typography sx={{ letterSpacing: 1.5, fontWeight: 600, mb: 2, display: 'block', color: 'text.secondary' }}>
              {category.label}
            </Typography>
            {category.items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              const variant = product.variants.find((v) => v.id === item.variantId)!;
              return (
                <ReviewItem
                  key={`${item.productId}-${item.variantId}`}
                  product={product}
                  variant={variant}
                  quantity={item.quantity}
                />
              );
            })}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography sx={{ letterSpacing: 1.5, fontWeight: 600, mb: 2, display: 'block', color: "#A8B2BD" }}>
          Plan
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <img src={LimitedIcon} alt={"limited"} style={{ width: 40, height: 40, objectFit: 'contain' }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>Cam Unlimited</Typography>

          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right', textDecoration: "line-through", color: "#6F7882" }}>
              ${12.99.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right', color: "primary.main" }}>
              ${9.99.toFixed(2)}
            </Typography>
          </Box>
        </Box>
        {items.length > 0 ? (
          <ReviewPanelTotals />
        ) : (
          <Box sx={{ py: 6, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Your bundle is empty.<br />Start by choosing some cameras!
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
