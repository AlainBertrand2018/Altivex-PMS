"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Project, ProjectStatus, ProjectPriority } from "@/types";
import { useApp } from "@/lib/app-context";

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const { committees, users } = useApp();

  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState<ProjectStatus>(project?.status || "envision");
  const [priority, setPriority] = useState<ProjectPriority>(project?.priority || "medium");
  const [committeeId, setCommitteeId] = useState(project?.committeeId || "");
  const [ownerId, setOwnerId] = useState(project?.ownerId || "");
  const [estimatedBudget, setEstimatedBudget] = useState(project?.budgetEstimated?.toString() || "");
  const [approvedBudget, setApprovedBudget] = useState(project?.budgetApproved?.toString() || "");
  const [currency, setCurrency] = useState(project?.budgetCurrency || "MUR");
  const [startDate, setStartDate] = useState(project?.timelineStartDate || "");
  const [endDate, setEndDate] = useState(project?.timelineEndDate || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name,
      description,
      status,
      priority,
      committeeId,
      ownerId,
      budgetEstimated: Number(estimatedBudget) || 0,
      budgetApproved: Number(approvedBudget) || 0,
      budgetSpent: project?.budgetSpent || 0,
      budgetCurrency: currency,
      timelineStartDate: startDate || undefined,
      timelineEndDate: endDate || undefined,
      tags: project?.tags || [],
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="glass-modal rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-lg font-medium text-foreground mb-6">{project ? "Edit Project" : "Create Project"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px] resize-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="envision">Envision</option>
                <option value="planning">Planning</option>
                <option value="approved">Approved</option>
                <option value="in_progress">In Progress</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as ProjectPriority)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Committee</label>
              <select value={committeeId} onChange={(e) => setCommitteeId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                <option value="">Select committee</option>
                {committees.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Owner</label>
              <select value={ownerId} onChange={(e) => setOwnerId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                <option value="">Select owner</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Est. Budget</label>
              <input type="number" value={estimatedBudget} onChange={(e) => setEstimatedBudget(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Approved Budget</label>
              <input type="number" value={approvedBudget} onChange={(e) => setApprovedBudget(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="MUR">MUR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              {project ? "Update" : "Create"}
            </button>
          </div>
        </form>
        </div>
    </div>,
    document.body
  );
}
