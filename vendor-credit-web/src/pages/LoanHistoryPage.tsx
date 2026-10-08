import { Link } from "react-router";
import { FormAlert } from "../components/FormAlert";
import { formatNaira } from "../formatNaira";
import { useLoanHistory } from "../hooks/useLoanApplications";
import { getLoanErrorMessage } from "../services/loanErrorMessage";

const appliedOnFormat = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatTerm(termMonths: number) {
  return termMonths === 1 ? "1 month" : `${termMonths} months`;
}

export function LoanHistoryPage() {
  const loanHistory = useLoanHistory();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-brand">
          Loan history
        </h1>
        <p className="text-slate-600">
          Every loan application you have submitted.
        </p>
      </header>

      {loanHistory.isPending && (
        <p role="status" className="text-slate-600">
          Loading your loan applications...
        </p>
      )}

      {loanHistory.isError && (
        <div className="space-y-3">
          <FormAlert tone="error">
            {getLoanErrorMessage(
              loanHistory.error,
              "We could not load your loan history. Please try again.",
            )}
          </FormAlert>
          <button
            type="button"
            onClick={() => void loanHistory.refetch()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand"
          >
            Try again
          </button>
        </div>
      )}

      {loanHistory.isSuccess && loanHistory.data.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-medium text-slate-800">
            You have not applied for a loan yet.
          </p>
          <Link
            to="/loans/apply"
            className="mt-3 inline-block font-medium text-brand underline"
          >
            Apply for a loan
          </Link>
        </div>
      )}

      {loanHistory.isSuccess && loanHistory.data.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-medium tracking-wide text-slate-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-3">Amount</th>
                <th scope="col" className="px-5 py-3">Purpose</th>
                <th scope="col" className="px-5 py-3">Term</th>
                <th scope="col" className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loanHistory.data.map((loanApplication) => (
                <tr key={loanApplication.id}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {formatNaira(loanApplication.amount)}
                    </p>
                    {loanApplication.createdAt && (
                      <p className="text-xs text-slate-500">
                        {appliedOnFormat.format(loanApplication.createdAt)}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">{loanApplication.purpose}</td>
                  <td className="px-5 py-4">
                    {formatTerm(loanApplication.termMonths)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
