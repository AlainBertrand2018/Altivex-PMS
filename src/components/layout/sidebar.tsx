"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarClock,
  CheckSquare,
  Gavel,
  Users,
  FileText,
  Brain,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import ThemeToggle from "./theme-toggle";
import { useSidebar } from "./sidebar-context";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/meetings", label: "Meetings", icon: CalendarClock },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/decisions", label: "Decisions", icon: Gavel },
  { href: "/stakeholders", label: "Stakeholders", icon: Users },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/intelligence", label: "Intelligence", icon: Brain },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-sidebar/95 backdrop-blur-xl border-r border-border/50 flex flex-col z-40 transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn("border-b border-border/50 flex items-center", collapsed ? "p-3 justify-center" : "p-5")}>
        {collapsed ? (
          <img
            src="/images/golden_heavy_logo.webp"
            alt="Altivex"
            className="w-9 h-9 object-contain"
          />
        ) : (
          <div className="flex items-center gap-3 flex-1">
            <img
              src="/images/golden_heavy_logo.webp"
              alt="Altivex"
              className="w-10 h-10 object-contain"
            />
            <div className="flex-1">
              <h1 className="text-sm font-medium tracking-[0.1em] text-foreground">ALTIVEX</h1>
              <p className="text-[10px] text-muted-foreground/50 tracking-wider">Project Intelligence OS</p>
            </div>
          </div>
        )}
        <button
          onClick={toggle}
          className={cn(
            "p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
            collapsed ? "mt-0" : ""
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm transition-all",
                collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/10"
                  : "text-muted-foreground/60 hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0", isActive && "text-primary")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className={cn("border-t border-border/50", collapsed ? "p-2" : "p-3")}>
        {/* Settings */}
        <Link
          href="/settings"
          title={collapsed ? "Settings" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg text-sm transition-all mb-1",
            collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5",
            pathname === "/settings"
              ? "bg-primary/10 text-primary border border-primary/10"
              : "text-muted-foreground/60 hover:bg-accent hover:text-foreground"
          )}
        >
          <Settings className="w-4 h-4" />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* User profile */}
        <div className={cn("flex items-center gap-3 rounded-lg", collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5")}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium shrink-0">
            {user?.name?.split(" ").map((n) => n[0]).join("")}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground/40 truncate">{user?.role?.replace(/_/g, " ")}</p>
            </div>
          )}
          {!collapsed && <ThemeToggle />}
          <button
            onClick={logout}
            className="text-muted-foreground/40 hover:text-red-400 transition-colors p-1"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copyright */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-border/50">
          <p className="text-[9px] text-muted-foreground/25 text-center leading-tight">
            © 2025 Alain BERTRAND
            <br />
            All Rights Reserved
          </p>
        </div>
      )}
    </aside>
  );
}
