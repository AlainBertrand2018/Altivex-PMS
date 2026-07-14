"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel, Users, Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { Decision } from "@/types";
import { useApp } from "@/lib/app-context";
import DecisionForm from "./decision-form";

const statusColors: Record<string, string> = {
  proposed: "border-amber-500/30 text-amber-400",
  approved: "border-emerald-500/30 text-emerald-400",
  rejected: "border-red-500/30 text-red-400",
  deferred: "border-blue-500/30 text-blue-400",
  implemented: "border-primary/30 text-primary",
};

const impactColors: Record<string, string> = {
  high: "bg-red-500/10 text-red-400",
  medium: "bg-amber-500/10 text-amber-400",
  low: "bg-muted text-muted-foreground",
};

export default function DecisionsContent() {
  const { decisions, projects, users, addDecision, updateDecision, deleteDecision } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingDecision, setEditingDecision] = useState<Decision | null>(null);

  const handleSubmit = (data: Omit<Decision, "id" | "createdAt" | "updatedAt">) => {
    if (editingDecision) {
      updateDecision(editingDecision.id, data);
    } else {
      addDecision({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Decision);
    }
    setShowForm(false);
    setEditingDecision(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Decisions</h1>
          <p className="text-muted-foreground mt-1">Full traceability from discussion to decision</p>
        </div>
        <button onClick={() => { setEditingDecision(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
          <Plus className="w-4 h-4" />
          Record Decision
        </button>
      </div>

      <div className="space-y-4">
        {decisions.map((decision) => {
          const project = projects.find((p) => p.id === decision.projectId);
          const deciders = decision.decidedBy.map((id) => users.find((u) => u.id === id)).filter(Boolean);

          return (
            <Card key={decision.id} className="glass border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{decision.title}</h3>
                      <Badge variant="outline" className={`text-[10px] ${statusColors[decision.status]}`}>{decision.status.toUpperCase()}</Badge>
                      <Badge className={`text-[10px] ${impactColors[decision.impact]}`}>{decision.impact.toUpperCase()} IMPACT</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{decision.description}</p>
                    <p className="text-xs text-primary/70">{project?.name}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
                    <button onClick={(e) => { e.stopPropagation(); setEditingDecision(decision); setShowForm(true); }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteDecision(decision.id); }} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Gavel className="w-5 h-5 text-muted-foreground ml-2" />
                  </div>
                </div>

                {decision.rationale && (
                  <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Rationale</p>
                    <p className="text-sm text-foreground/80">{decision.rationale}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-muted-foreground mr-1" />
                    <div className="flex -space-x-2">
                      {deciders.map((d, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[8px] font-medium border-2 border-background" title={d?.name}>
                          {d?.name?.split(" ").map((n) => n[0]).join("")}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">{deciders.map((d) => d?.name?.split(" ")[0]).join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(decision.decidedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showForm && (
        <DecisionForm
          decision={editingDecision}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingDecision(null); }}
        />
      )}
    </div>
  );
}
