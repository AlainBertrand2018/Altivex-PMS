"use client";

import { useParams } from "next/navigation";
import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import UsersContent from "@/components/users/users-content";

export default function UsersPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <UsersContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
