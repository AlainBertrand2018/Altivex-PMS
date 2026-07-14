"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="animate-pulse-glow text-primary text-2xl font-light tracking-widest">
          ALTIVEX
        </div>
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className={`transition-all duration-1000 ${phase === "entering" ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-primary font-bold text-lg">A</span>
            </div>
            <span className="text-3xl font-light tracking-[0.2em] text-foreground">
              ALTIVEX
            </span>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-300 ${phase === "entering" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-muted-foreground text-sm tracking-wider">
            Project Intelligence Operating System
          </p>
        </div>

        <div className={`mt-8 transition-all duration-700 delay-500 ${phase === "entering" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button
            onClick={() => router.push("/auth")}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-all glow-primary"
          >
            Sign In
          </button>
        </div>

        <div className={`mt-4 transition-all duration-700 delay-700 ${phase === "entering" ? "opacity-100" : "opacity-0"}`}>
          <p className="text-muted-foreground/50 text-xs">
            From Conversation to Completion
          </p>
        </div>
      </div>
    </div>
  );
}
