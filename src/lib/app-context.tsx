"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
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
}

interface AppContextType extends AppState {
  addProject: (p: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTask: (t: Task) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: Task["status"]) => void;
  addMeeting: (m: Meeting) => void;
  updateMeeting: (id: string, data: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  addDecision: (d: Decision) => void;
  updateDecision: (id: string, data: Partial<Decision>) => void;
  deleteDecision: (id: string) => void;
  addStakeholder: (s: Stakeholder) => void;
  updateStakeholder: (id: string, data: Partial<Stakeholder>) => void;
  deleteStakeholder: (id: string) => void;
  addDocument: (d: Document) => void;
  updateDocument: (id: string, data: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users] = useState<User[]>(mockUsers);
  const [consultants] = useState<Consultant[]>(mockConsultants);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [projectPhases] = useState<ProjectPhase[]>(mockProjectPhases);
  const [committees] = useState<Committee[]>(mockCommittees);
  const [committeeMembers] = useState<CommitteeMember[]>(mockCommitteeMembers);
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [meetingAttendees] = useState<MeetingAttendee[]>(mockMeetingAttendees);
  const [meetingReports] = useState<MeetingReport[]>(mockMeetingReports);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [decisions, setDecisions] = useState<Decision[]>(mockDecisions);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(mockStakeholders);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [risks] = useState<Risk[]>(mockRisks);
  const [milestones] = useState<Milestone[]>(mockMilestones);
  const [kpis] = useState<KPI[]>(mockKPIs);
  const [projectProviders] = useState<ProjectProvider[]>(mockProjectProviders);
  const [projectServices] = useState<ProjectService[]>(mockProjectServices);
  const [costItems] = useState<CostItem[]>(mockCostItems);
  const [notifications] = useState<NotificationLog[]>(mockNotifications);

  const generateId = (prefix: string) => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

  const addProject = useCallback((p: Project) => {
    setProjects((prev) => [{ ...p, id: generateId("prj") }, ...prev]);
  }, []);
  const updateProject = useCallback((id: string, data: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p)));
  }, []);
  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addTask = useCallback((t: Task) => {
    setTasks((prev) => [{ ...t, id: generateId("tsk") }, ...prev]);
  }, []);
  const updateTask = useCallback((id: string, data: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t)));
  }, []);
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const moveTask = useCallback((id: string, status: Task["status"]) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t)));
  }, []);

  const addMeeting = useCallback((m: Meeting) => {
    setMeetings((prev) => [{ ...m, id: generateId("mtg") }, ...prev]);
  }, []);
  const updateMeeting = useCallback((id: string, data: Partial<Meeting>) => {
    setMeetings((prev) => prev.map((m) => (m.id === id ? { ...m, ...data, updatedAt: new Date().toISOString() } : m)));
  }, []);
  const deleteMeeting = useCallback((id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addDecision = useCallback((d: Decision) => {
    setDecisions((prev) => [{ ...d, id: generateId("dec") }, ...prev]);
  }, []);
  const updateDecision = useCallback((id: string, data: Partial<Decision>) => {
    setDecisions((prev) => prev.map((d) => (d.id === id ? { ...d, ...data, updatedAt: new Date().toISOString() } : d)));
  }, []);
  const deleteDecision = useCallback((id: string) => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const addStakeholder = useCallback((s: Stakeholder) => {
    setStakeholders((prev) => [{ ...s, id: generateId("sth") }, ...prev]);
  }, []);
  const updateStakeholder = useCallback((id: string, data: Partial<Stakeholder>) => {
    setStakeholders((prev) => prev.map((s) => (s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s)));
  }, []);
  const deleteStakeholder = useCallback((id: string) => {
    setStakeholders((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addDocument = useCallback((d: Document) => {
    setDocuments((prev) => [{ ...d, id: generateId("doc") }, ...prev]);
  }, []);
  const updateDocument = useCallback((id: string, data: Partial<Document>) => {
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...data, updatedAt: new Date().toISOString() } : d)));
  }, []);
  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        users, consultants, projects, projectPhases, committees, committeeMembers,
        meetings, meetingAttendees, meetingReports, tasks, decisions, stakeholders,
        documents, risks, milestones, kpis, projectProviders, projectServices,
        costItems, notifications,
        addProject, updateProject, deleteProject,
        addTask, updateTask, deleteTask, moveTask,
        addMeeting, updateMeeting, deleteMeeting,
        addDecision, updateDecision, deleteDecision,
        addStakeholder, updateStakeholder, deleteStakeholder,
        addDocument, updateDocument, deleteDocument,
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
