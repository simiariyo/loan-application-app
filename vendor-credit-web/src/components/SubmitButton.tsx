type SubmitButtonProps = {
  isSubmitting: boolean;
  label: string;
  submittingLabel: string;
};

export function SubmitButton({
  isSubmitting,
  label,
  submittingLabel,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-brand transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? submittingLabel : label}
    </button>
  );
}
