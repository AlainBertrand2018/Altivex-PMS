import { supabase } from "@/lib/supabase";
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

function toCamel(row: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camel] = value;
  }
  return result;
}

function fromCamel(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snake = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    result[snake] = value;
  }
  return result;
}

function mapRow<T>(row: Record<string, unknown>): T {
  return toCamel(row) as T;
}

class SupabaseUserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<User>(r));
  }

  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<User>(data);
  }

  async create(user: User): Promise<User> {
    const row = fromCamel(user as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("users").insert(row).select().single();
    if (error) throw error;
    return mapRow<User>(data);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("users").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<User>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Project>(r));
  }

  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Project>(data);
  }

  async create(project: Project): Promise<Project> {
    const row = fromCamel(project as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("projects").insert(row).select().single();
    if (error) throw error;
    return mapRow<Project>(data);
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("projects").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Project>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseCommitteeRepository implements ICommitteeRepository {
  async getAll(): Promise<Committee[]> {
    const { data, error } = await supabase.from("committees").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Committee>(r));
  }

  async getById(id: string): Promise<Committee | null> {
    const { data, error } = await supabase.from("committees").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Committee>(data);
  }

  async create(committee: Committee): Promise<Committee> {
    const row = fromCamel(committee as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("committees").insert(row).select().single();
    if (error) throw error;
    return mapRow<Committee>(data);
  }

  async update(id: string, data: Partial<Committee>): Promise<Committee> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("committees").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Committee>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("committees").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseMeetingRepository implements IMeetingRepository {
  async getAll(): Promise<Meeting[]> {
    const { data, error } = await supabase.from("meetings").select("*").order("scheduled_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Meeting>(r));
  }

  async getById(id: string): Promise<Meeting | null> {
    const { data, error } = await supabase.from("meetings").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Meeting>(data);
  }

  async getByProjectId(projectId: string): Promise<Meeting[]> {
    const { data, error } = await supabase.from("meetings").select("*").eq("project_id", projectId).order("scheduled_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Meeting>(r));
  }

  async create(meeting: Meeting): Promise<Meeting> {
    const row = fromCamel(meeting as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("meetings").insert(row).select().single();
    if (error) throw error;
    return mapRow<Meeting>(data);
  }

  async update(id: string, data: Partial<Meeting>): Promise<Meeting> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("meetings").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Meeting>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("meetings").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseTaskRepository implements ITaskRepository {
  async getAll(): Promise<Task[]> {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Task>(r));
  }

  async getById(id: string): Promise<Task | null> {
    const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Task>(data);
  }

  async getByProjectId(projectId: string): Promise<Task[]> {
    const { data, error } = await supabase.from("tasks").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Task>(r));
  }

  async create(task: Task): Promise<Task> {
    const row = fromCamel(task as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("tasks").insert(row).select().single();
    if (error) throw error;
    return mapRow<Task>(data);
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("tasks").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Task>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseDecisionRepository implements IDecisionRepository {
  async getAll(): Promise<Decision[]> {
    const { data, error } = await supabase.from("decisions").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Decision>(r));
  }

  async getById(id: string): Promise<Decision | null> {
    const { data, error } = await supabase.from("decisions").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Decision>(data);
  }

  async getByProjectId(projectId: string): Promise<Decision[]> {
    const { data, error } = await supabase.from("decisions").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Decision>(r));
  }

  async create(decision: Decision): Promise<Decision> {
    const row = fromCamel(decision as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("decisions").insert(row).select().single();
    if (error) throw error;
    return mapRow<Decision>(data);
  }

  async update(id: string, data: Partial<Decision>): Promise<Decision> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("decisions").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Decision>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("decisions").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseStakeholderRepository implements IStakeholderRepository {
  async getAll(): Promise<Stakeholder[]> {
    const { data, error } = await supabase.from("stakeholders").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Stakeholder>(r));
  }

  async getById(id: string): Promise<Stakeholder | null> {
    const { data, error } = await supabase.from("stakeholders").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Stakeholder>(data);
  }

  async getByProjectId(projectId: string): Promise<Stakeholder[]> {
    const { data, error } = await supabase.from("stakeholders").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Stakeholder>(r));
  }

  async create(stakeholder: Stakeholder): Promise<Stakeholder> {
    const row = fromCamel(stakeholder as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("stakeholders").insert(row).select().single();
    if (error) throw error;
    return mapRow<Stakeholder>(data);
  }

  async update(id: string, data: Partial<Stakeholder>): Promise<Stakeholder> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("stakeholders").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Stakeholder>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("stakeholders").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseDocumentRepository implements IDocumentRepository {
  async getAll(): Promise<Document[]> {
    const { data, error } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Document>(r));
  }

  async getById(id: string): Promise<Document | null> {
    const { data, error } = await supabase.from("documents").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Document>(data);
  }

  async getByProjectId(projectId: string): Promise<Document[]> {
    const { data, error } = await supabase.from("documents").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Document>(r));
  }

  async create(document: Document): Promise<Document> {
    const row = fromCamel(document as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("documents").insert(row).select().single();
    if (error) throw error;
    return mapRow<Document>(data);
  }

  async update(id: string, data: Partial<Document>): Promise<Document> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("documents").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Document>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("documents").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseRiskRepository implements IRiskRepository {
  async getAll(): Promise<Risk[]> {
    const { data, error } = await supabase.from("risks").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Risk>(r));
  }

  async getById(id: string): Promise<Risk | null> {
    const { data, error } = await supabase.from("risks").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Risk>(data);
  }

  async getByProjectId(projectId: string): Promise<Risk[]> {
    const { data, error } = await supabase.from("risks").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Risk>(r));
  }

  async create(risk: Risk): Promise<Risk> {
    const row = fromCamel(risk as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("risks").insert(row).select().single();
    if (error) throw error;
    return mapRow<Risk>(data);
  }

  async update(id: string, data: Partial<Risk>): Promise<Risk> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("risks").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Risk>(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("risks").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseConsultantRepository implements IConsultantRepository {
  async getAll(): Promise<Consultant[]> {
    const { data, error } = await supabase.from("consultants").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Consultant>(r));
  }
  async getById(id: string): Promise<Consultant | null> {
    const { data, error } = await supabase.from("consultants").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<Consultant>(data);
  }
  async create(consultant: Consultant): Promise<Consultant> {
    const row = fromCamel(consultant as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("consultants").insert(row).select().single();
    if (error) throw error;
    return mapRow<Consultant>(data);
  }
  async update(id: string, data: Partial<Consultant>): Promise<Consultant> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("consultants").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Consultant>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("consultants").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseProjectPhaseRepository implements IProjectPhaseRepository {
  async getAll(): Promise<ProjectPhase[]> {
    const { data, error } = await supabase.from("project_phases").select("*").order("order_index", { ascending: true });
    if (error) throw error;
    return (data || []).map((r) => mapRow<ProjectPhase>(r));
  }
  async getByProjectId(projectId: string): Promise<ProjectPhase[]> {
    const { data, error } = await supabase.from("project_phases").select("*").eq("project_id", projectId).order("order_index", { ascending: true });
    if (error) throw error;
    return (data || []).map((r) => mapRow<ProjectPhase>(r));
  }
  async create(phase: ProjectPhase): Promise<ProjectPhase> {
    const row = fromCamel(phase as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("project_phases").insert(row).select().single();
    if (error) throw error;
    return mapRow<ProjectPhase>(data);
  }
  async update(id: string, data: Partial<ProjectPhase>): Promise<ProjectPhase> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("project_phases").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<ProjectPhase>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("project_phases").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseCommitteeMemberRepository implements ICommitteeMemberRepository {
  async getAll(): Promise<CommitteeMember[]> {
    const { data, error } = await supabase.from("committee_members").select("*");
    if (error) throw error;
    return (data || []).map((r) => mapRow<CommitteeMember>(r));
  }
  async getByCommitteeId(committeeId: string): Promise<CommitteeMember[]> {
    const { data, error } = await supabase.from("committee_members").select("*").eq("committee_id", committeeId);
    if (error) throw error;
    return (data || []).map((r) => mapRow<CommitteeMember>(r));
  }
  async create(member: CommitteeMember): Promise<CommitteeMember> {
    const row = fromCamel(member as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("committee_members").insert(row).select().single();
    if (error) throw error;
    return mapRow<CommitteeMember>(data);
  }
  async update(id: string, data: Partial<CommitteeMember>): Promise<CommitteeMember> {
    const row = fromCamel(data as Record<string, unknown>);
    const { data: updated, error } = await supabase.from("committee_members").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<CommitteeMember>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("committee_members").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseMeetingAttendeeRepository implements IMeetingAttendeeRepository {
  async getAll(): Promise<MeetingAttendee[]> {
    const { data, error } = await supabase.from("meeting_attendees").select("*");
    if (error) throw error;
    return (data || []).map((r) => mapRow<MeetingAttendee>(r));
  }
  async getByMeetingId(meetingId: string): Promise<MeetingAttendee[]> {
    const { data, error } = await supabase.from("meeting_attendees").select("*").eq("meeting_id", meetingId);
    if (error) throw error;
    return (data || []).map((r) => mapRow<MeetingAttendee>(r));
  }
  async create(attendee: MeetingAttendee): Promise<MeetingAttendee> {
    const row = fromCamel(attendee as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("meeting_attendees").insert(row).select().single();
    if (error) throw error;
    return mapRow<MeetingAttendee>(data);
  }
  async update(id: string, data: Partial<MeetingAttendee>): Promise<MeetingAttendee> {
    const row = fromCamel(data as Record<string, unknown>);
    const { data: updated, error } = await supabase.from("meeting_attendees").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<MeetingAttendee>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("meeting_attendees").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseMeetingReportRepository implements IMeetingReportRepository {
  async getAll(): Promise<MeetingReport[]> {
    const { data, error } = await supabase.from("meeting_reports").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<MeetingReport>(r));
  }
  async getByMeetingId(meetingId: string): Promise<MeetingReport | null> {
    const { data, error } = await supabase.from("meeting_reports").select("*").eq("meeting_id", meetingId).single();
    if (error) return null;
    return mapRow<MeetingReport>(data);
  }
  async create(report: MeetingReport): Promise<MeetingReport> {
    const row = fromCamel(report as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("meeting_reports").insert(row).select().single();
    if (error) throw error;
    return mapRow<MeetingReport>(data);
  }
  async update(id: string, data: Partial<MeetingReport>): Promise<MeetingReport> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("meeting_reports").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<MeetingReport>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("meeting_reports").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseMilestoneRepository implements IMilestoneRepository {
  async getAll(): Promise<Milestone[]> {
    const { data, error } = await supabase.from("milestones").select("*").order("due_date", { ascending: true });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Milestone>(r));
  }
  async getByProjectId(projectId: string): Promise<Milestone[]> {
    const { data, error } = await supabase.from("milestones").select("*").eq("project_id", projectId).order("due_date", { ascending: true });
    if (error) throw error;
    return (data || []).map((r) => mapRow<Milestone>(r));
  }
  async create(milestone: Milestone): Promise<Milestone> {
    const row = fromCamel(milestone as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("milestones").insert(row).select().single();
    if (error) throw error;
    return mapRow<Milestone>(data);
  }
  async update(id: string, data: Partial<Milestone>): Promise<Milestone> {
    const row = fromCamel(data as Record<string, unknown>);
    const { data: updated, error } = await supabase.from("milestones").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<Milestone>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("milestones").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseKPIRepository implements IKPIRepository {
  async getAll(): Promise<KPI[]> {
    const { data, error } = await supabase.from("kpis").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<KPI>(r));
  }
  async getByProjectId(projectId: string): Promise<KPI[]> {
    const { data, error } = await supabase.from("kpis").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<KPI>(r));
  }
  async create(kpi: KPI): Promise<KPI> {
    const row = fromCamel(kpi as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("kpis").insert(row).select().single();
    if (error) throw error;
    return mapRow<KPI>(data);
  }
  async update(id: string, data: Partial<KPI>): Promise<KPI> {
    const row = fromCamel(data as Record<string, unknown>);
    row.updated_at = new Date().toISOString();
    const { data: updated, error } = await supabase.from("kpis").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<KPI>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("kpis").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseProjectProviderRepository implements IProjectProviderRepository {
  async getAll(): Promise<ProjectProvider[]> {
    const { data, error } = await supabase.from("project_providers").select("*");
    if (error) throw error;
    return (data || []).map((r) => mapRow<ProjectProvider>(r));
  }
  async getById(id: string): Promise<ProjectProvider | null> {
    const { data, error } = await supabase.from("project_providers").select("*").eq("id", id).single();
    if (error) return null;
    return mapRow<ProjectProvider>(data);
  }
  async create(provider: ProjectProvider): Promise<ProjectProvider> {
    const row = fromCamel(provider as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("project_providers").insert(row).select().single();
    if (error) throw error;
    return mapRow<ProjectProvider>(data);
  }
  async update(id: string, data: Partial<ProjectProvider>): Promise<ProjectProvider> {
    const row = fromCamel(data as Record<string, unknown>);
    const { data: updated, error } = await supabase.from("project_providers").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<ProjectProvider>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("project_providers").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseProjectServiceRepository implements IProjectServiceRepository {
  async getAll(): Promise<ProjectService[]> {
    const { data, error } = await supabase.from("project_services").select("*");
    if (error) throw error;
    return (data || []).map((r) => mapRow<ProjectService>(r));
  }
  async getByProjectId(projectId: string): Promise<ProjectService[]> {
    const { data, error } = await supabase.from("project_services").select("*").eq("project_id", projectId);
    if (error) throw error;
    return (data || []).map((r) => mapRow<ProjectService>(r));
  }
  async create(service: ProjectService): Promise<ProjectService> {
    const row = fromCamel(service as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("project_services").insert(row).select().single();
    if (error) throw error;
    return mapRow<ProjectService>(data);
  }
  async update(id: string, data: Partial<ProjectService>): Promise<ProjectService> {
    const row = fromCamel(data as Record<string, unknown>);
    const { data: updated, error } = await supabase.from("project_services").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<ProjectService>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("project_services").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseCostItemRepository implements ICostItemRepository {
  async getAll(): Promise<CostItem[]> {
    const { data, error } = await supabase.from("cost_items").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<CostItem>(r));
  }
  async getByProjectId(projectId: string): Promise<CostItem[]> {
    const { data, error } = await supabase.from("cost_items").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<CostItem>(r));
  }
  async create(item: CostItem): Promise<CostItem> {
    const row = fromCamel(item as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("cost_items").insert(row).select().single();
    if (error) throw error;
    return mapRow<CostItem>(data);
  }
  async update(id: string, data: Partial<CostItem>): Promise<CostItem> {
    const row = fromCamel(data as Record<string, unknown>);
    const { data: updated, error } = await supabase.from("cost_items").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<CostItem>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("cost_items").delete().eq("id", id);
    if (error) throw error;
  }
}

class SupabaseNotificationRepository implements INotificationRepository {
  async getAll(): Promise<NotificationLog[]> {
    const { data, error } = await supabase.from("notification_log").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<NotificationLog>(r));
  }
  async getByUserId(userId: string): Promise<NotificationLog[]> {
    const { data, error } = await supabase.from("notification_log").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => mapRow<NotificationLog>(r));
  }
  async create(notification: NotificationLog): Promise<NotificationLog> {
    const row = fromCamel(notification as unknown as Record<string, unknown>);
    const { data, error } = await supabase.from("notification_log").insert(row).select().single();
    if (error) throw error;
    return mapRow<NotificationLog>(data);
  }
  async update(id: string, data: Partial<NotificationLog>): Promise<NotificationLog> {
    const row = fromCamel(data as Record<string, unknown>);
    const { data: updated, error } = await supabase.from("notification_log").update(row).eq("id", id).select().single();
    if (error) throw error;
    return mapRow<NotificationLog>(updated);
  }
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("notification_log").delete().eq("id", id);
    if (error) throw error;
  }
}

export const supabaseDb: IRepository = {
  users: new SupabaseUserRepository(),
  consultants: new SupabaseConsultantRepository(),
  projects: new SupabaseProjectRepository(),
  projectPhases: new SupabaseProjectPhaseRepository(),
  committees: new SupabaseCommitteeRepository(),
  committeeMembers: new SupabaseCommitteeMemberRepository(),
  meetings: new SupabaseMeetingRepository(),
  meetingAttendees: new SupabaseMeetingAttendeeRepository(),
  meetingReports: new SupabaseMeetingReportRepository(),
  tasks: new SupabaseTaskRepository(),
  decisions: new SupabaseDecisionRepository(),
  stakeholders: new SupabaseStakeholderRepository(),
  documents: new SupabaseDocumentRepository(),
  risks: new SupabaseRiskRepository(),
  milestones: new SupabaseMilestoneRepository(),
  kpis: new SupabaseKPIRepository(),
  projectProviders: new SupabaseProjectProviderRepository(),
  projectServices: new SupabaseProjectServiceRepository(),
  costItems: new SupabaseCostItemRepository(),
  notifications: new SupabaseNotificationRepository(),
};
