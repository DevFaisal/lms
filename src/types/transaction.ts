export interface Transaction {
  id: number;
  loan_account_id: number;
  type: 'interest' | 'fee' | 'repayment' | 'purchase';
  amount: number;
  date: string;
  description: string;
  is_late_fee: boolean;
  created_at: string;
  updated_at: string;
}

export interface Repayment {
  id: number;
  loan_account_id: number;
  amount: number;
  repayment_date: string;
  method: string;
  percentage_of_balance: number;
  interest_saved: number;
  created_at: string;
  updated_at: string;
}

export interface RewardAdjustment {
  id: number;
  user_id: number;
  old_apr: number;
  new_apr: number;
  adjusted_on: string;
  reason: string;
  created_at: string;
  updated_at: string;
}
