/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  user: any;
  onOpenSidebar: () => void;
}

export default function DashboardHeader({ user, onOpenSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-primary/50 shadow-xl backdrop-blur-md border-b border-secondary/60 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 text-background hover:text-primary hover:bg-background rounded-xl transition-colors"
          >
            <Menu size={26} />
          </button>

          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-primary/50 border border-secondary rounded-xl w-64 lg:w-96">
            <Search size={18} className="text-background" />
            <input
              type="text"
              placeholder="Search orders, items..."
              className="bg-transparent focus:ring-0 text-sm text-background w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <button className="relative p-2 text-background hover:text-primary hover:bg-background rounded-xl transition-colors">
            <Bell size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-popover-foreground rounded-full border-2 border-background" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-foreground">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-background leading-tight">
                {user?.username}
              </p>
              <p className="text-[10px] text-background font-medium uppercase tracking-wider">
                {user?.role || "Customer"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-popover-foreground p-0.5 shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center text-amber-400 font-bold relative overflow-hidden">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.username || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  user?.username?.[0]?.toUpperCase()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
