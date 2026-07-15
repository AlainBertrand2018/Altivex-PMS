"use client";

import { useParams } from "next/navigation";
import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import TaskDetail from "@/components/tasks/task-detail";

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <TaskDetail taskId={taskId} />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
