import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatCurrency } from '../../../utils/formatters';

interface InterestSummaryProps {
  currentBalance: number;
  currentApr: number;
  dailyInterest: number;
  monthlyInterest: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
}));

const InterestValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.error.main,
}));

const InterestSummary: React.FC<InterestSummaryProps> = ({
  currentBalance,
  currentApr,
  dailyInterest,
  monthlyInterest,
}) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Interest Summary
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Current Balance
          </Typography>
          <Typography variant="h6">
            {formatCurrency(currentBalance)}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Current APR
          </Typography>
          <Typography variant="h6">
            {currentApr}%
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Daily Interest
            </Typography>
            <InterestValue variant="body1">
              {formatCurrency(dailyInterest)}
            </InterestValue>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Monthly Projection
            </Typography>
            <InterestValue variant="body1">
              {formatCurrency(monthlyInterest)}
            </InterestValue>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2">
            Interest is calculated daily on your remaining balance only. Making early repayments reduces the interest you pay.
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default InterestSummary;
