import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { AuthLayout } from "../components/AuthLayout";
import { FormAlert } from "../components/FormAlert";
import { PasswordField } from "../components/PasswordField";
import { SubmitButton } from "../components/SubmitButton";
import { TextField } from "../components/TextField";
import { getAuthErrorMessage } from "../services/authErrorMessage";
import { signInApplicant } from "../services/authService";

type SignInValues = {
  email: string;
  password: string;
};

export function SignInPage() {
  const [signInError, setSignInError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>();

  async function signIn({ email, password }: SignInValues) {
    setSignInError("");
    await signInApplicant(email, password).catch((error: unknown) => {
      setSignInError(
        getAuthErrorMessage(error, "We could not sign you in. Please try again."),
      );
    });
  }

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Enter your details to apply for a loan or view your history."
      footer={
        <>
          New to VendorCredit?{" "}
          <Link to="/sign-up" className="font-medium text-brand underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(signIn)} noValidate className="space-y-5">
        {signInError && <FormAlert tone="error">{signInError}</FormAlert>}

        <TextField
          id="email"
          type="email"
          label="Email address"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", { required: "Enter your email address." })}
        />

        <PasswordField
          id="password"
          label="Password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password", { required: "Enter your password." })}
        />

        <SubmitButton
          isSubmitting={isSubmitting}
          label="Sign in"
          submittingLabel="Signing in..."
        />
      </form>
    </AuthLayout>
  );
}
