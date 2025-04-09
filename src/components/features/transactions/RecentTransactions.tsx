import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

// Sample transaction data for demonstration
const sampleTransactions = [
  { id: 1, description: "Monthly Interest", date: "2025-04-01", amount: 12.5, type: "interest" },
  { id: 2, description: "Late Payment Fee", date: "2025-03-28", amount: 25.0, type: "fee" },
  { id: 3, description: "Card Payment", date: "2025-03-25", amount: 350.0, type: "repayment" },
  { id: 4, description: "Amazon Purchase", date: "2025-03-20", amount: 79.99, type: "purchase" },
  { id: 5, description: "Netflix Subscription", date: "2025-03-15", amount: 15.99, type: "purchase" },
];

// Icons for transaction types
const TransactionIcon = ({ type }) => {
  const iconMap = {
    interest: <span className="material-icons text-blue-600">monetization_on</span>,
    fee: <span className="material-icons text-red-600">money_off</span>,
    repayment: <span className="material-icons text-green-600">payments</span>,
    purchase: <span className="material-icons text-amber-600">shopping_cart</span>,
  };

  return (
    <Avatar sx={{ width: 40, height: 40, bgcolor: "background.paper" }}>
      {iconMap[type] || <span className="material-icons">receipt_long</span>}
    </Avatar>
  );
};

// Get color based on transaction type
const getChipColor = (type) => {
  switch (type) {
    case "interest":
      return "info";
    case "fee":
      return "error";
    case "repayment":
      return "success";
    case "purchase":
      return "warning";
    default:
      return "default";
  }
};

// Get label for transaction type
const getTransactionTypeLabel = (type) => {
  const labels = {
    interest: "Interest",
    fee: "Fee",
    repayment: "Payment",
    purchase: "Purchase",
  };
  return labels[type] || type;
};

export default function RecentTransactions({
  transactions = sampleTransactions,
  maxItems = 5,
  onViewAllClick = () => console.log("View all clicked"),
}) {
  const displayTransactions = transactions.slice(0, maxItems);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 3, py: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Recent Transactions
          </Typography>
          <Button color="primary" onClick={onViewAllClick} sx={{ textTransform: "none", fontWeight: 500 }}>
            View All
          </Button>
        </Box>

        {displayTransactions.length > 0 ? (
          <Box>
            {displayTransactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    transition: "background-color 0.3s",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                  }}
                >
                  <TransactionIcon type={transaction.type} />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
                      {transaction.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(transaction.date)}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: transaction.type === "repayment" ? "success.main" : "text.primary",
                        mb: 0.5,
                      }}
                    >
                      {transaction.type === "repayment" ? "-" : "+"}
                      {formatCurrency(transaction.amount)}
                    </Typography>
                    <Chip
                      label={getTransactionTypeLabel(transaction.type)}
                      color={getChipColor(transaction.type)}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </Box>
                {index < displayTransactions.length - 1 && <Divider sx={{ mx: 3 }} />}
              </React.Fragment>
            ))}
          </Box>
        ) : (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              No recent transactions
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
