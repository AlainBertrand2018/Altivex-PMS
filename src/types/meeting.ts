export type MeetingStatus = "scheduled" | "in_progress" | "completed" | "cancelled";

export interface Meeting {
  id: string;
  projectId: string;
  committeeId?: string;
  title: string;
  description: string;
  status: MeetingStatus;
  scheduledAt: string;
  duration: number;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingAttendee {
  id: string;
  meetingId: string;
  userId?: string;
  consultantId?: string;
  attended: boolean;
  role?: string;
}

export interface MeetingReport {
  id: string;
  meetingId: string;
  title: string;
  content: string;
  preparedBy?: string;
  status: "draft" | "final";
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}
