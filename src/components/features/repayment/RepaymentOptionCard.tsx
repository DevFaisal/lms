import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RepaymentOption } from "../../../types/loanAccount";
import { formatCurrency } from "../../../utils/formatters";

interface RepaymentOptionCardProps {
  option: RepaymentOption;
  isSelected: boolean;
  onSelect: () => void;
}

const StyledCard = styled(Card)<{ isselected: string }>(({ theme, isselected }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow:
    isselected === "true" ? `0px 0px 0px 2px ${theme.palette.primary.main}` : "0px 4px 12px rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      isselected === "true" ? `0px 0px 0px 2px ${theme.palette.primary.main}` : "0px 8px 16px rgba(0, 0, 0, 0.1)",
  },
}));

const PercentageText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.75rem",
  color: theme.palette.primary.main,
}));

const AmountText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "1.25rem",
}));

const InterestText = styled(Typography)<{ type: "save" | "pay" }>(({ theme, type }) => ({
  fontWeight: 500,
  color: type === "save" ? theme.palette.success.main : theme.palette.error.main,
}));

const RepaymentOptionCard: React.FC<RepaymentOptionCardProps> = ({ option, isSelected, onSelect }) => {
  return (
    <StyledCard isselected={isSelected.toString()} onClick={onSelect}>
      <CardContent>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <PercentageText>{option.percentage}%</PercentageText>
          <Typography variant="subtitle2" color="text.secondary">
            of balance
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Payment Amount
          </Typography>
          <AmountText>{formatCurrency(option.amount)}</AmountText>
        </Box>

        <Box sx={{ mb: 1 }}>
          <InterestText variant="body2" type="pay">
            Interest to pay: {formatCurrency(option.interest_to_pay)}
          </InterestText>
        </Box>

        <Box>
          <InterestText variant="body2" type="save">
            Interest saved: {formatCurrency(option.interest_saved)}
          </InterestText>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default RepaymentOptionCard;
