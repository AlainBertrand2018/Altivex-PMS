export type CommitteeType =
  | "executive"
  | "steering"
  | "governance"
  | "advisory"
  | "sub_committee";

export type CommitteeMemberRole = "chair" | "vice_chair" | "member" | "observer";

export interface Committee {
  id: string;
  name: string;
  description: string;
  type: CommitteeType;
  parentCommitteeId?: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeMember {
  id: string;
  committeeId: string;
  userId?: string;
  consultantId?: string;
  memberRole: CommitteeMemberRole;
  joinedAt: string;
}
