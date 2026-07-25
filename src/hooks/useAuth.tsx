"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types";
import { getMe, UnauthorizedError } from "@/lib/api";

const TOKEN_KEY = "nestquest_token";
const AUTH_COOKIE = "nestquest_auth";
const COOKIE_MAX_AGE = 604800;

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user?: AuthUser) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function setAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    clearAuthCookie();
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (nextToken: string, nextUser?: AuthUser) => {
      localStorage.setItem(TOKEN_KEY, nextToken);
      setAuthCookie();
      setToken(nextToken);

      if (nextUser) {
        setUser(nextUser);
        return;
      }

      const me = await getMe(nextToken);
      setUser(me);
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (!stored) {
        if (!cancelled) setIsLoading(false);
        return;
      }

      try {
        const me = await getMe(stored);
        if (cancelled) return;
        setToken(stored);
        setUser(me);
        setAuthCookie();
      } catch (err) {
        if (cancelled) return;
        if (err instanceof UnauthorizedError) {
          localStorage.removeItem(TOKEN_KEY);
          clearAuthCookie();
          setToken(null);
          setUser(null);
        } else {
          // Network/server blip: keep token so a refresh can recover
          setToken(stored);
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
