"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import DecisionsContent from "@/components/decisions/decisions-content";

export default function DecisionsPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <DecisionsContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
