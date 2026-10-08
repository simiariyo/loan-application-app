import { FirebaseError } from "firebase/app";

const authErrorMessages: Record<string, string> = {
  "auth/email-already-in-use":
    "An account with this email already exists. Sign in instead.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/weak-password": "Use a password of at least 6 characters.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/user-disabled":
    "This account has been disabled. Contact VendorCredit support.",
  "auth/too-many-requests":
    "Too many attempts. Wait a few minutes and try again.",
  "auth/network-request-failed":
    "We could not reach the server. Check your internet connection.",
};

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (error instanceof FirebaseError) {
    return authErrorMessages[error.code] ?? fallback;
  }
  return fallback;
}
