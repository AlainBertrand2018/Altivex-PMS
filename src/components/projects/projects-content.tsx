"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderKanban, Users, Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { Project } from "@/types";
import { useApp } from "@/lib/app-context";
import ProjectForm from "./project-form";

const statusColors: Record<string, string> = {
  envision: "border-purple-500/30 text-purple-400",
  planning: "border-blue-500/30 text-blue-400",
  approved: "border-green-500/30 text-green-400",
  in_progress: "border-primary/30 text-primary",
  on_hold: "border-amber-500/30 text-amber-400",
  completed: "border-emerald-500/30 text-emerald-400",
  cancelled: "border-muted-foreground/30 text-muted-foreground",
};

const priorityColors: Record<string, string> = {
  critical: "border-red-500/30 text-red-400",
  high: "border-orange-500/30 text-orange-400",
  medium: "border-blue-500/30 text-blue-400",
  low: "border-muted-foreground/30 text-muted-foreground",
};

export default function ProjectsContent() {
  const { projects, committees, users, addProject, updateProject, deleteProject } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSubmit = (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject({
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track all Altivex projects</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const owner = users.find((u) => u.id === project.ownerId);
          const committee = committees.find((c) => c.id === project.committeeId);
          const budgetProgress = project.budget.approved > 0
            ? Math.round((project.budget.spent / project.budget.approved) * 100)
            : 0;
          const completedMilestones = project.timeline.milestones.filter((m) => m.completed).length;
          const totalMilestones = project.timeline.milestones.length;

          return (
            <Card key={project.id} className="glass border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{committee?.name}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(project); }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="flex gap-2">
                  <Badge variant="outline" className={`text-[10px] ${statusColors[project.status]}`}>
                    {project.status.replace(/_/g, " ").toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={`text-[10px] ${priorityColors[project.priority]}`}>
                    {project.priority.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Budget Utilization</span>
                    <span className="text-foreground">{budgetProgress}%</span>
                  </div>
                  <Progress value={budgetProgress} className="h-1" />
                  <p className="text-[10px] text-muted-foreground">
                    {project.budget.currency} {(project.budget.spent / 1000000).toFixed(1)}M / {(project.budget.approved / 1000000).toFixed(1)}M
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{project.stakeholders.length} stakeholders</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{completedMilestones}/{totalMilestones} milestones</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[8px] font-medium">
                    {owner?.name?.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs text-muted-foreground">{owner?.name}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingProject(null); }}
        />
      )}
    </div>
  );
}
