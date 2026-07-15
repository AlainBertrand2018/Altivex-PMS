"use client";

import React from "react";
import { useApp } from "@/lib/app-context";
import { FolderOpen, DollarSign, AlertTriangle, Clock } from "lucide-react";

function formatBudget(amount: number, currency: string): string {
  if (amount >= 1_000_000) return `${currency} ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${currency} ${(amount / 1_000).toFixed(0)}K`;
  return `${currency} ${amount}`;
}

export default function KpiCards() {
  const { projects, costItems, risks, decisions } = useApp();

  const activeProjects = projects.filter((p) => p.status === "in_progress").length;
  const totalBudgetSpent = costItems.reduce((sum, c) => sum + c.totalCost, 0);
  const openRisks = risks.filter((r) => r.status !== "closed");
  const highPriorityRisks = openRisks.filter((r) => r.severity === "critical" || r.severity === "high").length;
  const pendingDecisions = decisions.filter((d) => d.status === "proposed" || d.status === "approved");

  const cards = [
    {
      label: "ACTIVE PROJECTS",
      value: activeProjects.toString(),
      icon: FolderOpen,
      colorClass: "text-primary",
      bgClass: "bg-primary/5",
      iconBg: "bg-primary/10",
      suffix: `of ${projects.length} total`,
    },
    {
      label: "BUDGET UTILIZATION",
      value: formatBudget(totalBudgetSpent, "MUR"),
      icon: DollarSign,
      colorClass: "text-secondary",
      bgClass: "bg-secondary/5",
      iconBg: "bg-secondary/10",
      progress: {
        value: totalBudgetSpent,
        max: projects.reduce((s, p) => s + p.budgetApproved, 0),
      },
    },
    {
      label: "ACTIVE RISKS",
      value: openRisks.length.toString().padStart(2, "0"),
      icon: AlertTriangle,
      colorClass: "text-destructive",
      bgClass: "bg-destructive/5",
      iconBg: "bg-destructive/10",
      suffix: highPriorityRisks > 0 ? `${highPriorityRisks} High Priority` : "All Clear",
    },
    {
      label: "PENDING DECISIONS",
      value: pendingDecisions.length.toString().padStart(2, "0"),
      icon: Clock,
      colorClass: "text-tertiary",
      bgClass: "bg-tertiary/5",
      iconBg: "bg-tertiary/10",
      suffix: "Awaiting action",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <div key={card.label} className="col-span-12 lg:col-span-3">
          <div className="glass-panel p-5 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.bgClass} rounded-full -mr-8 -mt-8 transition-all group-hover:scale-125`} />
            <div className="flex justify-between items-start min-w-0">
              <span className="text-muted-foreground font-label-caps text-label-caps truncate">{card.label}</span>
              <div className={`p-1.5 rounded-lg ${card.iconBg} shrink-0`}>
                <card.icon className={`w-4 h-4 ${card.colorClass}`} />
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-display text-4xl font-bold block truncate">{card.value}</span>
              {card.suffix && (
                <span className={`${card.colorClass} font-data-mono text-xs ml-2 truncate block`}>{card.suffix}</span>
              )}
              {card.progress && (
                <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all"
                    style={{ width: `${Math.min((card.progress.value / card.progress.max) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
