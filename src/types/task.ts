export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "critical" | "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  meetingId?: string;
  assignedTo?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  tags: string[];
  dependencies: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
