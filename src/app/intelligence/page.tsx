"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import IntelligenceContent from "@/components/intelligence/intelligence-content";

export default function IntelligencePage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <IntelligenceContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
