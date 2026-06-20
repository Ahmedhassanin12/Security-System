import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: 'background.paper' }}>
      <IconButton size="small" onClick={onDecrease} disabled={quantity === 0}>
        {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
      </IconButton>
      <Typography variant="body2" sx={{ width: 30, textAlign: 'center', fontWeight: 'bold' }}>
        {quantity}
      </Typography>
      <IconButton size="small" onClick={onIncrease}>
        <Plus size={16} color="#1976d2" />
      </IconButton>
    </Box>
  );
};
