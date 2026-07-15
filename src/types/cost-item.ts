export interface CostItem {
  id: string;
  projectId: string;
  phaseId?: string;
  milestoneId?: string;
  committeeId?: string;
  serviceId?: string;
  name: string;
  description: string;
  category: "committee" | "consultant" | "service" | "stage" | "catering" | "staff" | "other";
  unitCost: number;
  quantity: number;
  totalCost: number;
  currency: string;
  status: "estimated" | "approved" | "invoiced" | "paid";
  createdAt: string;
  updatedAt: string;
}
