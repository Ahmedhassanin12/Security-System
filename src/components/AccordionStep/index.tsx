import React from 'react';
import { Box, Collapse, Typography, IconButton, } from '@mui/material';
import { ChevronDown, ChevronUp, CheckCircle2, Shield, PackagePlus } from 'lucide-react';
import CamIcon from "../../assets/livestream.svg"
import Step3 from "../../assets/step3.svg"

interface AccordionStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  selectedCount: number;
  children: React.ReactNode;
}

const getIcon = (step: number, isExpanded: boolean) => {
  const color = isExpanded ? '#4338ca' : '#757575';
  switch (step) {
    case 1: return <img src={CamIcon} />;
    case 2: return <Shield size={24} color={color} />;
    case 3: return <img src={Step3} />;;
    case 4: return <PackagePlus size={24} color={color} />;
    default: return <CheckCircle2 size={24} color={color} />;
  }
};

export const AccordionStep: React.FC<AccordionStepProps> = ({
  stepNumber,
  totalSteps,
  title,
  isExpanded,
  onToggle,
  selectedCount,
  children
}) => {
  return (
    <Box sx={{
      borderRadius: isExpanded ? 1.5 : 0, backgroundColor: isExpanded ? "#EDF4FF" : "transparent", borderBottom: '1px solid #1F1F1F', py: {
        xs: 0.5,
        md: 1.5,
        lg: 2
      }
    }}>
      <Typography sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 1, display: 'block', fontSize: '0.7rem', fontWeight: 400, color: "#484848", borderBottom: '1px solid #1F1F1F', pb: 0.5 }}>
        Step {stepNumber} of {totalSteps}
      </Typography>

      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          p: 1,
          borderRadius: 1,
          '&:hover': { opacity: 0.8, backgroundColor: "#f0f6ff" }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {getIcon(stepNumber, isExpanded)}
          <Typography variant="h6" sx={{
            fontWeight: 700, color: '#0B0D10', fontSize: {
              xs: 15,
              md: 20
            }
          }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex', alignItems: 'center', gap: {
            xs: 0.75,
            md: 1.25,
            lg: 2
          }
        }}>
          {selectedCount > 0 && (
            <Typography sx={{ color: 'primary.main', fontWeight: 400, bgcolor: 'primary.50', px: 1.5, py: 0.5, borderRadius: 4, fontSize: "14px" }}>
              {selectedCount} selected
            </Typography>
          )}
          <IconButton size="small" disableRipple>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={isExpanded}>
        <Box sx={{ pt: 3, pb: 2, px: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
