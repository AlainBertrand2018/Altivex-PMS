"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, User, Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { Document } from "@/types";
import { useApp } from "@/lib/app-context";
import DocumentForm from "./document-form";

const typeColors: Record<string, string> = {
  contract: "border-amber-500/30 text-amber-400",
  report: "border-blue-500/30 text-blue-400",
  proposal: "border-primary/30 text-primary",
  invoice: "border-emerald-500/30 text-emerald-400",
  plan: "border-purple-500/30 text-purple-400",
  specification: "border-cyan-500/30 text-cyan-400",
  correspondence: "border-muted-foreground/30 text-muted-foreground",
  other: "border-muted-foreground/30 text-muted-foreground",
};

function formatFileSize(bytes: number): string {
  if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(1)} MB`;
  if (bytes >= 1000) return `${(bytes / 1000).toFixed(0)} KB`;
  return `${bytes} B`;
}

export default function DocumentsContent() {
  const { documents, projects, users, addDocument, updateDocument, deleteDocument } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);

  const handleSubmit = (data: Omit<Document, "id" | "createdAt" | "updatedAt">) => {
    if (editingDoc) {
      updateDocument(editingDoc.id, data);
    } else {
      addDocument({
        ...data,
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Document);
    }
    setShowForm(false);
    setEditingDoc(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">Project document library with AI summaries</p>
        </div>
        <button onClick={() => { setEditingDoc(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
          <Plus className="w-4 h-4" />
          Add Document
        </button>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const project = projects.find((p) => p.id === doc.projectId);
          const uploader = users.find((u) => u.id === doc.uploadedBy);

          return (
            <Card key={doc.id} className="glass border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors truncate">{doc.name}</h3>
                      <Badge variant="outline" className={`text-[10px] shrink-0 ${typeColors[doc.type]}`}>{doc.type.toUpperCase()}</Badge>
                      <Badge variant="outline" className="text-[10px] border-border text-muted-foreground shrink-0">v{doc.version}</Badge>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); setEditingDoc(doc); setShowForm(true); }} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); deleteDocument(doc.id); }} className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-primary/70">{project?.name}</p>
                    {doc.summary && <p className="text-sm text-muted-foreground line-clamp-2">{doc.summary}</p>}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><User className="w-3 h-3" /><span>{uploader?.name}</span></div>
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /><span>{new Date(doc.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span></div>
                    <span>{formatFileSize(doc.fileSize)}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[9px] border-border text-muted-foreground">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showForm && (
        <DocumentForm
          document={editingDoc}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingDoc(null); }}
        />
      )}
    </div>
  );
}
