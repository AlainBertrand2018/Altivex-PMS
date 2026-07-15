"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, MapPin, Users, FileText, Plus, Pencil, Trash2 } from "lucide-react";
import { Meeting } from "@/types";
import { useApp } from "@/lib/app-context";
import MeetingForm from "./meeting-form";

const statusColors: Record<string, string> = {
  scheduled: "border-blue-500/30 text-blue-400",
  in_progress: "border-primary/30 text-primary",
  completed: "border-emerald-500/30 text-emerald-400",
  cancelled: "border-muted-foreground/30 text-muted-foreground",
};

export default function MeetingsContent() {
  const { meetings, projects, users, meetingAttendees, meetingReports, addMeeting, updateMeeting, deleteMeeting } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  const handleSubmit = (data: Omit<Meeting, "id" | "createdAt" | "updatedAt">) => {
    if (editingMeeting) {
      updateMeeting(editingMeeting.id, data);
    } else {
      addMeeting({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Meeting);
    }
    setShowForm(false);
    setEditingMeeting(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Meetings</h1>
          <p className="text-muted-foreground mt-1">AI-powered meeting intelligence</p>
        </div>
        <button onClick={() => { setEditingMeeting(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
          <Plus className="w-4 h-4" />
          Schedule Meeting
        </button>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => {
          const project = projects.find((p) => p.id === meeting.projectId);
          const attendees = meetingAttendees
            .filter((a) => a.meetingId === meeting.id)
            .map((a) => ({
              ...a,
              user: a.userId ? users.find((u) => u.id === a.userId) : undefined,
            }));
          const hasReport = meetingReports.some((r) => r.meetingId === meeting.id);

          return (
            <Card key={meeting.id} className="glass border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{meeting.title}</h3>
                      <Badge variant="outline" className={`text-[10px] ${statusColors[meeting.status]}`}>
                        {meeting.status.replace(/_/g, " ").toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{meeting.description}</p>
                    <p className="text-xs text-primary/70">{project?.name}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
                    <button onClick={(e) => { e.stopPropagation(); setEditingMeeting(meeting); setShowForm(true); }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteMeeting(meeting.id); }} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CalendarClock className="w-3.5 h-3.5" />
                    <span>
                      {new Date(meeting.scheduledAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                    <span className="text-muted-foreground/50">({meeting.duration}min)</span>
                  </div>
                  {meeting.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{meeting.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-muted-foreground mr-1" />
                    <div className="flex -space-x-2">
                      {attendees.slice(0, 5).map((a, i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[9px] font-medium border-2 border-background" title={a.user?.name}>
                          {a.user?.name?.split(" ").map((n) => n[0]).join("")}
                        </div>
                      ))}
                      {attendees.length > 5 && (
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-[9px] font-medium border-2 border-background">
                          +{attendees.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {hasReport && (
                      <span className="flex items-center gap-1 text-primary"><FileText className="w-3 h-3" /> Report</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showForm && (
        <MeetingForm
          meeting={editingMeeting}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingMeeting(null); }}
        />
      )}
    </div>
  );
}
