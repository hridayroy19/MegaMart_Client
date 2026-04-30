"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/container/dashboard/sidebar";
import DashboardHeader from "@/container/dashboard/dasboardTopBar";

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

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <DashboardSidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      <div className="lg:ml-72 min-h-screen flex flex-col">
        <DashboardHeader
          user={user}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
