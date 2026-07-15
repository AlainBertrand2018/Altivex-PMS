"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
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
  Invitation,
} from "@/types";
import { db, generateId } from "@/lib/db";

interface AppState {
  users: User[];
  consultants: Consultant[];
  projects: Project[];
  projectPhases: ProjectPhase[];
  committees: Committee[];
  committeeMembers: CommitteeMember[];
  meetings: Meeting[];
  meetingAttendees: MeetingAttendee[];
  meetingReports: MeetingReport[];
  tasks: Task[];
  decisions: Decision[];
  stakeholders: Stakeholder[];
  documents: Document[];
  risks: Risk[];
  milestones: Milestone[];
  kpis: KPI[];
  projectProviders: ProjectProvider[];
  projectServices: ProjectService[];
  costItems: CostItem[];
  notifications: NotificationLog[];
  invitations: Invitation[];
  loading: boolean;
}

interface AppContextType extends AppState {
  addUser: (u: User) => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  addProject: (p: Project) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addTask: (t: Task) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (id: string, status: Task["status"]) => Promise<void>;
  addMeeting: (m: Meeting) => Promise<void>;
  updateMeeting: (id: string, data: Partial<Meeting>) => Promise<void>;
  deleteMeeting: (id: string) => Promise<void>;
  addDecision: (d: Decision) => Promise<void>;
  updateDecision: (id: string, data: Partial<Decision>) => Promise<void>;
  deleteDecision: (id: string) => Promise<void>;
  addStakeholder: (s: Stakeholder) => Promise<void>;
  updateStakeholder: (id: string, data: Partial<Stakeholder>) => Promise<void>;
  deleteStakeholder: (id: string) => Promise<void>;
  addDocument: (d: Document) => Promise<void>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  addInvitation: (i: Invitation) => Promise<void>;
  updateInvitation: (id: string, data: Partial<Invitation>) => Promise<void>;
  deleteInvitation: (id: string) => Promise<void>;
  addKPI: (k: KPI) => Promise<void>;
  updateKPI: (id: string, data: Partial<KPI>) => Promise<void>;
  deleteKPI: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectPhases, setProjectPhases] = useState<ProjectPhase[]>([]);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meetingAttendees, setMeetingAttendees] = useState<MeetingAttendee[]>([]);
  const [meetingReports, setMeetingReports] = useState<MeetingReport[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [projectProviders, setProjectProviders] = useState<ProjectProvider[]>([]);
  const [projectServices, setProjectServices] = useState<ProjectService[]>([]);
  const [costItems, setCostItems] = useState<CostItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [
        u, c, p, pp, cm, cmm, mt, mta, mtr, t, d, s, doc, r, ms, k,
        pr, ps, ci, n,
      ] = await Promise.all([
        db.users.getAll(),
        db.consultants.getAll(),
        db.projects.getAll(),
        db.projectPhases.getAll(),
        db.committees.getAll(),
        db.committeeMembers.getAll(),
        db.meetings.getAll(),
        db.meetingAttendees.getAll(),
        db.meetingReports.getAll(),
        db.tasks.getAll(),
        db.decisions.getAll(),
        db.stakeholders.getAll(),
        db.documents.getAll(),
        db.risks.getAll(),
        db.milestones.getAll(),
        db.kpis.getAll(),
        db.projectProviders.getAll(),
        db.projectServices.getAll(),
        db.costItems.getAll(),
        db.notifications.getAll(),
      ]);
      setUsers(u);
      setConsultants(c);
      setProjects(p);
      setProjectPhases(pp);
      setCommittees(cm);
      setCommitteeMembers(cmm);
      setMeetings(mt);
      setMeetingAttendees(mta);
      setMeetingReports(mtr);
      setTasks(t);
      setDecisions(d);
      setStakeholders(s);
      setDocuments(doc);
      setRisks(r);
      setMilestones(ms);
      setKpis(k);
      setProjectProviders(pr);
      setProjectServices(ps);
      setCostItems(ci);
      setNotifications(n);
    } catch (err) {
      console.error("Failed to load data from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // --- User CRUD ---
  const addUser = useCallback(async (u: User) => {
    const created = await db.users.create({ ...u, id: generateId("usr") });
    setUsers((prev) => [created, ...prev]);
  }, []);

  const updateUser = useCallback(async (id: string, data: Partial<User>) => {
    const updated = await db.users.update(id, data);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    await db.users.delete(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  // --- Project CRUD ---
  const addProject = useCallback(async (p: Project) => {
    const created = await db.projects.create({ ...p, id: generateId("prj") });
    setProjects((prev) => [created, ...prev]);
  }, []);

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    const updated = await db.projects.update(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await db.projects.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // --- Task CRUD ---
  const addTask = useCallback(async (t: Task) => {
    const created = await db.tasks.create({ ...t, id: generateId("tsk") });
    setTasks((prev) => [created, ...prev]);
  }, []);

  const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
    const updated = await db.tasks.update(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await db.tasks.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback(async (id: string, status: Task["status"]) => {
    const updated = await db.tasks.update(id, { status });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  // --- Meeting CRUD ---
  const addMeeting = useCallback(async (m: Meeting) => {
    const created = await db.meetings.create({ ...m, id: generateId("mtg") });
    setMeetings((prev) => [created, ...prev]);
  }, []);

  const updateMeeting = useCallback(async (id: string, data: Partial<Meeting>) => {
    const updated = await db.meetings.update(id, data);
    setMeetings((prev) => prev.map((m) => (m.id === id ? updated : m)));
  }, []);

  const deleteMeeting = useCallback(async (id: string) => {
    await db.meetings.delete(id);
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // --- Decision CRUD ---
  const addDecision = useCallback(async (d: Decision) => {
    const created = await db.decisions.create({ ...d, id: generateId("dec") });
    setDecisions((prev) => [created, ...prev]);
  }, []);

  const updateDecision = useCallback(async (id: string, data: Partial<Decision>) => {
    const updated = await db.decisions.update(id, data);
    setDecisions((prev) => prev.map((d) => (d.id === id ? updated : d)));
  }, []);

  const deleteDecision = useCallback(async (id: string) => {
    await db.decisions.delete(id);
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // --- Stakeholder CRUD ---
  const addStakeholder = useCallback(async (s: Stakeholder) => {
    const created = await db.stakeholders.create({ ...s, id: generateId("sth") });
    setStakeholders((prev) => [created, ...prev]);
  }, []);

  const updateStakeholder = useCallback(async (id: string, data: Partial<Stakeholder>) => {
    const updated = await db.stakeholders.update(id, data);
    setStakeholders((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }, []);

  const deleteStakeholder = useCallback(async (id: string) => {
    await db.stakeholders.delete(id);
    setStakeholders((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // --- Document CRUD ---
  const addDocument = useCallback(async (d: Document) => {
    const created = await db.documents.create({ ...d, id: generateId("doc") });
    setDocuments((prev) => [created, ...prev]);
  }, []);

  const updateDocument = useCallback(async (id: string, data: Partial<Document>) => {
    const updated = await db.documents.update(id, data);
    setDocuments((prev) => prev.map((d) => (d.id === id ? updated : d)));
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    await db.documents.delete(id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  // --- Invitation CRUD ---
  const addInvitation = useCallback(async (i: Invitation) => {
    setInvitations((prev) => [{ ...i, id: generateId("inv") }, ...prev]);
  }, []);

  const updateInvitation = useCallback(async (id: string, data: Partial<Invitation>) => {
    setInvitations((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));
  }, []);

  const deleteInvitation = useCallback(async (id: string) => {
    setInvitations((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // --- KPI CRUD ---
  const addKPI = useCallback(async (k: KPI) => {
    const created = await db.kpis.create({ ...k, id: generateId("kpi") });
    setKpis((prev) => [created, ...prev]);
  }, []);

  const updateKPI = useCallback(async (id: string, data: Partial<KPI>) => {
    const updated = await db.kpis.update(id, data);
    setKpis((prev) => prev.map((k) => (k.id === id ? updated : k)));
  }, []);

  const deleteKPI = useCallback(async (id: string) => {
    await db.kpis.delete(id);
    setKpis((prev) => prev.filter((k) => k.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        users, consultants, projects, projectPhases, committees, committeeMembers,
        meetings, meetingAttendees, meetingReports, tasks, decisions, stakeholders,
        documents, risks, milestones, kpis, projectProviders, projectServices,
        costItems, notifications, invitations,
        addUser, updateUser, deleteUser,
        addProject, updateProject, deleteProject,
        addTask, updateTask, deleteTask, moveTask,
        addMeeting, updateMeeting, deleteMeeting,
        addDecision, updateDecision, deleteDecision,
        addStakeholder, updateStakeholder, deleteStakeholder,
        addDocument, updateDocument, deleteDocument,
        addInvitation, updateInvitation, deleteInvitation,
        addKPI, updateKPI, deleteKPI,
        refresh: loadAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}