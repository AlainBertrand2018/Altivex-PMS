"use client";

import React, { useState } from "react";
import { Meeting, MeetingStatus } from "@/types";
import { useApp } from "@/lib/app-context";

interface MeetingFormProps {
  meeting?: Meeting | null;
  onSubmit: (data: Omit<Meeting, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export default function MeetingForm({ meeting, onSubmit, onCancel }: MeetingFormProps) {
  const { projects, committees } = useApp();

  const [title, setTitle] = useState(meeting?.title || "");
  const [description, setDescription] = useState(meeting?.description || "");
  const [projectId, setProjectId] = useState(meeting?.projectId || "");
  const [committeeId, setCommitteeId] = useState(meeting?.committeeId || "");
  const [status, setStatus] = useState<MeetingStatus>(meeting?.status || "scheduled");
  const [scheduledAt, setScheduledAt] = useState(meeting?.scheduledAt ? new Date(meeting.scheduledAt).toISOString().slice(0, 16) : "");
  const [duration, setDuration] = useState(meeting?.duration?.toString() || "60");
  const [location, setLocation] = useState(meeting?.location || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      projectId,
      committeeId,
      status,
      scheduledAt: new Date(scheduledAt).toISOString(),
      duration: Number(duration),
      location: location || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div className="glass rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-medium text-foreground mb-6">{meeting ? "Edit Meeting" : "Schedule Meeting"}</h2>
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
              <label className="text-sm font-medium text-foreground">Committee</label>
              <select value={committeeId} onChange={(e) => setCommitteeId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                <option value="">Select committee</option>
                {committees.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as MeetingStatus)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Duration (min)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date & Time</label>
            <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Boardroom A or Virtual link" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              {meeting ? "Update" : "Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
