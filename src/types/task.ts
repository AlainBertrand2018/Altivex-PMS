export type TaskStatus = "todo" | "in_progress" | "review" | "done" | "blocked";
export type TaskPriority = "critical" | "high" | "medium" | "low";

export interface Task {
  id: string;
  projectId: string;
  phaseId?: string;
  meetingId?: string;
  assignedTo?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  tags: string[];
  dependencies: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
