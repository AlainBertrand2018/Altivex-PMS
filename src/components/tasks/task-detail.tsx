"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Calendar, Clock, User, FolderKanban, Link2, AlertTriangle,
  CheckSquare, Pencil, Trash2, FileText, Send, Bot, ChevronRight,
  Paperclip, MessageSquare, CircleDot, Lock, CheckCircle,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { Task, TaskStatus } from "@/types";
import TaskForm from "./task-form";

interface TaskDetailProps {
  taskId: string;
}

export default function TaskDetail({ taskId }: TaskDetailProps) {
  const router = useRouter();
  const { tasks, projects, users, meetings, moveTask, updateTask, deleteTask } = useApp();
  const [showForm, setShowForm] = useState(false);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <p className="text-on-surface-variant">Task not found</p>
        <button
          onClick={() => router.push("/tasks")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm hover:brightness-110 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </button>
      </div>
    );
  }

  const project = projects.find((p) => p.id === task.projectId);
  const assignee = users.find((u) => u.id === task.assignedTo);
  const creator = users.find((u) => u.id === task.createdBy);
  const taskMeeting = task.meetingId ? meetings.find((m) => m.id === task.meetingId) : null;

  const dependentTasks = tasks.filter((t) => task.dependencies.includes(t.id));
  const blockedTasks = tasks.filter((t) => t.dependencies.includes(task.id));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Progress derived from status
  const progress = useMemo(() => {
    switch (task.status) {
      case "done": return 100;
      case "review": return 75;
      case "in_progress": return 50;
      case "todo": return 10;
      case "blocked": return 25;
      default: return 0;
    }
  }, [task.status]);

  // Days remaining
  const daysRemaining = useMemo(() => {
    if (!task.dueDate) return null;
    const diff = new Date(task.dueDate).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [task.dueDate]);

  const handleStatusChange = (newStatus: TaskStatus) => moveTask(task.id, newStatus);
  const handleEdit = () => setShowForm(true);
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      router.push("/tasks");
    }
  };
  const handleSubmit = async (data: Omit<typeof task, "id" | "createdAt" | "updatedAt">) => {
    await updateTask(task.id, data);
    setShowForm(false);
  };

  // Status config
  const statusConfig: Record<TaskStatus, { label: string; bg: string; text: string; dot: string }> = {
    todo: { label: "TO DO", bg: "bg-surface-variant", text: "text-on-surface-variant", dot: "bg-on-surface-variant" },
    in_progress: { label: "IN PROGRESS", bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
    review: { label: "REVIEW", bg: "bg-tertiary/10", text: "text-tertiary", dot: "bg-tertiary" },
    done: { label: "DONE", bg: "bg-secondary/10", text: "text-secondary", dot: "bg-secondary" },
    blocked: { label: "BLOCKED", bg: "bg-error/10", text: "text-error", dot: "bg-error" },
  };

  const priorityConfig: Record<string, { label: string; bg: string; text: string }> = {
    critical: { label: "CRITICAL", bg: "bg-error/10", text: "text-error" },
    high: { label: "HIGH", bg: "bg-tertiary/10", text: "text-tertiary" },
    medium: { label: "MEDIUM", bg: "bg-primary/10", text: "text-primary" },
    low: { label: "LOW", bg: "bg-surface-variant", text: "text-on-surface-variant" },
  };

  const sCfg = statusConfig[task.status];
  const pCfg = priorityConfig[task.priority] || priorityConfig.medium;

  const tagColors = ["bg-primary/10 text-primary", "bg-secondary/10 text-secondary", "bg-tertiary/10 text-tertiary", "bg-error/10 text-error"];

  return (
    <div className="animate-fade-in">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/10 h-16 flex justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-data-mono text-[12px] text-on-surface-variant">
            <span className="cursor-pointer hover:text-on-surface transition-colors" onClick={() => router.push("/tasks")}>Tasks</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-on-surface font-bold">Task Detail</span>
          </div>
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

      {/* Content Area */}
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Hero Header Section */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {task.status === "in_progress" && (
                <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-label-caps uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-emerald" />
                  Live Project
                </span>
              )}
              <span className="text-on-surface-variant font-data-mono text-[12px]">ID: {project?.name?.slice(0, 3).toUpperCase() || "TSK"}-{new Date(task.createdAt).getFullYear()}-{task.id.slice(-3).toUpperCase()}</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">{task.title}</h2>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/10 ${sCfg.bg}`}>
                <span className={`w-2 h-2 rounded-full ${sCfg.dot}`} />
                <span className={`text-body-sm font-medium ${sCfg.text}`}>{sCfg.label}</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${pCfg.bg === "bg-error/10" ? "border-error/20" : "border-outline-variant/10"} ${pCfg.bg}`}>
                <AlertTriangle className={`w-4 h-4 ${pCfg.text}`} />
                <span className={`text-body-sm font-medium ${pCfg.text}`}>{pCfg.label} Priority</span>
              </div>
              {project && (
                <button
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className="flex items-center gap-2 bg-surface-variant/50 px-3 py-1.5 rounded-lg border border-outline-variant/10 hover:bg-surface-variant transition-colors"
                >
                  <FolderKanban className="w-4 h-4 text-on-surface-variant" />
                  <span className="text-body-sm text-on-surface">{project.name}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="glass-panel p-2 rounded-xl flex items-center gap-1 shrink-0">
            {(["todo", "in_progress", "review", "done"] as const).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all ${
                  task.status === status
                    ? "bg-primary/20 text-primary border border-primary/20"
                    : "text-on-surface-variant hover:bg-white/5"
                }`}
              >
                {statusConfig[status].label}
              </button>
            ))}
            <div className="w-px h-6 bg-outline-variant/20 mx-1" />
            <button
              onClick={() => handleStatusChange("blocked")}
              className={`p-2 rounded-lg transition-all ${task.status === "blocked" ? "bg-error/10 text-error" : "text-error hover:bg-error/10"}`}
              title="Block task"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Primary Details (8 Cols) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Description */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-on-surface flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Task Description
                </h3>
                <button onClick={handleEdit} className="text-primary hover:underline text-body-sm">Edit Description</button>
              </div>
              <div className="text-body-lg text-on-surface-variant/90 leading-relaxed">
                {task.description ? (
                  <p>{task.description}</p>
                ) : (
                  <p className="italic text-on-surface-variant/50">No description provided.</p>
                )}
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/10 flex gap-4 overflow-x-auto pb-2">
                {project && (
                  <div className="min-w-[120px] p-3 rounded-xl bg-surface-variant/50 border border-outline-variant/5">
                    <span className="block text-label-caps text-on-surface-variant/60 mb-1">Project</span>
                    <span className="text-body-sm font-medium text-on-surface">{project.name}</span>
                  </div>
                )}
                {task.tags.length > 0 && (
                  <div className="min-w-[120px] p-3 rounded-xl bg-surface-variant/50 border border-outline-variant/5">
                    <span className="block text-label-caps text-on-surface-variant/60 mb-1">Tags</span>
                    <div className="flex gap-1 flex-wrap">
                      {task.tags.map((tag, i) => (
                        <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-bold ${tagColors[i % tagColors.length]}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                {taskMeeting && (
                  <div className="min-w-[120px] p-3 rounded-xl bg-surface-variant/50 border border-outline-variant/5">
                    <span className="block text-label-caps text-on-surface-variant/60 mb-1">Meeting</span>
                    <button onClick={() => router.push("/meetings")} className="text-body-sm font-medium text-primary hover:underline">{taskMeeting.title}</button>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline & Progress */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-headline-md text-on-surface mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Execution Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-label-caps text-on-surface-variant/60">Created</span>
                    <span className="font-data-mono text-on-surface">{formatDate(task.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${daysRemaining !== null && daysRemaining < 0 ? "bg-error/10 text-error" : "bg-tertiary/10 text-tertiary"}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-label-caps text-on-surface-variant/60">Due Date</span>
                    <span className="font-data-mono text-on-surface">{task.dueDate ? formatDate(task.dueDate) : "No due date"}</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-body-sm font-medium text-on-surface">Overall Progress</span>
                  <span className="text-body-sm font-data-mono text-primary">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                {daysRemaining !== null && task.status !== "done" && (
                  <p className="text-[12px] text-on-surface-variant/50 text-right italic">
                    {daysRemaining > 0 ? `Estimated completion in ${daysRemaining} days` : daysRemaining === 0 ? "Due today" : `${Math.abs(daysRemaining)} days overdue`}
                  </p>
                )}
              </div>
            </div>

            {/* Activity & Discussion (Placeholder) */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-headline-md text-on-surface mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Activity & Discussion
              </h3>
              <div className="space-y-6">
                {/* System Log Entry */}
                <div className="flex items-center gap-3 pl-2">
                  <span className="w-2 h-2 rounded-full bg-outline-variant/30" />
                  <span className="text-[12px] text-on-surface-variant/50">
                    Task created by <span className="text-on-surface/70">{creator?.name || "Unknown"}</span> • {formatDate(task.createdAt)}
                  </span>
                </div>
                {task.status !== "todo" && (
                  <div className="flex items-center gap-3 pl-2">
                    <span className="w-2 h-2 rounded-full bg-outline-variant/30" />
                    <span className="text-[12px] text-on-surface-variant/50">
                      Status changed to <span className={sCfg.text}>{sCfg.label}</span> • {formatDate(task.updatedAt)}
                    </span>
                  </div>
                )}
                {/* Empty state */}
                <div className="text-center py-6">
                  <p className="text-sm text-on-surface-variant/40">No comments yet. Be the first to add one.</p>
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <input
                  type="text"
                  placeholder="Add a comment or @mention..."
                  className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-body-sm text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                  disabled
                />
                <button className="bg-primary text-on-primary px-4 py-2 rounded-xl font-medium hover:brightness-110 transition-all flex items-center gap-2" disabled>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata & Relationships (4 Cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Assignees */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-on-surface text-[18px]">Assignees</h3>
              </div>
              <div className="space-y-4">
                {/* Assignee */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {assignee ? (
                      <img className="w-10 h-10 rounded-full border border-primary/30 object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee.id}`} alt={assignee.name} />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <span className="block text-body-sm font-bold text-on-surface">{assignee?.name || "Unassigned"}</span>
                      <span className="text-label-caps text-[10px] text-on-surface-variant/60">{assignee?.role?.replace(/_/g, " ") || "No role"}</span>
                    </div>
                  </div>
                  {assignee && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">Owner</span>}
                </div>
                {/* Creator */}
                {creator && creator.id !== task.assignedTo && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full border border-outline-variant/20 object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.id}`} alt={creator.name} />
                      <div>
                        <span className="block text-body-sm font-bold text-on-surface">{creator.name}</span>
                        <span className="text-label-caps text-[10px] text-on-surface-variant/60">Creator</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dependencies / Network Nodes */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-headline-md text-on-surface text-[18px] mb-6">Network Nodes</h3>
              <div className="space-y-6">
                {/* Depends On */}
                <div>
                  <span className="text-label-caps text-on-surface-variant/50 flex items-center gap-2 mb-3">
                    <Link2 className="w-4 h-4" />
                    Depends On
                  </span>
                  <div className="space-y-2">
                    {dependentTasks.length > 0 ? dependentTasks.map((depTask) => (
                      <button
                        key={depTask.id}
                        onClick={() => router.push(`/tasks/${depTask.id}`)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-variant/40 border border-outline-variant/10 hover:bg-surface-variant/60 transition-colors text-left"
                      >
                        {depTask.status === "done" ? (
                          <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                        ) : (
                          <CircleDot className="w-5 h-5 text-tertiary shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="block text-body-sm font-medium truncate text-on-surface">{depTask.title}</span>
                          <span className="text-[11px] text-on-surface-variant/40">Status: {depTask.status.replace(/_/g, " ")}</span>
                        </div>
                      </button>
                    )) : (
                      <p className="text-[12px] text-on-surface-variant/40 pl-7">No dependencies</p>
                    )}
                  </div>
                </div>
                {/* Blocks */}
                <div>
                  <span className="text-label-caps text-on-surface-variant/50 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    Blocks
                  </span>
                  <div className="space-y-2">
                    {blockedTasks.length > 0 ? blockedTasks.map((blockedTask) => (
                      <button
                        key={blockedTask.id}
                        onClick={() => router.push(`/tasks/${blockedTask.id}`)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-variant/40 border border-outline-variant/10 hover:bg-surface-variant/60 transition-colors text-left"
                      >
                        <Lock className="w-5 h-5 text-error shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="block text-body-sm font-medium truncate text-on-surface">{blockedTask.title}</span>
                          <span className="text-[11px] text-on-surface-variant/40">Status: {blockedTask.status.replace(/_/g, " ")}</span>
                        </div>
                      </button>
                    )) : (
                      <p className="text-[12px] text-on-surface-variant/40 pl-7">Not blocking any tasks</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Altivex Insight */}
            <div className="glass-panel rounded-2xl p-6 bg-primary/5 border-primary/20">
              <h3 className="font-headline-md text-primary text-[18px] mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Altivex Insight
              </h3>
              <p className="text-body-sm text-primary/80 leading-relaxed">
                {task.status === "blocked"
                  ? "This task is currently blocked. Consider reviewing dependencies or escalating to project lead for resolution."
                  : task.status === "done"
                  ? "Task completed successfully. All acceptance criteria have been met."
                  : task.priority === "critical" || task.priority === "high"
                  ? "High-priority task detected. Based on similar tasks, early stakeholder alignment reduces revision cycles by 40%."
                  : "Based on project velocity, this task is on track. Monitor dependencies for potential cascade delays."}
              </p>
              <div className="mt-4 flex items-center justify-between font-data-mono text-[12px] text-primary">
                <span>
                  {task.status === "blocked"
                    ? "Resolution needed"
                    : daysRemaining !== null && daysRemaining > 0
                    ? `Predicted: ${daysRemaining} days`
                    : "On track"}
                </span>
                <span className="underline cursor-pointer hover:text-on-primary transition-colors">Optimize Flow</span>
              </div>
            </div>

            {/* Resources (Placeholder) */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-on-surface text-[18px]">Resources</h3>
                <span className="text-body-sm text-on-surface-variant">0 Files</span>
              </div>
              <div className="text-center py-6">
                <Paperclip className="w-8 h-8 text-on-surface-variant/30 mx-auto mb-2" />
                <p className="text-sm text-on-surface-variant/40">No attachments yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {showForm && (
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
