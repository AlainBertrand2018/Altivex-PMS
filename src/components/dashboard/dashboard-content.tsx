"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import KpiCards from "./kpi-cards";
import ProjectHealthGrid from "./project-health-grid";
import CriticalRiskMatrix from "./critical-risk-matrix";
import NeuralInsights from "./neural-insights";
import OperationsSync from "./operations-sync";

export default function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in overflow-hidden">
      {/* Headline Row */}
      <div className="flex justify-between items-end gap-4">
        <div className="min-w-0">
          <h2 className="text-headline-lg font-headline-lg text-on-surface">
            Welcome back, {user?.name?.split(" ")[0]}
          </h2>
          <p className="text-muted-foreground text-body-sm mt-1">
            Real-time overview of your project portfolio.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-muted-foreground font-data-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)] animate-pulse-dot" />
            SYSTEMS NOMINAL
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-muted-foreground font-data-mono text-[11px]">
            LAST SYNC: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-12 gap-4">
        <KpiCards />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column: Health + Risks */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          <ProjectHealthGrid />
          <CriticalRiskMatrix />
        </div>

        {/* Right Column: Insights + Meetings */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <NeuralInsights />
          <OperationsSync />
        </div>
      </div>
    </div>
  );
}
