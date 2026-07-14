"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import MeetingsContent from "@/components/meetings/meetings-content";

export default function MeetingsPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <MeetingsContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
