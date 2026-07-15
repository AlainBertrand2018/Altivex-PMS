"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { useApp } from "@/lib/app-context";

export default function IntelligenceContent() {
  const { projects, risks, milestones } = useApp();

  const projectsWithRisks = projects.map((project) => {
    const projectRisks = risks.filter((r) => r.projectId === project.id && r.status !== "closed");
    const highRisks = projectRisks.filter((r) => r.severity === "high" || r.severity === "critical");
    const healthScore = Math.max(0, 100 - (projectRisks.length * 10) - (highRisks.length * 15));
    return { project, risks: projectRisks, healthScore };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Intelligence</h1>
          <p className="text-muted-foreground mt-1">AI-powered project insights and risk analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projectsWithRisks.map(({ project, risks: projectRisks, healthScore }) => {
          const projectMilestones = milestones.filter((m) => m.projectId === project.id);
          const completedMs = projectMilestones.filter((m) => m.completed).length;
          const totalMs = projectMilestones.length;
          const approved = project.budgetApproved;
          const spent = project.budgetSpent;
          const budgetPct = approved > 0 ? Math.round((spent / approved) * 100) : 0;
          const nextMs = projectMilestones.find((m) => !m.completed);

          return (
            <Card key={project.id} className="glass border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground">{project.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`text-2xl font-light ${healthScore >= 70 ? "text-emerald-400" : healthScore >= 40 ? "text-amber-400" : "text-destructive"}`}>
                      {healthScore}
                    </div>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                  </div>
                </div>
                <Progress value={healthScore} className="h-1.5" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" />
                    Active Risks ({projectRisks.length})
                  </h4>
                  {projectRisks.length === 0 ? (
                    <p className="text-xs text-muted-foreground/50">No active risks</p>
                  ) : (
                    projectRisks.map((risk) => (
                      <div key={risk.id} className="p-2.5 rounded-lg bg-muted/20 border border-border/30 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-[9px] ${risk.severity === "high" || risk.severity === "critical" ? "border-destructive/30 text-destructive" : "border-amber-500/30 text-amber-400"}`}>
                            {risk.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-[9px] border-border text-muted-foreground">
                            {risk.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-foreground">{risk.title}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3 h-3 text-primary" />
                    AI Recommendations
                  </h4>
                  <div className="space-y-1.5">
                    <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs text-foreground/80">Consider accelerating milestone {nextMs?.name || "next deliverable"} to maintain momentum.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs text-foreground/80">Budget utilization at {budgetPct}% — monitor spending rate against timeline.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3" />
                    Key Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-muted/20 text-center">
                      <p className="text-lg font-light text-foreground">{completedMs}/{totalMs}</p>
                      <p className="text-[10px] text-muted-foreground">Milestones</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-muted/20 text-center">
                      <p className="text-lg font-light text-foreground">{budgetPct}%</p>
                      <p className="text-[10px] text-muted-foreground">Budget Used</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
