import { Committee } from "@/types";

export const mockCommittees: Committee[] = [
  {
    id: "com_001",
    name: "Food Titan Challenge Steering Committee",
    description:
      "Governs the Food Titan Challenge project — oversees broadcast production, jury appointments, contestant selection, sponsor integration, and overall competition integrity.",
    type: "steering",
    members: [
      { userId: "usr_002", role: "chair", joinedAt: "2025-06-01T08:00:00Z" },
      { userId: "usr_003", role: "member", joinedAt: "2025-06-01T08:00:00Z" },
      { userId: "usr_006", role: "member", joinedAt: "2025-06-01T08:00:00Z" },
      { userId: "usr_007", role: "member", joinedAt: "2025-06-01T08:00:00Z" },
      { userId: "usr_010", role: "member", joinedAt: "2025-06-01T08:00:00Z" },
    ],
    projectIds: ["prj_001"],
    createdAt: "2025-06-01T08:00:00Z",
    updatedAt: "2025-12-05T14:30:00Z",
  },
  {
    id: "com_002",
    name: "Les Innovations Gourmandes Committee",
    description:
      "Directs the confectionery entrepreneurs competition — manages category design, judging framework, sponsor relations, and exhibition logistics.",
    type: "steering",
    members: [
      { userId: "usr_003", role: "chair", joinedAt: "2025-08-15T08:00:00Z" },
      { userId: "usr_005", role: "member", joinedAt: "2025-08-15T08:00:00Z" },
      { userId: "usr_007", role: "member", joinedAt: "2025-08-15T08:00:00Z" },
      { userId: "usr_008", role: "member", joinedAt: "2025-09-01T08:00:00Z" },
    ],
    projectIds: ["prj_002"],
    createdAt: "2025-08-15T08:00:00Z",
    updatedAt: "2025-12-22T10:00:00Z",
  },
  {
    id: "com_003",
    name: "Moris Otantik Certification Board",
    description:
      "Governs the Moris Otantik quality label — sets certification criteria, manages audits, liaises with government agencies, and oversees the 80% local ingredient compliance framework.",
    type: "governance",
    members: [
      { userId: "usr_004", role: "chair", joinedAt: "2025-05-01T08:00:00Z" },
      { userId: "usr_005", role: "vice_chair", joinedAt: "2025-05-01T08:00:00Z" },
      { userId: "usr_009", role: "member", joinedAt: "2025-05-01T08:00:00Z" },
      { userId: "usr_007", role: "member", joinedAt: "2025-05-01T08:00:00Z" },
    ],
    projectIds: ["prj_003"],
    createdAt: "2025-05-01T08:00:00Z",
    updatedAt: "2025-12-18T09:00:00Z",
  },
  {
    id: "com_004",
    name: "MACC Distinction Jury Committee",
    description:
      "Establishes the MACC charter, selects the independent jury panel, and manages the annual Maître Artisan de la Cuisine Créole award process.",
    type: "advisory",
    members: [
      { userId: "usr_002", role: "chair", joinedAt: "2025-10-01T08:00:00Z" },
      { userId: "usr_008", role: "vice_chair", joinedAt: "2025-10-01T08:00:00Z" },
      { userId: "usr_004", role: "member", joinedAt: "2025-10-01T08:00:00Z" },
      { userId: "usr_009", role: "member", joinedAt: "2025-10-15T08:00:00Z" },
    ],
    projectIds: ["prj_004"],
    createdAt: "2025-10-01T08:00:00Z",
    updatedAt: "2025-12-10T11:00:00Z",
  },
  {
    id: "com_005",
    name: "Cooking Talent Production Committee",
    description:
      "Oversees the Cooking Talent TV/online show — manages episode format, chef selection, broadcast scheduling, and digital distribution strategy.",
    type: "executive",
    members: [
      { userId: "usr_006", role: "chair", joinedAt: "2025-11-15T08:00:00Z" },
      { userId: "usr_002", role: "member", joinedAt: "2025-11-15T08:00:00Z" },
      { userId: "usr_003", role: "member", joinedAt: "2025-11-15T08:00:00Z" },
      { userId: "usr_008", role: "observer", joinedAt: "2025-12-01T08:00:00Z" },
    ],
    projectIds: ["prj_005"],
    createdAt: "2025-11-15T08:00:00Z",
    updatedAt: "2025-12-20T16:00:00Z",
  },
  {
    id: "com_006",
    name: "Altivex Executive Committee",
    description:
      "Senior leadership body overseeing all Altivex culinary events projects — strategic direction, budget approvals, and cross-project coordination.",
    type: "executive",
    members: [
      { userId: "usr_001", role: "chair", joinedAt: "2025-01-01T08:00:00Z" },
      { userId: "usr_002", role: "vice_chair", joinedAt: "2025-01-01T08:00:00Z" },
      { userId: "usr_004", role: "member", joinedAt: "2025-01-01T08:00:00Z" },
      { userId: "usr_007", role: "member", joinedAt: "2025-01-01T08:00:00Z" },
    ],
    projectIds: ["prj_001", "prj_002", "prj_003", "prj_004", "prj_005"],
    createdAt: "2025-01-01T08:00:00Z",
    updatedAt: "2025-12-20T10:00:00Z",
  },
];
