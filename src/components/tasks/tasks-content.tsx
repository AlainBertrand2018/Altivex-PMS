"use client";

import React, { useState } from "react";
import { Task } from "@/types";
import { useApp } from "@/lib/app-context";
import KanbanBoard from "./kanban-board";
import TaskForm from "./task-form";

export default function TasksContent() {
  const { addTask, updateTask } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSubmit = (data: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask({
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Kanban board — drag and manage project tasks</p>
        </div>
      </div>

      <KanbanBoard
        onCreateTask={() => { setEditingTask(null); setShowForm(true); }}
        onEditTask={(task) => { setEditingTask(task); setShowForm(true); }}
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
