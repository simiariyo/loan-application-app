import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  type Timestamp,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import type {
  LoanApplication,
  NewLoanApplication,
} from "../types/loanApplication";
import { auth, firestore } from "./firebase";

// All loan data goes through this file so the .NET API can replace Firestore
// here without any change to the pages or hooks.
const loanApplicationsCollection = collection(firestore, "loanApplications");

export async function submitLoan(newLoan: NewLoanApplication) {
  const applicant = auth.currentUser;
  if (!applicant) {
    throw new FirebaseError("unauthenticated", "No signed-in applicant");
  }

  await addDoc(loanApplicationsCollection, {
    ...newLoan,
    userId: applicant.uid,
    applicantName: applicant.displayName ?? "",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function fetchLoanHistory(
  userId: string,
): Promise<LoanApplication[]> {
  const snapshot = await getDocs(
    query(loanApplicationsCollection, where("userId", "==", userId)),
  );

  const loanHistory = snapshot.docs.map((loanDoc) => {
    const createdAt = loanDoc.get("createdAt") as Timestamp | null;
    return {
      id: loanDoc.id,
      userId: loanDoc.get("userId"),
      applicantName: loanDoc.get("applicantName"),
      amount: loanDoc.get("amount"),
      purpose: loanDoc.get("purpose"),
      termMonths: loanDoc.get("termMonths"),
      status: loanDoc.get("status"),
      createdAt: createdAt ? createdAt.toDate() : null,
    };
  });

  // Sorted here instead of with orderBy, which would need a composite
  // Firestore index alongside the userId filter.
  return loanHistory.sort(
    (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
  );
}
