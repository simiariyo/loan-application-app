import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLoanHistory, submitLoan } from "../services/loanService";
import { useAuth } from "./useAuth";

export function useLoanHistory() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["loanApplications", user?.uid],
    queryFn: () => fetchLoanHistory(user?.uid ?? ""),
    enabled: Boolean(user),
  });
}

export function useSubmitLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitLoan,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["loanApplications"] }),
  });
}
