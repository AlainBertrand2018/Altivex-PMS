export interface Consultant {
  id: string;
  userId?: string;
  name: string;
  email: string;
  specialization: string[];
  bio?: string;
  dailyRate: number;
  currency: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}
