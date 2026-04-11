"use client";

import {
  Home,
  Menu,
  Heart,
  User,
  MoreHorizontal,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (href: string, isMenu: boolean = false) => {
    if (isMenu) {
      setIsMenuOpen(true);
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 lg:hidden bg-card border-t border-border shadow-md">
      <div className="flex items-center justify-around h-20 px-3">
        {/* Home */}
        <button
          onClick={() => handleNavClick("/")}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg ${
              pathname === "/"
                ? "bg-primary text-background"
                : "bg-gray-100 text-foreground hover:bg-primary hover:text-background"
            }`}
          >
            <Home size={20} />
          </div>
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => handleNavClick("/wishlist")}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg ${
              pathname === "/wishlist"
                ? "bg-primary text-background"
                : "bg-gray-100 text-foreground hover:bg-primary hover:text-background"
            }`}
          >
            <Heart size={20} />
          </div>
          <span className="text-[10px] font-medium">Wishlist</span>
        </button>
        {/* cart */}
        <button
          onClick={() => handleNavClick("/wishlist")}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg ${
              pathname === "/wishlist"
                ? "bg-primary text-card"
                : "bg-gray-100 text-foreground hover:bg-primary hover:text-background"
            }`}
          >
            <ShoppingBag size={20} />
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        {/* Account */}
        <button
          onClick={() => handleNavClick("/account")}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg ${
              pathname === "/account"
                ? "bg-primary text-background"
                : "bg-gray-100 text-foreground hover:bg-primary hover:text-background"
            }`}
          >
            <User size={20} />
          </div>
          <span className="text-[10px] font-medium">Account</span>
        </button>

        {/* More */}
        <button
          onClick={() => handleNavClick("/more")}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-lg ${
              pathname === "/more"
                ? "bg-primary text-background"
                : "bg-gray-100 text-foreground hover:bg-primary hover:text-background"
            }`}
          >
            <MoreHorizontal size={20} />
          </div>
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </nav>
  );
}
