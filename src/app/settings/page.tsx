"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import InvitationManager from "@/components/settings/invitation-manager";

export default function SettingsPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-2xl font-light tracking-wide text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Application preferences and configuration</p>
            </div>
            <InvitationManager />
          </div>
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
