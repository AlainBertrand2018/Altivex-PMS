import { NotificationLog } from "@/types";

export const mockNotifications: NotificationLog[] = [
  { id: "ntf_001", userId: "usr_002", type: "in_app", category: "meeting", title: "New Meeting Scheduled", body: "Food Titan — Mid-Season Review scheduled for 20 Jan 2026", entityType: "meeting", entityId: "mtg_003", read: false, sentAt: "2025-12-15T08:00:00Z", createdAt: "2025-12-15T08:00:00Z" },
  { id: "ntf_002", userId: "usr_003", type: "in_app", category: "task", title: "Task Assigned", body: "You have been assigned: Launch online registration portal", entityType: "task", entityId: "tsk_011", read: true, sentAt: "2025-12-10T08:00:00Z", createdAt: "2025-12-10T08:00:00Z" },
  { id: "ntf_003", userId: "usr_001", type: "both", category: "decision", title: "Decision Requires Approval", body: "Q1 2026 cross-project budget reallocation requires your approval", entityType: "decision", entityId: "dec_011", read: true, sentAt: "2025-12-20T10:30:00Z", createdAt: "2025-12-20T10:30:00Z" },
  { id: "ntf_004", userId: "usr_009", type: "in_app", category: "meeting", title: "Meeting Reminder", body: "Moris Otantik — Pilot Establishment Outreach on 15 Jan 2026", entityType: "meeting", entityId: "mtg_006", read: false, sentAt: "2026-01-13T08:00:00Z", createdAt: "2026-01-13T08:00:00Z" },
  { id: "ntf_005", userId: "usr_006", type: "in_app", category: "milestone", title: "Milestone Approaching", body: "Format Bible & Episode Outline Complete due in 14 days", entityType: "milestone", entityId: "ms_017", read: false, sentAt: "2026-02-17T08:00:00Z", createdAt: "2026-02-17T08:00:00Z" },
];
