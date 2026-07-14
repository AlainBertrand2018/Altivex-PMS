"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import TasksContent from "@/components/tasks/tasks-content";

export default function TasksPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <TasksContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
