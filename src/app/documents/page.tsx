"use client";

import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import DocumentsContent from "@/components/documents/documents-content";

export default function DocumentsPage() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <DocumentsContent />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
