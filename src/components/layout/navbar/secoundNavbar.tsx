"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Search, LayoutGrid, PhoneCall, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MobileMenuItem from "./mobleMenuIte";
import { menuData } from "@/constants/navbarRouteConstants";

export const categoriesData = [
  { name: "Vegetables", icon: "🥦", count: "125 Items" },
  { name: "Milk & Cake", icon: "🥛", count: "84 Items" },
  { name: "Grocery", icon: "🛒", count: "210 Items" },
  { name: "Beauty", icon: "💄", count: "65 Items" },
  { name: "Wines & Drinks", icon: "🍷", count: "42 Items" },
  { name: "Juice", icon: "🧃", count: "38 Items" },
  { name: "Fruits", icon: "🍎", count: "96 Items" },
  { name: "Tea & Coffee", icon: "☕", count: "54 Items" },
];

const SecoundNavbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement>(null);

  const isActive = (link: string) => (link === "/" ? pathname === "/" : pathname.startsWith(link));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="sticky top-0 z-[100] w-full">
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-[1440px] px-4 lg:px-8 mx-auto py-2.5 flex items-center justify-between gap-4">
          
          {/* Left: Category Trigger */}
          <div className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-secondary text-white px-6 py-2.5 rounded-full shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all font-bold text-sm lg:text-base"
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="hidden md:inline">Browse Categories</span>
              <span className="md:hidden">Shop</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
            </motion.button>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {menuData.map((item) => (
              <div key={item.id} className="relative px-4 py-2">
                <a
                  href={item.link}
                  className={`flex items-center gap-1.5 text-[15px] font-semibold transition-all hover:text-secondary
                    ${isActive(item.link) ? "text-secondary" : "text-foreground/80"}
                  `}
                >
                  {item.name === "Deals" && <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />}
                  {item.name}
                  {isActive(item.link) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary mx-4 rounded-full"
                    />
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* Right: Hotline & Mobile Trigger */}
          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-full">
                <PhoneCall className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Hotline</p>
                <p className="text-sm font-bold text-foreground">1900 - 888</p>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Category Popup */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="absolute left-4 right-4 lg:left-8 lg:right-auto lg:w-[1000px] top-full mt-3 z-50"
            >
              <div className="bg-card border border-border/60 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
                {/* Search & Featured Sidebar */}
                <div className="w-full md:w-72 bg-muted/30 p-8 border-r border-border/40">
                  <h3 className="text-lg font-black mb-6">Quick Search</h3>
                  <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Find category..."
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/40 rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                      <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Weekly Offer</p>
                      <p className="text-sm font-medium">Up to 40% off on all organic vegetables</p>
                    </div>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="flex-1 p-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoriesData.map((cat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5,  }}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-secondary/20 hover:bg-secondary/3 transition-all cursor-pointer"
                    >
                      <div className="text-3xl p-3 bg-muted rounded-2xl group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <div>
                        <p className="font-bold text-foreground group-hover:text-secondary">{cat.name}</p>
                        <p className="text-[11px] text-muted-foreground">{cat.count}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer (Same as yours but with matching colors) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-card z-[201] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-border">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-secondary rounded-lg" />
                   <h2 className="text-xl font-black tracking-tighter">MEGAMART</h2>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuData.map((item) => (
                  <MobileMenuItem key={item.id} item={item} pathname={pathname} />
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