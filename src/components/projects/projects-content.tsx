"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter, MoreVertical, Calendar, Target, AlertTriangle, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { Project, ProjectStatus, Task } from "@/types";
import { useApp } from "@/lib/app-context";
import ProjectForm from "./project-form";

const statusConfig: Record<ProjectStatus, { label: string; color: string; dotClass: string; pulse: boolean; badgeBg: string; badgeBorder: string }> = {
  envision: { label: "Envision", color: "text-muted-foreground", dotClass: "bg-muted-foreground", pulse: false, badgeBg: "bg-muted/50", badgeBorder: "border-outline-variant/30" },
  planning: { label: "Planning", color: "text-primary", dotClass: "bg-primary", pulse: false, badgeBg: "bg-primary/10", badgeBorder: "border-primary/20" },
  in_progress: { label: "In Progress", color: "text-secondary", dotClass: "bg-secondary", pulse: true, badgeBg: "bg-secondary/10", badgeBorder: "border-secondary/20" },
  review: { label: "Under Review", color: "text-tertiary", dotClass: "bg-tertiary", pulse: false, badgeBg: "bg-tertiary/10", badgeBorder: "border-tertiary/20" },
  completed: { label: "Completed", color: "text-secondary", dotClass: "bg-secondary", pulse: false, badgeBg: "bg-secondary/10", badgeBorder: "border-secondary/20" },
  on_hold: { label: "On Hold", color: "text-tertiary", dotClass: "bg-tertiary", pulse: false, badgeBg: "bg-tertiary/10", badgeBorder: "border-tertiary/20" },
  cancelled: { label: "Cancelled", color: "text-error", dotClass: "bg-error", pulse: false, badgeBg: "bg-error/10", badgeBorder: "border-error/20" },
};

const tagColors = [
  "text-secondary",
  "text-tertiary",
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-primary",
];

function getBudgetColor(pct: number): string {
  if (pct >= 90) return "bg-error";
  if (pct >= 70) return "bg-tertiary";
  return "bg-primary";
}

function getDaysRemaining(endDate?: string): number | null {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getRiskLevel(risks: { severity: string }[]): { label: string; color: string } {
  if (risks.length === 0) return { label: "None", color: "text-secondary" };
  const hasCritical = risks.some((r) => r.severity === "critical");
  const hasHigh = risks.some((r) => r.severity === "high");
  if (hasCritical) return { label: "Critical", color: "text-error" };
  if (hasHigh) return { label: "High", color: "text-tertiary" };
  return { label: "Low", color: "text-secondary" };
}

interface ProjectCardData {
  project: Project;
  owner: { name: string; role: string } | null;
  committee: string;
  budgetPct: number;
  activeTasks: number;
  milestones: { completed: number; total: number };
  daysRemaining: number | null;
  risk: { label: string; color: string };
  tagColor: string;
}

export default function ProjectsContent() {
  const router = useRouter();
  const { projects, committees, users, tasks, milestones, risks, addProject, updateProject, deleteProject } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const projectData = useMemo<ProjectCardData[]>(() => {
    return projects.map((project, idx) => {
      const owner = users.find((u) => u.id === project.ownerId);
      const committee = committees.find((c) => c.id === project.committeeId);

      const budgetPct = project.budgetApproved > 0
        ? Math.round((project.budgetSpent / project.budgetApproved) * 100)
        : 0;

      const projectTasks = tasks.filter((t) => t.projectId === project.id);
      const activeTasks = projectTasks.filter((t) => t.status !== "done").length;

      const projectMilestones = milestones.filter((m) => m.projectId === project.id);
      const completedMilestones = projectMilestones.filter((m) => m.completed).length;

      const projectRisks = risks.filter((r) => r.projectId === project.id && r.status !== "closed");

      return {
        project,
        owner: owner ? { name: owner.name, role: owner.role.replace(/_/g, " ") } : null,
        committee: committee?.name || project.tags[0]?.replace(/-/g, " ") || "Uncategorized",
        budgetPct,
        activeTasks,
        milestones: { completed: completedMilestones, total: projectMilestones.length },
        daysRemaining: getDaysRemaining(project.timelineEndDate),
        risk: getRiskLevel(projectRisks),
        tagColor: tagColors[idx % tagColors.length],
      };
    });
  }, [projects, committees, users, tasks, milestones, risks]);

  const activeCount = projects.filter((p) => p.status === "in_progress").length;

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    if (editingProject) {
      await updateProject(editingProject.id, data);
    } else {
      await addProject({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Project);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3">
            Project Fleet
            <span className="text-data-mono font-data-mono text-[14px] bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
              {activeCount} Active
            </span>
          </h1>
          <p className="text-on-surface-variant mt-2 max-w-xl font-body-sm">
            Strategic orchestration of projects and operations. Monitor real-time progress and stakeholder engagement across your portfolio.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface border border-outline-variant/20 hover:bg-surface-container-highest transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="font-label-caps text-label-caps">Filter</span>
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            <span className="font-label-caps text-label-caps">New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.map(({ project, owner, committee, budgetPct, activeTasks, milestones: ms, daysRemaining, risk, tagColor }) => {
          const st = statusConfig[project.status];

          return (
            <div
              key={project.id}
              className="glass-card rounded-xl p-6 flex flex-col group cursor-pointer"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                  <span className={`font-label-caps text-label-caps ${tagColor} uppercase tracking-widest text-[9px]`}>
                    {committee}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${st.badgeBg} border ${st.badgeBorder}`}>
                  <span className={`status-dot ${st.dotClass} ${st.pulse ? "status-pulse" : ""}`} />
                  <span className={`text-[10px] font-bold ${st.color} uppercase tracking-tighter`}>
                    {st.label}
                  </span>
                </div>
              </div>

              {/* Budget Utilization */}
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-data-mono text-on-surface-variant">
                    <span>BUDGET UTILIZATION</span>
                    <span className="text-on-surface">{budgetPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getBudgetColor(budgetPct)} rounded-full`}
                      style={{ width: `${budgetPct}%` }}
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-label-caps">Active Tasks</span>
                    <span className="font-data-mono text-lg text-on-surface">{activeTasks}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-label-caps">
                      {daysRemaining !== null ? "Timeline" : ms.total > 0 ? "Milestones" : "Risk Level"}
                    </span>
                    {daysRemaining !== null ? (
                      <span className={`font-data-mono text-lg ${daysRemaining <= 7 ? "text-error" : daysRemaining <= 30 ? "text-tertiary" : "text-on-surface"}`}>
                        {daysRemaining <= 0 ? "Overdue" : `${daysRemaining}d Rem.`}
                      </span>
                    ) : ms.total > 0 ? (
                      <span className="font-data-mono text-lg text-on-surface">{ms.completed}/{ms.total}</span>
                    ) : (
                      <span className={`font-data-mono text-lg ${risk.color}`}>{risk.label}</span>
                    )}
                  </div>
                </div>

                {/* Owner */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-outline-variant/30 bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-[9px] font-bold">
                        {owner?.name?.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-on-surface">{owner?.name || "Unassigned"}</span>
                      <span className="text-[9px] text-on-surface-variant capitalize">{owner?.role || "No role"}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(project);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-on-surface-variant transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}
