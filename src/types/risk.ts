export type RiskSeverity = "critical" | "high" | "medium" | "low";
export type RiskStatus = "identified" | "monitoring" | "mitigated" | "closed";
export type RiskCategory = "operational" | "financial" | "legal" | "reputational" | "technical";

export interface Risk {
  id: string;
  projectId: string;
  meetingId?: string;
  title: string;
  description: string;
  category: RiskCategory;
  severity: RiskSeverity;
  probability: RiskStatus;
  status: RiskStatus;
  mitigation?: string;
  owner?: string;
  identifiedAt: string;
  createdAt: string;
  updatedAt: string;
}
