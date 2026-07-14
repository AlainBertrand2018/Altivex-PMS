export type DocumentType =
  | "contract"
  | "report"
  | "proposal"
  | "invoice"
  | "plan"
  | "specification"
  | "correspondence"
  | "other";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  projectId: string;
  meetingId?: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  summary?: string;
  tags: string[];
  version: number;
  createdAt: string;
  updatedAt: string;
}
