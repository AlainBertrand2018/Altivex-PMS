import {
  User,
  Consultant,
  Project,
  ProjectPhase,
  Committee,
  CommitteeMember,
  Meeting,
  MeetingAttendee,
  MeetingReport,
  Task,
  Decision,
  Stakeholder,
  Document,
  Risk,
  Milestone,
  KPI,
  ProjectProvider,
  ProjectService,
  CostItem,
  NotificationLog,
} from "@/types";
import {
  IRepository,
  IUserRepository,
  IConsultantRepository,
  IProjectRepository,
  IProjectPhaseRepository,
  ICommitteeRepository,
  ICommitteeMemberRepository,
  IMeetingRepository,
  IMeetingAttendeeRepository,
  IMeetingReportRepository,
  ITaskRepository,
  IDecisionRepository,
  IStakeholderRepository,
  IDocumentRepository,
  IRiskRepository,
  IMilestoneRepository,
  IKPIRepository,
  IProjectProviderRepository,
  IProjectServiceRepository,
  ICostItemRepository,
  INotificationRepository,
} from "./repository";

function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

class JsonStore<T extends { id: string }> {
  private data: T[];

  constructor(initialData: T[]) {
    this.data = [...initialData];
  }

  async getAll(): Promise<T[]> {
    return [...this.data];
  }

  async getById(id: string): Promise<T | null> {
    return this.data.find((item) => item.id === id) || null;
  }

  async create(item: T): Promise<T> {
    this.data.push(item);
    return item;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Item ${id} not found`);
    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  }

  async delete(id: string): Promise<void> {
    this.data = this.data.filter((item) => item.id !== id);
  }
}

class JsonUserRepository extends JsonStore<User> implements IUserRepository {
  constructor(data: User[]) { super(data); }
}

class JsonConsultantRepository extends JsonStore<Consultant> implements IConsultantRepository {
  constructor(data: Consultant[]) { super(data); }
}

class JsonProjectRepository extends JsonStore<Project> implements IProjectRepository {
  constructor(data: Project[]) { super(data); }
}

class JsonProjectPhaseRepository extends JsonStore<ProjectPhase> implements IProjectPhaseRepository {
  constructor(data: ProjectPhase[]) { super(data); }
  async getByProjectId(projectId: string): Promise<ProjectPhase[]> {
    const all = await this.getAll();
    return all.filter((p) => p.projectId === projectId);
  }
}

class JsonCommitteeRepository extends JsonStore<Committee> implements ICommitteeRepository {
  constructor(data: Committee[]) { super(data); }
}

class JsonCommitteeMemberRepository extends JsonStore<CommitteeMember> implements ICommitteeMemberRepository {
  constructor(data: CommitteeMember[]) { super(data); }
  async getByCommitteeId(committeeId: string): Promise<CommitteeMember[]> {
    const all = await this.getAll();
    return all.filter((m) => m.committeeId === committeeId);
  }
}

class JsonMeetingRepository extends JsonStore<Meeting> implements IMeetingRepository {
  constructor(data: Meeting[]) { super(data); }
  async getByProjectId(projectId: string): Promise<Meeting[]> {
    const all = await this.getAll();
    return all.filter((m) => m.projectId === projectId);
  }
}

class JsonMeetingAttendeeRepository extends JsonStore<MeetingAttendee> implements IMeetingAttendeeRepository {
  constructor(data: MeetingAttendee[]) { super(data); }
  async getByMeetingId(meetingId: string): Promise<MeetingAttendee[]> {
    const all = await this.getAll();
    return all.filter((a) => a.meetingId === meetingId);
  }
}

class JsonMeetingReportRepository extends JsonStore<MeetingReport> implements IMeetingReportRepository {
  constructor(data: MeetingReport[]) { super(data); }
  async getByMeetingId(meetingId: string): Promise<MeetingReport | null> {
    const all = await this.getAll();
    return all.find((r) => r.meetingId === meetingId) || null;
  }
}

class JsonTaskRepository extends JsonStore<Task> implements ITaskRepository {
  constructor(data: Task[]) { super(data); }
  async getByProjectId(projectId: string): Promise<Task[]> {
    const all = await this.getAll();
    return all.filter((t) => t.projectId === projectId);
  }
}

class JsonDecisionRepository extends JsonStore<Decision> implements IDecisionRepository {
  constructor(data: Decision[]) { super(data); }
  async getByProjectId(projectId: string): Promise<Decision[]> {
    const all = await this.getAll();
    return all.filter((d) => d.projectId === projectId);
  }
}

class JsonStakeholderRepository extends JsonStore<Stakeholder> implements IStakeholderRepository {
  constructor(data: Stakeholder[]) { super(data); }
  async getByProjectId(projectId: string): Promise<Stakeholder[]> {
    const all = await this.getAll();
    return all.filter((s) => s.projectId === projectId);
  }
}

class JsonDocumentRepository extends JsonStore<Document> implements IDocumentRepository {
  constructor(data: Document[]) { super(data); }
  async getByProjectId(projectId: string): Promise<Document[]> {
    const all = await this.getAll();
    return all.filter((d) => d.projectId === projectId);
  }
}

class JsonRiskRepository extends JsonStore<Risk> implements IRiskRepository {
  constructor(data: Risk[]) { super(data); }
  async getByProjectId(projectId: string): Promise<Risk[]> {
    const all = await this.getAll();
    return all.filter((r) => r.projectId === projectId);
  }
}

class JsonMilestoneRepository extends JsonStore<Milestone> implements IMilestoneRepository {
  constructor(data: Milestone[]) { super(data); }
  async getByProjectId(projectId: string): Promise<Milestone[]> {
    const all = await this.getAll();
    return all.filter((m) => m.projectId === projectId);
  }
}

class JsonKPIRepository extends JsonStore<KPI> implements IKPIRepository {
  constructor(data: KPI[]) { super(data); }
  async getByProjectId(projectId: string): Promise<KPI[]> {
    const all = await this.getAll();
    return all.filter((k) => k.projectId === projectId);
  }
}

class JsonProjectProviderRepository extends JsonStore<ProjectProvider> implements IProjectProviderRepository {
  constructor(data: ProjectProvider[]) { super(data); }
}

class JsonProjectServiceRepository extends JsonStore<ProjectService> implements IProjectServiceRepository {
  constructor(data: ProjectService[]) { super(data); }
  async getByProjectId(projectId: string): Promise<ProjectService[]> {
    const all = await this.getAll();
    return all.filter((s) => s.projectId === projectId);
  }
}

class JsonCostItemRepository extends JsonStore<CostItem> implements ICostItemRepository {
  constructor(data: CostItem[]) { super(data); }
  async getByProjectId(projectId: string): Promise<CostItem[]> {
    const all = await this.getAll();
    return all.filter((c) => c.projectId === projectId);
  }
}

class JsonNotificationRepository extends JsonStore<NotificationLog> implements INotificationRepository {
  constructor(data: NotificationLog[]) { super(data); }
  async getByUserId(userId: string): Promise<NotificationLog[]> {
    const all = await this.getAll();
    return all.filter((n) => n.userId === userId);
  }
}

import {
  mockUsers,
  mockConsultants,
  mockProjects,
  mockProjectPhases,
  mockCommittees,
  mockCommitteeMembers,
  mockMeetings,
  mockMeetingAttendees,
  mockMeetingReports,
  mockTasks,
  mockDecisions,
  mockStakeholders,
  mockDocuments,
  mockRisks,
  mockMilestones,
  mockKPIs,
  mockProjectProviders,
  mockProjectServices,
  mockCostItems,
  mockNotifications,
} from "@/data/mock";

export const db: IRepository = {
  users: new JsonUserRepository(mockUsers),
  consultants: new JsonConsultantRepository(mockConsultants),
  projects: new JsonProjectRepository(mockProjects),
  projectPhases: new JsonProjectPhaseRepository(mockProjectPhases),
  committees: new JsonCommitteeRepository(mockCommittees),
  committeeMembers: new JsonCommitteeMemberRepository(mockCommitteeMembers),
  meetings: new JsonMeetingRepository(mockMeetings),
  meetingAttendees: new JsonMeetingAttendeeRepository(mockMeetingAttendees),
  meetingReports: new JsonMeetingReportRepository(mockMeetingReports),
  tasks: new JsonTaskRepository(mockTasks),
  decisions: new JsonDecisionRepository(mockDecisions),
  stakeholders: new JsonStakeholderRepository(mockStakeholders),
  documents: new JsonDocumentRepository(mockDocuments),
  risks: new JsonRiskRepository(mockRisks),
  milestones: new JsonMilestoneRepository(mockMilestones),
  kpis: new JsonKPIRepository(mockKPIs),
  projectProviders: new JsonProjectProviderRepository(mockProjectProviders),
  projectServices: new JsonProjectServiceRepository(mockProjectServices),
  costItems: new JsonCostItemRepository(mockCostItems),
  notifications: new JsonNotificationRepository(mockNotifications),
};

export { generateId };
