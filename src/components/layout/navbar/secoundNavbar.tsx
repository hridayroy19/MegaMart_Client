"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Search, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MobileMenuItem from "./mobleMenuIte";
import { menuData } from "@/constants/navbarRouteConstants";

export const categoriesData = [
  { name: "Vegetables", icon: "🥦" },
  { name: "Milk & Cake", icon: "🥛" },
  { name: "Grocery", icon: "🛒" },
  { name: "Beauty", icon: "💄" },
  { name: "Wines & Drinks", icon: "🍷" },
  { name: "Snacks", icon: "🍪" },
  { name: "Juice", icon: "🧃" },
  { name: "Fruits", icon: "🍎" },
  { name: "Tea & Coffee", icon: "☕" },
];

const SecoundNavbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement>(null);

  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative border-b border-border/60">
      <div className="bg-card/80 backdrop-blur-md">
        <div className="max-w-[1440px] px-4 lg:px-8 mx-auto py-3 flex items-center justify-between">
          {/* Shop Category Trigger */}
          <div className="flex items-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl shadow-md transition-all font-bold text-sm lg:text-base"
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="hidden sm:inline">Shop by Category</span>
              <span className="sm:hidden">Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </motion.button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuData.map((item) => (
              <div key={item.id} className="relative group py-2">
                <a
                  href={item.link}
                  className={`flex items-center gap-1 text-lg font-bold transition-all relative
                    ${isActive(item.link) ? "text-secondary" : "text-foreground hover:text-secondary"}
                  `}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                  )}

                  {/* Active Indicator Line */}
                  {isActive(item.link) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full"
                    />
                  )}
                </a>

                {/* Refined Dropdown */}
                {item.children && (
                  <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-card border border-border rounded-xl shadow-xl z-50 min-w-[200px] overflow-hidden p-1">
                    {item.children.map((child) => (
                      <a
                        key={child.id}
                        href={child.link}
                        className="block px-4 py-2.5 text-sm rounded-lg hover:bg-secondary/10 hover:text-secondary transition-colors"
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center lg:hidden gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Mega Menu Category Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute left-0 right-0 mx-auto mt-4 w-[95%] lg:w-[1000px] xl:w-[1200px] z-[100]"
          >
            <div className="bg-card/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl border border-border p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Search & Sidebar inside menu */}
                <div className="w-full md:w-1/4 space-y-4">
                  <h3 className="text-xl font-extrabold text-foreground">
                    Explore Products
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 bg-muted/50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-secondary/50"
                    />
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="w-full md:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categoriesData.map((cat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="text-3xl bg-muted/30 p-2 rounded-lg group-hover:bg-secondary/10 transition-colors">
                        {cat.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
                          {cat.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Browse All
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] bg-card z-[201] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-border">
                <h2 className="text-xl font-black text-secondary">MegaMart</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 hover:bg-muted rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {menuData.map((item) => (
                  <MobileMenuItem
                    key={item.id}
                    item={item}
                    pathname={pathname}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecoundNavbar;
