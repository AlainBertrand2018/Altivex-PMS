export type RiskSeverity = "critical" | "high" | "medium" | "low";
export type RiskStatus = "identified" | "monitoring" | "mitigated" | "resolved" | "occurred";
export type RiskCategory = "financial" | "technical" | "operational" | "legal" | "reputational" | "safety";

export interface Risk {
  id: string;
  title: string;
  description: string;
  projectId: string;
  meetingId?: string;
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

export interface ProjectIntelligence {
  projectId: string;
  healthScore: number;
  risks: Risk[];
  insights: string[];
  recommendations: string[];
  lastAnalyzed: string;
}
