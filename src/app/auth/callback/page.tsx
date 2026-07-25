"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      router.replace("/login?error=oauth_failed");
      return;
    }

    let cancelled = false;

    async function complete() {
      try {
        await login(token!);
        if (cancelled) return;
        toast.success("Welcome to NestQuest!");
        router.replace("/");
      } catch {
        if (cancelled) return;
        // Login page shows the oauth_failed toast — avoid double toast here
        router.replace("/login?error=oauth_failed");
      }
    }

    void complete();
    return () => {
      cancelled = true;
    };
  }, [login, router, searchParams]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
      <LoadingSpinner className="h-6 w-6 text-amber" />
      <p className="text-cool-gray">Completing sign-in...</p>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
          <LoadingSpinner className="h-6 w-6 text-amber" />
          <p className="text-cool-gray">Completing sign-in...</p>
        </main>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
