export type UserRole =
  | "admin"
  | "committee_chair"
  | "committee_member"
  | "project_manager"
  | "consultant"
  | "contractor"
  | "supplier"
  | "executive"
  | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}
