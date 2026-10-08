import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { AuthLayout } from "../components/AuthLayout";
import { FormAlert } from "../components/FormAlert";
import { PasswordField } from "../components/PasswordField";
import { SubmitButton } from "../components/SubmitButton";
import { TextField } from "../components/TextField";
import { getAuthErrorMessage } from "../services/authErrorMessage";
import { signUpApplicant } from "../services/authService";

type SignUpValues = {
  fullName: string;
  email: string;
  password: string;
};

export function SignUpPage() {
  const [signUpError, setSignUpError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>();

  async function createAccount({ fullName, email, password }: SignUpValues) {
    setSignUpError("");
    try {
      await signUpApplicant(fullName, email, password);
    } catch (error) {
      setSignUpError(
        getAuthErrorMessage(
          error,
          "We could not create your account. Please try again.",
        ),
      );
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to apply for a business loan."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/sign-in" className="font-medium text-brand underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(createAccount)}
        noValidate
        className="space-y-5"
      >
        {signUpError && <FormAlert tone="error">{signUpError}</FormAlert>}

        <TextField
          id="fullName"
          label="Full name"
          autoComplete="name"
          placeholder="e.g. Chinedu Okafor"
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "Enter your full name.",
            validate: (fullName) =>
              fullName.trim().length >= 2 ||
              "Full name must be at least 2 characters.",
          })}
        />

        <TextField
          id="email"
          type="email"
          label="Email address"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Enter your email address.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address.",
            },
          })}
        />

        <PasswordField
          id="password"
          label="Password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password", {
            required: "Create a password.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
          })}
        />

        <SubmitButton
          isSubmitting={isSubmitting}
          label="Create account"
          submittingLabel="Creating account..."
        />
      </form>
    </AuthLayout>
  );
}
