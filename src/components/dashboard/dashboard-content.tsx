"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FolderKanban,
  CalendarClock,
  CheckSquare,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/auth-context";

export default function DashboardContent() {
  const { user } = useAuth();
  const { projects, meetings, tasks, risks, decisions } = useApp();

  const activeProjects = projects.filter((p) => p.status === "in_progress").length;
  const upcomingMeetings = meetings.filter((m) => m.status === "scheduled").length;
  const pendingTasks = tasks.filter((t) => t.status !== "done").length;
  const openRisks = risks.filter((r) => r.status === "identified" || r.status === "monitoring").length;

  const stats = [
    { label: "Active Projects", value: activeProjects, icon: FolderKanban, color: "text-primary" },
    { label: "Upcoming Meetings", value: upcomingMeetings, icon: CalendarClock, color: "text-blue-400" },
    { label: "Pending Tasks", value: pendingTasks, icon: CheckSquare, color: "text-amber-400" },
    { label: "Open Risks", value: openRisks, icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-light tracking-wide text-foreground">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">Here&apos;s your project intelligence overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-light text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {projects.filter((p) => p.status === "in_progress").map((project) => {
              const spent = project.budgetSpent;
              const approved = project.budgetApproved;
              const progress = approved > 0 ? Math.round((spent / approved) * 100) : 0;

              return (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{project.name}</span>
                    <span className="text-xs text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.budgetCurrency} {(spent / 1000000).toFixed(1)}M spent</span>
                    <span>{project.budgetCurrency} {(approved / 1000000).toFixed(1)}M approved</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {meetings.filter((m) => m.status === "scheduled").map((meeting) => (
              <div key={meeting.id} className="p-3 rounded-lg bg-muted/30 border border-border/30">
                <p className="text-sm text-foreground font-medium">{meeting.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(meeting.scheduledAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}

            {decisions.filter((d) => d.status === "proposed").map((decision) => (
              <div key={decision.id} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400">
                    PENDING
                  </Badge>
                </div>
                <p className="text-sm text-foreground mt-1.5">{decision.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Impact: {decision.impact}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Active Risks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {risks.filter((r) => r.status !== "closed").map((risk) => (
              <div key={risk.id} className="p-4 rounded-lg bg-muted/20 border border-border/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      risk.severity === "high"
                        ? "border-destructive/30 text-destructive"
                        : risk.severity === "medium"
                        ? "border-amber-500/30 text-amber-400"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {risk.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                    {risk.category}
                  </Badge>
                </div>
                <p className="text-sm text-foreground">{risk.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{risk.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
