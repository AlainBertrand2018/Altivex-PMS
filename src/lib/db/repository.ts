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

export interface IRepository {
  users: IUserRepository;
  consultants: IConsultantRepository;
  projects: IProjectRepository;
  projectPhases: IProjectPhaseRepository;
  committees: ICommitteeRepository;
  committeeMembers: ICommitteeMemberRepository;
  meetings: IMeetingRepository;
  meetingAttendees: IMeetingAttendeeRepository;
  meetingReports: IMeetingReportRepository;
  tasks: ITaskRepository;
  decisions: IDecisionRepository;
  stakeholders: IStakeholderRepository;
  documents: IDocumentRepository;
  risks: IRiskRepository;
  milestones: IMilestoneRepository;
  kpis: IKPIRepository;
  projectProviders: IProjectProviderRepository;
  projectServices: IProjectServiceRepository;
  costItems: ICostItemRepository;
  notifications: INotificationRepository;
}

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

export interface IConsultantRepository {
  getAll(): Promise<Consultant[]>;
  getById(id: string): Promise<Consultant | null>;
  create(consultant: Consultant): Promise<Consultant>;
  update(id: string, data: Partial<Consultant>): Promise<Consultant>;
  delete(id: string): Promise<void>;
}

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  create(project: Project): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
}

export interface IProjectPhaseRepository {
  getAll(): Promise<ProjectPhase[]>;
  getByProjectId(projectId: string): Promise<ProjectPhase[]>;
  create(phase: ProjectPhase): Promise<ProjectPhase>;
  update(id: string, data: Partial<ProjectPhase>): Promise<ProjectPhase>;
  delete(id: string): Promise<void>;
}

export interface ICommitteeRepository {
  getAll(): Promise<Committee[]>;
  getById(id: string): Promise<Committee | null>;
  create(committee: Committee): Promise<Committee>;
  update(id: string, data: Partial<Committee>): Promise<Committee>;
  delete(id: string): Promise<void>;
}

export interface ICommitteeMemberRepository {
  getAll(): Promise<CommitteeMember[]>;
  getByCommitteeId(committeeId: string): Promise<CommitteeMember[]>;
  create(member: CommitteeMember): Promise<CommitteeMember>;
  update(id: string, data: Partial<CommitteeMember>): Promise<CommitteeMember>;
  delete(id: string): Promise<void>;
}

export interface IMeetingRepository {
  getAll(): Promise<Meeting[]>;
  getById(id: string): Promise<Meeting | null>;
  getByProjectId(projectId: string): Promise<Meeting[]>;
  create(meeting: Meeting): Promise<Meeting>;
  update(id: string, data: Partial<Meeting>): Promise<Meeting>;
  delete(id: string): Promise<void>;
}

export interface IMeetingAttendeeRepository {
  getAll(): Promise<MeetingAttendee[]>;
  getByMeetingId(meetingId: string): Promise<MeetingAttendee[]>;
  create(attendee: MeetingAttendee): Promise<MeetingAttendee>;
  update(id: string, data: Partial<MeetingAttendee>): Promise<MeetingAttendee>;
  delete(id: string): Promise<void>;
}

export interface IMeetingReportRepository {
  getAll(): Promise<MeetingReport[]>;
  getByMeetingId(meetingId: string): Promise<MeetingReport | null>;
  create(report: MeetingReport): Promise<MeetingReport>;
  update(id: string, data: Partial<MeetingReport>): Promise<MeetingReport>;
  delete(id: string): Promise<void>;
}

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  getByProjectId(projectId: string): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(id: string, data: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}

export interface IDecisionRepository {
  getAll(): Promise<Decision[]>;
  getById(id: string): Promise<Decision | null>;
  getByProjectId(projectId: string): Promise<Decision[]>;
  create(decision: Decision): Promise<Decision>;
  update(id: string, data: Partial<Decision>): Promise<Decision>;
  delete(id: string): Promise<void>;
}

export interface IStakeholderRepository {
  getAll(): Promise<Stakeholder[]>;
  getById(id: string): Promise<Stakeholder | null>;
  getByProjectId(projectId: string): Promise<Stakeholder[]>;
  create(stakeholder: Stakeholder): Promise<Stakeholder>;
  update(id: string, data: Partial<Stakeholder>): Promise<Stakeholder>;
  delete(id: string): Promise<void>;
}

export interface IDocumentRepository {
  getAll(): Promise<Document[]>;
  getById(id: string): Promise<Document | null>;
  getByProjectId(projectId: string): Promise<Document[]>;
  create(document: Document): Promise<Document>;
  update(id: string, data: Partial<Document>): Promise<Document>;
  delete(id: string): Promise<void>;
}

export interface IRiskRepository {
  getAll(): Promise<Risk[]>;
  getById(id: string): Promise<Risk | null>;
  getByProjectId(projectId: string): Promise<Risk[]>;
  create(risk: Risk): Promise<Risk>;
  update(id: string, data: Partial<Risk>): Promise<Risk>;
  delete(id: string): Promise<void>;
}

export interface IMilestoneRepository {
  getAll(): Promise<Milestone[]>;
  getByProjectId(projectId: string): Promise<Milestone[]>;
  create(milestone: Milestone): Promise<Milestone>;
  update(id: string, data: Partial<Milestone>): Promise<Milestone>;
  delete(id: string): Promise<void>;
}

export interface IKPIRepository {
  getAll(): Promise<KPI[]>;
  getByProjectId(projectId: string): Promise<KPI[]>;
  create(kpi: KPI): Promise<KPI>;
  update(id: string, data: Partial<KPI>): Promise<KPI>;
  delete(id: string): Promise<void>;
}

export interface IProjectProviderRepository {
  getAll(): Promise<ProjectProvider[]>;
  getById(id: string): Promise<ProjectProvider | null>;
  create(provider: ProjectProvider): Promise<ProjectProvider>;
  update(id: string, data: Partial<ProjectProvider>): Promise<ProjectProvider>;
  delete(id: string): Promise<void>;
}

export interface IProjectServiceRepository {
  getAll(): Promise<ProjectService[]>;
  getByProjectId(projectId: string): Promise<ProjectService[]>;
  create(service: ProjectService): Promise<ProjectService>;
  update(id: string, data: Partial<ProjectService>): Promise<ProjectService>;
  delete(id: string): Promise<void>;
}

export interface ICostItemRepository {
  getAll(): Promise<CostItem[]>;
  getByProjectId(projectId: string): Promise<CostItem[]>;
  create(item: CostItem): Promise<CostItem>;
  update(id: string, data: Partial<CostItem>): Promise<CostItem>;
  delete(id: string): Promise<void>;
}

export interface INotificationRepository {
  getAll(): Promise<NotificationLog[]>;
  getByUserId(userId: string): Promise<NotificationLog[]>;
  create(notification: NotificationLog): Promise<NotificationLog>;
  update(id: string, data: Partial<NotificationLog>): Promise<NotificationLog>;
  delete(id: string): Promise<void>;
}
