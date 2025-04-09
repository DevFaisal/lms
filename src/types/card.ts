export interface Card {
  id: number;
  user_id: number;
  loan_account_id: number;
  type: 'virtual' | 'physical';
  status: 'active' | 'locked';
  masked_pan: string;
  issued_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}
