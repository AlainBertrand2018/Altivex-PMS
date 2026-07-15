import { Meeting } from "@/types";

export const mockMeetings: Meeting[] = [
  {
    id: "mtg_001", projectId: "prj_001", committeeId: "com_001", title: "Food Titan — Production Kickoff Meeting", description: "Initial production planning meeting covering studio build timeline, broadcast schedule, contestant onboarding, and sponsor brand integration.", status: "completed", scheduledAt: "2025-09-10T09:00:00Z", duration: 150, location: "Conference Room A, Altivex HQ, Port Louis", createdAt: "2025-09-08T14:00:00Z", updatedAt: "2025-09-10T11:30:00Z",
  },
  {
    id: "mtg_002", projectId: "prj_001", committeeId: "com_001", title: "Food Titan — Sponsor Integration & Episode 1 Prep", description: "Review sponsor deliverables for Episode 1, confirm contestant lineup, and approve the 'Street Food Showdown' episode concept.", status: "completed", scheduledAt: "2025-12-02T10:00:00Z", duration: 120, location: "Virtual — Microsoft Teams", createdAt: "2025-11-28T08:00:00Z", updatedAt: "2025-12-02T12:00:00Z",
  },
  {
    id: "mtg_003", projectId: "prj_001", committeeId: "com_001", title: "Food Titan — Mid-Season Review", description: "Review broadcast ratings for first 6 episodes, contestant feedback, sponsor satisfaction survey.", status: "scheduled", scheduledAt: "2026-01-20T09:00:00Z", duration: 120, location: "Boardroom, MBC Television, Curepipe", createdAt: "2025-12-15T08:00:00Z", updatedAt: "2025-12-15T08:00:00Z",
  },
  {
    id: "mtg_004", projectId: "prj_002", committeeId: "com_001", title: "Les Innovations Gourmandes — Category & Framework Review", description: "Final review of competition categories, judging criteria, and registration requirements.", status: "completed", scheduledAt: "2025-12-10T14:00:00Z", duration: 90, location: "Conference Room B, Altivex HQ, Port Louis", createdAt: "2025-12-08T10:00:00Z", updatedAt: "2025-12-10T15:30:00Z",
  },
  {
    id: "mtg_005", projectId: "prj_003", committeeId: "com_001", title: "Moris Otantik — Regulatory Framework Progress", description: "Update on Food Security Authority discussions, draft certification document review.", status: "completed", scheduledAt: "2025-12-12T11:00:00Z", duration: 120, location: "Ministry of Agriculture, Port Louis", createdAt: "2025-12-10T08:00:00Z", updatedAt: "2025-12-12T13:00:00Z",
  },
  {
    id: "mtg_006", projectId: "prj_003", committeeId: "com_001", title: "Moris Otantik — Pilot Establishment Outreach", description: "Plan outreach strategy for identifying and engaging the first 20 pilot establishments.", status: "scheduled", scheduledAt: "2026-01-15T10:00:00Z", duration: 90, location: "Virtual — Zoom", createdAt: "2025-12-18T08:00:00Z", updatedAt: "2025-12-18T08:00:00Z",
  },
  {
    id: "mtg_007", projectId: "prj_004", committeeId: "com_001", title: "MACC — Charter Drafting Workshop", description: "Collaborative workshop to draft the MACC Distinction Charter — evaluation pillars, eligibility criteria.", status: "completed", scheduledAt: "2025-12-08T09:00:00Z", duration: 180, location: "Chef Arvin's Kitchen Studio, Port Louis", createdAt: "2025-12-05T08:00:00Z", updatedAt: "2025-12-08T12:00:00Z",
  },
  {
    id: "mtg_008", projectId: "prj_001", committeeId: "com_001", title: "Founding Committee — Q4 Portfolio Review", description: "Quarterly executive review of all culinary events projects — budget status, timeline adherence, cross-project synergies.", status: "completed", scheduledAt: "2025-12-20T09:00:00Z", duration: 180, location: "Boardroom, Altivex HQ, Port Louis", createdAt: "2025-12-18T08:00:00Z", updatedAt: "2025-12-20T12:00:00Z",
  },
];
