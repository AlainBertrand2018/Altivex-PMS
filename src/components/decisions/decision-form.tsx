"use client";

import React, { useState } from "react";
import { Decision, DecisionStatus, DecisionImpact } from "@/types";
import { useApp } from "@/lib/app-context";

interface DecisionFormProps {
  decision?: Decision | null;
  onSubmit: (data: Omit<Decision, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export default function DecisionForm({ decision, onSubmit, onCancel }: DecisionFormProps) {
  const { projects, meetings, users } = useApp();

  const [title, setTitle] = useState(decision?.title || "");
  const [description, setDescription] = useState(decision?.description || "");
  const [projectId, setProjectId] = useState(decision?.projectId || "");
  const [meetingId, setMeetingId] = useState(decision?.meetingId || "");
  const [status, setStatus] = useState<DecisionStatus>(decision?.status || "proposed");
  const [impact, setImpact] = useState<DecisionImpact>(decision?.impact || "medium");
  const [rationale, setRationale] = useState(decision?.rationale || "");
  const [decidedBy, setDecidedBy] = useState<string[]>(decision?.decidedBy || []);

  const toggleDecider = (userId: string) => {
    setDecidedBy((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      projectId,
      meetingId,
      decidedBy,
      status,
      impact,
      rationale: rationale || undefined,
      actionItemIds: decision?.actionItemIds || [],
      decidedAt: decision?.decidedAt || new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div className="glass rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-medium text-foreground mb-6">{decision ? "Edit Decision" : "Record Decision"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px] resize-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
              <label className="text-sm font-medium text-foreground">Meeting</label>
              <select value={meetingId} onChange={(e) => setMeetingId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                <option value="">Select meeting</option>
                {meetings.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as DecisionStatus)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="proposed">Proposed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="deferred">Deferred</option>
                <option value="implemented">Implemented</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Impact</label>
              <select value={impact} onChange={(e) => setImpact(e.target.value as DecisionImpact)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Rationale</label>
            <textarea value={rationale} onChange={(e) => setRationale(e.target.value)} placeholder="Why was this decision made?" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px] resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Decided By</label>
            <div className="flex flex-wrap gap-2">
              {users.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => toggleDecider(u.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    decidedBy.includes(u.id)
                      ? "bg-primary/20 border-primary/30 text-primary"
                      : "bg-muted/30 border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  {u.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              {decision ? "Update" : "Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
