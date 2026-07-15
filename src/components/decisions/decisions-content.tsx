"use client";

import React, { useState, useMemo } from "react";
import { Decision, DecisionImpact, DecisionStatus, Project, Meeting } from "@/types";
import { useApp } from "@/lib/app-context";
import DecisionForm from "./decision-form";
import {
  Filter, Plus, Search, AlertTriangle, TrendingUp, CheckCircle,
  Clock, ChevronDown, History, FileText, X, Link as LinkIcon,
} from "lucide-react";

export default function DecisionsContent() {
  const { decisions, projects, users, meetings, addDecision, updateDecision, deleteDecision } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingDecision, setEditingDecision] = useState<Decision | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDecisions = useMemo(() => {
    let result = decisions;
    if (selectedProjectId) {
      result = result.filter((d) => d.projectId === selectedProjectId);
    }
    if (criticalOnly) {
      result = result.filter((d) => d.impact === "critical");
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.rationale?.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.decidedAt).getTime() - new Date(a.decidedAt).getTime());
  }, [decisions, selectedProjectId, criticalOnly, searchQuery]);

  const pendingCount = decisions.filter((d) => d.status === "proposed").length;
  const criticalCount = decisions.filter((d) => d.impact === "critical").length;
  const implementedCount = decisions.filter((d) => d.status === "implemented").length;
  const implementationRate = decisions.length > 0 ? ((implementedCount / decisions.length) * 100).toFixed(1) : "0.0";

  const selectedDecision = decisions.find((d) => d.id === selectedDecisionId) || null;

  const handleSubmit = async (data: Omit<Decision, "id" | "createdAt" | "updatedAt">) => {
    if (editingDecision) {
      await updateDecision(editingDecision.id, data);
    } else {
      await addDecision({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Decision);
    }
    setShowForm(false);
    setEditingDecision(null);
  };

  const statusConfig: Record<DecisionStatus, { label: string; color: string; bg: string; border: string }> = {
    proposed: { label: "PROPOSED", color: "text-tertiary", bg: "bg-tertiary/10", border: "border-tertiary/20" },
    approved: { label: "APPROVED", color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20" },
    rejected: { label: "REJECTED", color: "text-error", bg: "bg-error/10", border: "border-error/20" },
    deferred: { label: "DEFERRED", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    implemented: { label: "IMPLEMENTED", color: "text-secondary", bg: "bg-secondary-container/20", border: "border-secondary/20" },
  };

  const impactConfig: Record<DecisionImpact, { label: string; color: string; bg: string; border: string; dot: string }> = {
    critical: { label: "CRITICAL", color: "text-error", bg: "bg-error/10", border: "border-error/20", dot: "bg-error" },
    high: { label: "HIGH", color: "text-tertiary", bg: "bg-tertiary/10", border: "border-tertiary/20", dot: "bg-tertiary" },
    medium: { label: "MEDIUM", color: "text-on-surface-variant", bg: "bg-outline-variant/20", border: "border-outline-variant/20", dot: "bg-outline" },
    low: { label: "LOW", color: "text-on-surface-variant", bg: "bg-outline-variant/20", border: "border-outline-variant/20", dot: "bg-outline" },
  };

  const getImplementationProgress = (status: DecisionStatus): number => {
    switch (status) {
      case "implemented": return 100;
      case "approved": return 50;
      case "proposed": return 10;
      case "deferred": return 5;
      case "rejected": return 0;
    }
  };

  const selectedProject = selectedDecision ? projects.find((p) => p.id === selectedDecision.projectId) : null;
  const selectedMeeting = selectedDecision ? meetings.find((m) => m.id === selectedDecision.meetingId) : null;
  const selectedDeciders = selectedDecision
    ? selectedDecision.decidedBy.map((id) => users.find((u) => u.id === id)).filter(Boolean)
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Decision Register</h2>
          <p className="text-on-surface-variant font-body-sm">Centralized ledger of strategic project determinations.</p>
        </div>
        <div className="flex gap-3 items-center">
          {/* Project Filter */}
          <div className="relative">
            <button
              onClick={() => setShowProjectDropdown(!showProjectDropdown)}
              className="glass-panel px-4 py-2 rounded-xl text-[12px] font-label-caps text-on-surface-variant hover:text-on-surface flex items-center gap-2 transition-colors"
            >
              {selectedProjectId ? projects.find((p) => p.id === selectedProjectId)?.name || "Project" : "All Projects"}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showProjectDropdown && (
              <div className="absolute top-full mt-1 left-0 z-50 glass-panel rounded-xl border border-outline-variant/20 py-1 min-w-[180px] shadow-xl">
                <button
                  onClick={() => { setSelectedProjectId(null); setShowProjectDropdown(false); }}
                  className="w-full px-4 py-2 text-left text-[12px] font-body-sm text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors"
                >
                  All Projects
                </button>
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProjectId(p.id); setShowProjectDropdown(false); }}
                    className="w-full px-4 py-2 text-left text-[12px] font-body-sm text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Critical Only Toggle */}
          <div className="flex items-center gap-1 bg-surface-container-high/50 rounded-xl border border-outline-variant/10 p-1">
            <button
              onClick={() => setCriticalOnly(false)}
              className={`px-4 py-1.5 rounded-lg text-[12px] font-label-caps transition-colors ${!criticalOnly ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              ALL
            </button>
            <button
              onClick={() => setCriticalOnly(true)}
              className={`px-4 py-1.5 rounded-lg text-[12px] font-label-caps transition-colors ${criticalOnly ? "bg-error/10 text-error" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              CRITICAL ONLY
            </button>
          </div>
          {/* New Decision Button */}
          <button
            onClick={() => { setEditingDecision(null); setShowForm(true); }}
            className="bg-primary text-on-primary px-6 py-2 rounded-xl font-bold font-body-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:brightness-110 transition-all"
          >
            <Plus className="w-4 h-4" />
            Log New Decision
          </button>
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Approval */}
        <div className="glass-card p-6 rounded-2xl flex justify-between items-start">
          <div>
            <p className="font-label-caps text-[11px] text-on-surface-variant mb-2">Pending Approval</p>
            <h3 className="font-display text-[32px] font-bold text-on-surface">{String(pendingCount).padStart(2, "0")}</h3>
            <div className="flex items-center gap-1 mt-2 text-primary">
              <TrendingUp className="w-4 h-4" />
              <span className="font-data-mono text-[11px]">{pendingCount > 0 ? `${pendingCount} awaiting` : "None pending"}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        {/* Critical Decisions */}
        <div className="glass-card p-6 rounded-2xl flex justify-between items-start border-l-2 border-l-error">
          <div>
            <p className="font-label-caps text-[11px] text-on-surface-variant mb-2">Critical (30 Days)</p>
            <h3 className="font-display text-[32px] font-bold text-on-surface">{String(criticalCount).padStart(2, "0")}</h3>
            <div className="flex items-center gap-1 mt-2 text-error">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-data-mono text-[11px]">Requires Oversight</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        {/* Implementation Rate */}
        <div className="glass-card p-6 rounded-2xl flex justify-between items-start">
          <div>
            <p className="font-label-caps text-[11px] text-on-surface-variant mb-2">Implementation Rate</p>
            <h3 className="font-display text-[32px] font-bold text-on-surface">{implementationRate}%</h3>
            <div className="flex items-center gap-1 mt-2 text-secondary">
              <CheckCircle className="w-4 h-4" />
              <span className="font-data-mono text-[11px]">Target: 95%</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Ledger Container */}
      <div className="flex gap-6 items-start">
        {/* Main Table */}
        <div className="flex-1 glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-white/5">
            <h4 className="font-label-caps text-[11px] text-on-surface">Active Ledger</h4>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search decisions..."
                  className="bg-surface-container-low border border-outline-variant/20 rounded-full pl-9 pr-4 py-1.5 text-[12px] font-body-sm text-on-surface focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40 w-56"
                />
              </div>
              <span className="font-data-mono text-[11px] text-on-surface-variant">
                Showing {Math.min(filteredDecisions.length, 8)} of {filteredDecisions.length}
              </span>
              <Filter className="w-5 h-5 text-on-surface-variant hover:text-on-surface cursor-pointer" />
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-white/2">
                <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Decision Title</th>
                <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Impact</th>
                <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Status</th>
                <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Deciders</th>
                <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Origin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {filteredDecisions.slice(0, 8).map((decision) => {
                const project = projects.find((p) => p.id === decision.projectId);
                const meeting = meetings.find((m) => m.id === decision.meetingId);
                const deciders = decision.decidedBy.map((id) => users.find((u) => u.id === id)).filter(Boolean);
                const statusCfg = statusConfig[decision.status];
                const impactCfg = impactConfig[decision.impact];
                const isSelected = selectedDecisionId === decision.id;

                return (
                  <tr
                    key={decision.id}
                    onClick={() => setSelectedDecisionId(isSelected ? null : decision.id)}
                    className={`hover:bg-white/2 transition-all cursor-pointer group ${isSelected ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-body-sm font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                          {decision.title}
                        </span>
                        <span className="font-data-mono text-[11px] text-on-surface-variant">
                          LOG-ID: D-{new Date(decision.decidedAt).getFullYear()}-{decision.id.slice(-3).toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${impactCfg.bg} ${impactCfg.color} flex items-center gap-1.5 w-fit`}>
                        <span className={`w-2 h-2 rounded-full ${impactCfg.dot}`} style={{ boxShadow: `0 0 8px currentColor` }} />
                        {impactCfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusCfg.bg} ${statusCfg.color} w-fit`}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex -space-x-2">
                        {deciders.slice(0, 3).map((d, i) => (
                          <img
                            key={i}
                            className="w-7 h-7 rounded-full border-2 border-surface-container-low object-cover"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${d?.id}`}
                            alt={d?.name}
                            title={d?.name}
                          />
                        ))}
                        {deciders.length > 3 && (
                          <div className="w-7 h-7 rounded-full border-2 border-surface-container-low bg-surface-variant flex items-center justify-center text-[10px] font-bold">
                            +{deciders.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {meeting ? (
                        <span className="font-data-mono text-[12px] text-primary flex items-center gap-1 hover:underline cursor-pointer">
                          <LinkIcon className="w-3.5 h-3.5" />
                          {meeting.title.length > 18 ? meeting.title.slice(0, 18) + "..." : meeting.title}
                        </span>
                      ) : (
                        <span className="font-data-mono text-[12px] text-on-surface-variant/40">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredDecisions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                    No decisions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {filteredDecisions.length > 8 && (
            <div className="p-4 bg-white/2 border-t border-outline-variant/10 flex justify-center">
              <button className="font-label-caps text-[11px] text-primary hover:text-white transition-colors flex items-center gap-2">
                View Full Ledger
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Side Detail Panel */}
        <aside className="w-[320px] glass-panel rounded-2xl p-6 flex flex-col gap-6 shrink-0 h-fit sticky top-24">
          {selectedDecision ? (
            <>
              <div className="flex justify-between items-center">
                <h5 className="font-label-caps text-[11px] text-error">Decision Detail</h5>
                <button onClick={() => setSelectedDecisionId(null)} className="text-on-surface-variant hover:text-white transition-colors">
                  <X className="w-[18px] h-[18px]" />
                </button>
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest mb-2 inline-block ${impactConfig[selectedDecision.impact].bg} ${impactConfig[selectedDecision.impact].color}`}>
                  {impactConfig[selectedDecision.impact].label} CASE
                </span>
                <h4 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight mb-4">
                  {selectedDecision.title}
                </h4>
                <div className="space-y-4">
                  {/* Project & Meeting */}
                  <div className="flex items-center gap-4 text-[11px] font-data-mono text-on-surface-variant">
                    {selectedProject && <span>{selectedProject.name}</span>}
                    {selectedMeeting && (
                      <span className="flex items-center gap-1 text-primary">
                        <LinkIcon className="w-3 h-3" />
                        {selectedMeeting.title}
                      </span>
                    )}
                  </div>
                  {/* Rationale */}
                  {selectedDecision.rationale && (
                    <div>
                      <p className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Rationale</p>
                      <p className="font-body-sm text-body-sm text-on-surface/80 leading-relaxed">{selectedDecision.rationale}</p>
                    </div>
                  )}
                  {/* Consequences */}
                  {selectedDecision.consequences && (
                    <div>
                      <p className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Consequences</p>
                      <ul className="font-body-sm text-body-sm text-on-surface/80 list-disc pl-4 space-y-1">
                        {selectedDecision.consequences.split("\n").filter(Boolean).map((item, i) => (
                          <li key={i}>{item.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Implementation Status */}
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant mb-2 uppercase tracking-wider">Implementation Status</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-secondary h-full transition-all duration-500"
                        style={{ width: `${getImplementationProgress(selectedDecision.status)}%` }}
                      />
                    </div>
                    <p className="font-data-mono text-[11px] text-on-surface-variant text-right">
                      {getImplementationProgress(selectedDecision.status)}% Complete
                    </p>
                  </div>
                  {/* Deciders */}
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant mb-2 uppercase tracking-wider">Deciders</p>
                    <div className="flex items-center gap-2">
                      {selectedDeciders.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <img
                            className="w-6 h-6 rounded-full border border-outline-variant/20 object-cover"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${d?.id}`}
                            alt={d?.name}
                          />
                          <span className="font-body-sm text-[12px] text-on-surface">{d?.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-outline-variant/10">
                <button className="w-full py-2.5 rounded-lg border border-primary/30 text-primary font-bold font-body-sm hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 mb-3">
                  <History className="w-[18px] h-[18px]" />
                  View Revision History
                </button>
                <button className="w-full py-2.5 rounded-lg bg-surface-container-highest text-on-surface font-bold font-body-sm hover:bg-surface-bright transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-[18px] h-[18px]" />
                  Export as PDF
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h5 className="font-label-caps text-[11px] text-on-surface-variant">Decision Detail</h5>
              </div>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-variant/50 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-on-surface-variant/40" />
                </div>
                <p className="font-body-sm text-on-surface-variant/60">Select a decision from the ledger to view its details</p>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Decision Form Modal */}
      {showForm && (
        <DecisionForm
          decision={editingDecision}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingDecision(null);
          }}
        />
      )}
    </div>
  );
}
