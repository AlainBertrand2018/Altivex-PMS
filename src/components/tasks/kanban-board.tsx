"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Calendar, Plus, MessageSquare, Paperclip, Eye, Flag, Filter, Users, Share2, ChevronDown } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { Task, TaskStatus, Project, User } from "@/types";

const statusConfig: Record<TaskStatus, {
  label: string;
  dot: string;
  colBorder: string;
  colBg: string;
  cardBorder: string;
  cardBg: string;
  badge: string;
  badgeDark: string;
  glow: string;
  headerColor: string;
  headerBg: string;
  countBg: string;
}> = {
  todo: {
    label: "To Do",
    dot: "bg-slate-400",
    colBorder: "border-slate-400/20",
    colBg: "bg-slate-500/[0.02]",
    cardBorder: "border-l-slate-400",
    cardBg: "bg-slate-500/[0.03]",
    badge: "bg-slate-400/10 text-slate-400 border-slate-400/20",
    badgeDark: "dark:bg-slate-400/10 dark:text-slate-400 dark:border-slate-400/20",
    glow: "shadow-slate-400/5",
    headerColor: "text-slate-400",
    headerBg: "bg-slate-500/10",
    countBg: "bg-slate-500/20 text-slate-400",
  },
  in_progress: {
    label: "In Progress",
    dot: "bg-primary",
    colBorder: "border-primary/20",
    colBg: "bg-primary/[0.02]",
    cardBorder: "border-l-primary",
    cardBg: "bg-primary/[0.03]",
    badge: "bg-primary/10 text-primary border-primary/20",
    badgeDark: "dark:bg-primary/10 dark:text-primary dark:border-primary/20",
    glow: "shadow-primary/5",
    headerColor: "text-primary",
    headerBg: "bg-primary/10",
    countBg: "bg-primary/20 text-primary",
  },
  review: {
    label: "Under Review",
    dot: "bg-tertiary",
    colBorder: "border-tertiary/20",
    colBg: "bg-tertiary/[0.02]",
    cardBorder: "border-l-tertiary",
    cardBg: "bg-tertiary/[0.03]",
    badge: "bg-tertiary/10 text-tertiary border-tertiary/20",
    badgeDark: "dark:bg-tertiary/10 dark:text-tertiary dark:border-tertiary/20",
    glow: "shadow-tertiary/5",
    headerColor: "text-tertiary",
    headerBg: "bg-tertiary/10",
    countBg: "bg-tertiary/20 text-tertiary",
  },
  done: {
    label: "Done",
    dot: "bg-secondary",
    colBorder: "border-secondary/20",
    colBg: "bg-secondary/[0.02]",
    cardBorder: "border-l-secondary",
    cardBg: "bg-secondary/[0.03]",
    badge: "bg-secondary/10 text-secondary border-secondary/20",
    badgeDark: "dark:bg-secondary/10 dark:text-secondary dark:border-secondary/20",
    glow: "shadow-secondary/5",
    headerColor: "text-secondary",
    headerBg: "bg-secondary/10",
    countBg: "bg-secondary/20 text-secondary",
  },
  blocked: {
    label: "Blocked",
    dot: "bg-error",
    colBorder: "border-error/20",
    colBg: "bg-error/[0.02]",
    cardBorder: "border-l-error",
    cardBg: "bg-error/[0.03]",
    badge: "bg-error/10 text-error border-error/20",
    badgeDark: "dark:bg-error/10 dark:text-error dark:border-error/20",
    glow: "shadow-error/5",
    headerColor: "text-error",
    headerBg: "bg-error/10",
    countBg: "bg-error/20 text-error",
  },
};

const priorityConfig: Record<string, {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
}> = {
  critical: {
    label: "CRITICAL",
    color: "text-error",
    bg: "bg-error/10",
    border: "border-error/20",
    dot: "bg-error",
  },
  high: {
    label: "HIGH",
    color: "text-tertiary",
    bg: "bg-tertiary/10",
    border: "border-tertiary/20",
    dot: "bg-tertiary",
  },
  medium: {
    label: "MEDIUM",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    dot: "bg-primary",
  },
  low: {
    label: "LOW",
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    border: "border-slate-400/20",
    dot: "bg-slate-400",
  },
};

function SortableTaskCard({
  task,
  onEdit,
  onDelete,
  onNavigate,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onNavigate: (taskId: string) => void;
}) {
  const { users, projects } = useApp();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const pColors = priorityConfig[task.priority] || priorityConfig.medium;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const assignee = users.find((u: User) => u.id === task.assignedTo);
  const project = projects.find((p) => p.id === task.projectId);

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`
          glass-card rounded-xl border-l-[3px] ${pColors.border} ${pColors.dot}
          border border-border/50 border-l-transparent
          hover:border-border hover:shadow-lg transition-all cursor-pointer group
          p-4 space-y-3
        `}
        onClick={() => onNavigate(task.id)}
      >
        <div className="flex items-start justify-between">
          <h4 className="font-headline-md text-[15px] leading-snug flex-1">
            {task.title}
          </h4>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(task); }}
              className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <GripVertical className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(task); }}
              className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Paperclip className="w-3 h-3" />
            </button>
            <div {...attributes} {...listeners} className="p-1 rounded hover:bg-white/5 cursor-grab active:cursor-grabbing text-muted-foreground/30">
              <GripVertical className="w-3 h-3" />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={`text-[10px] font-bold ${pColors.bg} ${pColors.border} ${pColors.color} tracking-widest flex items-center gap-1`}>
            <span className={`glow-dot ${pColors.dot}`} />
            {pColors.label}
          </Badge>
          {task.tags?.slice(0, 2).map((tag, i) => (
            <Badge
              key={tag}
              variant="outline"
              className={`text-[9px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/30">
          <div className="flex items-center gap-2">
            {assignee ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[9px] font-bold">
                  {assignee.name?.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="font-data-mono text-[11px] text-muted-foreground">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "No date"}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-500/20 flex items-center justify-center text-slate-400 text-[9px] font-bold">—</div>
                <span className="font-data-mono text-[11px] text-muted-foreground">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "No date"}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground/60 hover:text-primary transition-colors" />
            <Paperclip className="w-4 h-4 text-muted-foreground/60 hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlayCard({ task }: { task: Task }) {
  const { users, projects } = useApp();
  const pColors = priorityConfig[task.priority] || priorityConfig.medium;
  const assignee = users.find((u: User) => u.id === task.assignedTo);
  const project = projects.find((p) => p.id === task.projectId);

  return (
    <div className={`
      glass-card rounded-xl border-l-[3px] ${pColors.border} ${pColors.dot}
      border border-border/80 border-l-transparent
      shadow-2xl shadow-black/40 rotate-2 scale-105
    `}>
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-medium text-foreground leading-tight">{task.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={`text-[9px] font-bold ${pColors.bg} ${pColors.border} ${pColors.color} tracking-widest flex items-center gap-1`}>
            <span className={`glow-dot ${pColors.dot}`} />
            {pColors.label}
          </Badge>
          <span className="text-[10px] text-primary/70">{project?.name?.split(" ").slice(0, 3).join(" ")}</span>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-border/30">
          {assignee && (
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[8px] font-medium">
                {assignee.name?.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="text-[10px] text-muted-foreground">{assignee.name?.split(" ")[0]}</span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface KanbanBoardProps {
  onCreateTask: () => void;
  onEditTask: (task: Task) => void;
  selectedProject?: Project | null;
}

export default function KanbanBoard({ onCreateTask, onEditTask, selectedProject }: KanbanBoardProps) {
  const router = useRouter();
  const { tasks, moveTask, deleteTask, users } = useApp();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = String(active.id);
    const overId = String(over.id);

    const targetColumn = Object.keys(statusConfig).find((c) => c === overId) as TaskStatus | undefined;
    if (targetColumn) {
      moveTask(taskId, targetColumn);
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    if (overTask) {
      moveTask(taskId, overTask.status);
    }
  }

  const filteredTasks = selectedProject
    ? tasks.filter((t) => t.projectId === selectedProject.id)
    : tasks;

  const columnStatuses: TaskStatus[] = ["todo", "in_progress", "review", "done", "blocked"];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full items-start min-w-[1200px] overflow-x-auto custom-scrollbar pb-4">
        {columnStatuses.map((statusId) => {
          const cfg = statusConfig[statusId];
          const columnTasks = filteredTasks.filter((t) => t.status === statusId);
          return (
            <div key={statusId} className="w-[280px] flex-shrink-0 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    {cfg.label.toUpperCase()}
                  </span>
                  <span className={`${cfg.countBg} px-2 py-0.5 rounded text-[10px] font-bold`}>
                    {columnTasks.length}
                  </span>
                </div>
                <button
                  onClick={onCreateTask}
                  className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <SortableContext items={columnTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className={`kanban-column p-3 space-y-4 overflow-y-auto custom-scrollbar flex-1 pb-10 ${cfg.colBorder} ${cfg.colBg} rounded-xl`}>
                  {columnTasks.map((task) => (
                    <SortableTaskCard
                      key={task.id}
                      task={task}
                      onEdit={onEditTask}
                      onDelete={deleteTask}
                      onNavigate={(taskId) => router.push(`/tasks/${taskId}`)}
                    />
                  ))}
                  <button
                    onClick={onCreateTask}
                    className="w-full py-3 border-2 border-dashed border-outline-variant/10 rounded-xl text-on-surface-variant hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    New Task
                  </button>
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? <OverlayCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}