"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Shield, Mail, User as UserIcon, BadgeCheck, Lock } from "lucide-react";

export default function ProfilePage() {
  const { user } = useSelector((s: RootState) => s.auth);

  const profileStats = [
    {
      label: "Account Status",
      value: "Active",
      icon: BadgeCheck,
      color: "text-emerald-400",
    },
    {
      label: "Role",
      value: user?.role || "Customer",
      icon: Shield,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Profile Settings
        </h1>
        <p className="text-slate-400 text-sm">
          Manage your personal information and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
              <UserIcon size={20} className="text-amber-400" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Username
                </label>
                <div className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800/50 rounded-2xl text-slate-200 font-medium">
                  {user?.username}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="w-full px-5 py-4 bg-slate-950/50 border border-slate-800/50 rounded-2xl text-slate-200 font-medium flex items-center gap-3">
                  <Mail size={16} className="text-slate-500" />
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800/60">
              <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                <Lock size={18} className="text-amber-400" />
                Security
              </h3>
              <button className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-400/10">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info / Stats */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-6">
              Account Overview
            </h2>
            <div className="space-y-6">
              {profileStats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-950/30 rounded-2xl border border-slate-800/40"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl bg-slate-900 ${stat.color}`}
                    >
                      <stat.icon size={18} />
                    </div>
                    <span className="text-sm text-slate-400">{stat.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 rounded-3xl p-8">
            <h3 className="text-amber-400 font-bold mb-2">Pro Member</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              You are currently on our premium plan. Enjoy exclusive discounts
              and early access to new arrivals!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
