"use client";

import React, { useState } from "react";
import { Document, DocumentType } from "@/types";
import { useApp } from "@/lib/app-context";

interface DocumentFormProps {
  document?: Document | null;
  onSubmit: (data: Omit<Document, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export default function DocumentForm({ document: doc, onSubmit, onCancel }: DocumentFormProps) {
  const { projects, meetings, users } = useApp();

  const [name, setName] = useState(doc?.name || "");
  const [type, setType] = useState<DocumentType>(doc?.type || "report");
  const [projectId, setProjectId] = useState(doc?.projectId || "");
  const [meetingId, setMeetingId] = useState(doc?.meetingId || "");
  const [uploadedBy] = useState(doc?.uploadedBy || "usr_001");
  const [tags, setTags] = useState(doc?.tags?.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      type,
      projectId,
      meetingId: meetingId || undefined,
      fileUrl: doc?.fileUrl || "/documents/placeholder.pdf",
      fileSize: doc?.fileSize || 0,
      mimeType: doc?.mimeType || "application/pdf",
      uploadedBy,
      summary: doc?.summary,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      version: doc?.version ? doc.version + 1 : 1,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div className="glass rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-medium text-foreground mb-6">{doc ? "Edit Document" : "Add Document"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Document Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as DocumentType)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="contract">Contract</option>
                <option value="report">Report</option>
                <option value="proposal">Proposal</option>
                <option value="invoice">Invoice</option>
                <option value="plan">Plan</option>
                <option value="specification">Specification</option>
                <option value="correspondence">Correspondence</option>
                <option value="other">Other</option>
              </select>
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
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Associated Meeting (optional)</label>
            <select value={meetingId} onChange={(e) => setMeetingId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">None</option>
              {meetings.map((m) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tags (comma-separated)</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., feasibility, infrastructure" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              {doc ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
