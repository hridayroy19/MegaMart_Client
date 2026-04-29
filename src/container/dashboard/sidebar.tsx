"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Package, 
  User, 
  Heart, 
  LogOut, 
  LayoutDashboard,
  ChevronRight,
  X
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "orders", label: "Order History", icon: Package, href: "/dashboard" },
  { id: "profile", label: "Profile Settings", icon: User, href: "/dashboard/profile" },
  { id: "wishlist", label: "My Wishlist", icon: Heart, href: "/dashboard/wishlist" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/60 p-6">
      <div className="flex items-center justify-between mb-10 lg:mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <LayoutDashboard className="text-slate-900" size={24} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Dashboard</h2>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`
                group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300
                ${isActive 
                  ? "bg-amber-400 text-slate-900 font-bold shadow-lg shadow-amber-400/20" 
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? "text-slate-900" : "group-hover:text-amber-400 transition-colors"} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800/60">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 font-medium"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout Session</span>
        </button>
      </div>
    </div>
  );
}
