import api from "./api";

export const transactionService = {
  // Get transaction by ID
  getTransaction: async (transactionId: number): Promise<any> => {
    return api.get(`/transactions/${transactionId}`);
  },

  //Get loan account transactions
  getLoanAccountTransactions: async (loanAccountId: number): Promise<any[]> => {
    return api.get(`/transactions/loan-accounts/${loanAccountId}/transactions`);
  },

  //Create a new transaction
  createTransaction: async (data: {
    loan_account_id: number;
    type: string;
    amount: number;
    description: string;
    is_late_fee?: boolean;
  }): Promise<any> => {
    return api.post("/transactions/", data);
  },
};
