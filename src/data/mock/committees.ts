import { Committee } from "@/types";

export const mockCommittees: Committee[] = [
  {
    id: "com_001",
    name: "Project Alpha Steering Committee",
    description: "Governs the Alpha Infrastructure project portfolio",
    type: "steering",
    members: [
      { userId: "usr_002", role: "chair", joinedAt: "2025-01-15T08:00:00Z" },
      { userId: "usr_005", role: "member", joinedAt: "2025-01-15T08:00:00Z" },
      { userId: "usr_004", role: "member", joinedAt: "2025-01-15T08:00:00Z" },
      { userId: "usr_001", role: "observer", joinedAt: "2025-01-15T08:00:00Z" },
    ],
    projectIds: ["prj_001", "prj_002"],
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-06-01T10:00:00Z",
  },
  {
    id: "com_002",
    name: "Digital Transformation Governance Board",
    description: "Oversees digital initiatives and technology adoption",
    type: "governance",
    members: [
      { userId: "usr_001", role: "chair", joinedAt: "2025-02-01T08:00:00Z" },
      { userId: "usr_003", role: "member", joinedAt: "2025-02-01T08:00:00Z" },
      { userId: "usr_006", role: "member", joinedAt: "2025-03-15T08:00:00Z" },
    ],
    projectIds: ["prj_003"],
    createdAt: "2025-02-01T08:00:00Z",
    updatedAt: "2025-06-10T14:00:00Z",
  },
  {
    id: "com_003",
    name: "Executive Committee",
    description: "Senior leadership decision-making body",
    type: "executive",
    members: [
      { userId: "usr_005", role: "chair", joinedAt: "2025-01-01T08:00:00Z" },
      { userId: "usr_001", role: "vice_chair", joinedAt: "2025-01-01T08:00:00Z" },
      { userId: "usr_002", role: "member", joinedAt: "2025-01-01T08:00:00Z" },
    ],
    projectIds: ["prj_001", "prj_002", "prj_003"],
    createdAt: "2025-01-01T08:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
  },
];
