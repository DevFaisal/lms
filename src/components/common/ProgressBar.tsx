import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatCurrency } from '../../utils/formatters';

interface ProgressBarProps {
  progress: number;
  label?: string;
  height?: number;
  color?: string;
}

const ProgressBarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const ProgressFill = styled(Box)<{ width: number, color?: string }>(({ theme, width, color }) => ({
  height: '100%',
  width: `${width}%`,
  backgroundColor: color || theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  transition: 'width 0.5s ease-in-out',
}));

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  height = 10,
  color,
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <Box>
      <ProgressBarContainer sx={{ height }}>
        <ProgressFill width={clampedProgress} color={color} />
      </ProgressBarContainer>
      {label && (
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}>
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default ProgressBar;
