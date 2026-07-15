import { ProjectPhase } from "@/types";

export const mockProjectPhases: ProjectPhase[] = [
  { id: "ph_001", projectId: "prj_001", name: "Envisioning", description: "Initial concept, feasibility, and strategic alignment", orderIndex: 0, status: "completed", startDate: "2025-06-01", endDate: "2025-08-31", createdAt: "2025-06-01T08:00:00Z", updatedAt: "2025-08-31T08:00:00Z" },
  { id: "ph_002", projectId: "prj_001", name: "Production & Execution", description: "Studio build, broadcast production, and contestant management", orderIndex: 1, status: "active", startDate: "2025-09-01", endDate: "2026-02-28", createdAt: "2025-06-01T08:00:00Z", updatedAt: "2025-09-01T08:00:00Z" },
  { id: "ph_003", projectId: "prj_001", name: "Delivery & Wrap", description: "Grand finale, awards, and project closure", orderIndex: 2, status: "pending", startDate: "2026-03-01", endDate: "2026-03-31", createdAt: "2025-06-01T08:00:00Z", updatedAt: "2025-06-01T08:00:00Z" },

  { id: "ph_004", projectId: "prj_002", name: "Envisioning", description: "Category design, jury framework, and venue scouting", orderIndex: 0, status: "completed", startDate: "2025-08-15", endDate: "2025-12-31", createdAt: "2025-08-15T08:00:00Z", updatedAt: "2025-12-31T08:00:00Z" },
  { id: "ph_005", projectId: "prj_002", name: "Outsourcing & Registration", description: "Venue contracts, supplier agreements, and registration launch", orderIndex: 1, status: "active", startDate: "2026-01-01", endDate: "2026-03-31", createdAt: "2025-08-15T08:00:00Z", updatedAt: "2026-01-01T08:00:00Z" },
  { id: "ph_006", projectId: "prj_002", name: "Competition & Exhibition", description: "3-day competition weekend and public exhibition", orderIndex: 2, status: "pending", startDate: "2026-04-01", endDate: "2026-06-30", createdAt: "2025-08-15T08:00:00Z", updatedAt: "2025-08-15T08:00:00Z" },

  { id: "ph_007", projectId: "prj_003", name: "Framework & Certification Design", description: "Define 80% threshold, audit protocols, and compliance framework", orderIndex: 0, status: "completed", startDate: "2025-05-01", endDate: "2025-10-31", createdAt: "2025-05-01T08:00:00Z", updatedAt: "2025-10-31T08:00:00Z" },
  { id: "ph_008", projectId: "prj_003", name: "Pilot Phase", description: "Onboard and certify 20 pilot establishments", orderIndex: 1, status: "active", startDate: "2025-11-01", endDate: "2026-03-31", createdAt: "2025-05-01T08:00:00Z", updatedAt: "2025-11-01T08:00:00Z" },
  { id: "ph_009", projectId: "prj_003", name: "National Rollout", description: "Scale certification across Mauritius", orderIndex: 2, status: "pending", startDate: "2026-04-01", endDate: "2027-06-30", createdAt: "2025-05-01T08:00:00Z", updatedAt: "2025-05-01T08:00:00Z" },

  { id: "ph_010", projectId: "prj_004", name: "Charter & Criteria Development", description: "Draft MACC charter, evaluation pillars, and nomination process", orderIndex: 0, status: "active", startDate: "2025-10-01", endDate: "2026-02-28", createdAt: "2025-10-01T08:00:00Z", updatedAt: "2025-10-01T08:00:00Z" },
  { id: "ph_011", projectId: "prj_004", name: "Jury Selection & Ceremony", description: "Select jury panel and plan inaugural award ceremony", orderIndex: 1, status: "pending", startDate: "2026-03-01", endDate: "2026-11-30", createdAt: "2025-10-01T08:00:00Z", updatedAt: "2025-10-01T08:00:00Z" },

  { id: "ph_012", projectId: "prj_005", name: "Format Development", description: "Create format bible, episode outlines, and talent selection", orderIndex: 0, status: "active", startDate: "2026-01-15", endDate: "2026-03-31", createdAt: "2025-11-15T08:00:00Z", updatedAt: "2026-01-15T08:00:00Z" },
  { id: "ph_013", projectId: "prj_005", name: "Production & Broadcast", description: "Film pilot, produce Season 1, and broadcast", orderIndex: 1, status: "pending", startDate: "2026-04-01", endDate: "2026-12-31", createdAt: "2025-11-15T08:00:00Z", updatedAt: "2025-11-15T08:00:00Z" },
];
