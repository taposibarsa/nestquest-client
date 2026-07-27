"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { login as loginRequest, ApiError } from "@/lib/api";
import { loginSchema, type LoginFormValues } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirect = searchParams.get("redirect") || "/";
      router.replace(redirect);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  useEffect(() => {
    if (searchParams.get("error") === "oauth_failed") {
      toast.error(
        "Google sign-in failed. In Google Cloud Console, add redirect URI: http://localhost:5000/api/auth/google/callback"
      );
    }
  }, [searchParams]);

  async function onSubmit(values: LoginFormValues) {
    setSubmitting(true);
    try {
      const result = await loginRequest(values);
      await login(result.token, result.user);
      toast.success(`Welcome back, ${result.user.name}!`);
      const redirect = searchParams.get("redirect") || "/";
      router.replace(redirect);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Invalid email or password. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  function fillDemo() {
    setValue("email", "demo@nestquest.com");
    setValue("password", "demo1234");
  }

  return (
    <main className="flex flex-1 bg-off-white">
      <div
        className="relative hidden w-1/2 bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,43,74,0.55), rgba(26,43,74,0.55)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80)",
        }}
      >
        <div className="absolute inset-0 flex items-end p-12">
          <blockquote className="max-w-md font-display text-3xl font-semibold text-white">
            “Finding the right home should feel exciting — not exhausting.”
          </blockquote>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="font-display text-3xl font-bold text-navy">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-cool-gray">
            Sign in to manage your property listings.
          </p>

          <GoogleSignInButton disabled={submitting} />

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-cool-gray/20" />
            <span className="text-xs uppercase tracking-wide text-cool-gray">
              or
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
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
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

            <button
              type="button"
              onClick={fillDemo}
              disabled={submitting}
              className="text-sm font-medium text-navy underline disabled:opacity-50"
            >
              Use Demo Account
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2.5 text-sm font-semibold text-navy hover:bg-amber/90 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <LoadingSpinner className="h-4 w-4 text-navy" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cool-gray">
            Don&apos;t have an account?{" "}
            <Link
              href={
                searchParams.get("redirect")
                  ? `/register?redirect=${encodeURIComponent(searchParams.get("redirect")!)}`
                  : "/register"
              }
              className="font-semibold text-navy underline"
            >              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center p-8">
          <p className="text-cool-gray">Loading...</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
