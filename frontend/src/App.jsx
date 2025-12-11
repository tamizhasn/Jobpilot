import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Onboarding Pages
import OnboardingStart from "./pages/onboarding/OnboardingStep1";
import OnboardingCompanyInfo from "./pages/onboarding/OnboardingStep2";
import OnboardingMedia from "./pages/onboarding/OnboardingStep3";
import OnboardingComplete from "./pages/onboarding/OnboardingComplete";

// Dashboard Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Dashboard Pages
import DashboardHome from "./pages/DashboardHome";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyUpdate from "./pages/CompanyUpdate";
// Future: import Jobs, Analytics, Settings etc.

export default function App() {
  return (
    <Routes>

      {/* ---------- Public Routes ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------- Root Redirect ---------- */}
      <Route path="/" element={<Home />} />

      {/* ---------- Onboarding Routes (Protected but special) ---------- */}
      <Route
        path="/onboarding"
        element={<ProtectedRoute onboardingOnly={true} />}
      >
        <Route path="start" element={<OnboardingStart />} />
        <Route path="company-info" element={<OnboardingCompanyInfo />} />
        <Route path="media" element={<OnboardingMedia />} />
        <Route path="complete" element={<OnboardingComplete />} />
      </Route>

      {/* ---------- Dashboard Routes ---------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<DashboardHome />} />

        {/* Company Pages */}
        <Route path="company/profile" element={<CompanyProfile />} />
        <Route path="company/update" element={<CompanyUpdate />} />

        {/* More dashboard sections */}
        {/* <Route path="jobs" element={<Jobs />} /> */}
        {/* <Route path="analytics" element={<Analytics />} /> */}

      </Route>

    </Routes>
  );
}
