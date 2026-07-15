"use client";

import { useParams } from "next/navigation";
import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ProjectDetail from "@/components/projects/project-detail";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <ProjectDetail projectId={projectId} />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
