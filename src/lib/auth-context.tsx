"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { User } from "@/types";
import { mockUsers } from "@/data/mock";

const INACTIVITY_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Session-only: read from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("altivex_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem("altivex_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Reset inactivity timer on auth state change
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setUser(null);
      sessionStorage.removeItem("altivex_user");
    }, INACTIVITY_TIMEOUT_MS);
  }, []);

  // Track user activity when authenticated
  useEffect(() => {
    if (!user) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const handler = () => resetTimer();

    events.forEach((e) => document.addEventListener(e, handler));
    resetTimer();

    return () => {
      events.forEach((e) => document.removeEventListener(e, handler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user, resetTimer]);

  const login = async (email: string, password: string): Promise<boolean> => {
    const DEMO_CREDENTIALS = { email: "demo@mymail.com", password: "DEMO2026" };
    const found = mockUsers.find((u) => u.email === email);
    if (!found) return false;
    if (email === DEMO_CREDENTIALS.email && password !== DEMO_CREDENTIALS.password) return false;
    if (email !== DEMO_CREDENTIALS.email) return false;
    setUser(found);
    sessionStorage.setItem("altivex_user", JSON.stringify(found));
    resetTimer();
    return true;
  };

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("altivex_user");
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
