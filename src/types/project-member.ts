export type ProjectMemberRole = "owner" | "lead" | "member" | "viewer";

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectMemberRole;
  joinedAt: string;
  invitedBy?: string;
}
