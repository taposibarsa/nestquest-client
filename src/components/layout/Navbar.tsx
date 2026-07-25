"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? "text-amber" : "text-white/90 hover:text-amber"
    }`;

  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  const loginBtnClass = isLogin
    ? "rounded-lg bg-amber px-3 py-1.5 text-sm font-semibold text-navy"
    : "rounded-lg border border-amber px-3 py-1.5 text-sm font-semibold text-amber hover:bg-amber/10";

  const registerBtnClass = isRegister
    ? "rounded-lg bg-amber px-3 py-1.5 text-sm font-semibold text-navy"
    : "rounded-lg border border-amber px-3 py-1.5 text-sm font-semibold text-amber hover:bg-amber/10";

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <Home className="h-5 w-5 text-amber" aria-hidden />
          NestQuest
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/properties" className={linkClass("/properties")}>
            Properties
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
          {!isLoading && isAuthenticated ? (
            <>
              <Link href="/items/add" className={linkClass("/items/add")}>
                Add Property
              </Link>
              <Link href="/items/manage" className={linkClass("/items/manage")}>
                My Listings
              </Link>
              <span className="max-w-[8rem] truncate text-sm text-white/80">
                {user?.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1 rounded-lg border border-white/30 px-3 py-1.5 text-sm font-semibold hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : !isLoading ? (
            <>
              <Link href="/login" className={loginBtnClass} aria-current={isLogin ? "page" : undefined}>
                Login
              </Link>
              <Link
                href="/register"
                className={registerBtnClass}
                aria-current={isRegister ? "page" : undefined}
              >
                Register
              </Link>
            </>
          ) : null}
        </nav>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 lg:hidden"
        >
          <Link href="/" onClick={() => setOpen(false)} className={linkClass("/")}>
            Home
          </Link>
          <Link
            href="/properties"
            onClick={() => setOpen(false)}
            className={linkClass("/properties")}
          >
            Properties
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className={linkClass("/about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={linkClass("/contact")}
          >
            Contact
          </Link>
          {!isLoading && isAuthenticated ? (
            <>
              <Link
                href="/items/add"
                onClick={() => setOpen(false)}
                className={linkClass("/items/add")}
              >
                Add Property
              </Link>
              <Link
                href="/items/manage"
                onClick={() => setOpen(false)}
                className={linkClass("/items/manage")}
              >
                My Listings
              </Link>
              <p className="text-sm text-white/80">{user?.name}</p>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-left text-sm font-semibold text-amber"
              >
                Logout
              </button>
            </>
          ) : !isLoading ? (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={`inline-flex w-fit ${loginBtnClass}`}
                aria-current={isLogin ? "page" : undefined}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={`inline-flex w-fit ${registerBtnClass}`}
                aria-current={isRegister ? "page" : undefined}
              >
                Register
              </Link>
            </>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
