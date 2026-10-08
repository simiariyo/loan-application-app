import type { ReactNode } from "react";

type FormAlertProps = {
  tone: "error" | "success";
  children: ReactNode;
};

const toneClasses = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function FormAlert({ tone, children }: FormAlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border px-4 py-3 text-sm ${toneClasses[tone]}`}
    >
      {children}
    </div>
  );
}
