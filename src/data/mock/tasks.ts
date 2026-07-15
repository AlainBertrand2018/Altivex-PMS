import { Task } from "@/types";

export const mockTasks: Task[] = [
  {
    id: "tsk_001", title: "Confirm 12-episode broadcast schedule with MBC", description: "Finalise the 12-episode broadcast slot allocation with MBC Television, including prime-time Friday evening slots and Saturday replay.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_006", status: "done", priority: "high", dueDate: "2025-11-30", tags: ["broadcast", "scheduling"], dependencies: [], createdBy: "usr_002", createdAt: "2025-09-15T08:00:00Z", updatedAt: "2025-11-28T16:00:00Z",
  },
  {
    id: "tsk_002", title: "Build kitchen studio set at Caudan Waterfront", description: "Construct 6 professional cooking stations with full extraction, fire suppression, camera rigs, and audience seating for 200.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_010", status: "done", priority: "critical", dueDate: "2025-12-01", tags: ["production", "set-design", "logistics"], dependencies: [], createdBy: "usr_002", createdAt: "2025-09-01T08:00:00Z", updatedAt: "2025-11-28T10:00:00Z",
  },
  {
    id: "tsk_003", title: "Shortlist and onboard 24 contestants", description: "Complete contestant auditions, taste tests, and personality screening. Shortlist from 120 applicants to 24 competitors.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_002", status: "done", priority: "high", dueDate: "2025-11-15", tags: ["casting", "contestants"], dependencies: [], createdBy: "usr_002", createdAt: "2025-09-10T08:00:00Z", updatedAt: "2025-11-10T14:00:00Z",
  },
  {
    id: "tsk_004", title: "Secure LUX* as title sponsor — finalise contract", description: "Complete sponsorship agreement with LUX* Resorts & Hotels for MUR 3.5M title sponsorship including brand integration and VIP guest hospitality.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_007", status: "done", priority: "critical", dueDate: "2025-10-31", tags: ["sponsorship", "finance"], dependencies: [], createdBy: "usr_002", createdAt: "2025-09-01T08:00:00Z", updatedAt: "2025-10-30T11:00:00Z",
  },
  {
    id: "tsk_005", title: "Produce Episode 1 — 'Street Food Showdown'", description: "Full production of Episode 1: contestants prepare Mauritian street food classics under time pressure.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_010", status: "in_progress", priority: "critical", dueDate: "2025-12-15", tags: ["production", "episode-1"], dependencies: ["tsk_002", "tsk_003"], createdBy: "usr_002", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2025-12-05T09:00:00Z",
  },
  {
    id: "tsk_006", title: "Develop episode theme breakdown for Episodes 2–6", description: "Design detailed themes, ingredient constraints, and challenge formats for the first half of the season.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_008", status: "in_progress", priority: "high", dueDate: "2025-12-31", tags: ["creative", "format"], dependencies: [], createdBy: "usr_002", createdAt: "2025-11-20T08:00:00Z", updatedAt: "2025-12-03T14:00:00Z",
  },
  {
    id: "tsk_007", title: "Prepare jury panel briefs and scoring rubric", description: "Finalise judging criteria (taste 40%, presentation 25%, creativity 20%, technique 15%) and prepare detailed briefing packs.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_008", status: "review", priority: "high", dueDate: "2025-12-10", tags: ["judging", "scoring"], dependencies: [], createdBy: "usr_002", createdAt: "2025-11-15T08:00:00Z", updatedAt: "2025-12-02T10:00:00Z",
  },
  {
    id: "tsk_008", title: "Negotiate Air Mauritius partnership for contestant travel", description: "Secure discounted flights for out-of-island guest judges and potential international contestants.", projectId: "prj_001", phaseId: "ph_002", assignedTo: "usr_007", status: "todo", priority: "medium", dueDate: "2026-01-15", tags: ["partnership", "travel"], dependencies: [], createdBy: "usr_002", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2025-12-01T08:00:00Z",
  },
  {
    id: "tsk_009", title: "Define competition categories with Chef Stéphane", description: "Finalise 5 categories: Artisan Bread, Chocolate Sculpture, Fusion Pâtisserie, Sustainable Sweet Innovation, and Mauritian Heritage Dessert.", projectId: "prj_002", phaseId: "ph_004", assignedTo: "usr_003", status: "done", priority: "high", dueDate: "2025-12-15", tags: ["categories", "judging"], dependencies: [], createdBy: "usr_003", createdAt: "2025-10-15T08:00:00Z", updatedAt: "2025-12-14T16:00:00Z",
  },
  {
    id: "tsk_010", title: "Draft judging criteria and scoring matrix per category", description: "Develop detailed scoring matrices including technique, creativity, presentation, taste, and sustainability criteria.", projectId: "prj_002", phaseId: "ph_004", assignedTo: "usr_008", status: "done", priority: "high", dueDate: "2025-12-20", tags: ["judging", "scoring"], dependencies: ["tsk_009"], createdBy: "usr_003", createdAt: "2025-11-01T08:00:00Z", updatedAt: "2025-12-19T11:00:00Z",
  },
  {
    id: "tsk_011", title: "Launch online registration portal", description: "Build and deploy the online registration system with entry form, portfolio upload, payment gateway.", projectId: "prj_002", phaseId: "ph_005", assignedTo: "usr_003", status: "todo", priority: "high", dueDate: "2026-01-31", tags: ["digital", "registration"], dependencies: [], createdBy: "usr_003", createdAt: "2025-12-10T08:00:00Z", updatedAt: "2025-12-10T08:00:00Z",
  },
  {
    id: "tsk_012", title: "Secure exhibition venue — Eureka House", description: "Negotiate venue hire for the 3-day competition weekend and public exhibition at Eureka House, Moka.", projectId: "prj_002", phaseId: "ph_005", assignedTo: "usr_010", status: "in_progress", priority: "medium", dueDate: "2026-02-28", tags: ["venue", "logistics"], dependencies: [], createdBy: "usr_003", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2025-12-18T10:00:00Z",
  },
  {
    id: "tsk_013", title: "Approve seed funding allocation for winners", description: "Finance committee to approve MUR 2M seed fund pool for category winners — MUR 500K per winner.", projectId: "prj_002", phaseId: "ph_005", assignedTo: "usr_007", status: "review", priority: "high", dueDate: "2026-01-31", tags: ["finance", "prize-fund"], dependencies: [], createdBy: "usr_003", createdAt: "2025-12-15T08:00:00Z", updatedAt: "2025-12-20T14:00:00Z",
  },
  {
    id: "tsk_014", title: "Finalise 80% local ingredient compliance framework", description: "Define the certification methodology for verifying the 80% local ingredient threshold.", projectId: "prj_003", phaseId: "ph_007", assignedTo: "usr_005", status: "done", priority: "critical", dueDate: "2025-10-15", tags: ["certification", "compliance", "legal"], dependencies: [], createdBy: "usr_004", createdAt: "2025-07-15T08:00:00Z", updatedAt: "2025-10-14T16:00:00Z",
  },
  {
    id: "tsk_015", title: "Liaise with Food Security Authority for regulatory backing", description: "Obtain formal endorsement from the Food Security Authority for the Moris Otantik label framework.", projectId: "prj_003", phaseId: "ph_008", assignedTo: "usr_009", status: "in_progress", priority: "critical", dueDate: "2026-01-31", tags: ["government", "regulatory"], dependencies: ["tsk_014"], createdBy: "usr_004", createdAt: "2025-10-20T08:00:00Z", updatedAt: "2025-12-10T09:00:00Z",
  },
  {
    id: "tsk_016", title: "Identify and onboard 20 pilot establishments", description: "Select 20 establishments across sectors for the pilot certification phase.", projectId: "prj_003", phaseId: "ph_008", assignedTo: "usr_009", status: "todo", priority: "high", dueDate: "2026-03-31", tags: ["pilot", "certification"], dependencies: ["tsk_015"], createdBy: "usr_004", createdAt: "2025-11-01T08:00:00Z", updatedAt: "2025-11-01T08:00:00Z",
  },
  {
    id: "tsk_017", title: "Design Moris Otantik certification label and branding", description: "Create the official Moris Otantik label mark, brand guidelines, and certification sticker/badge system.", projectId: "prj_003", phaseId: "ph_008", assignedTo: "usr_006", status: "in_progress", priority: "medium", dueDate: "2026-02-28", tags: ["branding", "label-design"], dependencies: [], createdBy: "usr_004", createdAt: "2025-11-15T08:00:00Z", updatedAt: "2025-12-05T11:00:00Z",
  },
  {
    id: "tsk_018", title: "Prepare supply chain mapping for local ingredient verification", description: "Develop a supply chain traceability database linking certified establishments to their local ingredient suppliers.", projectId: "prj_003", phaseId: "ph_008", assignedTo: "usr_005", status: "todo", priority: "high", dueDate: "2026-02-28", tags: ["supply-chain", "traceability"], dependencies: [], createdBy: "usr_004", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2025-12-01T08:00:00Z",
  },
  {
    id: "tsk_019", title: "Draft MACC Distinction Charter and criteria document", description: "Write the formal charter defining the MACC distinction — eligibility criteria, evaluation pillars, application process.", projectId: "prj_004", phaseId: "ph_010", assignedTo: "usr_008", status: "in_progress", priority: "critical", dueDate: "2026-02-28", tags: ["charter", "criteria"], dependencies: [], createdBy: "usr_002", createdAt: "2025-11-01T08:00:00Z", updatedAt: "2025-12-08T14:00:00Z",
  },
  {
    id: "tsk_020", title: "Select independent jury panel of 7 culinary masters", description: "Identify and invite 7 independent jury members — a mix of Mauritian master chefs, international culinary figures.", projectId: "prj_004", phaseId: "ph_011", assignedTo: "usr_002", status: "todo", priority: "high", dueDate: "2026-04-30", tags: ["jury", "selection"], dependencies: ["tsk_019"], createdBy: "usr_002", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2025-12-01T08:00:00Z",
  },
  {
    id: "tsk_021", title: "Plan inaugural MACC award ceremony format", description: "Design the inaugural ceremony format — black-tie event, live demonstration, media coverage plan.", projectId: "prj_004", phaseId: "ph_011", assignedTo: "usr_006", status: "todo", priority: "medium", dueDate: "2026-06-30", tags: ["ceremony", "event-planning"], dependencies: [], createdBy: "usr_002", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2025-12-01T08:00:00Z",
  },
  {
    id: "tsk_022", title: "Engage Ministry of Tourism for official government endorsement", description: "Present the MACC distinction framework to the Ministry of Tourism and obtain official recognition.", projectId: "prj_004", phaseId: "ph_010", assignedTo: "usr_009", status: "review", priority: "high", dueDate: "2026-03-31", tags: ["government", "endorsement"], dependencies: ["tsk_019"], createdBy: "usr_002", createdAt: "2025-11-15T08:00:00Z", updatedAt: "2025-12-10T10:00:00Z",
  },
  {
    id: "tsk_023", title: "Write Format Bible for the show", description: "Develop the comprehensive format bible: episode structure, running time, tone of voice, visual style.", projectId: "prj_005", phaseId: "ph_012", assignedTo: "usr_006", status: "in_progress", priority: "high", dueDate: "2026-02-28", tags: ["format", "creative"], dependencies: [], createdBy: "usr_006", createdAt: "2025-12-01T08:00:00Z", updatedAt: "2025-12-15T11:00:00Z",
  },
  {
    id: "tsk_024", title: "Scout and confirm lead chef presenter", description: "Identify and confirm the lead chef presenter — must be a recognised Mauritian culinary figure with TV experience.", projectId: "prj_005", phaseId: "ph_012", assignedTo: "usr_006", status: "todo", priority: "critical", dueDate: "2026-03-31", tags: ["talent", "presenter"], dependencies: [], createdBy: "usr_006", createdAt: "2025-12-10T08:00:00Z", updatedAt: "2025-12-10T08:00:00Z",
  },
  {
    id: "tsk_025", title: "Secure MBC broadcast slot and YouTube distribution deal", description: "Negotiate weekly broadcast slot on MBC Television and establish the YouTube channel strategy.", projectId: "prj_005", phaseId: "ph_012", assignedTo: "usr_007", status: "todo", priority: "high", dueDate: "2026-04-30", tags: ["broadcast", "distribution"], dependencies: ["tsk_023"], createdBy: "usr_006", createdAt: "2025-12-15T08:00:00Z", updatedAt: "2025-12-15T08:00:00Z",
  },
  {
    id: "tsk_026", title: "Design pilot episode — 'The Art of Dholl Puri'", description: "Develop the pilot episode concept focused on the art of making dholl Puri.", projectId: "prj_005", phaseId: "ph_012", assignedTo: "usr_008", status: "todo", priority: "medium", dueDate: "2026-04-30", tags: ["episode", "pilot"], dependencies: ["tsk_024"], createdBy: "usr_006", createdAt: "2025-12-20T08:00:00Z", updatedAt: "2025-12-20T08:00:00Z",
  },
];
