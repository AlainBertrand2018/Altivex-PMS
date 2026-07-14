"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <DashboardContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
