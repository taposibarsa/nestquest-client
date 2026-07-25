"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

/** Client-side guard for dashboard pages (complements cookie middleware). */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirect = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirect}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-cool-gray">Checking authentication...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
