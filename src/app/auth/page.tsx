"use client";

import { AuthProvider } from "@/lib/auth-context";
import AuthPage from "@/components/auth-page";

export const dynamic = "force-dynamic";

export default function Auth() {
  return (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  );
}
