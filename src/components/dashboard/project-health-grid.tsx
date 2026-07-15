"use client";

import React from "react";
import { useApp } from "@/lib/app-context";
import CircularProgress from "./circular-progress";

function getHealthColor(pct: number): string {
  if (pct >= 75) return "text-secondary";
  if (pct >= 50) return "text-primary";
  if (pct >= 25) return "text-tertiary";
  return "text-destructive";
}

function getHealthLabel(pct: number): string {
  if (pct >= 75) return "On Track";
  if (pct >= 50) return "Moderate";
  if (pct >= 25) return "At Risk";
  return "Critical";
}

export default function ProjectHealthGrid() {
  const { projects, milestones } = useApp();

  const activeProjects = projects
    .filter((p) => p.status === "in_progress" || p.status === "planning")
    .slice(0, 6);

  const projectHealth = activeProjects.map((project) => {
    const projectMilestones = milestones.filter((m) => m.projectId === project.id);
    const completed = projectMilestones.filter((m) => m.completed).length;
    const total = projectMilestones.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { project, pct, completed, total };
  });

  return (
    <section className="glass-panel p-6 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h3 className="font-headline-md text-headline-md truncate">Flagship Projects Health</h3>
        <button className="text-primary font-label-caps text-label-caps flex items-center gap-1 hover:underline shrink-0">
          VIEW FULL PORTFOLIO <span className="text-sm">→</span>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {projectHealth.map(({ project, pct, completed, total }) => (
          <div
            key={project.id}
            className="flex flex-col items-center p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer"
          >
            <CircularProgress
              percentage={pct}
              size={64}
              colorClass={getHealthColor(pct)}
            />
            <p className="text-[12px] text-center mt-2 truncate w-full text-foreground">
              {project.name}
            </p>
            <span className={`font-data-mono text-[10px] mt-1 ${getHealthColor(pct)}`}>
              {pct}% {pct < 25 ? "— Critical" : ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
