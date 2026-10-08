import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export async function signUpApplicant(
  fullName: string,
  email: string,
  password: string,
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: fullName.trim() });
}

export function signInApplicant(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutApplicant() {
  return signOut(auth);
}
