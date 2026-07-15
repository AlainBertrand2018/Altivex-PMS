"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Target, Plus, Pencil, Trash2 } from "lucide-react";
import { Stakeholder } from "@/types";
import { useApp } from "@/lib/app-context";
import StakeholderForm from "./stakeholder-form";

const categoryColors: Record<string, string> = {
  executive: "border-purple-500/30 text-purple-400",
  committee: "border-primary/30 text-primary",
  internal: "border-blue-500/30 text-blue-400",
  contractor: "border-amber-500/30 text-amber-400",
  supplier: "border-emerald-500/30 text-emerald-400",
  external: "border-cyan-500/30 text-cyan-400",
};

const influenceColors: Record<string, string> = {
  high: "bg-red-500/10 text-red-400",
  medium: "bg-amber-500/10 text-amber-400",
  low: "bg-muted text-muted-foreground",
};

export default function StakeholdersContent() {
  const { stakeholders, projects, users, addStakeholder, updateStakeholder, deleteStakeholder } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingStakeholder, setEditingStakeholder] = useState<Stakeholder | null>(null);

  const handleSubmit = async (data: Omit<Stakeholder, "id" | "createdAt" | "updatedAt">) => {
    if (editingStakeholder) {
      await updateStakeholder(editingStakeholder.id, data);
    } else {
      await addStakeholder({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Stakeholder);
    }
    setShowForm(false);
    setEditingStakeholder(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Stakeholders</h1>
          <p className="text-muted-foreground mt-1">People, roles, and influence mapping</p>
        </div>
        <button onClick={() => { setEditingStakeholder(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
          <Plus className="w-4 h-4" />
          Add Stakeholder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stakeholders.map((stakeholder) => {
          const user = users.find((u) => u.id === stakeholder.userId);
          const project = projects.find((p) => p.id === stakeholder.projectId);

          return (
            <Card key={stakeholder.id} className="glass border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium shrink-0">
                    {user?.name?.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{user?.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{stakeholder.role}</p>
                    <p className="text-[10px] text-primary/70">{project?.name}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setEditingStakeholder(stakeholder); setShowForm(true); }} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteStakeholder(stakeholder.id); }} className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[9px] ${categoryColors[stakeholder.category]}`}>{stakeholder.category.toUpperCase()}</Badge>
                  <Badge className={`text-[9px] ${influenceColors[stakeholder.influence]}`}>{stakeholder.influence.toUpperCase()} INFLUENCE</Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Briefcase className="w-3 h-3" /><span>{user?.department}</span></div>
                  <div className="flex items-center gap-1"><Target className="w-3 h-3" /><span>{stakeholder.interest} interest</span></div>
                </div>

                {stakeholder.notes && <p className="text-xs text-muted-foreground/70 line-clamp-2">{stakeholder.notes}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showForm && (
        <StakeholderForm
          stakeholder={editingStakeholder}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingStakeholder(null); }}
        />
      )}
    </div>
  );
}
