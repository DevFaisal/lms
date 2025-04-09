import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Skeleton,
  Alert,
  Fade,
  Divider,
} from "@mui/material";
import AccountSummary from "../components/features/account/AccountSummary";
import QuickActions from "../components/features/account/QuickActions";
import RecentTransactions from "../components/features/transactions/RecentTransactions";
import RewardProgress from "../components/visualizations/RewardProgress";
import InterestSummary from "../components/features/account/InterestSummary";
import { loanAccountService } from "../services/loanAccounts";
import { userService } from "../services/users";
import { useNavigate } from "react-router-dom";
import { transactionService } from "../services/transactions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useUserStore from "../store/userStore";

// Mock user ID for demonstration

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userId = useUserStore((state) => state.userId);
  const setLoanAccountId = useUserStore((state) => state.setLoanAccountId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loanAccount, setLoanAccount] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        // @ts-ignore
        const user = await userService.getUser(userId);
        console.log("User Data:", user);
        setUserData(user);

        // Fetch loan accounts
        // @ts-ignore
        const accounts = await loanAccountService.getUserLoanAccounts(userId);
        console.log("Loan Account Data:", accounts);

        if (accounts) {
          // @ts-ignore
          setLoanAccount(accounts?.loan_accounts[0]); // Assuming the first account is the one we want
          // @ts-ignore
          setLoanAccountId(accounts?.loan_accounts[0]?.id); // Set the loan account ID in the store
          // @ts-ignore
          localStorage.setItem("loanAccountId", accounts?.loan_accounts[0]?.id.toString() || ""); // Store in local storage

          // Fetch transactions for this account
          try {
            // @ts-ignore
            const { transactions } = await transactionService.getLoanAccountTransactions(
              // @ts-ignore
              accounts?.loan_accounts[0]?.id
            );
            setTransactions(transactions || []);
          } catch (error) {
            console.error("Error fetching transactions:", error);
          }
        }

        setLastRefreshed(new Date());
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate daily interest
  const calculateDailyInterest = (balance: number, apr: number) => {
    return balance * (apr / 100 / 365);
  };

  // If we have loan account data, calculate some values
  const currentBalance = loanAccount?.current_balance || 0;
  const creditLimit = loanAccount?.credit_limit || 0;
  const availableCredit = creditLimit - currentBalance;
  const currentApr = userData?.apr || 25.0;
  const dailyInterest = calculateDailyInterest(currentBalance, currentApr);
  const monthlyInterest = dailyInterest * 30;

  // For reward progress
  const nextApr = Math.max(currentApr - 2.0, 10.0); // Minimum APR is 10%
  const goodRepayments = 1; // Mock value, would come from API
  const requiredRepayments = 3;
  const progressPercentage = (goodRepayments / requiredRepayments) * 100;

  const handleMakePayment = () => {
    navigate("/repayment");
  };

  const handleManageCards = () => {
    navigate("/cards");
  };

  const handleViewStatement = () => {
    navigate(`/account/${loanAccount?.id}/statement`);
  };

  const handleCheckRewards = () => {
    navigate("/rewards");
  };

  const handleViewAllTransactions = () => {
    navigate("/transactions");
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width="60%" height={60} />
          <Skeleton variant="text" width="40%" height={30} />
        </Box>

        <Grid container spacing={3}>
          {/* @ts-ignore */}
          <Grid item xs={12} md={8}>
            <Skeleton variant="rounded" height={200} sx={{ mb: 3 }} />
            <Skeleton variant="rounded" height={400} />
          </Grid>
          {/* @ts-ignore */}
          <Grid item xs={12} md={4}>
            <Skeleton variant="rounded" height={150} sx={{ mb: 3 }} />
            <Skeleton variant="rounded" height={200} sx={{ mb: 3 }} />
            <Skeleton variant="rounded" height={180} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="error"
          sx={{ my: 3 }}
          action={
            <Box
              component="button"
              onClick={() => window.location.reload()}
              className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-1 rounded"
            >
              Reload
            </Box>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Fade in={!loading} timeout={500}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box className="flex flex-col md:flex-row md:justify-between md:items-center" sx={{ mb: 4 }}>
          <div>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Welcome back, {userData?.name || "User"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Here's your financial overview
            </Typography>
          </div>

          <Box className="flex items-center mt-2 md:mt-0 text-gray-500 text-sm">
            <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>

        {isMobile && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Make a payment this week to reduce your interest costs!
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Main column */}
          {/* @ts-ignore */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* @ts-ignore */}
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <AccountSummary
                    currentBalance={currentBalance}
                    availableCredit={availableCredit}
                    creditLimit={creditLimit}
                    currentApr={currentApr}
                    nextPaymentDue="15 Apr 2025"
                  />
                </Paper>
              </Grid>
              {/* @ts-ignore */}
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <RecentTransactions transactions={transactions} onViewAllClick={handleViewAllTransactions} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Side column */}
          {/* @ts-ignore */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              {/* @ts-ignore */}
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #f5f7ff 0%, #e3e9fd 100%)",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <QuickActions
                    onMakePayment={handleMakePayment}
                    onManageCards={handleManageCards}
                    onViewStatement={handleViewStatement}
                    onCheckRewards={handleCheckRewards}
                  />
                </Paper>
              </Grid>
              {/* @ts-ignore */}
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #f0f9ff 0%, #e1f1fd 100%)",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <RewardProgress
                    currentApr={currentApr}
                    nextApr={nextApr}
                    progressPercentage={progressPercentage}
                    goodRepayments={goodRepayments}
                    requiredRepayments={requiredRepayments}
                  />
                </Paper>
              </Grid>
              {/* @ts-ignore */}
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #fff7f0 0%, #fff0e5 100%)",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <InterestSummary
                    currentBalance={currentBalance}
                    currentApr={currentApr}
                    dailyInterest={dailyInterest}
                    monthlyInterest={monthlyInterest}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box className="flex justify-between items-center" sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            © 2025 Finance App
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Account ID: {loanAccount?.id || "N/A"}
          </Typography>
        </Box>
      </Container>
    </Fade>
  );
};

export default Dashboard;
