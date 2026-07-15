export type DocumentType =
  | "plan"
  | "specification"
  | "contract"
  | "proposal"
  | "report"
  | "other";

export interface Document {
  id: string;
  projectId: string;
  meetingId?: string;
  name: string;
  type: DocumentType;
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
