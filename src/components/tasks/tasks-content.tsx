"use client";

import React, { useState } from "react";
import { Task } from "@/types";
import { useApp } from "@/lib/app-context";
import KanbanBoard from "./kanban-board";
import TaskForm from "./task-form";
import { Filter, ChevronDown, Plus } from "lucide-react";

export default function TasksContent() {
  const { addTask, updateTask, projects, tasks } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  const handleSubmit = async (data: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await addTask({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Task);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Project Selector */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-light tracking-wide text-foreground">Tasks</h1>
            {selectedProject && (
              <span className="text-data-mono font-data-mono text-[14px] bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                {selectedProject.name}
              </span>
            )}
          </div>
          <p className="text-muted-foreground">Kanban board — drag and manage project tasks</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <button
              onClick={() => setShowProjectDropdown(!showProjectDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors border border-outline-variant/20 text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              <span>{selectedProject ? selectedProject.name : "All Projects"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showProjectDropdown ? "rotate-180" : ""}`} />
            </button>
            {showProjectDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-surface-container-high border border-outline-variant/20 rounded-lg shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => { setSelectedProjectId(null); setShowProjectDropdown(false); }}
                  className={`w-full px-4 py-2 text-left text-sm ${!selectedProjectId ? "bg-primary/10 text-primary" : "text-foreground"}`}
                >
                  All Projects
                </button>
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => { setSelectedProjectId(project.id); setShowProjectDropdown(false); }}
                    className={`w-full px-4 py-2 text-left text-sm ${selectedProjectId === project.id ? "bg-primary/10 text-primary" : "text-foreground"}`}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => { setEditingTask(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      <KanbanBoard
        onCreateTask={() => { setEditingTask(null); setShowForm(true); }}
        onEditTask={(task) => { setEditingTask(task); setShowForm(true); }}
        selectedProject={selectedProject}
      />

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}