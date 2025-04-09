export interface LoanAccount {
  id: number;
  user_id: number;
  opened_date: string;
  current_balance: number;
  credit_limit: number;
  apr: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RepaymentOption {
  percentage: number;
  amount: number;
  interest_to_pay: number;
  interest_saved: number;
}
