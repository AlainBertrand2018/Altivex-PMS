"use client";

import React from "react";
import { useApp } from "@/lib/app-context";

export default function NeuralInsights() {
  const { risks, projects, decisions } = useApp();

  const criticalRisks = risks.filter((r) => r.severity === "critical" && r.status !== "closed");
  const pendingDecisions = decisions.filter((d) => d.status === "proposed" || d.status === "approved");
  const activeProjects = projects.filter((p) => p.status === "in_progress");

  const prediction = criticalRisks.length > 0
    ? `${criticalRisks.length} critical risk${criticalRisks.length > 1 ? "s" : ""} requiring immediate attention across ${activeProjects.length} active project${activeProjects.length > 1 ? "s" : ""}. Recommend prioritising mitigation strategies.`
    : "All systems operating within acceptable risk thresholds. No critical issues detected.";

  const efficiency = pendingDecisions.length > 0
    ? `${pendingDecisions.length} decision${pendingDecisions.length > 1 ? "s" : ""} awaiting resolution. Average response time can be improved by escalating high-impact items.`
    : "All decisions resolved. Portfolio governance is on track.";

  return (
    <section className="glass-panel-elevated p-6 rounded-xl border-primary/20 relative overflow-hidden">
      <div className="absolute top-4 right-4 text-primary">
        <span className="text-lg">✦</span>
      </div>
      <h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
        Neural Insights
      </h3>
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="font-label-caps text-[10px] text-primary mb-1">PREDICTION</p>
          <p className="text-[13px] leading-relaxed text-foreground">
            {prediction}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <p className="font-label-caps text-[10px] text-muted-foreground mb-1">EFFICIENCY ALERT</p>
          <p className="text-[13px] leading-relaxed text-foreground">
            {efficiency}
          </p>
        </div>
      </div>
      <button className="w-full mt-6 py-2 border border-primary/30 rounded font-label-caps text-[11px] hover:bg-primary/10 transition-colors">
        GENERATE FULL REPORT
      </button>
    </section>
  );
}
