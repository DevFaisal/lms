import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { formatCurrency } from '../utils/formatters';

// This is a placeholder component since we don't have a specific AccountDetails page in the requirements
// It would typically show detailed information about a specific loan account

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(3),
}));

const AccountDetails: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  
  // Mock data for demonstration
  const accountData = {
    id: accountId || '1',
    opened_date: '2024-01-15',
    current_balance: 2500.00,
    credit_limit: 5000.00,
    apr: 22.5,
    is_active: true,
    payment_due_date: '2025-05-15',
    minimum_payment: 250.00,
    statement_balance: 2500.00,
    available_credit: 2500.00,
    last_statement_date: '2025-03-15',
    next_statement_date: '2025-04-15',
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Account Details
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Account #{accountData.id}
      </Typography>
      
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Balance
              </Typography>
              <Typography variant="h6">
                {formatCurrency(accountData.current_balance)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Available Credit
              </Typography>
              <Typography variant="h6">
                {formatCurrency(accountData.available_credit)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Credit Limit
              </Typography>
              <Typography variant="h6">
                {formatCurrency(accountData.credit_limit)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Current APR
              </Typography>
              <Typography variant="h6">
                {accountData.apr}%
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Payment Due Date
              </Typography>
              <Typography variant="h6">
                {new Date(accountData.payment_due_date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Minimum Payment
              </Typography>
              <Typography variant="h6">
                {formatCurrency(accountData.minimum_payment)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Statement Balance
              </Typography>
              <Typography variant="h6">
                {formatCurrency(accountData.statement_balance)}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" href="/repayment">
              Make a Payment
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
      
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Account Opened
              </Typography>
              <Typography variant="body1">
                {new Date(accountData.opened_date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Statement Date
              </Typography>
              <Typography variant="body1">
                {new Date(accountData.last_statement_date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Next Statement Date
              </Typography>
              <Typography variant="body1">
                {new Date(accountData.next_statement_date).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" fullWidth href="/transactions">
            View Transactions
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" fullWidth href="/cards">
            Manage Cards
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountDetails;
