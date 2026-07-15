"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Calendar, Users, FileText, AlertTriangle, CheckSquare, Clock,
  DollarSign, Target, TrendingUp, Pencil, Trash2, MapPin, Search, History,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import ProjectForm from "./project-form";
import KPIManager from "./kpi-manager";

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const router = useRouter();
  const {
    projects, committees, users, tasks, meetings, decisions, stakeholders,
    documents, risks, milestones, kpis, costItems, projectPhases,
    meetingAttendees, updateProject, deleteProject,
  } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <p className="text-on-surface-variant">Project not found</p>
        <button
          onClick={() => router.push("/projects")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm hover:brightness-110 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
      </div>
    );
  }

  const owner = users.find((u) => u.id === project.ownerId);
  const committee = committees.find((c) => c.id === project.committeeId);
  const budgetProgress = project.budgetApproved > 0
    ? Math.round((project.budgetSpent / project.budgetApproved) * 100)
    : 0;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectMeetings = meetings.filter((m) => m.projectId === project.id);
  const projectDecisions = decisions.filter((d) => d.projectId === project.id);
  const projectStakeholders = stakeholders.filter((s) => s.projectId === project.id);
  const projectDocuments = documents.filter((d) => d.projectId === project.id);
  const projectRisks = risks.filter((r) => r.projectId === project.id);
  const projectMilestones = milestones.filter((m) => m.projectId === project.id);
  const projectKPIs = kpis.filter((k) => k.projectId === project.id);
  const projectCostItems = costItems.filter((c) => c.projectId === project.id);
  const projectPhasesList = projectPhases.filter((p) => p.projectId === project.id).sort((a, b) => a.orderIndex - b.orderIndex);

  const completedMilestones = projectMilestones.filter((m) => m.completed).length;
  const completedTasks = projectTasks.filter((t) => t.status === "done").length;
  const openRisks = projectRisks.filter((r) => r.status !== "closed").length;
  const totalCost = projectCostItems.reduce((sum, item) => sum + item.totalCost, 0);

  // AI Health Score computation
  const healthScore = useMemo(() => {
    let score = 50;
    if (projectTasks.length > 0) score += (completedTasks / projectTasks.length) * 20;
    if (projectMilestones.length > 0) score += (completedMilestones / projectMilestones.length) * 15;
    if (project.budgetApproved > 0 && budgetProgress <= 100) score += 10;
    if (openRisks > 3) score -= 10;
    return Math.min(99, Math.max(0, Math.round(score)));
  }, [completedTasks, projectTasks.length, completedMilestones, projectMilestones.length, budgetProgress, openRisks]);

  const healthLabel = healthScore >= 80 ? "STABLE" : healthScore >= 60 ? "MODERATE" : healthScore >= 40 ? "AT RISK" : "CRITICAL";
  const healthColor = healthScore >= 80 ? "text-secondary" : healthScore >= 60 ? "text-primary" : healthScore >= 40 ? "text-tertiary" : "text-error";

  // Cost breakdown by category
  const costBreakdown = useMemo(() => {
    const groups: Record<string, number> = {};
    projectCostItems.forEach((item) => {
      groups[item.category] = (groups[item.category] || 0) + item.totalCost;
    });
    return Object.entries(groups)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4);
  }, [projectCostItems]);

  const costColors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-on-surface-variant"];

  const handleEdit = () => setShowForm(true);
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(project.id);
      router.push("/projects");
    }
  };
  const handleSubmit = async (data: Omit<typeof project, "id" | "createdAt" | "updatedAt">) => {
    await updateProject(project.id, data);
    setShowForm(false);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const statusLabel = project.status.replace(/_/g, " ").toUpperCase();
  const priorityLabel = project.priority.toUpperCase();

  const statusDotColor = project.status === "in_progress" ? "bg-secondary animate-pulse-emerald"
    : project.status === "completed" ? "bg-secondary"
    : project.status === "on_hold" ? "bg-tertiary"
    : project.status === "cancelled" ? "bg-error"
    : "bg-primary";

  const statusTextColor = project.status === "in_progress" ? "text-secondary"
    : project.status === "completed" ? "text-secondary"
    : project.status === "on_hold" ? "text-tertiary"
    : project.status === "cancelled" ? "text-error"
    : "text-primary";

  const priorityBg = project.priority === "critical" ? "bg-error/20 text-error"
    : project.priority === "high" ? "bg-tertiary/20 text-tertiary"
    : project.priority === "medium" ? "bg-primary/20 text-primary"
    : "bg-outline-variant/20 text-on-surface-variant";

  const tabs = [
    { key: "overview", label: "OVERVIEW" },
    { key: "tasks", label: "TASKS", count: projectTasks.length },
    { key: "meetings", label: "MEETINGS", count: projectMeetings.length },
    { key: "decisions", label: "DECISIONS", count: projectDecisions.length },
    { key: "stakeholders", label: "STAKEHOLDERS", count: projectStakeholders.length },
    { key: "documents", label: "DOCUMENTS", count: projectDocuments.length },
    { key: "risks", label: "RISKS", count: projectRisks.length },
    { key: "financials", label: "FINANCIALS" },
  ];

  // ---- OVERVIEW TAB ----
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Row 1: Project Summary & AI Health Score */}
      <div className="grid grid-cols-12 gap-6">
        {/* Project Summary */}
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${statusDotColor}`} style={{ boxShadow: "0 0 10px currentColor" }} />
              <span className={`font-label-caps text-[11px] ${statusTextColor} tracking-widest`}>{statusLabel}</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4">{project.name}</h3>
            <p className="text-on-surface-variant font-body-lg max-w-2xl leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">PROJECT LEAD</p>
              <p className="font-body-sm font-bold text-on-surface">{owner?.name || "Unassigned"}</p>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">TIMELINE</p>
              <p className="font-body-sm font-bold text-on-surface">
                {project.timelineStartDate ? formatDate(project.timelineStartDate) : "TBD"} — {project.timelineEndDate ? formatDate(project.timelineEndDate) : "TBD"}
              </p>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">PRIORITY</p>
              <span className={`px-2 py-0.5 rounded font-label-caps text-[10px] ${priorityBg}`}>{priorityLabel}</span>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">COMMITTEE</p>
              <p className="font-body-sm font-bold text-on-surface">{committee?.name || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* AI Health Score */}
        <div className="col-span-12 lg:col-span-4 glass-panel rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label-caps text-[11px] text-on-surface-variant tracking-widest mb-4">AI ANALYTIC HEALTH</p>
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-white/5" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8" />
                <circle
                  className={`${healthColor} transition-all duration-1000`}
                  cx="80" cy="80" fill="transparent" r="70" stroke="currentColor"
                  strokeDasharray="440" strokeDashoffset={440 - (440 * healthScore / 100)} strokeWidth="8"
                  style={{ filter: `drop-shadow(0 0 8px currentColor)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-display leading-none text-on-surface">{healthScore}</span>
                <span className={`font-label-caps text-[12px] ${healthColor}`}>{healthLabel}</span>
              </div>
            </div>
            <p className="mt-4 text-on-surface-variant font-body-sm italic">
              {healthScore >= 80
                ? "All operational parameters within expected efficiency thresholds."
                : healthScore >= 60
                ? "Minor deviations detected. Monitoring recommended."
                : "Multiple risk factors active. Intervention advised."}
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Milestone Timeline & Financial Snapshot */}
      <div className="grid grid-cols-12 gap-6">
        {/* Milestone Timeline */}
        <div className="col-span-12 lg:col-span-7 glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-md text-headline-md text-on-surface">Milestones Timeline</h4>
            {projectPhasesList.length > 0 && (
              <span className="text-primary font-label-caps text-[11px]">
                {projectPhasesList.filter((p) => p.status === "completed").length}/{projectPhasesList.length} PHASES
              </span>
            )}
          </div>
          {projectPhasesList.length === 0 ? (
            <p className="text-on-surface-variant text-center py-8">No phases defined for this project</p>
          ) : (
            <div className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/30">
              {projectPhasesList.map((phase) => {
                const phaseMilestones = projectMilestones.filter((m) => m.phaseId === phase.id);
                const completedInPhase = phaseMilestones.filter((m) => m.completed).length;
                const totalInPhase = phaseMilestones.length;
                const progress = totalInPhase > 0 ? Math.round((completedInPhase / totalInPhase) * 100) : phase.status === "completed" ? 100 : phase.status === "active" ? 50 : 0;

                const dotClass = phase.status === "completed"
                  ? "bg-secondary"
                  : phase.status === "active"
                  ? "bg-primary animate-pulse-emerald"
                  : "bg-outline-variant";
                const dotIcon = phase.status === "completed" ? "check" : phase.status === "active" ? "sync" : "schedule";
                const statusText = phase.status === "completed" ? "COMPLETED"
                  : phase.status === "active" ? `IN PROGRESS (${progress}%)`
                  : `SCHEDULED${phase.startDate ? `: ${formatDate(phase.startDate)}` : ""}`;
                const statusColor = phase.status === "completed" ? "text-secondary"
                  : phase.status === "active" ? "text-primary"
                  : "text-on-surface-variant";
                const opacity = phase.status === "pending" ? "opacity-60 hover:opacity-100" : "";

                return (
                  <div key={phase.id} className={`relative pl-8 group ${opacity} transition-opacity`}>
                    <div className={`absolute left-0 top-1 w-[22px] h-[22px] rounded-full ${dotClass} flex items-center justify-center`}
                      style={{ boxShadow: phase.status !== "pending" ? "0 0 12px currentColor" : "none" }}>
                      <span className="material-symbols-outlined text-[12px] text-surface-container-low font-bold"
                        style={{ fontVariationSettings: "'FILL' 1" }}>{dotIcon}</span>
                    </div>
                    <div className="p-4 rounded-lg bg-white/2 border border-outline-variant/10 group-hover:bg-white/5 transition-all">
                      <div className="flex justify-between mb-1">
                        <h5 className="font-bold text-on-surface">{phase.name}</h5>
                        <span className={`font-data-mono text-[11px] ${statusColor}`}>{statusText}</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant">{phase.description || "No description"}</p>
                      {totalInPhase > 0 && (
                        <p className="text-[10px] text-on-surface-variant mt-1 font-data-mono">
                          {completedInPhase}/{totalInPhase} milestones completed
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Financial Snapshot */}
        <div className="col-span-12 lg:col-span-5 glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
            <h4 className="font-headline-md text-headline-md text-on-surface">Financial Breakdown</h4>
            <span className="font-label-caps text-[11px] text-on-surface-variant">CURRENCY: {project.budgetCurrency}</span>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant">TOTAL BUDGET EXPENDED</p>
                  <p className="font-display text-[32px] leading-none text-on-surface">
                    {project.budgetCurrency} {(project.budgetSpent / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-[10px] text-on-surface-variant">REMAINING</p>
                  <p className="font-data-mono text-body-sm text-secondary">
                    {budgetProgress > 0 ? (100 - budgetProgress).toFixed(1) : "100.0"}%
                  </p>
                </div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20 transition-all duration-1000"
                  style={{ width: `${budgetProgress}%` }}
                />
              </div>
            </div>
            {costBreakdown.length > 0 ? (
              <div className="space-y-3">
                {costBreakdown.map(([category, amount], i) => (
                  <div key={category} className="flex justify-between items-center p-3 rounded bg-white/2 border border-outline-variant/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${costColors[i] || costColors[3]}`} />
                      <span className="text-body-sm text-on-surface capitalize">{category}</span>
                    </div>
                    <span className="font-data-mono text-body-sm text-on-surface">
                      {(amount / 1000000).toFixed(1)}M
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant text-center py-4 text-sm">No cost items recorded</p>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Stakeholder Influence Network */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">Stakeholder Influence Network</h4>
              <p className="text-body-sm text-on-surface-variant">Real-time engagement and decision-making authority mapping</p>
            </div>
          </div>
          {projectStakeholders.length === 0 ? (
            <p className="text-on-surface-variant text-center py-12">No stakeholders mapped for this project</p>
          ) : (
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-outline-variant/10 bg-black/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full p-12">
                  {/* Central Node */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-primary/40 flex items-center justify-center animate-pulse-emerald">
                      <div className="text-center">
                        <p className="font-label-caps text-[10px] text-primary">CORE PROJECT</p>
                        <p className="font-bold text-[14px] text-on-surface">{project.name.split(" ").slice(0, 2).join(" ")}</p>
                      </div>
                    </div>
                  </div>
                  {/* Peripheral Stakeholder Nodes */}
                  {projectStakeholders.slice(0, 6).map((s, i) => {
                    const user = users.find((u) => u.id === s.userId);
                    const name = user?.name || s.name || "Unknown";
                    const angle = (i / Math.min(projectStakeholders.length, 6)) * 2 * Math.PI - Math.PI / 2;
                    const radius = 35;
                    const left = 50 + radius * Math.cos(angle);
                    const top = 50 + radius * Math.sin(angle);
                    const borderColor = s.influence === "high" ? "border-secondary"
                      : s.influence === "medium" ? "border-primary"
                      : "border-tertiary";
                    const labelColor = s.influence === "high" ? "text-secondary"
                      : s.influence === "medium" ? "text-primary"
                      : "text-tertiary";

                    return (
                      <div key={s.id} className="absolute text-center" style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}>
                        <img
                          className={`w-14 h-14 rounded-full border-2 ${borderColor} mb-2 mx-auto object-cover`}
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || s.id}`}
                          alt={name}
                        />
                        <p className="font-bold text-body-sm text-on-surface">{name.split(" ")[0]}</p>
                        <p className={`font-label-caps text-[9px] ${labelColor}`}>{s.influence.toUpperCase()} INFLUENCE</p>
                      </div>
                    );
                  })}
                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 pointer-events-none w-full h-full">
                    {projectStakeholders.slice(0, 6).map((s, i) => {
                      const angle = (i / Math.min(projectStakeholders.length, 6)) * 2 * Math.PI - Math.PI / 2;
                      const radius = 35;
                      const x = 50 + radius * Math.cos(angle);
                      const y = 50 + radius * Math.sin(angle);
                      const color = s.influence === "high" ? "rgba(78, 222, 163, 0.2)"
                        : s.influence === "medium" ? "rgba(192, 193, 255, 0.2)"
                        : "rgba(255, 185, 95, 0.2)";
                      return (
                        <line key={s.id} stroke={color} strokeWidth="2" x1={`${x}%`} x2="50%" y1={`${y}%`} y2="50%" />
                      );
                    })}
                  </svg>
                </div>
              </div>
              {/* Legend */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-[10px] font-label-caps text-on-surface">High</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-label-caps text-on-surface">Medium</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    <span className="text-[10px] font-label-caps text-on-surface">Low</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ---- TASKS TAB ----
  const renderTasks = () => (
    <div className="glass-card rounded-2xl overflow-hidden">
      {projectTasks.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No tasks for this project</p>
      ) : (
        <div className="divide-y divide-outline-variant/5">
          {projectTasks.map((task) => {
            const assignee = users.find((u) => u.id === task.assignedTo);
            const statusBg = task.status === "done" ? "bg-secondary/10 text-secondary"
              : task.status === "in_progress" ? "bg-primary/10 text-primary"
              : task.status === "review" ? "bg-tertiary/10 text-tertiary"
              : task.status === "blocked" ? "bg-error/10 text-error"
              : "bg-surface-variant text-on-surface-variant";
            const prioBg = task.priority === "critical" ? "bg-error/10 text-error"
              : task.priority === "high" ? "bg-tertiary/10 text-tertiary"
              : task.priority === "medium" ? "bg-primary/10 text-primary"
              : "bg-surface-variant text-on-surface-variant";

            return (
              <div key={task.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-body-sm font-bold text-on-surface">{task.title}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusBg}`}>{task.status.replace(/_/g, " ").toUpperCase()}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${prioBg}`}>{task.priority.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{task.description}</p>
                </div>
                {assignee && (
                  <div className="flex items-center gap-2 shrink-0">
                    <img className="w-6 h-6 rounded-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee.id}`} alt={assignee.name} />
                    <span className="text-xs text-on-surface-variant hidden sm:inline">{assignee.name}</span>
                  </div>
                )}
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant shrink-0">
                    <Clock className="w-3 h-3" />
                    {formatDate(task.dueDate)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ---- MEETINGS TAB ----
  const renderMeetings = () => (
    <div className="glass-card rounded-2xl overflow-hidden">
      {projectMeetings.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No meetings for this project</p>
      ) : (
        <div className="divide-y divide-outline-variant/5">
          {projectMeetings.map((meeting) => {
            const meetingStatusBg = meeting.status === "completed" ? "bg-secondary/10 text-secondary"
              : meeting.status === "in_progress" ? "bg-primary/10 text-primary"
              : meeting.status === "cancelled" ? "bg-error/10 text-error"
              : "bg-surface-variant text-on-surface-variant";
            return (
              <div key={meeting.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body-sm font-bold text-on-surface">{meeting.title}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${meetingStatusBg}`}>{meeting.status.replace(/_/g, " ").toUpperCase()}</span>
                  </div>
                  {meeting.location && (
                    <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {meeting.location}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-on-surface-variant shrink-0">
                  <Calendar className="w-3 h-3" />
                  {formatDate(meeting.scheduledAt)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ---- DECISIONS TAB ----
  const renderDecisions = () => (
    <div className="glass-card rounded-2xl overflow-hidden">
      {projectDecisions.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No decisions for this project</p>
      ) : (
        <div className="divide-y divide-outline-variant/5">
          {projectDecisions.map((decision) => {
            const dStatusBg = decision.status === "approved" || decision.status === "implemented" ? "bg-secondary/10 text-secondary"
              : decision.status === "rejected" ? "bg-error/10 text-error"
              : decision.status === "proposed" ? "bg-tertiary/10 text-tertiary"
              : "bg-surface-variant text-on-surface-variant";
            const impactBg = decision.impact === "critical" ? "bg-error/10 text-error"
              : decision.impact === "high" ? "bg-tertiary/10 text-tertiary"
              : decision.impact === "medium" ? "bg-primary/10 text-primary"
              : "bg-surface-variant text-on-surface-variant";
            return (
              <div key={decision.id} className="px-6 py-4 hover:bg-white/2 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-body-sm font-bold text-on-surface">{decision.title}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dStatusBg}`}>{decision.status.toUpperCase()}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${impactBg}`}>{decision.impact.toUpperCase()}</span>
                  </div>
                  <span className="text-xs text-on-surface-variant shrink-0">{formatDate(decision.decidedAt)}</span>
                </div>
                {decision.description && <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{decision.description}</p>}
                {decision.decidedBy.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-1">
                      {decision.decidedBy.slice(0, 3).map((uid) => {
                        const u = users.find((usr) => usr.id === uid);
                        return u ? <img key={uid} className="w-5 h-5 rounded-full border border-surface-container-low object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`} alt={u.name} /> : null;
                      })}
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      {decision.decidedBy.map((uid) => users.find((u) => u.id === uid)?.name).filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ---- STAKEHOLDERS TAB ----
  const renderStakeholders = () => (
    <div className="glass-card rounded-2xl overflow-hidden">
      {projectStakeholders.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No stakeholders for this project</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {projectStakeholders.map((stakeholder) => {
            const sUser = users.find((u) => u.id === stakeholder.userId);
            const name = sUser?.name || stakeholder.name || "Unknown";
            const influenceBg = stakeholder.influence === "high" ? "bg-error/10 text-error"
              : stakeholder.influence === "medium" ? "bg-tertiary/10 text-tertiary"
              : "bg-surface-variant text-on-surface-variant";
            return (
              <div key={stakeholder.id} className="p-4 rounded-xl bg-white/2 border border-outline-variant/10 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sUser?.id || stakeholder.id}`} alt={name} />
                  <div className="flex-1 min-w-0">
                    <p className="font-body-sm font-bold text-on-surface">{name}</p>
                    <p className="text-xs text-on-surface-variant">{stakeholder.role}</p>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-variant text-on-surface-variant capitalize">{stakeholder.category}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${influenceBg}`}>{stakeholder.influence.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ---- DOCUMENTS TAB ----
  const renderDocuments = () => (
    <div className="glass-card rounded-2xl overflow-hidden">
      {projectDocuments.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No documents for this project</p>
      ) : (
        <div className="divide-y divide-outline-variant/5">
          {projectDocuments.map((doc) => {
            const uploader = users.find((u) => u.id === doc.uploadedBy);
            return (
              <div key={doc.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-body-sm font-bold text-on-surface">{doc.name}</p>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-variant text-on-surface-variant capitalize">{doc.type}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">v{doc.version}</span>
                  </div>
                  {doc.summary && <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{doc.summary}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-on-surface-variant">{uploader?.name}</p>
                  <p className="text-xs text-on-surface-variant">{formatDate(doc.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ---- RISKS TAB ----
  const renderRisks = () => (
    <div className="glass-card rounded-2xl overflow-hidden">
      {projectRisks.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">No risks for this project</p>
      ) : (
        <div className="divide-y divide-outline-variant/5">
          {projectRisks.map((risk) => {
            const sevBg = risk.severity === "critical" ? "bg-error/10 text-error"
              : risk.severity === "high" ? "bg-tertiary/10 text-tertiary"
              : risk.severity === "medium" ? "bg-primary/10 text-primary"
              : "bg-surface-variant text-on-surface-variant";
            const riskStatusBg = risk.status === "monitoring" ? "bg-tertiary/10 text-tertiary"
              : risk.status === "mitigated" ? "bg-secondary/10 text-secondary"
              : risk.status === "closed" ? "bg-surface-variant text-on-surface-variant"
              : "bg-error/10 text-error";
            return (
              <div key={risk.id} className="px-6 py-4 hover:bg-white/2 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-body-sm font-bold text-on-surface">{risk.title}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sevBg}`}>{risk.severity.toUpperCase()}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-variant text-on-surface-variant capitalize">{risk.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${riskStatusBg}`}>{risk.status.toUpperCase()}</span>
                </div>
                {risk.description && <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">{risk.description}</p>}
                {risk.mitigation && (
                  <div className="mt-2 p-2 rounded bg-primary/5 border border-primary/10">
                    <p className="text-xs text-on-surface-variant"><span className="text-primary font-bold">Mitigation:</span> {risk.mitigation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ---- FINANCIALS TAB ----
  const renderFinancials = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Overview */}
        <div className="glass-panel rounded-xl p-6">
          <h4 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" /> Budget Overview
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded bg-white/2 border border-outline-variant/5">
              <span className="text-body-sm text-on-surface-variant">Estimated Budget</span>
              <span className="font-data-mono text-body-sm text-on-surface">{project.budgetCurrency} {(project.budgetEstimated / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded bg-white/2 border border-outline-variant/5">
              <span className="text-body-sm text-on-surface-variant">Approved Budget</span>
              <span className="font-data-mono text-body-sm text-on-surface">{project.budgetCurrency} {(project.budgetApproved / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded bg-white/2 border border-outline-variant/5">
              <span className="text-body-sm text-on-surface-variant">Total Spent</span>
              <span className="font-data-mono text-body-sm text-on-surface">{project.budgetCurrency} {(project.budgetSpent / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded bg-white/2 border border-outline-variant/5">
              <span className="text-body-sm text-on-surface-variant">Remaining</span>
              <span className="font-data-mono text-body-sm text-secondary">{project.budgetCurrency} {((project.budgetApproved - project.budgetSpent) / 1000000).toFixed(2)}M</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-on-surface-variant">Utilization</span>
              <span className="text-on-surface font-data-mono">{budgetProgress}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${budgetProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Cost Items Summary */}
        <div className="glass-panel rounded-xl p-6">
          <h4 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Cost Items Summary
          </h4>
          {projectCostItems.length === 0 ? (
            <p className="text-center text-on-surface-variant py-8">No cost items</p>
          ) : (
            <div className="space-y-2">
              {projectCostItems.slice(0, 6).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded bg-white/2 border border-outline-variant/5">
                  <div>
                    <p className="text-sm text-on-surface">{item.name}</p>
                    <p className="text-xs text-on-surface-variant capitalize">{item.category}</p>
                  </div>
                  <span className="font-data-mono text-sm text-on-surface">{item.currency} {item.totalCost.toLocaleString()}</span>
                </div>
              ))}
              {projectCostItems.length > 6 && (
                <p className="text-xs text-on-surface-variant text-center">+{projectCostItems.length - 6} more items</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* KPIs */}
      <KPIManager projectId={project.id} />
    </div>
  );

  const tabContent: Record<string, () => React.ReactNode> = {
    overview: renderOverview,
    tasks: renderTasks,
    meetings: renderMeetings,
    decisions: renderDecisions,
    stakeholders: renderStakeholders,
    documents: renderDocuments,
    risks: renderRisks,
    financials: renderFinancials,
  };

  return (
    <div className="animate-fade-in">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-data-mono text-[10px] uppercase tracking-widest">Back to Projects</span>
          </button>
          <div className="h-4 w-[1px] bg-outline-variant/30" />
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface truncate">{project.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleEdit} className="p-2 rounded-lg hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="w-full bg-surface-container-lowest/50 border-b border-outline-variant/10 overflow-x-auto">
        <div className="flex px-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 relative group transition-colors ${
                activeTab === tab.key ? "" : "hover:bg-white/5"
              }`}
            >
              <span className={`font-label-caps text-[12px] transition-colors ${
                activeTab === tab.key ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface"
              }`}>
                {tab.label}{tab.count !== undefined ? ` (${tab.count})` : ""}
              </span>
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <div className="p-8 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent min-h-[calc(100vh-8rem)]">
        {tabContent[activeTab]?.()}
      </div>

      {/* Edit Form Modal */}
      {showForm && (
        <ProjectForm
          project={project}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
