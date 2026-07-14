"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./layout/theme-toggle";

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [phase, setPhase] = useState<"splash" | "entering">("splash");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("entering");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-grid">
        <div className="animate-pulse-glow text-primary text-2xl font-light tracking-widest">
          ALTIVEX
        </div>
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background bg-grid">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className={`transition-all duration-1000 ease-out ${phase === "entering" ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <img
            src="/images/golden_heavy_logo.webp"
            alt="Altivex Logo"
            className="w-[220px] h-[220px] object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.15)]"
          />
        </div>

        <div className={`transition-all duration-700 delay-300 ${phase === "entering" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em] text-foreground text-center">
            Project Intelligence Operating System
          </h1>
        </div>

        <div className={`transition-all duration-700 delay-500 ${phase === "entering" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-muted-foreground text-sm md:text-base tracking-wider text-center">
            From Meeting Minutes to Concrete Outcomes
          </p>
        </div>

        <div className={`mt-6 transition-all duration-700 delay-700 ${phase === "entering" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <button
            onClick={() => router.push("/auth")}
            className="px-10 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-all glow-primary text-sm"
          >
            Sign In
          </button>
        </div>
      </div>

      <div className={`absolute top-6 right-6 z-20 transition-all duration-700 delay-1000 ${phase === "entering" ? "opacity-100" : "opacity-0"}`}>
        <ThemeToggle />
      </div>

      <div className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-700 delay-1000 ${phase === "entering" ? "opacity-100" : "opacity-0"}`}>
        <p className="text-muted-foreground/40 text-xs tracking-wider">
          © 2025 Alain BERTRAND • All Rights Reserved. • Created for ALTIVEX Projects
        </p>
      </div>
    </div>
  );
}
