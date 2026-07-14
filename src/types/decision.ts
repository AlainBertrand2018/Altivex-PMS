export type DecisionStatus = "proposed" | "approved" | "rejected" | "deferred" | "implemented";
export type DecisionImpact = "high" | "medium" | "low";

export interface Decision {
  id: string;
  title: string;
  description: string;
  projectId: string;
  meetingId: string;
  decidedBy: string[];
  status: DecisionStatus;
  impact: DecisionImpact;
  rationale?: string;
  consequences?: string;
  actionItemIds: string[];
  decidedAt: string;
  createdAt: string;
  updatedAt: string;
}
