"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { User } from "@/types";
import { supabase } from "@/lib/supabase";

const INACTIVITY_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapDbUser(row: Record<string, unknown>): User {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    avatar: (row.avatar as string) ?? undefined,
    role: row.role as User["role"],
    department: (row.department as string) ?? undefined,
    phone: (row.phone as string) ?? undefined,
    authId: (row.auth_id as string) ?? undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restore session on mount
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", session.user.id)
          .single();
        if (data) setUser(mapDbUser(data));
      }
      setIsLoading(false);
    })();
  }, []);

  // Reset inactivity timer on auth state change
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setUser(null);
      sessionStorage.removeItem("altivex_user");
      supabase.auth.signOut();
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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return false;

    const { data: dbUser } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", data.user.id)
      .single();

    if (!dbUser) return false;

    setUser(mapDbUser(dbUser));
    resetTimer();
    return true;
  };

  const logout = useCallback(async () => {
    setUser(null);
    sessionStorage.removeItem("altivex_user");
    if (timerRef.current) clearTimeout(timerRef.current);
    await supabase.auth.signOut();
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
