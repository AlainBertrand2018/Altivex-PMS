export type UserRole =
  | "super_admin"
  | "admin"
  | "committee_member"
  | "consultant"
  | "provider_delegate"
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
