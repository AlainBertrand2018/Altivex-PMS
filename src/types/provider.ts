export interface ProjectProvider {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category: "security" | "catering" | "logistics" | "media" | "technical" | "other";
  website?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectService {
  id: string;
  projectId: string;
  phaseId?: string;
  name: string;
  description: string;
  category: "logistical" | "technical" | "culinary" | "media" | "security" | "catering" | "other";
  status: "identified" | "quoted" | "contracted" | "delivered";
  estimatedCost: number;
  actualCost: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectProvidersDelegate {
  id: string;
  providerId: string;
  userId: string;
  projectId: string;
  serviceId?: string;
  createdAt: string;
}

export interface ServiceProvider {
  id: string;
  serviceId: string;
  providerId: string;
}
