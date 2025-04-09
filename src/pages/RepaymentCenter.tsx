import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { repaymentService } from "../services/repayments";
import RepaymentOptionCard from "../components/features/repayment/RepaymentOptionCard";
import CustomRepaymentInput from "../components/features/repayment/CustomRepaymentInput";
import RepaymentImpactChart from "../components/visualizations/RepaymentImpactChart";
import { RepaymentOption } from "../types/loanAccount";
import { formatCurrency } from "../utils/formatters";
import useUserStore from "../store/userStore";

const RepaymentCenter: React.FC = () => {
  const { loanAccountId } = useParams<{ loanAccountId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentApr, setCurrentApr] = useState(0);
  const [repaymentOptions, setRepaymentOptions] = useState<RepaymentOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<RepaymentOption | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);

  // Mock loan account ID for demonstration if not provided in URL
  // const loanAccountIdToUse = loanAccountId ? parseInt(loanAccountId) : 20;
  const loanAccountIdToUse = useUserStore((state) => state.LoanAccountId);

  useEffect(() => {
    const fetchRepaymentOptions = async () => {
      try {
        setLoading(true);

        // Fetch repayment options
        const response = await repaymentService.getRepaymentOptions(loanAccountIdToUse);
        setCurrentBalance(response.current_balance);
        setCurrentApr(response.current_apr);
        setRepaymentOptions(response.options);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching repayment options:", err);
        setError("Failed to load repayment options. Please try again later.");
        setLoading(false);
      }
    };

    fetchRepaymentOptions();
  }, [loanAccountIdToUse]);

  const handleOptionSelect = (option: RepaymentOption) => {
    setSelectedOption(option);
    setCustomAmount(""); // Clear custom amount when selecting a predefined option
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedOption(null); // Clear selected option when entering custom amount
  };

  const handleMakePayment = async () => {
    try {
      setProcessingPayment(true);

      const paymentAmount = selectedOption ? selectedOption.amount : customAmount ? parseFloat(customAmount) : 0;

      if (paymentAmount <= 0) {
        setError("Please select a repayment option or enter a valid amount.");
        setProcessingPayment(false);
        return;
      }

      // Make the repayment
      await repaymentService.makeRepayment({
        loan_account_id: loanAccountIdToUse,
        amount: paymentAmount,
      });

      // Navigate to dashboard or show success message
      alert(`Payment of ${formatCurrency(paymentAmount)} successful!`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error making payment:", err);
      setError("Failed to process payment. Please try again later.");
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Make a Payment
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Choose a repayment option or enter a custom amount
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card sx={{ mb: 3, p: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Current Balance: {formatCurrency(currentBalance)}
              </Typography>
              <Typography variant="subtitle1">APR: {currentApr}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Repayment Options
          </Typography>
          <Grid container spacing={2}>
            {repaymentOptions.map((option) => (
              <Grid item xs={12} sm={6} md={2.4} key={option.percentage}>
                <RepaymentOptionCard
                  option={option}
                  isSelected={selectedOption?.percentage === option.percentage}
                  onSelect={() => handleOptionSelect(option)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomRepaymentInput
            value={customAmount}
            onChange={handleCustomAmountChange}
            currentBalance={currentBalance}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={processingPayment || (!selectedOption && !customAmount)}
              onClick={handleMakePayment}
              sx={{ py: 2, mb: 2 }}
            >
              {processingPayment ? "Processing..." : "Make Payment"}
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              By making a payment, you're reducing your balance and the interest you'll pay. Regular payments can also
              help reduce your APR over time.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <RepaymentImpactChart
            selectedOption={selectedOption}
            customAmount={customAmount}
            currentBalance={currentBalance}
            currentApr={currentApr}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RepaymentCenter;
