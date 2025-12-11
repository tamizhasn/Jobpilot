import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ProtectedRoute({ children, onboardingOnly = false }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(null);

  if (!token) return <Navigate to="/login" replace />;

  useEffect(() => {
    const checkCompany = async () => {
      try {
        await API.get("/company/profile");
        setHasCompany(true);
      } catch {
        setHasCompany(false);
      }
      setLoading(false);
    };
    checkCompany();
  }, []);

  if (loading) return <p>Checking...</p>;

  // Onboarding logic
  if (!hasCompany && !location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/onboarding/start" replace />;
  }

  if (hasCompany && onboardingOnly) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}
