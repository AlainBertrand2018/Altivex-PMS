export type CommitteeType =
  | "steering"
  | "governance"
  | "technical"
  | "executive"
  | "advisory";

export type CommitteeMemberRole = "chair" | "vice_chair" | "member" | "secretary" | "observer";

export interface CommitteeMember {
  userId: string;
  role: CommitteeMemberRole;
  joinedAt: string;
}

export interface Committee {
  id: string;
  name: string;
  description: string;
  type: CommitteeType;
  members: CommitteeMember[];
  projectIds: string[];
  createdAt: string;
  updatedAt: string;
}
