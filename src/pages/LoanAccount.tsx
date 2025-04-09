import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  InputAdornment,
  CardHeader,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PercentIcon from "@mui/icons-material/Percent";
import CloseIcon from "@mui/icons-material/Close";
import { loanAccountService } from "../services/loanAccounts";
import useUserStore from "../store/userStore";

// This would typically be imported from your types file
interface LoanAccount {
  id: string;
  credit_limit: number;
  current_balance: number;
  apr: number;
  user_id: string;
}

// Transition component for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Loan Account Card Component
const LoanAccountCard = ({ account }: { account: LoanAccount }) => {
  // Calculate available credit
  const availableCredit = account.credit_limit - account.current_balance;
  const utilizationRate = (account.current_balance / account.credit_limit) * 100;

  // Determine color based on utilization
  const getUtilizationColor = (rate) => {
    if (rate < 30) return "success";
    if (rate < 70) return "warning";
    return "error";
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <CreditCardIcon />
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Loan Account
          </Typography>
        }
        subheader={`ID: ${account.id}`}
      />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Current Balance
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  ${account.current_balance.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Credit Limit
                </Typography>
                <Typography variant="body1">${account.credit_limit.toLocaleString()}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountBalanceIcon sx={{ mr: 1, color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Available Credit
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              ${availableCredit.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PercentIcon sx={{ mr: 1, color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                APR
              </Typography>
            </Box>
            <Chip label={`${account.apr}%`} color="primary" size="small" sx={{ fontWeight: 500 }} />
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Credit Utilization: {utilizationRate.toFixed(1)}%
          </Typography>
          <Box sx={{ width: "100%", height: 8, bgcolor: "background.paper", borderRadius: 1, overflow: "hidden" }}>
            <Box
              sx={{
                width: `${utilizationRate}%`,
                height: "100%",
                bgcolor: `${getUtilizationColor(utilizationRate)}.main`,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Create Loan Account Dialog Component
const CreateLoanAccountDialog = ({ open, onClose, onSubmit }) => {
  const [creditLimit, setCreditLimit] = useState<number>(5000);
  const [apr, setApr] = useState<number>(8.5);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(creditLimit, apr);
    setLoading(false);
    onClose();
    // Reset form
    setCreditLimit(5000);
    setApr(8.5);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">Create New Loan Account</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Credit Limit"
              type="number"
              fullWidth
              value={creditLimit}
              onChange={(e) => setCreditLimit(Number(e.target.value))}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              helperText="Maximum amount you can borrow"
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Annual Percentage Rate (APR)"
              type="number"
              fullWidth
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              helperText="Interest rate applied to your loan"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main Loan Account Page Component
export default function LoanAccountPage() {
  const [loanAccounts, setLoanAccounts] = useState<LoanAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    const fetchLoanAccounts = async () => {
      try {
        setLoading(true);
        const response = await loanAccountService.getUserLoanAccounts(userId);
        localStorage.setItem("loanAccountId", response.loan_accounts[0]?.id.toString() || ""); 
        setLoanAccounts(response.loan_accounts);
      } catch (error) {
        console.error("Error fetching loan accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanAccounts();
  }, [userId]);

  const handleCreateLoanAccount = async (creditLimit: number, apr: number) => {
    try {
      const response = await loanAccountService.createLoanAccount({
        user_id: userId,
        credit_limit: creditLimit,
        apr: apr,
      });

      // Add the new account to the current list
      setLoanAccounts([...loanAccounts, response]);
      return response;
    } catch (error) {
      console.error("Error creating loan account:", error);
      throw error;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Loan Accounts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          New Loan Account
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : loanAccounts.length > 0 ? (
        <Grid container spacing={3}>
          {loanAccounts.map((account) => (
            <Grid item xs={12} md={6} lg={4} key={account.id}>
              <LoanAccountCard account={account} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
            No Loan Accounts Found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You don't have any loan accounts yet. Create your first one to get started.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Create Loan Account
          </Button>
        </Paper>
      )}

      <CreateLoanAccountDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateLoanAccount}
      />
    </Container>
  );
}
