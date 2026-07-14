"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { Task, TaskStatus } from "@/types";

const statusConfig: Record<TaskStatus, {
  label: string;
  dot: string;
  colBorder: string;
  colBg: string;
  cardBorder: string;
  cardBg: string;
  cardBgDark: string;
  badge: string;
  badgeDark: string;
  glow: string;
}> = {
  todo: {
    label: "To Do",
    dot: "bg-slate-400 dark:bg-slate-400",
    colBorder: "border-slate-300 dark:border-slate-400/20",
    colBg: "bg-slate-100/80 dark:bg-slate-500/[0.03]",
    cardBorder: "border-l-slate-400 dark:border-l-slate-400",
    cardBg: "bg-white dark:bg-slate-500/[0.04]",
    cardBgDark: "dark:bg-slate-500/[0.04]",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    badgeDark: "dark:bg-slate-400/10 dark:text-slate-400 dark:border-slate-400/20",
    glow: "shadow-slate-400/5 dark:shadow-slate-400/5",
  },
  in_progress: {
    label: "In Progress",
    dot: "bg-blue-500 dark:bg-blue-500",
    colBorder: "border-blue-200 dark:border-blue-500/20",
    colBg: "bg-blue-50/80 dark:bg-blue-500/[0.03]",
    cardBorder: "border-l-blue-500 dark:border-l-blue-500",
    cardBg: "bg-white dark:bg-blue-500/[0.04]",
    cardBgDark: "dark:bg-blue-500/[0.04]",
    badge: "bg-blue-100 text-blue-600 border-blue-200",
    badgeDark: "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    glow: "shadow-blue-500/5 dark:shadow-blue-500/5",
  },
  review: {
    label: "Review",
    dot: "bg-amber-500 dark:bg-amber-500",
    colBorder: "border-amber-200 dark:border-amber-500/20",
    colBg: "bg-amber-50/80 dark:bg-amber-500/[0.03]",
    cardBorder: "border-l-amber-500 dark:border-l-amber-500",
    cardBg: "bg-white dark:bg-amber-500/[0.04]",
    cardBgDark: "dark:bg-amber-500/[0.04]",
    badge: "bg-amber-100 text-amber-600 border-amber-200",
    badgeDark: "dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    glow: "shadow-amber-500/5 dark:shadow-amber-500/5",
  },
  done: {
    label: "Done",
    dot: "bg-emerald-500 dark:bg-emerald-500",
    colBorder: "border-emerald-200 dark:border-emerald-500/20",
    colBg: "bg-emerald-50/80 dark:bg-emerald-500/[0.03]",
    cardBorder: "border-l-emerald-500 dark:border-l-emerald-500",
    cardBg: "bg-white dark:bg-emerald-500/[0.04]",
    cardBgDark: "dark:bg-emerald-500/[0.04]",
    badge: "bg-emerald-100 text-emerald-600 border-emerald-200",
    badgeDark: "dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    glow: "shadow-emerald-500/5 dark:shadow-emerald-500/5",
  },
};

const priorityColors: Record<string, { light: string; dark: string }> = {
  critical: {
    light: "bg-red-100 text-red-600 border-red-200",
    dark: "dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  },
  high: {
    light: "bg-orange-100 text-orange-600 border-orange-200",
    dark: "dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
  },
  medium: {
    light: "bg-blue-100 text-blue-600 border-blue-200",
    dark: "dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20",
  },
  low: {
    light: "bg-slate-100 text-slate-500 border-slate-200",
    dark: "dark:bg-slate-400/10 dark:text-slate-400 dark:border-slate-400/20",
  },
};

interface SortableTaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function SortableTaskCard({ task, onEdit, onDelete }: SortableTaskCardProps) {
  const { users, projects } = useApp();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const status = statusConfig[task.status] || statusConfig.todo;
  const pColors = priorityColors[task.priority] || priorityColors.medium;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const assignee = users.find((u) => u.id === task.assignedTo);
  const project = projects.find((p) => p.id === task.projectId);

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`
          rounded-xl border-l-[3px] ${status.cardBorder}
          ${status.cardBg} backdrop-blur-sm
          border border-border/50 border-l-transparent
          hover:border-border hover:shadow-lg ${status.glow}
          transition-all cursor-pointer group
        `}
      >
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-medium text-foreground leading-tight flex-1">
              {task.title}
            </h4>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div {...attributes} {...listeners} className="p-1 rounded hover:bg-accent cursor-grab active:cursor-grabbing text-muted-foreground/30">
                <GripVertical className="w-3 h-3" />
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={`text-[9px] font-medium ${status.badge} ${status.badgeDark}`}>
              {status.label}
            </Badge>
            <Badge variant="outline" className={`text-[9px] font-medium ${pColors.light} ${pColors.dark}`}>
              {task.priority.toUpperCase()}
            </Badge>
            <span className="text-[10px] text-primary/70 truncate">{project?.name?.split(" ").slice(0, 3).join(" ")}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/30">
            {assignee ? (
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[8px] font-medium">
                  {assignee.name?.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="text-[10px] text-muted-foreground">{assignee.name?.split(" ")[0]}</span>
              </div>
            ) : (
              <div />
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
    </div>
  );
}

function OverlayCard({ task }: { task: Task }) {
  const { users, projects } = useApp();
  const status = statusConfig[task.status] || statusConfig.todo;
  const pColors = priorityColors[task.priority] || priorityColors.medium;
  const assignee = users.find((u) => u.id === task.assignedTo);
  const project = projects.find((p) => p.id === task.projectId);

  return (
    <div className={`
      rounded-xl border-l-[3px] ${status.cardBorder}
      bg-card/90 backdrop-blur-md
      border border-border/80 border-l-transparent
      shadow-2xl shadow-black/40 rotate-2 scale-105
    `}>
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-medium text-foreground leading-tight">{task.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={`text-[9px] font-medium ${status.badge} ${status.badgeDark}`}>
            {status.label}
          </Badge>
          <Badge variant="outline" className={`text-[9px] font-medium ${pColors.light} ${pColors.dark}`}>
            {task.priority.toUpperCase()}
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
}

export default function KanbanBoard({ onCreateTask, onEditTask }: KanbanBoardProps) {
  const { tasks, moveTask, deleteTask } = useApp();
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-4 gap-4 min-h-[60vh]">
        {(Object.keys(statusConfig) as TaskStatus[]).map((statusId) => {
          const cfg = statusConfig[statusId];
          const columnTasks = tasks.filter((t) => t.status === statusId);
          return (
            <div key={statusId} className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  <span className="text-sm font-medium text-foreground">{cfg.label}</span>
                  <span className="text-xs text-muted-foreground">({columnTasks.length})</span>
                </div>
                {statusId === "todo" && (
                  <button
                    onClick={onCreateTask}
                    className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <SortableContext items={columnTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className={`space-y-3 min-h-[200px] rounded-xl p-2 ${cfg.colBg} border border-dashed ${cfg.colBorder}`}>
                  {columnTasks.map((task) => (
                    <SortableTaskCard
                      key={task.id}
                      task={task}
                      onEdit={onEditTask}
                      onDelete={deleteTask}
                    />
                  ))}
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
