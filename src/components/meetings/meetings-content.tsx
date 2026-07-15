"use client";

import React, { useState, useMemo } from "react";
import { Meeting, MeetingStatus, Project } from "@/types";
import { useApp } from "@/lib/app-context";
import MeetingForm from "./meeting-form";
import { Filter, ChevronDown, Plus, Calendar, Users, AlertTriangle, TrendingUp, Bot, Clock, Star, MessageSquare, CheckCircle, AlertCircle, XCircle } from "lucide-react";

export default function MeetingsContent() {
  const { addMeeting, updateMeeting, meetings, projects, users, meetingReports } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "completed">("all");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  const filteredMeetings = useMemo(() => {
    let result = meetings;
    if (selectedProjectId) {
      result = result.filter((m) => m.projectId === selectedProjectId);
    }
    if (selectedStatus === "active") {
      result = result.filter((m) => m.status === "scheduled" || m.status === "in_progress");
    } else if (selectedStatus === "completed") {
      result = result.filter((m) => m.status === "completed");
    }
    return result.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }, [meetings, selectedProjectId, selectedStatus]);

  // Compute intelligence metrics
  const upcomingMeetings = meetings
    .filter((m) => m.status === "scheduled" || m.status === "in_progress")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  
  const nextMeeting = upcomingMeetings[0];
  
  const completedMeetings = meetings.filter((m) => m.status === "completed").length;
  const pendingReports = meetingReports.filter((r) => r.status === "draft").length;
  const pendingDecisions = meetingReports.filter((r) => r.status === "draft").length; // mock

  // Time until next meeting
  const getTimeRemaining = (dateStr: string) => {
    const target = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    if (diff <= 0) return "Started";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleSubmit = async (data: Omit<Meeting, "id" | "createdAt" | "updatedAt">) => {
    if (editingMeeting) {
      await updateMeeting(editingMeeting.id, data);
    } else {
      await addMeeting({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Meeting);
    }
    setShowForm(false);
    setEditingMeeting(null);
  };

  const statusConfig: Record<MeetingStatus, { label: string; color: string; bg: string; border: string; dot: string }> = {
    scheduled: { label: "SCHEDULED", color: "text-on-surface-variant", bg: "bg-surface-variant", border: "border-outline-variant/20", dot: "bg-primary" },
    in_progress: { label: "IN PROGRESS", color: "text-secondary", bg: "bg-secondary/20", border: "border-secondary/30", dot: "bg-secondary animate-pulse-emerald" },
    completed: { label: "COMPLETED", color: "text-on-surface-variant/70", bg: "bg-outline-variant/10", border: "border-outline-variant/10", dot: "bg-outline-variant" },
    cancelled: { label: "CANCELLED", color: "text-error", bg: "bg-error/10", border: "border-error/20", dot: "bg-error" },
  };

  const insightConfig = (meeting: Meeting) => {
    const report = meetingReports.find((r) => r.meetingId === meeting.id);
    if (report?.status === "final") {
      return { icon: Bot, label: "SUMMARY READY", color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/30" };
    }
    if (meeting.status === "completed") {
      return { icon: CheckCircle, label: "DECISIONS LOGGED", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" };
    }
    return { icon: AlertCircle, label: "PENDING", color: "text-on-surface-variant/40", bg: "transparent", border: "none" };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Project Filter */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Meeting Intelligence</h2>
          <p className="text-on-surface-variant font-body-sm">
            Manage coordination for{" "}
            {projects.map((p, i) => <span key={p.id} className="text-secondary">{i > 0 ? " & " : ""}{p.name}</span>)}
            .
          </p>
        </div>
        <div className="glass-panel px-6 py-4 rounded-xl flex items-center gap-6 w-full md:w-auto">
          <div>
            <p className="text-[10px] text-on-surface-variant font-label-caps mb-1">BUDGET TRACKING</p>
            <p className="font-data-mono text-xl text-on-surface font-bold">14,280,000 <span className="text-xs font-normal">MUR</span></p>
          </div>
          <div className="h-10 w-px bg-outline-variant/20"></div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-label-caps mb-1">TOTAL SESSIONS</p>
            <p className="font-data-mono text-xl text-on-surface font-bold">
              {meetings.length} <span className="text-xs font-normal opacity-50">/ month</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Meeting List Section */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          {/* Filter Bar */}
          <div className="glass-panel p-3 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`bg-surface-variant/50 text-on-surface text-[12px] font-label-caps px-4 py-1.5 rounded-lg border border-outline-variant/20 ${selectedStatus === "all" ? "bg-primary/10 text-primary border-primary/20" : "text-on-surface-variant hover:bg-white/5"}`}
              >
                ALL
              </button>
              <button
                onClick={() => setSelectedStatus("active")}
                className={`${selectedStatus === "active" ? "bg-primary/10 text-primary border-primary/20" : "text-on-surface-variant hover:bg-white/5"} bg-surface-variant/50 text-[12px] font-label-caps px-4 py-1.5 rounded-lg border border-outline-variant/20`}
              >
                ACTIVE
              </button>
              <button
                onClick={() => setSelectedStatus("completed")}
                className={`${selectedStatus === "completed" ? "bg-primary/10 text-primary border-primary/20" : "text-on-surface-variant hover:bg-white/5"} bg-surface-variant/50 text-[12px] font-label-caps px-4 py-1.5 rounded-lg border border-outline-variant/20`}
              >
                COMPLETED
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-on-surface-variant font-data-mono text-[12px]">
                Showing 1-{Math.min(filteredMeetings.length, 8)} of {filteredMeetings.length}
              </span>
              <Filter className="w-5 h-5 text-on-surface-variant hover:text-on-surface cursor-pointer" />
            </div>
          </div>

          {/* Meeting Table */}
          <div className="glass-panel rounded-2xl overflow-hidden border-outline-variant/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-outline-variant/10">
                  <th className="p-4 text-[11px] font-label-caps text-on-surface-variant">MEETING / PROJECT</th>
                  <th className="p-4 text-[11px] font-label-caps text-on-surface-variant">DATE & TIME</th>
                  <th className="p-4 text-[11px] font-label-caps text-on-surface-variant">ATTENDEES</th>
                  <th className="p-4 text-[11px] font-label-caps text-on-surface-variant text-center">AI INSIGHTS</th>
                  <th className="p-4 text-[11px] font-label-caps text-on-surface-variant">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5 font-body-sm">
                {filteredMeetings.slice(0, 8).map((meeting) => {
                  const project = projects.find((p) => p.id === meeting.projectId);
                  const statusCfg = statusConfig[meeting.status];
                  const insight = insightConfig(meeting);
                  const attendees = meetingReports
                    .filter((r) => r.meetingId === meeting.id)
                    .flatMap((r) => r.preparedBy ? [r.preparedBy] : []);
                  const meetingAttendees = users.filter((u) => u.id === meeting.projectId); // mock
                  const displayAttendees = users.slice(0, 3);
                  const extraCount = Math.max(0, users.length - 3);

                  return (
                    <tr key={meeting.id} className="hover:bg-white/2 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-on-surface flex items-center gap-2">
                            {meeting.title}
                            {meeting.status === "in_progress" && (
                              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-emerald" />
                            )}
                          </div>
                        </div>
                        <div className="text-[12px] text-on-surface-variant">{project?.name}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-data-mono text-on-surface">
                          {new Date(meeting.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                        <div className="text-[11px] text-on-surface-variant">
                          {new Date(meeting.scheduledAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })} -{" "}
                          {new Date(new Date(meeting.scheduledAt).getTime() + meeting.duration * 60000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })} ({meeting.duration}m)
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex -space-x-2">
                          {displayAttendees.map((attendee, idx) => (
                            <img
                              key={attendee.id}
                              className="w-8 h-8 rounded-full border-2 border-background ring-1 ring-outline-variant/20 object-cover"
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${attendee.id}`}
                              alt={attendee.name}
                            />
                          ))}
                          {extraCount > 0 && (
                            <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-[10px] font-bold border-2 border-background ring-1 ring-outline-variant/20">
                              +{extraCount}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {insight.border !== "none" ? (
                          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded ${insight.bg} ${insight.color} text-[10px] font-bold ${insight.border}`}>
                            <insight.icon className="w-[14px] h-[14px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                            {insight.label}
                          </div>
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant/40">auto_awesome</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color} text-[11px] font-bold ${statusCfg.border}`}>
                          {statusCfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredMeetings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                      No meetings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Intelligence Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-caps text-[11px] text-on-surface-variant tracking-wider">AI MINUTES ENGINE</h3>
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <p className="font-headline-md text-headline-md font-bold mb-2">Draft Generation</p>
              <p className="text-on-surface-variant text-body-sm mb-4">
                {pendingReports} Meeting transcripts are being processed for action item extraction.
              </p>
              <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%] shadow-[0_0_8px_rgba(192,193,255,0.5)]" />
              </div>
              <div className="flex justify-between mt-2 font-data-mono text-[10px] text-on-surface-variant">
                <span>PROCESSING</span>
                <span>65%</span>
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group border-tertiary/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-label-caps text-[11px] text-on-surface-variant tracking-wider">CRITICAL ACTIONS</h3>
                <AlertTriangle className="w-5 h-5 text-tertiary" />
              </div>
              <p className="font-headline-md text-headline-md font-bold mb-2">{pendingDecisions} Pending Approval</p>
              <p className="text-on-surface-variant text-body-sm mb-4">
                Decisions from recent meetings require your electronic signature.
              </p>
              <button className="w-full py-2 bg-tertiary/10 border border-tertiary/30 text-tertiary font-bold text-[12px] rounded-lg hover:bg-tertiary/20 transition-all">
                REVIEW ACTIONS
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          {/* Next High Priority Meeting */}
          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-primary relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10">
              <Star className="w-[160px] h-[160px] text-primary" />
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-[20px]">priority_high</span>
              <h3 className="font-label-caps text-[11px] text-primary tracking-widest">UPCOMING PRIORITY</h3>
            </div>
            {nextMeeting ? (
              <>
                <h4 className="font-headline-lg-mobile text-headline-lg-mobile font-bold leading-tight mb-2">
                  {nextMeeting.title}
                </h4>
                <p className="text-on-surface-variant font-body-sm mb-6">{nextMeeting.description || "No description"}</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center">
                      <Clock className="w-5 h-5 text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-label-caps uppercase">Time Remaining</p>
                      <p className="font-data-mono font-bold text-on-surface">
                        {nextMeeting.status === "in_progress" ? "In Progress" : getTimeRemaining(nextMeeting.scheduledAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">location_on</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-label-caps uppercase">Location</p>
                      <p className="font-data-mono font-bold text-on-surface">{nextMeeting.location || "TBD"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center">
                      <Users className="w-5 h-5 text-on-surface-variant" />
                    </div>
                    <div className="flex -space-x-2">
                      {users.slice(0, 3).map((u) => (
                        <img
                          key={u.id}
                          className="w-8 h-8 rounded-full border-2 border-background ring-1 ring-outline-variant/20 object-cover"
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`}
                          alt={u.name}
                        />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-[10px] font-bold border-2 border-background ring-1 ring-outline-variant/20">
                        +{Math.max(0, users.length - 3)}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 transition-all">
                  JOIN MEETING
                </button>
              </>
            ) : (
              <p className="text-on-surface-variant text-center py-8">No upcoming meetings</p>
            )}
          </div>

          {/* Meeting Productivity Chart */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-label-caps text-[11px] text-on-surface-variant tracking-wider">MEETING PRODUCTIVITY</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-end gap-3 h-40">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => {
                const height = [40, 65, 30, 80, 50][i];
                return (
                  <div key={day} className="flex flex-col items-center flex-1 h-full justify-end">
                    <span className="text-[10px] font-data-mono text-on-surface mb-1">{height}%</span>
                    <div className="w-full bg-primary/20 rounded-t" style={{ height: `${height}%` }} />
                    <span className="text-[10px] text-on-surface-variant font-label-caps mt-1.5">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-Time Intelligence Feed */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-label-caps text-[11px] text-on-surface-variant tracking-wider">REAL-TIME INTELLIGENCE</h3>
              <Bot className="w-5 h-5 text-tertiary" />
            </div>
            <div className="space-y-4">
              {[
                { icon: Bot, color: "text-primary", time: "2m ago", text: "AI summary generated for \"Menu Selection Final Review\"" },
                { icon: CheckCircle, color: "text-secondary", time: "15m ago", text: "Decision logged: Venue confirmed for Le Morne Grand Ballroom" },
                { icon: AlertTriangle, color: "text-tertiary", time: "1h ago", text: "Action item assigned: Finalize judge criteria for Innovation & Plating" },
                { icon: MessageSquare, color: "text-tertiary", time: "3h ago", text: "New comment on \"Supplier Negotiation: Fresh Produce\" by J. Doe" },
                { icon: XCircle, color: "text-error", time: "5h ago", text: "Meeting cancelled: Technical Rehearsal - Stage B rescheduled" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-surface-variant/30 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color} ${item.color.replace("text-", "bg-")}/10`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-on-surface">{item.text}</p>
                    <p className="text-[10px] text-on-surface-variant font-data-mono">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Form Modal */}
      {showForm && (
        <MeetingForm
          meeting={editingMeeting}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingMeeting(null);
          }}
        />
      )}
    </div>
  );
}