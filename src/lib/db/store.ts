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
import {
  IRepository,
  IUserRepository,
  IProjectRepository,
  ICommitteeRepository,
  IMeetingRepository,
  ITaskRepository,
  IDecisionRepository,
  IStakeholderRepository,
  IDocumentRepository,
  IRiskRepository,
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
  constructor(data: User[]) {
    super(data);
  }
}

class JsonProjectRepository extends JsonStore<Project> implements IProjectRepository {
  constructor(data: Project[]) {
    super(data);
  }
}

class JsonCommitteeRepository extends JsonStore<Committee> implements ICommitteeRepository {
  constructor(data: Committee[]) {
    super(data);
  }
}

class JsonMeetingRepository extends JsonStore<Meeting> implements IMeetingRepository {
  constructor(data: Meeting[]) {
    super(data);
  }

  async getByProjectId(projectId: string): Promise<Meeting[]> {
    const all = await this.getAll();
    return all.filter((m) => m.projectId === projectId);
  }
}

class JsonTaskRepository extends JsonStore<Task> implements ITaskRepository {
  constructor(data: Task[]) {
    super(data);
  }

  async getByProjectId(projectId: string): Promise<Task[]> {
    const all = await this.getAll();
    return all.filter((t) => t.projectId === projectId);
  }
}

class JsonDecisionRepository extends JsonStore<Decision> implements IDecisionRepository {
  constructor(data: Decision[]) {
    super(data);
  }

  async getByProjectId(projectId: string): Promise<Decision[]> {
    const all = await this.getAll();
    return all.filter((d) => d.projectId === projectId);
  }
}

class JsonStakeholderRepository extends JsonStore<Stakeholder> implements IStakeholderRepository {
  constructor(data: Stakeholder[]) {
    super(data);
  }

  async getByProjectId(projectId: string): Promise<Stakeholder[]> {
    const all = await this.getAll();
    return all.filter((s) => s.projectId === projectId);
  }
}

class JsonDocumentRepository extends JsonStore<Document> implements IDocumentRepository {
  constructor(data: Document[]) {
    super(data);
  }

  async getByProjectId(projectId: string): Promise<Document[]> {
    const all = await this.getAll();
    return all.filter((d) => d.projectId === projectId);
  }
}

class JsonRiskRepository extends JsonStore<Risk> implements IRiskRepository {
  constructor(data: Risk[]) {
    super(data);
  }

  async getByProjectId(projectId: string): Promise<Risk[]> {
    const all = await this.getAll();
    return all.filter((r) => r.projectId === projectId);
  }
}

import {
  mockUsers,
  mockProjects,
  mockCommittees,
  mockMeetings,
  mockTasks,
  mockDecisions,
  mockRisks,
  mockStakeholders,
  mockDocuments,
} from "@/data/mock";

export const db: IRepository = {
  users: new JsonUserRepository(mockUsers),
  projects: new JsonProjectRepository(mockProjects),
  committees: new JsonCommitteeRepository(mockCommittees),
  meetings: new JsonMeetingRepository(mockMeetings),
  tasks: new JsonTaskRepository(mockTasks),
  decisions: new JsonDecisionRepository(mockDecisions),
  stakeholders: new JsonStakeholderRepository(mockStakeholders),
  documents: new JsonDocumentRepository(mockDocuments),
  risks: new JsonRiskRepository(mockRisks),
};

export { generateId };
