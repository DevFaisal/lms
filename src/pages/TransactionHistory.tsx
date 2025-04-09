import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { loanAccountService } from "../services/loanAccounts";
import { formatCurrency } from "../utils/formatters";
import { Transaction } from "../types/transaction";
import { transactionService } from "../services/transactions";

import useUserStore from "../store/userStore";

const TransactionHistory: React.FC = () => {
  // const { loanAccountId } = useParams<{ loanAccountId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loanAccount, setLoanAccount] = useState<any>(null);

  // Mock loan account ID for demonstration if not provided in URL
  // const loanAccountIdToUse = loanAccountId ? parseInt(loanAccountId) : 5; //TODO: Replace with actual loan account ID
  // const loanAccountIdToUse = useUserStore((state) => state.userId);
  const loanAccountIdToUse = useUserStore((state) => state.LoanAccountId);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Fetch loan account details
        //@ts-ignore
        const account = await loanAccountService.getLoanAccount(loanAccountIdToUse);
        console.log("Loan Account:", account);
        setLoanAccount(account);

        // Fetch transactions
        //@ts-ignore
        const { transactions } = await transactionService.getLoanAccountTransactions(loanAccountIdToUse);
        console.log("Transactions:", transactions);
        setTransactions(transactions || []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transaction history. Please try again later.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [loanAccountIdToUse]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "interest":
        return "Interest";
      case "fee":
        return "Fee";
      case "repayment":
        return "Payment";
      case "purchase":
        return "Purchase";
      default:
        return type;
    }
  };

  const getTransactionTypeColor = (type: string) => {
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Transaction History
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          View all transactions for your loan account
        </Typography>
      </Box>

      <Card sx={{ mb: 4, borderRadius: 3 }} className="flex justify-between items-center px-5">
        <CardContent>
          <Grid container spacing={2}>
            {/* @ts-ignore */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Account Number
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {loanAccount?.id}
              </Typography>
            </Grid>
            {/* @ts-ignore */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Balance
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatCurrency(loanAccount?.current_balance || 0)}
              </Typography>
            </Grid>
            {/* @ts-ignore */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Credit Limit
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatCurrency(loanAccount?.credit_limit || 0)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {/* <NewTransaction loanAccountId={loanAccountIdToUse} /> */}
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "background.default" }}>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={getTransactionTypeLabel(transaction.type)}
                      color={getTransactionTypeColor(transaction.type) as any}
                      size="small"
                    />
                    {transaction.is_late_fee && <Chip label="Late Fee" color="error" size="small" sx={{ ml: 1 }} />}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      fontWeight={500}
                      color={transaction.type === "repayment" ? "success.main" : "text.primary"}
                    >
                      {transaction.type === "repayment" ? "-" : "+"}
                      {formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TransactionHistory;

// function NewTransaction({ loanAccountId }: { loanAccountId: number }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [transactionData, setTransactionData] = useState({
//     type: "",
//     amount: "",
//     description: "",
//     is_late_fee: false,
//     loan_account_id: loanAccountId,
//   });

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setTransactionData({
//       ...transactionData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const validateForm = () => {
//     if (!transactionData.type.trim()) {
//       setError("Transaction type is required");
//       return false;
//     }
//     if (
//       !transactionData.amount ||
//       isNaN(parseFloat(transactionData.amount)) ||
//       parseFloat(transactionData.amount) <= 0
//     ) {
//       setError("Please enter a valid amount");
//       return false;
//     }
//     return true;
//   };

//   const handleTransaction = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!validateForm()) return;

//     try {
//       setIsSubmitting(true);
//       // Call the API to create a new transaction
//       await transactionService.createTransaction({
//         ...transactionData,
//         amount: parseFloat(transactionData.amount),
//       });
//       console.log("Transaction created successfully");

//       // Reset form and close modal
//       setTransactionData({
//         type: "",
//         amount: "",
//         description: "",
//         is_late_fee: false,
//         loan_account_id: loanAccountId,
//       });
//       handleClose();
//     } catch (error) {
//       console.error("Error creating transaction:", error);
//       setError("Failed to create transaction. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleOpen}
//         className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mb-4 transition-colors"
//       >
//         Initiate Transaction
//       </button>

//       <Model isOpen={isOpen} onClose={handleClose}>
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-4">New Transaction</h2>

//           {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

//           <form onSubmit={handleTransaction} className="flex flex-col">
//             <div className="mb-4">
//               <label htmlFor="type" className="block text-gray-700 mb-1">
//                 Transaction Type
//               </label>
//               <input
//                 id="type"
//                 name="type"
//                 value={transactionData.type}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter transaction type"
//                 className="w-full border p-2 rounded"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="amount" className="block text-gray-700 mb-1">
//                 Amount
//               </label>
//               <input
//                 id="amount"
//                 name="amount"
//                 value={transactionData.amount}
//                 onChange={handleChange}
//                 type="number"
//                 step="0.01"
//                 placeholder="0.00"
//                 className="w-full border p-2 rounded"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 mb-1">
//                 Description
//               </label>
//               <input
//                 id="description"
//                 name="description"
//                 value={transactionData.description}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter description"
//                 className="w-full border p-2 rounded"
//               />
//             </div>

//             <div className="mb-4 flex items-center">
//               <input
//                 id="is_late_fee"
//                 name="is_late_fee"
//                 checked={transactionData.is_late_fee}
//                 onChange={handleChange}
//                 type="checkbox"
//                 className="mr-2"
//               />
//               <label htmlFor="is_late_fee" className="text-gray-700">
//                 Is Late Fee
//               </label>
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 type="button"
//                 onClick={handleClose}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors disabled:bg-blue-300"
//               >
//                 {isSubmitting ? "Processing..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </Model>
//     </div>
//   );
// }
