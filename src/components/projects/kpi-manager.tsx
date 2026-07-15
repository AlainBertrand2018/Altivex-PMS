"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { KPI } from "@/types";

const categoryColors: Record<string, string> = {
  project: "border-primary/30 text-primary",
  phase: "border-blue-500/30 text-blue-400",
  milestone: "border-amber-500/30 text-amber-400",
  financial: "border-emerald-500/30 text-emerald-400",
};

interface KPIFormProps {
  kpi?: KPI | null;
  projectId: string;
  onSubmit: (data: Omit<KPI, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onCancel: () => void;
}

function KPIForm({ kpi, projectId, onSubmit, onCancel }: KPIFormProps) {
  const [name, setName] = useState(kpi?.name || "");
  const [description, setDescription] = useState(kpi?.description || "");
  const [value, setValue] = useState(kpi?.value || 0);
  const [target, setTarget] = useState(kpi?.target || 0);
  const [unit, setUnit] = useState(kpi?.unit || "");
  const [category, setCategory] = useState<KPI["category"]>(kpi?.category || "project");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      projectId,
      name,
      description,
      value,
      target,
      unit,
      category,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60" />
        <Card className="w-full max-w-lg glass-modal border-border/50 relative z-10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground">
                {kpi ? "Edit KPI" : "Add New KPI"}
              </CardTitle>
              <button onClick={onCancel} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Budget Utilization Rate"
                className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this KPI..."
                className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Current Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Target Value</label>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Unit</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g., %, MUR, count"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as KPI["category"])}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="project">Project</option>
                  <option value="phase">Phase</option>
                  <option value="milestone">Milestone</option>
                  <option value="financial">Financial</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all"
              >
                {kpi ? "Update KPI" : "Add KPI"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>,
    document.body
  );
}

interface KPIManagerProps {
  projectId: string;
}

export default function KPIManager({ projectId }: KPIManagerProps) {
  const { kpis, addKPI, updateKPI, deleteKPI } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPI | null>(null);

  const projectKPIs = kpis.filter((k) => k.projectId === projectId);

  const handleCreate = () => {
    setEditingKPI(null);
    setShowForm(true);
  };

  const handleEdit = (kpi: KPI) => {
    setEditingKPI(kpi);
    setShowForm(true);
  };

  const handleSubmit = async (data: Omit<KPI, "id" | "createdAt" | "updatedAt">) => {
    if (editingKPI) {
      await updateKPI(editingKPI.id, data);
    } else {
      await addKPI({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as KPI);
    }
    setShowForm(false);
    setEditingKPI(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this KPI?")) {
      await deleteKPI(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Key Performance Indicators
        </h3>
        <button
          onClick={handleCreate}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-all"
        >
          <Plus className="w-3 h-3" />
          Add KPI
        </button>
      </div>

      {projectKPIs.length === 0 ? (
        <div className="p-4 rounded-lg bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground">No KPIs defined for this project</p>
          <p className="text-xs text-muted-foreground mt-1">Add KPIs to track project performance</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectKPIs.map((kpi) => {
            const progress = kpi.target > 0 ? Math.round((kpi.value / kpi.target) * 100) : 0;
            return (
              <div key={kpi.id} className="p-4 rounded-lg bg-muted/20 border border-border/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">{kpi.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{kpi.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(kpi)}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(kpi.id)}
                      className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{kpi.value} / {kpi.target} {kpi.unit}</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                  <p className="text-[10px] text-muted-foreground text-right">{progress}%</p>
                </div>
                <Badge variant="outline" className={`text-[10px] ${categoryColors[kpi.category]}`}>
                  {kpi.category.toUpperCase()}
                </Badge>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <KPIForm
          kpi={editingKPI}
          projectId={projectId}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingKPI(null); }}
        />
      )}
    </div>
  );
}
