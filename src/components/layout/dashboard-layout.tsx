"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-grid">
        <div className="animate-pulse-glow text-primary text-lg tracking-widest">ALTIVEX</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-grid flex flex-col">
      <Sidebar />
      <main className="ml-64 min-h-screen flex-1">
        <div className="p-8 pb-16">{children}</div>
      </main>
      <footer className="ml-64 border-t border-white/[0.04] bg-[#0a0f1e]/80 backdrop-blur-sm">
        <div className="px-8 py-4 text-center">
          <p className="text-muted-foreground/30 text-xs tracking-wider">
            © 2025 Alain BERTRAND • All Rights Reserved. • Created for ALTIVEX Projects
          </p>
        </div>
      </footer>
    </div>
  );
}
