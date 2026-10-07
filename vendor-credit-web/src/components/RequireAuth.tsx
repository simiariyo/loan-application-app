import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function RequireAuth() {
  const { user, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <p className="p-8 text-gray-600">Checking your session...</p>;
  }
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
}
