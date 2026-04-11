"use client";
import { useState, useRef, useEffect } from "react";
import {
  Heart,
  User,
  ShoppingCart,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import Topbar from "../topbar/topbar";
import SecoundNavbar, { categoriesData } from "./secoundNavbar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/icons/webisteLogo.png";

export default function Navbar() {
  const [openCategory, setOpenCategory] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenCategory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-card shadow-sm sticky top-0 z-[100]">
      <Topbar />

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between bg-card relative">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer">
            <Image
              src={logo}
              width={140}
              height={50}
              alt="MegaMart Logo"
              className="object-contain"
              style={{ height: "auto" }}
            />
          </motion.div>

          <div
            className="hidden md:flex lg:hidden items-center gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-full px-4 py-2 transition-colors cursor-pointer"
            onClick={() => setOpenCategory(!openCategory)}
          >
            <span className="text-sm font-semibold text-primary">
              Categories
            </span>
            <ChevronDown
              className={`w-4 h-4 text-primary transition-transform ${openCategory ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Desktop Search & Category */}
        <div className="hidden lg:flex items-center flex-1 max-w-[800px] mx-10">
          <div className="flex items-center w-full group">
            <div
              className="flex items-center gap-3 bg-primary/5 hover:bg-primary/10 border border-r-0 border-border rounded-l-xl px-5 py-[14px] cursor-pointer transition-all"
              onClick={() => setOpenCategory(!openCategory)}
            >
              <span className="font-bold text-sm text-primary whitespace-nowrap">
                All Categories
              </span>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform ${openCategory ? "rotate-180" : ""}`}
              />
            </div>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands..."
                className="w-full border-border border px-5 py-[14px] rounded-r-xl outline-none focus:border-primary transition-all placeholder:text-muted-foreground/60 text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 transition-colors h-10 w-10 rounded-lg flex items-center justify-center">
                <Search className="text-white h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center  gap-2">
          <div className="flex lg:hidden">
            <IconButton
              onClick={() => setSearchOpen(true)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>

          <IconButton
            icon={<Heart className="w-6 h-6" />}
            className="hidden sm:flex"
          />

          <div className="relative group">
            <IconButton
              icon={<ShoppingCart className="w-6 h-6" />}
              badge={2}
              className="bg-primary/5 text-primary hover:bg-primary hover:text-white"
            />
          </div>
          <IconButton icon={<User className="w-6 h-6" />} />
        </div>

        {/* Modern Category Dropdown */}
        <AnimatePresence>
          {openCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              ref={dropdownRef}
              className="absolute top-[82%] left-0 lg:left-[20%] w-[280px] md:w-[350px] bg-card/95 backdrop-blur-md shadow-2xl border border-border rounded-2xl z-50 mt-2 overflow-hidden"
            >
              <div className="p-4 border-b border-border/50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Filter categories..."
                    className="w-full bg-muted/50 border-none rounded-lg py-2 pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary/30"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground" />
                </div>
              </div>

              <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                {categoriesData.map((cat) => (
                  <motion.button
                    key={cat.name}
                    whileHover={{ x: 4 }}
                    className="flex items-center hover:cursor-pointer gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-primary/10 text-left transition-colors group"
                  >
                    <span className="text-xl group-hover:grayscale-0 transition-all">
                      {cat.icon}
                    </span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Full Screen Search */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl"
            >
              <div className="relative group">
                <input
                  autoFocus
                  placeholder="Search for anything..."
                  className="w-full bg-card border-2 border-primary/20 rounded-2xl py-5 pl-14 pr-6 text-xl shadow-2xl outline-none focus:border-primary"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute -top-12 right-0 text-foreground/60 hover:text-primary transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SecoundNavbar />
    </header>
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  badge?: number;
  className?: string;
  onClick?: () => void;
}

function IconButton({ icon, badge, className, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-2.5 rounded-xl transition-all active:scale-95 text-foreground/70 hover:text-primary hover:bg-primary/10 ${className}`}
    >
      {icon}
      {badge && (
        <span className="absolute top-1 right-1 bg-secondary text-[10px] font-bold text-white w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
          {badge}
        </span>
      )}
    </button>
  );
}
