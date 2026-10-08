import { FirebaseError } from "firebase/app";

const loanErrorMessages: Record<string, string> = {
  "permission-denied":
    "You do not have access to these loan records. Sign out and sign in again.",
  unavailable:
    "We could not reach the server. Check your internet connection and try again.",
  unauthenticated: "Your session has ended. Sign in again to continue.",
};

export function getLoanErrorMessage(error: unknown, fallback: string) {
  if (error instanceof FirebaseError) {
    return loanErrorMessages[error.code] ?? fallback;
  }
  return fallback;
}
