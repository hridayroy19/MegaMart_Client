"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, Phone, X, LayoutGrid, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { menuData } from "@/constants/navbarRouteConstants";
import { categoriesData } from "./secoundNavbar";
import MobileMenuItem from "./mobleMenuIte";

const StickyScrollNavbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement>(null);

  const isActive = (link: string) =>
    link === "/" ? pathname === "/" : pathname.startsWith(link);

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
    <div className=" md:block hidden w-full fixed top-0 left-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300">
      <div className="max-w-[1440px] px-4 lg:px-8 mx-auto py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-6 xl:gap-10">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-secondary text-background font-bold px-5 py-2.5 rounded-full shadow-lg shadow-secondary/20 text-sm xl:text-base transition-all hover:shadow-secondary/40"
            onClick={() => setOpen(!open)}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="hidden sm:inline">Browse Categories</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </motion.button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuData.map((item) => (
              <div key={item.id} className="relative group">
                <a
                  href={item.link}
                  className={`relative py-2 text-[15px] font-bold transition-colors flex items-center gap-1
                    ${isActive(item.link) ? "text-secondary" : "text-foreground/80 hover:text-secondary"}
                  `}
                >
                  {item.name}
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                  {isActive(item.link) && (
                    <motion.div
                      layoutId="sticky-active"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full"
                    />
                  )}
                </a>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 border-l border-border pl-6">
            <div className="p-2 bg-secondary/10 rounded-full">
              <Phone className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">
                Support
              </span>
              <span className="text-[15px] font-black text-foreground">
                +(2) 871 382 023
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Category Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-[95vw] max-w-[1200px] z-50 px-4"
          >
            <div className="bg-card border border-border/60 shadow-2xl rounded-3xl overflow-hidden p-6 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for categories..."
                    className="w-full pl-10 pr-4 py-2.5 bg-muted/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categoriesData.map((cat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border/50 bg-card hover:bg-secondary/[0.03] hover:border-secondary/20 transition-all cursor-pointer group text-center"
                  >
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <p className="text-sm font-bold text-foreground group-hover:text-secondary">
                      {cat.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-card z-[201] shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-border">
                <div className="flex p-4 items-center gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-lg" />
                  <h2 className="text-xl font-black tracking-tighter">
                    MEGAMART
                  </h2>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-muted rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 bg-background p-4 space-y-2">
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

export default StickyScrollNavbar;
