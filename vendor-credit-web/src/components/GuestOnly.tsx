import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function GuestOnly() {
  const { user, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <p className="p-8 text-gray-600">Checking your session...</p>;
  }
  if (user) {
    return <Navigate to="/loans/apply" replace />;
  }
  return <Outlet />;
}
