export type ProjectStatus =
  | "envision"
  | "planning"
  | "in_progress"
  | "review"
  | "completed"
  | "on_hold"
  | "cancelled";

export type ProjectPriority = "critical" | "high" | "medium" | "low";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  committeeId?: string;
  ownerId: string;
  budgetEstimated: number;
  budgetApproved: number;
  budgetSpent: number;
  budgetCurrency: string;
  timelineStartDate?: string;
  timelineEndDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPhase {
  id: string;
  projectId: string;
  name: string;
  description: string;
  orderIndex: number;
  status: "pending" | "active" | "completed";
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  phaseId?: string;
  name: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface KPI {
  id: string;
  projectId: string;
  phaseId?: string;
  milestoneId?: string;
  name: string;
  description: string;
  value: number;
  target: number;
  unit: string;
  category: "project" | "phase" | "milestone" | "financial";
  createdAt: string;
  updatedAt: string;
}
