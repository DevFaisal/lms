import { create } from "zustand";

type UserStoreState = {
  userId: number | null;
  LoanAccountId: number | null;
};

type UserStoreActions = {
  setUserId: (id: number | null) => void;
  setLoanAccountId: (id: number | null) => void;
};

const useUserStore = create<UserStoreState & UserStoreActions>((set) => ({
  userId: localStorage.getItem("user") ? parseInt(JSON.parse(localStorage.getItem("user") || "{}").id) : null,
  LoanAccountId: localStorage.getItem("loanAccountId") ? parseInt(localStorage.getItem("loanAccountId") || "") : null,
  setLoanAccountId: (id) => set({ LoanAccountId: id }),
  setUserId: (id) => set({ userId: id }),
}));

export default useUserStore;
