"use client";

import { useParams } from "next/navigation";
import { AuthProvider } from "@/lib/auth-context";
import { AppProvider } from "@/lib/app-context";
import DashboardLayout from "@/components/layout/dashboard-layout";
import UserProfile from "@/components/profile/user-profile";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.userId as string;

  return (
    <AuthProvider>
      <AppProvider>
        <DashboardLayout>
          <UserProfile userId={userId} />
        </DashboardLayout>
      </AppProvider>
    </AuthProvider>
  );
}
