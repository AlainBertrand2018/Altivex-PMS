export type ProjectStatus =
  | "envision"
  | "planning"
  | "approved"
  | "in_progress"
  | "on_hold"
  | "completed"
  | "cancelled";

export type ProjectPriority = "critical" | "high" | "medium" | "low";

export interface ProjectBudget {
  estimated: number;
  approved: number;
  spent: number;
  currency: string;
}

export interface ProjectTimeline {
  startDate: string;
  endDate: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  committeeId: string;
  ownerId: string;
  budget: ProjectBudget;
  timeline: ProjectTimeline;
  tags: string[];
  stakeholders: string[];
  suppliers: string[];
  createdAt: string;
  updatedAt: string;
}
