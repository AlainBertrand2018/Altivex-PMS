"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Try any of the mock user emails.");
    }
    setIsSubmitting(false);
  };

  if (isLoading || isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/images/golden_heavy_logo.webp"
            alt="Altivex Logo"
            className="w-[120px] h-[120px] object-contain mb-4"
          />
          <h1 className="text-2xl font-light tracking-[0.12em] text-foreground">ALTIVEX</h1>
          <p className="text-muted-foreground text-sm mt-1">Project Intelligence Operating System</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amara.okafor@altivex.com"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="any password works"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                required
              />
            </div>

            {error && (
              <div className="text-destructive text-sm text-center py-2 rounded-lg bg-destructive/10">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-muted-foreground/50 text-xs text-center">
              Demo: Use any mock user email (e.g., amara.okafor@altivex.com)
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-muted-foreground/40 text-xs tracking-wider">
          © 2025 Alain BERTRAND • All Rights Reserved. • Created for ALTIVEX Projects
        </p>
      </div>
    </div>
  );
}
