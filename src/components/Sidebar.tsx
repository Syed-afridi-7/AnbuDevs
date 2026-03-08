import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Code2, Brain, MessageSquare, ChevronLeft,
  ChevronRight, Flame, Trophy, Target, BookOpen, Cpu, Shield,
  Palette, Server, X, FileText, MonitorPlay, Users, Rocket,
  Briefcase, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    section: 'DASHBOARD',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    ],
  },
  {
    section: 'PRACTICE (Coding)',
    items: [
      { to: '/codelab', icon: Code2, label: 'Problem Editor' },
      { to: '/practice/cyber-security', icon: Shield, label: 'Cyber Security (CTF)' },
    ],
  },
  {
    section: 'LEARN (Tutorials)',
    items: [
      { to: '/tutorials', icon: BookOpen, label: 'Structured Paths' },
      { to: '/playground', icon: MonitorPlay, label: 'Playground' },
    ],
  },
  {
    section: 'READ (Articles)',
    items: [
      { to: '/articles', icon: FileText, label: 'Dev-Blog' },
      { to: '/interview-experiences', icon: Users, label: 'Experiences' },
    ],
  },
  {
    section: 'SONA INCUBATION',
    items: [
      { to: '/sona-incubation', icon: Rocket, label: 'Startups & Ideas' },
      { to: '/projects', icon: Briefcase, label: 'Projects Pool' },
    ],
  },
  {
    section: 'ROADMAPS',
    items: [
      { to: '/path/cybersecurity', icon: ShieldCheck, label: 'Cyber Security' },
      { to: '/path/software-dev', icon: Cpu, label: 'Software Dev' },
      { to: '/path/fullstack', icon: Server, label: 'Full Stack' },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const location = useLocation();

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-border/60 transition-all duration-300",
        collapsed ? "justify-center" : ""
      )}>
        <div className="flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center glow-orange border border-orange-500/20">
          <img src="/mylogo.jpeg" alt="Logo" className="w-full h-full object-cover" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-bold text-base text-foreground leading-tight">AnbuDevs</div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        {navItems.map((group) => (
          <div key={group.section} className="mb-4">
            {!collapsed && (
              <div className="px-4 mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground/60 uppercase">
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const active = isActive(item.to, item.exact);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                    active
                      ? "bg-orange-500/15 text-orange-400 border border-orange-500/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "flex-shrink-0 w-4.5 h-4.5 transition-colors",
                    active ? "text-orange-400" : "text-muted-foreground group-hover:text-foreground"
                  )} size={18} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {active && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* User / Footer */}
      <div className={cn(
        "border-t border-border/60 p-3",
        collapsed ? "flex justify-center" : ""
      )}>
        <div className={cn(
          "flex items-center gap-3 rounded-lg p-2 hover:bg-muted cursor-pointer transition-colors",
          collapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            SF
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground truncate">Skill Learner</div>
              <div className="text-xs text-muted-foreground truncate">Free Plan</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:hidden transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <button
          onClick={onMobileClose}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted text-muted-foreground"
        >
          <X size={18} />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col relative border-r border-border/60 bg-card transition-all duration-300 h-full",
        collapsed ? "w-16" : "w-60"
      )}>
        <SidebarContent />

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
