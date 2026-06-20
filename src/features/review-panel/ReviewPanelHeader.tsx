import React from 'react';
import { Box, Typography } from '@mui/material';

export const ReviewPanelHeader: React.FC = () => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
      Your security system
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Review your personalized protection system designed to keep what matters most safe.
    </Typography>
  </Box>
);
