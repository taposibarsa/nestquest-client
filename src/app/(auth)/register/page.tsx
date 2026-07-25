"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { ApiError, getGoogleAuthUrl, register as registerRequest } from "@/lib/api";
import { registerSchema, type RegisterFormValues } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirect = searchParams.get("redirect") || "/";
      router.replace(redirect);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  async function onSubmit(values: RegisterFormValues) {
    setSubmitting(true);
    try {
      const profileImage = values.profileImage?.trim();
      const result = await registerRequest({
        name: values.name,
        email: values.email,
        password: values.password,
        ...(profileImage ? { profileImage } : {}),
      });
      await login(result.token, result.user);
      toast.success("Account created! Welcome to NestQuest");
      const redirect = searchParams.get("redirect") || "/";
      router.replace(redirect);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Could not create account. Please try again.";
      toast.error(
        err instanceof ApiError && err.status === 409
          ? "This email is already registered. Try signing in instead."
          : message
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 bg-off-white">
      <div
        className="relative hidden w-1/2 bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,43,74,0.55), rgba(26,43,74,0.55)), url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80)",
        }}
      >
        <div className="absolute inset-0 flex items-end p-12">
          <p className="max-w-md font-display text-3xl font-semibold text-white">
            Your perfect home is just a step away.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="font-display text-3xl font-bold text-navy">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-cool-gray">
            Join NestQuest to list and manage properties.
          </p>

          <button
            type="button"
            disabled={submitting}
            onClick={() => {
              window.location.href = getGoogleAuthUrl();
            }}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-cool-gray/30 bg-white px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-off-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-cool-gray/20" />
            <span className="text-xs uppercase tracking-wide text-cool-gray">
              or register with email
            </span>
            <div className="h-px flex-1 bg-cool-gray/20" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            aria-busy={submitting}
            noValidate
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Full Name
              </label>
              <input
                disabled={submitting}
                className="w-full rounded-lg border border-cool-gray/30 px-3 py-2 text-sm outline-none focus:border-amber disabled:cursor-not-allowed disabled:opacity-60"
                {...register("name")}
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Email Address
              </label>
              <input
                type="email"
                disabled={submitting}
                className="w-full rounded-lg border border-cool-gray/30 px-3 py-2 text-sm outline-none focus:border-amber disabled:cursor-not-allowed disabled:opacity-60"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={submitting}
                  className="w-full rounded-lg border border-cool-gray/30 px-3 py-2 pr-10 text-sm outline-none focus:border-amber disabled:cursor-not-allowed disabled:opacity-60"
                  {...register("password")}
                />
                <button
                  type="button"
                  disabled={submitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-cool-gray disabled:opacity-50"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Confirm Password
              </label>
              <input
                type="password"
                disabled={submitting}
                className="w-full rounded-lg border border-cool-gray/30 px-3 py-2 text-sm outline-none focus:border-amber disabled:cursor-not-allowed disabled:opacity-60"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">
                Profile Photo URL (optional)
              </label>
              <input
                disabled={submitting}
                className="w-full rounded-lg border border-cool-gray/30 px-3 py-2 text-sm outline-none focus:border-amber disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="https://"
                {...register("profileImage")}
              />
              {errors.profileImage ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.profileImage.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2.5 text-sm font-semibold text-navy hover:bg-amber/90 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <LoadingSpinner className="h-4 w-4 text-navy" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cool-gray">
            Already have an account?{" "}
            <Link
              href={
                searchParams.get("redirect")
                  ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect")!)}`
                  : "/login"
              }
              className="font-semibold text-navy underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center p-8">
          <p className="text-cool-gray">Loading…</p>
        </main>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.9 26.8 37 24 37c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l.0.0 6.2 5.2C39.2 36.9 44 32 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
