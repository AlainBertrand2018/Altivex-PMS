"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StakeholdersContent from "@/components/stakeholders/stakeholders-content";

export default function StakeholdersPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <StakeholdersContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
