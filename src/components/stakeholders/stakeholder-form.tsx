"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Stakeholder, StakeholderCategory, StakeholderInfluence, StakeholderInterest } from "@/types";
import { useApp } from "@/lib/app-context";

interface StakeholderFormProps {
  stakeholder?: Stakeholder | null;
  onSubmit: (data: Omit<Stakeholder, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onCancel: () => void;
}

export default function StakeholderForm({ stakeholder, onSubmit, onCancel }: StakeholderFormProps) {
  const { projects, users } = useApp();

  const [userId, setUserId] = useState(stakeholder?.userId || "");
  const [name, setName] = useState(stakeholder?.name || "");
  const [projectId, setProjectId] = useState(stakeholder?.projectId || "");
  const [category, setCategory] = useState<StakeholderCategory>(stakeholder?.category || "external");
  const [influence, setInfluence] = useState<StakeholderInfluence>(stakeholder?.influence || "medium");
  const [interest, setInterest] = useState<StakeholderInterest>(stakeholder?.interest || "medium");
  const [role, setRole] = useState(stakeholder?.role || "");
  const [notes, setNotes] = useState(stakeholder?.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      userId: userId || undefined,
      name: name || undefined,
      projectId,
      category,
      influence,
      interest,
      role,
      notes,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="glass-modal rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-lg font-medium text-foreground mb-6">{stakeholder ? "Edit Stakeholder" : "Add Stakeholder"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">User (optional)</label>
              <select value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">External (no account)</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Stakeholder name (if no user account)" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project</label>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required>
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Role</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g., Executive Sponsor, Technical Lead" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as StakeholderCategory)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="external">External</option>
                <option value="executive">Executive</option>
                <option value="government">Government</option>
                <option value="sponsor">Sponsor</option>
                <option value="media">Media</option>
                <option value="academic">Academic</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Influence</label>
              <select value={influence} onChange={(e) => setInfluence(e.target.value as StakeholderInfluence)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Interest</label>
              <select value={interest} onChange={(e) => setInterest(e.target.value as StakeholderInterest)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes about this stakeholder" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px] resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              {stakeholder ? "Update" : "Add"}
            </button>
          </div>
        </form>
        </div>
    </div>,
    document.body
  );
}
