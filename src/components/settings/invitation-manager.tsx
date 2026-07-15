"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Send,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/auth-context";
import { Invitation } from "@/types";

const roleOptions = [
  { value: "committee_member", label: "Committee Member" },
  { value: "consultant", label: "Consultant" },
  { value: "provider_delegate", label: "Provider Delegate" },
  { value: "viewer", label: "Viewer" },
];

const statusColors: Record<string, string> = {
  pending: "border-amber-500/30 text-amber-400",
  accepted: "border-emerald-500/30 text-emerald-400",
  expired: "border-muted-foreground/30 text-muted-foreground",
};

export default function InvitationManager() {
  const { user } = useAuth();
  const { invitations, projects, addInvitation, updateInvitation, deleteInvitation } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !user) return;

    const newInvitation: Invitation = {
      id: "",
      email,
      role,
      projectId: projectId || undefined,
      invitedBy: user.id,
      status: "pending",
      token: Math.random().toString(36).slice(2) + Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    await addInvitation(newInvitation);
    setEmail("");
    setRole("viewer");
    setProjectId("");
    setShowForm(false);
  };

  const handleAccept = async (invitation: Invitation) => {
    await updateInvitation(invitation.id, {
      status: "accepted",
      acceptedAt: new Date().toISOString(),
    });
  };

  const handleResend = async (invitation: Invitation) => {
    await updateInvitation(invitation.id, {
      createdAt: new Date().toISOString(),
      status: "pending",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const pendingInvitations = invitations.filter((i) => i.status === "pending");
  const acceptedInvitations = invitations.filter((i) => i.status === "accepted");
  const expiredInvitations = invitations.filter((i) => i.status === "expired");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-foreground">Team Invitations</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Invite team members via email to collaborate on projects
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Invitation Form */}
      {showForm && (
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" />
              Send Invitation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Project (Optional)</label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">All Projects</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all"
                >
                  Send Invitation
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Pending Invitations ({pendingInvitations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingInvitations.map((invitation) => {
                const project = projects.find((p) => p.id === invitation.projectId);
                return (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{invitation.email}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                            {invitation.role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                          {project && (
                            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                              {project.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleResend(invitation)}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Resend invitation"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAccept(invitation)}
                        className="p-1.5 rounded hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-400 transition-colors"
                        title="Mark as accepted"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteInvitation(invitation.id)}
                        className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        title="Cancel invitation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accepted Invitations */}
      {acceptedInvitations.length > 0 && (
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Accepted ({acceptedInvitations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {acceptedInvitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{invitation.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Accepted {invitation.acceptedAt ? formatDate(invitation.acceptedAt) : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {invitations.length === 0 && !showForm && (
        <div className="glass rounded-2xl p-8 text-center">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No invitations yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Click &quot;Invite Member&quot; to send your first invitation
          </p>
        </div>
      )}
    </div>
  );
}
