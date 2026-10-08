import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { FormAlert } from "../components/FormAlert";
import { SubmitButton } from "../components/SubmitButton";
import { TextField } from "../components/TextField";
import { formatNairaDigits } from "../formatNaira";
import { useSubmitLoan } from "../hooks/useLoanApplications";
import { getLoanErrorMessage } from "../services/loanErrorMessage";
import { loanPurposes, type LoanPurpose } from "../types/loanApplication";

type TermUnit = "months" | "years";

type LoanApplicationValues = {
  amount: number | null;
  purpose: LoanPurpose | "";
  termLength: string;
  termUnit: TermUnit;
};

const emptyLoanApplication: LoanApplicationValues = {
  amount: null,
  purpose: "",
  termLength: "",
  termUnit: "months",
};

export function LoanApplicationPage() {
  const submitLoanMutation = useSubmitLoan();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanApplicationValues>({ defaultValues: emptyLoanApplication });

  function applyForLoan({
    amount,
    purpose,
    termLength,
    termUnit,
  }: LoanApplicationValues) {
    const termCount = Number(termLength);
    const termMonths = termUnit === "years" ? termCount * 12 : termCount;

    submitLoanMutation.mutate(
      { amount: amount ?? 0, purpose: purpose as LoanPurpose, termMonths },
      { onSuccess: () => reset(emptyLoanApplication) },
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-brand">
          Apply for a loan
        </h1>
        <p className="text-slate-600">
          Tell us how much you need, what it is for and how long you need to
          repay it.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(applyForLoan)}
        noValidate
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        {submitLoanMutation.isSuccess && (
          <FormAlert tone="success">
            Your application has been submitted.{" "}
            <Link to="/loans" className="font-medium underline">
              View your loan history
            </Link>
          </FormAlert>
        )}
        {submitLoanMutation.isError && (
          <FormAlert tone="error">
            {getLoanErrorMessage(
              submitLoanMutation.error,
              "We could not submit your application. Please try again.",
            )}
          </FormAlert>
        )}

        <Controller
          name="amount"
          control={control}
          rules={{
            validate: (amount) =>
              (amount !== null && amount > 0) ||
              "Enter an amount greater than zero.",
          }}
          render={({ field, fieldState }) => (
            <TextField
              id="amount"
              label="Loan amount"
              inputMode="numeric"
              placeholder="500,000"
              leading="₦"
              error={fieldState.error?.message}
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value === null ? "" : formatNairaDigits(field.value)}
              onChange={(event) => {
                // The field shows commas, but the form keeps a plain number.
                const digits = event.target.value.replace(/\D/g, "");
                field.onChange(digits ? Number(digits) : null);
              }}
            />
          )}
        />

        <div className="space-y-1.5">
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-slate-800"
          >
            Loan purpose
          </label>
          <select
            id="purpose"
            aria-invalid={errors.purpose ? true : undefined}
            aria-describedby={errors.purpose ? "purpose-error" : undefined}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none aria-invalid:border-red-600"
            {...register("purpose", { required: "Choose a loan purpose." })}
          >
            <option value="" disabled>
              Select a purpose
            </option>
            {loanPurposes.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
          {errors.purpose && (
            <p id="purpose-error" className="text-sm text-red-700">
              {errors.purpose.message}
            </p>
          )}
        </div>

        <fieldset className="space-y-1.5">
          <legend className="text-sm font-medium text-slate-800">
            Loan term
          </legend>
          <div className="flex gap-3">
            <div className="flex-1">
              <TextField
                id="termLength"
                label="Term length"
                inputMode="numeric"
                placeholder="12"
                error={errors.termLength?.message}
                {...register("termLength", {
                  required: "Enter the loan term.",
                  validate: (termLength) =>
                    /^[1-9]\d*$/.test(termLength) ||
                    "Enter a whole number greater than zero.",
                })}
              />
            </div>
            <div className="pt-7">
              <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1">
                {(["months", "years"] as const).map((termUnit) => (
                  <label
                    key={termUnit}
                    className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 has-checked:bg-brand has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-brand"
                  >
                    <input
                      type="radio"
                      value={termUnit}
                      className="sr-only"
                      {...register("termUnit")}
                    />
                    {termUnit === "months" ? "Months" : "Years"}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        <SubmitButton
          isSubmitting={submitLoanMutation.isPending}
          label="Submit application"
          submittingLabel="Submitting application..."
        />
      </form>
    </div>
  );
}
