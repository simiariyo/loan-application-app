import { createContext, useContext } from "react";
import type { User } from "firebase/auth";

type AuthState = {
  user: User | null;
  isCheckingAuth: boolean;
};

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const authState = useContext(AuthContext);
  if (!authState) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return authState;
}
