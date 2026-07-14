import {
  User,
  Project,
  Committee,
  Meeting,
  Task,
  Decision,
  Stakeholder,
  Document,
  Risk,
} from "@/types";

export interface IRepository {
  users: IUserRepository;
  projects: IProjectRepository;
  committees: ICommitteeRepository;
  meetings: IMeetingRepository;
  tasks: ITaskRepository;
  decisions: IDecisionRepository;
  stakeholders: IStakeholderRepository;
  documents: IDocumentRepository;
  risks: IRiskRepository;
}

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  create(project: Project): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
}

export interface ICommitteeRepository {
  getAll(): Promise<Committee[]>;
  getById(id: string): Promise<Committee | null>;
  create(committee: Committee): Promise<Committee>;
  update(id: string, data: Partial<Committee>): Promise<Committee>;
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
