import React from 'react';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import { useBundleStore } from '../../store/useBundleStore';
import productsData from '../../data/products.json';
import type { Product } from '../../types';
import { ReviewItem } from './ReviewItem';
import { images } from '../../utils/assets';
import LimitedIcon from "../../assets/limitedIcon.svg"
import CarIcon from "../../assets/car.svg"

const products = productsData as Product[];

const categories = [
  { id: 'cameras', label: 'CAMERAS' },
  { id: 'sensors', label: 'SENSORS' },
  { id: 'extras', label: 'ACCESSORIES' },
  { id: 'plan', label: 'HOME MONITORING PLAN' },
];

export const ReviewPanel: React.FC = () => {
  const { items, getSubtotal, getDiscount, getTotal } = useBundleStore();

  const groupedItems = categories.map(cat => ({
    ...cat,
    items: items.filter(item => {
      const product = products.find(p => p.id === item.productId);
      return product?.category === cat.id;
    })
  })).filter(cat => cat.items.length > 0);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <Paper elevation={0} sx={{
      p: {
        xs: 1,
        md: 2,
        lg: 4
      }, borderRadius: 3, bgcolor: '#f8faff', border: '1px solid #eef2ff', height: 'fit-content', display: "flex", flexDirection: {
        xs: "column",
        lg: "row"
      }, gap: {
        md: 1,
        lg: 6
      },
      backgroundColor: "#EDF4FF"

    }}>
      <Typography sx={{ fontWeight: 500, fontSize: "13px", color: "#484848" }}>Review</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography sx={{ fontWeight: 800, fontSize: "22px" }}>Your security system</Typography>
        <Typography variant="body2" color="#1F1F1FBF" sx={{ mb: 4 }}>
          Review your personalized protection system designed to keep what matters most safe.
        </Typography>

        {groupedItems.map(category => (
          <Box key={category.id} sx={{ mb: 3 }}>
            <Typography sx={{ letterSpacing: 1.5, fontWeight: 600, mb: 2, display: 'block', color: "#A8B2BD" }}>
              {category.label}
            </Typography>
            {category.items.map(item => {
              const product = products.find(p => p.id === item.productId)!;
              const variant = product.variants.find(v => v.id === item.variantId)!;
              return <ReviewItem key={`${item.productId}-${item.variantId}`} product={product} variant={variant} quantity={item.quantity} />;
            })}
          </Box>
        ))}
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
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}>
        {items.length > 0 ? (
          <>
            <Divider sx={{
              display: {
                xs: "block",
                lg: "none"
              }, my: 3, borderColor: '#e0e7ff'
            }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src={CarIcon} alt="truck" style={{ opacity: 0.6 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Fast Shipping</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right', textDecoration: "line-through", color: "#6F7882" }}>
                  ${5.99.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right', color: "primary.main" }}>
                  Free
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
              <Box sx={{
                width: {
                  xs: 50,
                  md: 85,
                  lg: 120
                },
                height: {
                  xs: 50,
                  md: 85,
                  lg: 120
                }
              }}>
                <img src={images['Satisfaction Badge-05 1.png']} style={
                  {
                    width: "100%",
                    height: "100%"
                  }
                } />
              </Box>
              <Box sx={{
                display: {
                  xs: "none",
                  lg: "flex"
                }, flexDirection: "column", gap: 1
              }}>
                <Typography sx={{ color: "#1F1F1F", fontWeight: 600 }}>30-day hassle-free returns</Typography>
                <Typography>

                  If you're not totally in love with the product, we will refund you 100%.</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', mt: 3, gap: 1.5 }}>
              {discount > 0 && (
                <Typography variant="body1" color="#6F7882" sx={{ textDecoration: 'line-through', fontWeight: 500 }}>
                  ${subtotal.toFixed(2)}
                </Typography>
              )}
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#4338ca' }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            {discount > 0 && (
              <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 700, textAlign: 'center', my: 2.5 }}>
                Congrats! You're saving ${discount.toFixed(2)} on your security bundle!
              </Typography>
            )}


            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: '1.1rem',
                textTransform: 'none',
                bgcolor: '#4338ca',
                boxShadow: '0 4px 14px rgba(67, 56, 202, 0.4)',
                '&:hover': { bgcolor: '#3730a3', boxShadow: '0 6px 20px rgba(67, 56, 202, 0.6)' }
              }}
            >
              Checkout
            </Button>

            <Typography variant="body2" color="#484848" sx={{ textAlign: 'center', mt: 0.5, textDecoration: 'underline', cursor: 'pointer', '&:hover': { color: 'text.primary' }, fontWeight: 400 }}>
              Save my system for later
            </Typography>
          </>
        ) : (
          <Box sx={{ py: 6, textAlign: 'center', bgcolor: 'white', borderRadius: 2, border: '1px dashed #cbd5e1' }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Your bundle is empty.<br />Start by choosing some cameras!
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
