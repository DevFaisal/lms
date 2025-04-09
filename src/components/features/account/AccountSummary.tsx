import React from "react";
import { formatCurrency } from "../../../utils/formatters";
import { Card, CardContent, Typography, Box, Chip, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

interface AccountSummaryProps {
  currentBalance: number;
  availableCredit: number;
  creditLimit: number;
  currentApr: number;
  nextPaymentDue?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
}));

const BalanceTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const AprChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const AccountSummary: React.FC<AccountSummaryProps> = ({
  currentBalance,
  availableCredit,
  creditLimit,
  currentApr,
  nextPaymentDue,
}) => {
  // Calculate credit utilization percentage
  const utilizationPercentage = (currentBalance / creditLimit) * 100;

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Account Summary
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Current Balance
          </Typography>
          <BalanceTypography>{formatCurrency(currentBalance)}</BalanceTypography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Available Credit
          </Typography>
          <Typography variant="h6">{formatCurrency(availableCredit)}</Typography>
          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={100 - utilizationPercentage}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
              {utilizationPercentage.toFixed(1)}% Used of {formatCurrency(creditLimit)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Current APR
          </Typography>
          <AprChip label={`${currentApr}%`} />
        </Box>

        {nextPaymentDue && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Next Payment Due
            </Typography>
            <Typography variant="body1">{nextPaymentDue}</Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default AccountSummary;
