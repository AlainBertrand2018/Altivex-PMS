export interface Invitation {
  id: string;
  email: string;
  projectId?: string;
  role: string;
  invitedBy: string;
  status: "pending" | "accepted" | "expired";
  token: string;
  createdAt: string;
  acceptedAt?: string;
}

export interface NotificationLog {
  id: string;
  userId: string;
  type: "email" | "in_app" | "both";
  category: "invitation" | "task" | "meeting" | "decision" | "milestone" | "system";
  title: string;
  body: string;
  entityType?: string;
  entityId?: string;
  read: boolean;
  sentAt: string;
  createdAt: string;
}
