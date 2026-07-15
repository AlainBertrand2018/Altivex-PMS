export type StakeholderCategory =
  | "external"
  | "executive"
  | "government"
  | "sponsor"
  | "media"
  | "academic";

export type StakeholderInfluence = "high" | "medium" | "low";
export type StakeholderInterest = "high" | "medium" | "low";

export interface Stakeholder {
  id: string;
  userId?: string;
  projectId: string;
  name?: string;
  category: StakeholderCategory;
  influence: StakeholderInfluence;
  interest: StakeholderInterest;
  role: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
