"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { splashContent } from "@/config/splash";
import ThemeToggle from "./layout/theme-toggle";

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
      setError("Invalid credentials. Please check your email and password.");
    }
    setIsSubmitting(false);
  };

  if (isLoading || isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10" />
        <div
          className="w-full h-full animate-subtle-zoom bg-cover bg-center"
          style={{ backgroundImage: `url('${splashContent.background.imageUrl}')` }}
        />
        {splashContent.background.enableScanner && (
          <div className="absolute inset-0 z-20 overflow-hidden opacity-20 pointer-events-none">
            <div className="splash-scanner-line" />
          </div>
        )}
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-20 splash-grid-overlay" />

      <div className="absolute top-6 right-6 z-20 animate-fade-in">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/images/golden_heavy_logo.webp"
            alt="Altivex Logo"
            className="w-[120px] h-[120px] object-contain mb-4 drop-shadow-[0_0_40px_rgba(212,175,55,0.25)]"
          />
          <h1 className="text-2xl font-light tracking-[0.12em] text-foreground">ALTIVEX</h1>
          <p className="text-muted-foreground text-sm mt-1">Intelligent Project Management Platform</p>
        </div>

        <div className="glass-modal rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@mymail.com"
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
                placeholder="DEMO2026"
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
              Demo: demo@mymail.com / DEMO2026
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
