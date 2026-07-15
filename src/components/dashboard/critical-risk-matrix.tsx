"use client";

import React from "react";
import { useApp } from "@/lib/app-context";
import { Risk } from "@/types";

function getSeverityStyle(severity: Risk["severity"]): string {
  switch (severity) {
    case "critical": return "bg-destructive/10 text-destructive";
    case "high": return "bg-tertiary/10 text-tertiary";
    case "medium": return "bg-primary/10 text-primary";
    case "low": return "bg-muted text-muted-foreground";
  }
}

function getStatusColor(status: Risk["status"]): string {
  switch (status) {
    case "mitigated": return "text-secondary";
    case "monitoring": return "text-tertiary";
    case "identified": return "text-muted-foreground";
    case "closed": return "text-secondary";
  }
}

function getStatusDot(status: Risk["status"]): string {
  switch (status) {
    case "mitigated": return "bg-secondary shadow-[0_0_8px_var(--secondary)]";
    case "monitoring": return "bg-tertiary shadow-[0_0_8px_#ffb95f]";
    case "identified": return "bg-outline-variant";
    case "closed": return "bg-secondary";
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CriticalRiskMatrix() {
  const { risks, users, projects } = useApp();

  const topRisks = risks
    .filter((r) => r.status !== "closed")
    .sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 };
      return order[a.severity] - order[b.severity];
    })
    .slice(0, 5);

  return (
    <section className="glass-panel rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex justify-between items-center gap-4">
        <h3 className="font-headline-md text-headline-md truncate">Critical Risk Matrix</h3>
        <div className="flex gap-2 shrink-0">
          <button className="glass-panel px-3 py-1 text-[11px] font-label-caps rounded flex items-center gap-1">
            <span className="text-sm">⬇</span> FILTER
          </button>
          <button className="glass-panel px-3 py-1 text-[11px] font-label-caps rounded flex items-center gap-1">
            <span className="text-sm">↓</span> EXPORT
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/[0.02] text-muted-foreground font-label-caps text-[10px] uppercase tracking-wider">
              <th className="px-6 py-3">Risk Identification</th>
              <th className="px-6 py-3">Impact</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Assigned Owner</th>
              <th className="px-6 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/[0.04]">
            {topRisks.map((risk) => {
              const owner = users.find((u) => u.id === risk.owner);
              const project = projects.find((p) => p.id === risk.projectId);
              return (
                <tr key={risk.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 max-w-0">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold truncate">{risk.title}</span>
                      <span className="text-[10px] text-muted-foreground font-data-mono truncate">
                        PROJECT: {project?.name?.slice(0, 20) || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getSeverityStyle(risk.severity)}`}>
                      {risk.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-data-mono text-xs capitalize whitespace-nowrap">{risk.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-[10px] text-on-primary-container font-bold shrink-0">
                        {owner ? getInitials(owner.name) : "—"}
                      </div>
                      <span className="text-sm truncate">{owner?.name || "Unassigned"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <span className={`flex justify-end items-center gap-1 ${getStatusColor(risk.status)}`}>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${getStatusDot(risk.status)}`} />
                      <span className="capitalize text-sm">{risk.status}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
