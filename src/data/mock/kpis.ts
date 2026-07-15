import { KPI } from "@/types";

export const mockKPIs: KPI[] = [
  { id: "kpi_001", projectId: "prj_001", phaseId: "ph_002", name: "Episode 1 Completion Rate", description: "Percentage of Episode 1 production milestones completed", value: 75, target: 100, unit: "%", category: "phase", createdAt: "2025-09-01T08:00:00Z", updatedAt: "2025-12-05T14:30:00Z" },
  { id: "kpi_002", projectId: "prj_001", name: "Budget Utilisation", description: "Percentage of approved budget spent to date", value: 45.8, target: 50, unit: "%", category: "financial", createdAt: "2025-09-01T08:00:00Z", updatedAt: "2025-12-05T14:30:00Z" },
  { id: "kpi_003", projectId: "prj_001", name: "Sponsor Satisfaction", description: "LUX* sponsorship satisfaction score", value: 88, target: 80, unit: "%", category: "project", createdAt: "2025-09-01T08:00:00Z", updatedAt: "2025-12-02T12:00:00Z" },
  { id: "kpi_004", projectId: "prj_002", phaseId: "ph_004", name: "Category Framework Approval", description: "All 5 competition categories approved by committee", value: 100, target: 100, unit: "%", category: "milestone", createdAt: "2025-08-15T08:00:00Z", updatedAt: "2025-12-20T10:00:00Z" },
  { id: "kpi_005", projectId: "prj_002", name: "Budget Utilisation", description: "Percentage of approved budget spent to date", value: 16, target: 20, unit: "%", category: "financial", createdAt: "2025-08-15T08:00:00Z", updatedAt: "2025-12-22T10:00:00Z" },
  { id: "kpi_006", projectId: "prj_003", phaseId: "ph_008", name: "Pilot Establishments Onboarded", description: "Number of pilot establishments onboarded", value: 8, target: 20, unit: "establishments", category: "project", createdAt: "2025-05-01T08:00:00Z", updatedAt: "2025-12-18T09:00:00Z" },
  { id: "kpi_007", projectId: "prj_003", name: "Budget Utilisation", description: "Percentage of approved budget spent to date", value: 40, target: 45, unit: "%", category: "financial", createdAt: "2025-05-01T08:00:00Z", updatedAt: "2025-12-18T09:00:00Z" },
  { id: "kpi_008", projectId: "prj_004", phaseId: "ph_010", name: "Charter Draft Completion", description: "Completion of MACC Distinction Charter", value: 65, target: 100, unit: "%", category: "phase", createdAt: "2025-10-01T08:00:00Z", updatedAt: "2025-12-08T16:00:00Z" },
  { id: "kpi_009", projectId: "prj_004", name: "Budget Utilisation", description: "Percentage of approved budget spent to date", value: 13.1, target: 15, unit: "%", category: "financial", createdAt: "2025-10-01T08:00:00Z", updatedAt: "2025-12-10T11:00:00Z" },
  { id: "kpi_010", projectId: "prj_005", phaseId: "ph_012", name: "Format Bible Progress", description: "Completion of show format bible", value: 40, target: 100, unit: "%", category: "phase", createdAt: "2025-11-15T08:00:00Z", updatedAt: "2025-12-20T16:00:00Z" },
];
