import React from 'react';
import { Box, Button } from '@mui/material';
import { AccordionStep } from '../../components/AccordionStep';
import { ProductCard } from '../../components/ProductCard';
import productsData from '../../data/products.json';
import type { Product, Category } from '../../types';
import { useBundleStore } from '../../store/useBundleStore';

const products = productsData as Product[];

const steps = [
  { id: 1, title: 'Choose your cameras', category: 'cameras' as Category },
  { id: 2, title: 'Choose your plan', category: 'plan' as Category },
  { id: 3, title: 'Choose your sensors', category: 'sensors' as Category },
  { id: 4, title: 'Add extra protection', category: 'extras' as Category },
];

export const BundleBuilder: React.FC = () => {
  const { expandedStep, setExpandedStep, nextStep, getCategoryQuantity } = useBundleStore();

  return (
    <Box sx={{ p: { xs: 0, md: 2.5 }, bgcolor: 'white', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
      {steps.map((step) => {
        const categoryProducts = products.filter(p => p.category === step.category);
        const selectedCount = getCategoryQuantity(step.category);
        const isExpanded = expandedStep === step.id;

        return (
          <AccordionStep
            key={step.id}
            stepNumber={step.id}
            totalSteps={steps.length}
            title={step.title}
            isExpanded={isExpanded}
            onToggle={() => setExpandedStep(isExpanded ? 0 : step.id)}
            selectedCount={selectedCount}
          >
            <Box sx={{
              display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr ', lg: "1fr 1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr 1fr" }, gap: {
                xs: 1,
                md: 1.5,
                lg: 3
              }
            }}>
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  nextStep();
                }}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: '#4E2FD2',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50'
                  }
                }}
              >
                {step.id < steps.length ? `Next: ${steps[step.id].title}` : 'Review System'}
              </Button>
            </Box>
          </AccordionStep>
        );
      })}
    </Box>
  );
};
