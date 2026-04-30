"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Menu, Bell, Search, User } from "lucide-react";
import DashboardSidebar from "@/container/dashboard/sidebar";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, token } = useSelector(
    (s: RootState) => s.auth,
  );
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push("/login");
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated && !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary text-background font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <DashboardSidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-primary/80 backdrop-blur-md border-b border-border/60 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-background  hover:bg-primary rounded-xl transition-colors"
              >
                <Menu size={24} />
              </button>

              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-primary/50 border border-slate-800/60 rounded-xl w-64 lg:w-96">
                <Search size={18} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Search orders, items..."
                  className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 w-full placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full border-2 border-[#0b0f18]" />
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-800/60">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-white leading-tight">
                    {user?.username}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    {user?.role || "Customer"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-lg shadow-amber-500/10">
                  <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center text-amber-400 font-bold relative overflow-hidden">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.username}
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

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
