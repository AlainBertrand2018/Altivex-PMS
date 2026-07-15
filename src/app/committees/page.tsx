"use client";

import { AppProvider } from "@/lib/app-context";
import { AuthProvider } from "@/lib/auth-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import CommitteesContent from "@/components/committees/committees-content";

export const dynamic = "force-dynamic";

export default function CommitteesPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <CommitteesContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
