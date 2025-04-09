export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  kyc_status: string;
  account_status: string;
  apr: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  kyc_status?: string;
  account_status?: string;
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  kyc_status?: string;
  account_status?: string;
}
