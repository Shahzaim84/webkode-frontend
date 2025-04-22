import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import OTPVerification from "./pages/Auth/OtpVerification";
import ChangePassword from "./pages/Auth/ChangePassword";
import Home from "./pages/Default/Home";
import Pricing from "./pages/Subscription/Pricing";
import DeveloperDashboard from "./pages/Developer/Dashboard/DeveloperDashboard";
import DeveloperBalance from "./pages/Developer/Dashboard/DeveloperBalance";
import DeveloperTransfer from "./pages/Developer/Dashboard/DeveloperTransfer";
import DeveloperTransaction from "./pages/Developer/Dashboard/DeveloperTransactions";
import DeveloperInvoice from "./pages/Developer/Dashboard/DeveloperInvoice";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import DeveloperProtectorWrapper from "./Wrapper/DeveloperProtectorWrapper";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otpverification" element={<OTPVerification />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route
            path="/pricing"
            element={
              <DeveloperProtectorWrapper>
                <Pricing />
              </DeveloperProtectorWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <DeveloperProtectorWrapper>
                <DeveloperDashboard />
              </DeveloperProtectorWrapper>
            }
          />
          <Route
            path="/dashboard/balance"
            element={
              <DeveloperProtectorWrapper>
                <DeveloperBalance />
              </DeveloperProtectorWrapper>
            }
          />
          <Route
            path="/dashboard/transfer"
            element={
              <DeveloperProtectorWrapper>
                <DeveloperTransfer />
              </DeveloperProtectorWrapper>
            }
          />
          <Route
            path="/dashboard/transactions"
            element={
              <DeveloperProtectorWrapper>
                <DeveloperTransaction />
              </DeveloperProtectorWrapper>
            }
          />
          <Route
            path="/dashboard/invoice"
            element={
              <DeveloperProtectorWrapper>
                <DeveloperInvoice />
              </DeveloperProtectorWrapper>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
                <AdminDashboard />
            }
          />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Toaster/>
    </div>
  );
}

export default App;
