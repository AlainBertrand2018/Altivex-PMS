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
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

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

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0f1e]/95 backdrop-blur-xl border-r border-white/[0.04] flex flex-col z-40">
      <div className="p-5 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <img
            src="/images/golden_heavy_logo.webp"
            alt="Altivex"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-sm font-medium tracking-[0.1em] text-foreground">ALTIVEX</h1>
            <p className="text-[10px] text-muted-foreground/50 tracking-wider">Project Intelligence OS</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/10"
                  : "text-muted-foreground/60 hover:bg-white/[0.03] hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive && "text-primary")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.04]">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1",
            pathname === "/settings"
              ? "bg-primary/10 text-primary border border-primary/10"
              : "text-muted-foreground/60 hover:bg-white/[0.03] hover:text-foreground"
          )}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>

        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">
            {user?.name?.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground/40 truncate">{user?.role?.replace(/_/g, " ")}</p>
          </div>
          <button
            onClick={logout}
            className="text-muted-foreground/40 hover:text-red-400 transition-colors p-1"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-3 py-3 border-t border-white/[0.04]">
        <p className="text-[9px] text-muted-foreground/25 text-center leading-tight">
          © 2025 Alain BERTRAND
          <br />
          All Rights Reserved
        </p>
      </div>
    </aside>
  );
}
