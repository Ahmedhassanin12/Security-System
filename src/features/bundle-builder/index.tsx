import React from 'react';
import { Box, Button } from '@mui/material';
import { AccordionStep } from '../../components/AccordionStep';
import { ProductCard } from '../../components/ProductCard';
import { useBundleStore } from '../../store/useBundleStore';
import { useProducts } from '../../hooks/useProducts';
import { useCategoryCount } from '../../hooks/useCategoryCount';
import { ProductCategory } from '../../types';

interface StepConfig {
  id: number;
  title: string;
  category: ProductCategory;
}

const steps: StepConfig[] = [
  { id: 1, title: 'Choose your cameras', category: ProductCategory.CAMERAS },
  { id: 2, title: 'Choose your plan', category: ProductCategory.PLAN },
  { id: 3, title: 'Choose your sensors', category: ProductCategory.SENSORS },
  { id: 4, title: 'Add extra protection', category: ProductCategory.EXTRAS },
];


const StepWrapper: React.FC<{ step: StepConfig; totalSteps: number }> = ({ step, totalSteps }) => {
  const { expandedStep, setExpandedStep, nextStep } = useBundleStore();
  const { getProductsByCategory } = useProducts();
  const selectedCount = useCategoryCount(step.category);

  const categoryProducts = getProductsByCategory(step.category);
  const isExpanded = expandedStep === step.id;

  return (
    <AccordionStep
      stepNumber={step.id}
      totalSteps={totalSteps}
      title={step.title}
      isExpanded={isExpanded}
      onToggle={() => setExpandedStep(isExpanded ? 0 : step.id)}
      selectedCount={selectedCount}
    >
      <Box sx={{
        display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr ', lg: "1fr 1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr 1fr" }, gap: {
          xs: 1, md: 2, lg: 3
        }
      }}>
        {categoryProducts.map((product) => (
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
            px: 4,
            py: 1,
            borderColor: 'divider',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.50'
            }
          }}
        >
          {step.id < totalSteps ? `Next: ${steps[step.id].title}` : 'Review System'}
        </Button>
      </Box>
    </AccordionStep>
  );
};

export const BundleBuilder: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 0, sm: 1, lg: 4 }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
      {steps.map((step) => (
        <StepWrapper key={step.id} step={step} totalSteps={steps.length} />
      ))}
    </Box>
  );
};
