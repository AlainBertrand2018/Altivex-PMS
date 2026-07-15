"use client";

import React from "react";
import { useApp } from "@/lib/app-context";

function formatMeetingDate(dateStr: string): { month: string; day: string } {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate().toString(),
  };
}

function formatMeetingTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function getBorderColor(index: number): string {
  const colors = ["border-primary/30", "border-secondary/30", "border-white/10"];
  return colors[index % colors.length];
}

export default function OperationsSync() {
  const { meetings } = useApp();

  const upcomingMeetings = meetings
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 3);

  return (
    <section className="glass-panel p-6 rounded-xl overflow-hidden">
      <h3 className="font-headline-md text-headline-md mb-4">Operations Sync</h3>
      <div className="space-y-4">
        {upcomingMeetings.map((meeting, i) => {
          const { month, day } = formatMeetingDate(meeting.scheduledAt);
          return (
            <div key={meeting.id} className="flex gap-4 min-w-0">
              <div className="flex-none text-center w-12">
                <p className="font-label-caps text-[10px] text-muted-foreground">{month}</p>
                <p className="font-headline-md text-headline-md leading-none">{day}</p>
              </div>
              <div className={`flex-1 border-l ${getBorderColor(i)} pl-4 min-w-0`}>
                <p className="font-body-sm font-bold truncate">{meeting.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[14px]">🕐</span>
                  <span className="font-data-mono text-[11px]">{formatMeetingTime(meeting.scheduledAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
