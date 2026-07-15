"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/app-context";
import { Committee, CommitteeType } from "@/types";
import {
  Plus, Pencil, Trash2, Siren,
} from "lucide-react";
import { createPortal } from "react-dom";

const typeConfig: Record<CommitteeType, { label: string; color: string; bg: string }> = {
  executive: { label: "EXECUTIVE", color: "text-error", bg: "bg-error/10" },
  steering: { label: "STEERING", color: "text-primary", bg: "bg-primary/10" },
  governance: { label: "GOVERNANCE", color: "text-tertiary", bg: "bg-tertiary/10" },
  advisory: { label: "ADVISORY", color: "text-secondary", bg: "bg-secondary/10" },
  sub_committee: { label: "SUB-COMMITTEE", color: "text-on-surface-variant", bg: "bg-surface-variant" },
};

export default function CommitteesContent() {
  const { committees, addCommittee, updateCommittee, deleteCommittee } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<Committee, "id" | "createdAt" | "updatedAt">) => {
    if (editingCommittee) {
      await updateCommittee(editingCommittee, data);
    } else {
      await addCommittee(data as Committee);
    }
    setShowForm(false);
    setEditingCommittee(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Committees</h1>
          <p className="text-muted-foreground mt-1">Governing bodies that oversee projects</p>
        </div>
        <button
          onClick={() => { setEditingCommittee(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Committee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {committees.map((committee) => {
          const tc = typeConfig[committee.type] || typeConfig.steering;
          return (
            <div
              key={committee.id}
              className="glass-card rounded-xl p-5 space-y-4 border border-border/50 hover:border-border transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${tc.bg} flex items-center justify-center`}>
                    <Siren className={`w-5 h-5 ${tc.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{committee.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tc.bg} ${tc.color}`}>
                      {tc.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditingCommittee(committee.id); setShowForm(true); }}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => { if (confirm("Delete this committee?")) await deleteCommittee(committee.id); }}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-error transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{committee.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {committee.parentCommitteeId && (
                  <span>Parent committee exists</span>
                )}
                {committee.projectId && (
                  <span>Linked to a project</span>
                )}
                {!committee.parentCommitteeId && !committee.projectId && (
                  <span>Independent committee</span>
                )}
              </div>
            </div>
          );
        })}
        {committees.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-on-surface-variant">
            <Siren className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No committees yet</p>
            <p className="text-sm mt-1">Create your first committee to get started</p>
          </div>
        )}
      </div>

      {showForm && createPortal(
        <CommitteeForm
          committee={editingCommittee ? committees.find((c) => c.id === editingCommittee) ?? null : null}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingCommittee(null); }}
        />,
        document.body
      )}
    </div>
  );
}

function CommitteeForm({
  committee,
  onSubmit,
  onCancel,
}: {
  committee: Committee | null;
  onSubmit: (data: Omit<Committee, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(committee?.name || "");
  const [description, setDescription] = useState(committee?.description || "");
  const [type, setType] = useState<CommitteeType>(committee?.type || "steering");
  const [projectId, setProjectId] = useState(committee?.projectId || "");
  const [parentCommitteeId, setParentCommitteeId] = useState(committee?.parentCommitteeId || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name,
      description,
      type,
      projectId: projectId || undefined,
      parentCommitteeId: parentCommitteeId || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="glass-modal rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-medium text-foreground mb-6">{committee ? "Edit Committee" : "Create Committee"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name</label>
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
              <label className="text-sm font-medium text-foreground">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as CommitteeType)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="steering">Steering</option>
                <option value="executive">Executive</option>
                <option value="governance">Governance</option>
                <option value="advisory">Advisory</option>
                <option value="sub_committee">Sub-Committee</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Project ID (optional)</label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="Leave blank for independent"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
            >
              {committee ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
