import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Line } from "recharts";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../utils/formatters";

interface RepaymentImpactChartProps {
  selectedOption?: {
    percentage: number;
    amount: number;
    interest_to_pay: number;
    interest_saved: number;
  } | null;
  customAmount?: string;
  currentBalance: number;
  currentApr: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 300,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SummaryBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: theme.spacing(2),
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

const RepaymentImpactChart: React.FC<RepaymentImpactChartProps> = ({
  selectedOption,
  customAmount,
  currentBalance,
  currentApr,
}) => {
  // Calculate payment amount
  const paymentAmount = selectedOption ? selectedOption.amount : customAmount ? parseFloat(customAmount) : 0;

  // Calculate new balance
  const newBalance = Math.max(0, currentBalance - paymentAmount);

  // Calculate daily interest rate
  const dailyInterestRate = currentApr / 100 / 365;

  // Generate projection data for 30 days
  const generateProjectionData = () => {
    const data = [];

    // Current balance projection (no payment)
    let currentBalanceProjection = currentBalance;

    // New balance projection (after payment)
    let newBalanceProjection = newBalance;

    for (let day = 0; day <= 30; day++) {
      // Add daily interest
      if (day > 0) {
        currentBalanceProjection += currentBalanceProjection * dailyInterestRate;
        newBalanceProjection += newBalanceProjection * dailyInterestRate;
      }

      data.push({
        day,
        currentBalance: parseFloat(currentBalanceProjection.toFixed(2)),
        newBalance: parseFloat(newBalanceProjection.toFixed(2)),
      });
    }

    return data;
  };

  const projectionData = generateProjectionData();

  // Calculate interest saved over 30 days
  const interestSaved = projectionData[30].currentBalance - projectionData[30].newBalance - paymentAmount;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: "background.paper", p: 1.5, borderRadius: 1, boxShadow: 2 }}>
          <Typography variant="subtitle2">Day {label}</Typography>
          <Typography variant="body2" color="primary">
            Without Payment: {formatCurrency(payload[0].value)}
          </Typography>
          <Typography variant="body2" color="secondary">
            With Payment: {formatCurrency(payload[1].value)}
          </Typography>
          <Typography variant="body2" color="success.main">
            Difference: {formatCurrency(payload[0].value - payload[1].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          30-Day Balance Projection
        </Typography>

        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: "Days", position: "insideBottomRight", offset: -5 }} />
              <YAxis
                tickFormatter={(value) => `£${value}`}
                label={{ value: "Balance", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="currentBalance"
                name="Without Payment"
                stroke="#1A365D"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="newBalance" name="With Payment" stroke="#2C7A7B" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <Typography variant="subtitle2" gutterBottom>
          Payment Impact Summary
        </Typography>

        <SummaryBox>
          <SummaryItem>
            <Typography variant="body2" color="text.secondary">
              Payment Amount
            </Typography>
            <Typography variant="h6">{formatCurrency(paymentAmount)}</Typography>
          </SummaryItem>

          <SummaryItem>
            <Typography variant="body2" color="text.secondary">
              New Balance
            </Typography>
            <Typography variant="h6">{formatCurrency(newBalance)}</Typography>
          </SummaryItem>

          <SummaryItem>
            <Typography variant="body2" color="text.secondary">
              Interest Saved (30 days)
            </Typography>
            <Typography variant="h6" color="success.main">
              {formatCurrency(interestSaved)}
            </Typography>
          </SummaryItem>
        </SummaryBox>
      </CardContent>
    </StyledCard>
  );
};

export default RepaymentImpactChart;
