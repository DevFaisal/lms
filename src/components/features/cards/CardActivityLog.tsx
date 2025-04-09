import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatCurrency } from "../../../utils/formatters";
import { Transaction } from "../../../types/transaction";

interface CardActivityLogProps {
  userId: number;
  transactions?: Transaction[];
  maxItems?: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
}));

const ActivityItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const CardActivityLog: React.FC<CardActivityLogProps> = ({ transactions = [], maxItems = 5 }) => {
  const displayTransactions = transactions.slice(0, maxItems);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Card Activity
        </Typography>

        {displayTransactions.length > 0 ? (
          displayTransactions.map((transaction) => (
            <ActivityItem key={transaction.id}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight={500}>
                  {transaction.description}
                </Typography>
                <Typography variant="body2">{formatCurrency(transaction.amount)}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {formatDate(transaction.date)}
              </Typography>
            </ActivityItem>
          ))
        ) : (
          <Box sx={{ py: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No recent card activity
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CardActivityLog;
