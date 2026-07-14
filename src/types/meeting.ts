export type MeetingStatus = "scheduled" | "in_progress" | "completed" | "cancelled";

export interface MeetingAttendee {
  userId: string;
  attended: boolean;
  role?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  projectId: string;
  committeeId: string;
  status: MeetingStatus;
  scheduledAt: string;
  duration: number;
  location?: string;
  attendees: MeetingAttendee[];
  transcriptId?: string;
  minutesId?: string;
  audioFileUrl?: string;
  imageUrls: string[];
  documentIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Transcript {
  id: string;
  meetingId: string;
  content: string;
  language: string;
  confidence: number;
  segments: TranscriptSegment[];
  createdAt: string;
}

export interface TranscriptSegment {
  id: string;
  speaker?: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface MeetingMinutes {
  id: string;
  meetingId: string;
  summary: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: string[];
  risks: string[];
  nextSteps: string[];
  generatedAt: string;
  generatedBy: string;
}
