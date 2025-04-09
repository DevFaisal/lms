import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AccountDetails from "./pages/AccountDetails";
import CardManagement from "./pages/CardManagement";
import RepaymentCenter from "./pages/RepaymentCenter";
import RewardsTracker from "./pages/RewardsTracker";
import TransactionHistory from "./pages/TransactionHistory";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoanAccountPage from "./pages/LoanAccount";
import ChooseUser from "./pages/ChooseUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/choose-user" replace />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/choose-user" element={<ChooseUser />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/account/:accountId"
          element={
            <MainLayout>
              <AccountDetails />
            </MainLayout>
          }
        />
        <Route
          path="/loan-account/:accountId"
          element={
            <MainLayout>
              <LoanAccountPage />
            </MainLayout>
          }
        />
        <Route
          path="/cards"
          element={
            <MainLayout>
              <CardManagement />
            </MainLayout>
          }
        />
        <Route
          path="/repayment"
          element={
            <MainLayout>
              <RepaymentCenter />
            </MainLayout>
          }
        />
        <Route
          path="/rewards"
          element={
            <MainLayout>
              <RewardsTracker />
            </MainLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <MainLayout>
              <TransactionHistory />
            </MainLayout>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/404" element={<ErrorPage code="404" message="Page not found" />} />
        <Route path="/500" element={<ErrorPage code="500" message="Server error" />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
