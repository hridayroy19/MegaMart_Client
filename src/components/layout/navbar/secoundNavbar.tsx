"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
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
  { name: "Snack", icon: "🍪" },
  { name: "Juices", icon: "🧃" },
  { name: "Fruites", icon: "🍎" },
  { name: "Tea & Coffees", icon: "☕" },
];

const SecoundNavbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Update activeMenu based on URL path
  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };
  // Inside your SecoundNavbar component
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative">
      <div className="border-t border-border bg-card">
        <div className="max-content-width px-2 mx-auto py-4 flex items-center justify-between">
          {/* Shop Category Button (Visible All Devices) */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-secondary text-background px-4 py-3 rounded-lg lg:hidden"
          >
            🛒 Shop by Category <ChevronDown className="w-4 h-4" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between w-full">
            <div className="relative inline-block text-left">
              <button
                className="flex items-center gap-2 bg-secondary text-background px-4 py-3 rounded-lg shadow-lg"
                onClick={() => setOpen(!open)}
              >
                🛒 Shop by Category <ChevronDown className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Menu */}
            <nav className="flex gap-6 mr-3 text-foreground font-semibold">
              {menuData.map((item) => (
                <div key={item.id} className="relative group">
                  <a
                    href={item.link}
                    className={`flex items-center gap-1.5 font-semibold text-lg transition
                      ${
                        isActive(item.link)
                          ? "text-secondary font-extrabold"
                          : "hover:text-primary"
                      }`}
                  >
                    {item.name}{" "}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </a>

                  {/* Hover Dropdown */}
                  {item.children && (
                    <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-card border border-border rounded-md shadow-lg z-50 min-w-[180px]">
                      {item.children.map((child) => (
                        <a
                          key={child.id}
                          href={child.link}
                          className={`block px-4 py-2 transition
                            ${
                              pathname === child.link
                                ? "text-secondary font-bold"
                                : "hover:text-primary"
                            }`}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden mr-4"
          >
            <Menu className="md:w-10 w-8 h-8 md:h-10" />
          </button>
        </div>
      </div>

      {/* Category Popup All Devices */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef} // <- Add this
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              absolute left-0 right-0 mx-auto mt-3 
              bg-card shadow-2xl rounded-md z-50 border border-border p-6
              w-[95%] sm:w-[90%] md:w-[600px] lg:w-[900px] xl:w-[1100px]
            "
          >
            {/* Search Bar */}
            <div className="w-full mb-3">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Responsive Grid */}
            <div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto"
              style={{ maxHeight: "230px" }}
            >
              {categoriesData.map((cat, i) => (
                <div
                  key={i}
                  className="flex flex-col border border-border hover:bg-primary/20 p-4 items-center gap-2 cursor-pointer hover:text-foreground transition"
                >
                  <div className="text-3xl sm:text-4xl">{cat.icon}</div>
                  <p className="text-sm sm:text-lg font-semibold">{cat.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 bg-card z-50 p-6 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
                <h2 className="text-xl font-bold text-foreground">Menu</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2 overflow-y-auto">
                {menuData.map((item) => (
                  <MobileMenuItem
                    key={item.id}
                    item={item}
                    pathname={pathname}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecoundNavbar;
