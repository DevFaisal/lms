import api from "./api";
import { LoanAccount, RepaymentOption } from ".././types/loanAccount";

export const loanAccountService = {
  // Get all loan accounts
  getLoanAccounts: async (): Promise<LoanAccount[]> => {
    return api.get("/loan-accounts/");
  },

  // Get user loan accounts
  getUserLoanAccounts: async (userId: number): Promise<LoanAccount[]> => {
    return api.get(`/loan-accounts/users/${userId}`);
  },

  // Get loan account by ID
  getLoanAccount: async (loanAccountId: number): Promise<LoanAccount> => {
    return api.get(`/loan-accounts/${loanAccountId}`);
  },

  // Create a new loan account
  createLoanAccount: async (data: { user_id: number; credit_limit: number; apr?: number }): Promise<LoanAccount> => {
    return api.post("/loan-accounts/", data);
  },

  // Update loan account
  updateLoanAccount: async (
    loanAccountId: number,
    data: { credit_limit?: number; apr?: number }
  ): Promise<LoanAccount> => {
    return api.put(`/loan-accounts/${loanAccountId}`, data);
  },

  // Apply daily interest
  applyDailyInterest: async (loanAccountId: number): Promise<any> => {
    return api.post(`/loan-accounts/${loanAccountId}/apply-interest`);
  },

  // Apply late fee
  applyLateFee: async (loanAccountId: number): Promise<any> => {
    return api.post(`/loan-accounts/${loanAccountId}/apply-late-fee`);
  },

  // Get repayment options
  getRepaymentOptions: async (
    loanAccountId: number
  ): Promise<{ current_balance: number; current_apr: number; options: RepaymentOption[] }> => {
    return api.get(`/loan-accounts/${loanAccountId}/repayment-options`);
    // repayments / loan - accounts / 20 / repayment - options;
  },

  // Get repayment history
  getRepaymentHistory: async (loanAccountId: number): Promise<any[]> => {
    return api.get(`/loan-accounts/${loanAccountId}/repayments`);
  },

  // Get transactions
  getTransactions: async (loanAccountId: number): Promise<any[]> => {
    return api.get(`/loan-accounts/${loanAccountId}/transactions`);
  },

  // Get statement
  getStatement: async (loanAccountId: number): Promise<any> => {
    return api.get(`/loan-accounts/${loanAccountId}/statement`);
  },

  deleteLoanAccount: async (loanAccountId: number): Promise<void> => {
    return api.delete(`/loan-accounts/${loanAccountId}`);
  },
};
