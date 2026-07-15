"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  FolderKanban,
  CheckSquare,
  Calendar,
  Users,
  Shield,
} from "lucide-react";
import { useApp } from "@/lib/app-context";

const roleColors: Record<string, string> = {
  super_admin: "border-red-500/30 text-red-400",
  admin: "border-orange-500/30 text-orange-400",
  committee_member: "border-primary/30 text-primary",
  consultant: "border-blue-500/30 text-blue-400",
  provider_delegate: "border-emerald-500/30 text-emerald-400",
  viewer: "border-muted-foreground/30 text-muted-foreground",
};

const taskStatusColors: Record<string, string> = {
  todo: "border-slate-500/30 text-slate-400",
  in_progress: "border-blue-500/30 text-blue-400",
  review: "border-amber-500/30 text-amber-400",
  done: "border-emerald-500/30 text-emerald-400",
  blocked: "border-red-500/30 text-red-400",
};

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const router = useRouter();
  const {
    users,
    projects,
    tasks,
    meetings,
    committees,
    committeeMembers,
    meetingAttendees,
  } = useApp();

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <p className="text-muted-foreground">User not found</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  const ownedProjects = projects.filter((p) => p.ownerId === userId);
  const assignedTasks = tasks.filter((t) => t.assignedTo === userId);
  const createdTasks = tasks.filter((t) => t.createdBy === userId);
  const committeeMemberships = committeeMembers.filter(
    (cm) => cm.userId === userId
  );
  const meetingAttendances = meetingAttendees.filter(
    (ma) => ma.userId === userId
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Profile Card */}
      <Card className="glass border-border/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-medium">
              {user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-light tracking-wide text-foreground">
                  {user.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${roleColors[user.role]}`}
                  >
                    {user.role
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                  {user.department && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-border text-muted-foreground"
                    >
                      {user.department}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                Joined {formatDate(user.createdAt)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FolderKanban className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Projects Owned</p>
                <p className="text-lg font-light text-foreground">
                  {ownedProjects.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assigned Tasks</p>
                <p className="text-lg font-light text-foreground">
                  {assignedTasks.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Committees</p>
                <p className="text-lg font-light text-foreground">
                  {committeeMemberships.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Meetings Attended</p>
                <p className="text-lg font-light text-foreground">
                  {meetingAttendances.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Owned Projects */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-primary" />
              Owned Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ownedProjects.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No projects owned
              </p>
            ) : (
              <div className="space-y-2">
                {ownedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <div>
                      <p className="text-sm text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.status.replace(/_/g, " ").toUpperCase()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        project.status === "in_progress"
                          ? "border-primary/30 text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {project.priority.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assigned Tasks */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-primary" />
              Assigned Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {assignedTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No tasks assigned
              </p>
            ) : (
              <div className="space-y-2">
                {assignedTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => router.push(`/tasks/${task.id}`)}
                  >
                    <div>
                      <p className="text-sm text-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.status.replace(/_/g, " ").toUpperCase()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${taskStatusColors[task.status]}`}
                    >
                      {task.priority.toUpperCase()}
                    </Badge>
                  </div>
                ))}
                {assignedTasks.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{assignedTasks.length - 5} more tasks
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Committee Memberships */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Committee Memberships
            </CardTitle>
          </CardHeader>
          <CardContent>
            {committeeMemberships.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No committee memberships
              </p>
            ) : (
              <div className="space-y-2">
                {committeeMemberships.map((membership) => {
                  const committee = committees.find(
                    (c) => c.id === membership.committeeId
                  );
                  return (
                    <div
                      key={membership.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
                    >
                      <div>
                        <p className="text-sm text-foreground">
                          {committee?.name || "Unknown Committee"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {membership.memberRole || "Member"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] border-border text-muted-foreground"
                      >
                        {committee?.type || "general"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Meeting Attendance */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Recent Meeting Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {meetingAttendances.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No meetings attended
              </p>
            ) : (
              <div className="space-y-2">
                {meetingAttendances.slice(0, 5).map((attendance) => {
                  const meeting = meetings.find(
                    (m) => m.id === attendance.meetingId
                  );
                  return (
                    <div
                      key={attendance.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
                    >
                      <div>
                        <p className="text-sm text-foreground">
                          {meeting?.title || "Unknown Meeting"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {meeting?.scheduledAt
                            ? formatDate(meeting.scheduledAt)
                            : "Date not set"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          attendance.attended
                            ? "border-emerald-500/30 text-emerald-400"
                            : "border-muted-foreground/30 text-muted-foreground"
                        }`}
                      >
                        {attendance.attended ? "Attended" : "Absent"}
                      </Badge>
                    </div>
                  );
                })}
                {meetingAttendances.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{meetingAttendances.length - 5} more meetings
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
