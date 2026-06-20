import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useCartTotals } from '../../hooks/useCartTotals';
import { images } from '../../utils/assets';
import CarIcon from "../../assets/car.svg"

export const ReviewPanelTotals: React.FC = () => {
  const { subtotal, total, discount } = useCartTotals();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Divider sx={{ display: { xs: 'block', lg: 'none' }, my: 3, borderColor: 'divider' }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={CarIcon} alt="truck" style={{ opacity: 0.6 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>Fast Shipping</Typography>
        </Box>
        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700 }}>FREE</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ width: { xs: 50, md: 85, lg: 120 }, height: { xs: 50, md: 85, lg: 120 } }}>
          <img src={images['Satisfaction Badge-05 1.png']} alt="100% Satisfaction" style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>30-day hassle-free returns</Typography>
          <Typography variant="body2" color="text.secondary">
            If you're not totally in love with the product, we will refund you 100%.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', mt: 3, gap: 1.5 }}>
        {discount > 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through', fontWeight: 500 }}>
            ${subtotal.toFixed(2)}
          </Typography>
        )}
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
          ${total.toFixed(2)}
        </Typography>
      </Box>

      {discount > 0 && (
        <Typography variant="body2" color="success.main" sx={{ fontWeight: 700, textAlign: 'center', my: 2.5 }}>
          Congrats! You're saving ${discount.toFixed(2)} on your security bundle!
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{
          py: 1.5,
          boxShadow: '0 4px 14px rgba(67, 56, 202, 0.4)',
          '&:hover': { boxShadow: '0 6px 20px rgba(67, 56, 202, 0.6)' },
        }}
      >
        Checkout
      </Button>

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2, textDecoration: 'underline', cursor: 'pointer', '&:hover': { color: 'text.primary' }, fontWeight: 400 }}>
        Save my system for later
      </Typography>
    </Box>
  );
};
