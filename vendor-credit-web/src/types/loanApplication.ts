export const loanPurposes = [
  "Business",
  "Education",
  "Medical",
  "Personal",
  "Home improvement",
] as const;

export type LoanPurpose = (typeof loanPurposes)[number];

export type LoanStatus = "pending";

export type LoanApplication = {
  id: string;
  userId: string;
  applicantName: string;
  amount: number;
  purpose: LoanPurpose;
  termMonths: number;
  status: LoanStatus;
  createdAt: Date | null;
};

export type NewLoanApplication = Pick<
  LoanApplication,
  "amount" | "purpose" | "termMonths"
>;
