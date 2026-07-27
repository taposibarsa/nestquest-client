"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

/** Auth + admin role guard for /admin routes. */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      const redirect = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirect}`);
      return;
    }
    if (user?.role !== "admin") {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, pathname, router, user?.role]);

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-cool-gray">Checking authentication...</p>
      </main>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return children;
}
