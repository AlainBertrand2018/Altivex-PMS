"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ProjectsContent from "@/components/projects/projects-content";

export default function ProjectsPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <ProjectsContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
