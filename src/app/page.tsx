"use client";

import { AuthProvider } from "@/lib/auth-context";
import SplashScreen from "@/components/splash-screen";

export default function Home() {
  return (
    <AuthProvider>
      <SplashScreen />
    </AuthProvider>
  );
}
