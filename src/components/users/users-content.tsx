"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/auth-context";
import { User as UserType } from "@/types";
import { Plus, Pencil, Trash2, Search, Shield, User, Users, Mail } from "lucide-react";
import { createPortal } from "react-dom";

const roleConfig: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  super_admin: { label: "SUPER ADMIN", bg: "bg-error/10", text: "text-error", icon: <Shield className="w-3.5 h-3.5" /> },
  admin: { label: "ADMIN", bg: "bg-primary/10", text: "text-primary", icon: <Shield className="w-3.5 h-3.5" /> },
  committee_member: { label: "COMMITTEE", bg: "bg-tertiary/10", text: "text-tertiary", icon: <Users className="w-3.5 h-3.5" /> },
  consultant: { label: "CONSULTANT", bg: "bg-secondary/10", text: "text-secondary", icon: <User className="w-3.5 h-3.5" /> },
  provider_delegate: { label: "PROVIDER", bg: "bg-primary/10", text: "text-primary", icon: <Mail className="w-3.5 h-3.5" /> },
  viewer: { label: "VIEWER", bg: "bg-surface-variant", text: "text-on-surface-variant", icon: <User className="w-3.5 h-3.5" /> },
};

export default function UsersContent() {
  const { users, addUser, updateUser, deleteUser } = useApp();
  const { user: currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [users, searchQuery]);

  const handleSubmit = async (data: Omit<UserType, "id" | "createdAt" | "updatedAt">) => {
    if (editingUser) {
      await updateUser(editingUser, data);
    } else {
      await addUser(data as UserType);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  if (!isAdmin) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="glass-panel rounded-2xl p-12 text-center">
          <Shield className="w-12 h-12 text-error/50 mx-auto mb-4" />
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Access Denied</h2>
          <p className="text-on-surface-variant">Only super admins and admins can manage users.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">User Management</h2>
          <p className="text-on-surface-variant font-body-sm">Create, edit, and manage user accounts and roles.</p>
        </div>
        <button
          onClick={() => { setEditingUser(null); setShowForm(true); }}
          className="bg-primary text-on-primary px-6 py-2 rounded-xl font-bold font-body-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Search & Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-white/5">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="bg-surface-container-low border border-outline-variant/20 rounded-full pl-9 pr-4 py-1.5 text-[12px] font-body-sm text-on-surface focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40 w-full"
            />
          </div>
          <span className="font-data-mono text-[11px] text-on-surface-variant">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
          </span>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/10 bg-white/2">
              <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">User</th>
              <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Email</th>
              <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Role</th>
              <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Department</th>
              <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Phone</th>
              <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Created</th>
              <th className="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {filteredUsers.map((u) => {
              const cfg = roleConfig[u.role] || roleConfig.viewer;
              const isSelf = currentUser?.id === u.id;
              return (
                <tr key={u.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                        {u.name?.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-body-sm font-bold text-on-surface">{u.name}</p>
                        <p className="text-[11px] text-on-surface-variant font-data-mono">{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${u.email}`} className="text-body-sm text-on-surface hover:text-primary transition-colors">{u.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text} text-[11px] font-bold`}>
                      {cfg.icon}
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant">{u.department || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant">{u.phone || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant font-data-mono">{new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingUser(u.id); setShowForm(true); }}
                        className="p-2 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {!isSelf && (
                        <button
                          onClick={() => { if (confirm("Delete this user?")) deleteUser(u.id); }}
                          className="p-2 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-error transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Form Modal */}
      {showForm && createPortal(
        <UserForm
          user={editingUser ? users.find((u) => u.id === editingUser) ?? null : null}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingUser(null); }}
        />,
        document.body
      )}
    </div>
  );
}

function UserForm({ user, onSubmit, onCancel }: { user: UserType | null; onSubmit: (data: Omit<UserType, "id" | "createdAt" | "updatedAt">) => Promise<void>; onCancel: () => void }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<UserType["role"]>(user?.role || "viewer");
  const [department, setDepartment] = useState(user?.department || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, email, role, department, phone });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="glass-modal rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">{user ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as UserType["role"])} className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50">
              <option value="viewer">Viewer</option>
              <option value="consultant">Consultant</option>
              <option value="provider_delegate">Provider Delegate</option>
              <option value="committee_member">Committee Member</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface">Department</label>
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface">Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-on-primary text-sm font-medium hover:brightness-110 transition-all">
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}