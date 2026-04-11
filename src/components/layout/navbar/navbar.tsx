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

export default function Navbar() {
  const [openCategory, setOpenCategory] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close dropdown when clicking outside
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
    <header className="w-full bg-card shadow-md">
      <Topbar />

      <div className="max-content-width mx-auto px-4 py-4 flex items-center justify-between border-b border-border bg-card relative">
        {/* Logo */}
        <div className="flex items-center gap-7">
          <span className="lg:text-4xl md:text-3xl text-2xl font-extrabold text-primary">
            Al-Riwaa
          </span>

          {/* Tablet md category button */}
          <div
            className="hidden md:flex lg:hidden bg-primary/20 items-center gap-2 border border-border rounded-full p-2 cursor-pointer"
            onClick={() => setOpenCategory(!openCategory)}
          >
            <span className="font-medium text-sm text-primary">
              All Categories
            </span>
            <ChevronDown className="w-5 h-5 font-bold" />
          </div>
        </div>

        {/* Desktop: Full search & categories */}
        <div className="hidden lg:flex items-center xl:w-[896px] w-[630px]">
          <div
            className="flex xl:w-[300px] w-[270px] bg-primary/20 items-center xl:gap-12 gap-5 border border-border rounded-l-lg px-4 xl:py-4 py-3 cursor-pointer"
            onClick={() => setOpenCategory(!openCategory)}
          >
            <span className="font-bold text-primary">All Categories</span>
            <ChevronDown className="w-5 h-5 font-bold" />
          </div>

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products, categories or brands..."
              className="w-full border-border border px-4 xl:py-4 py-3 pr-16 rounded-md outline-none placeholder:text-muted"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary xl:h-12 h-10 xl:w-12 w-10 rounded-md flex items-center justify-center">
              <Search className="text-background h-6 w-5" />
            </div>
          </div>
        </div>

        {/* Tablet/Mobile Icons */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* <Search className="w-6 h-6 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary" /> */}
          <Search
            onClick={() => setSearchOpen(true)}
            className="w-6 h-6 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary"
          />

          <ShoppingCart className="w-6 h-6 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary" />
          <Heart className="w-6 h-6 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary" />
          <User className="w-6 h-6 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary" />
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-4 mr-3">
          <Heart className="w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary" />
          <User className="w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary" />
          <div className="relative">
            <ShoppingCart className="w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary" />
            <span className="absolute -top-2 -right-2 text-xs bg-secondary text-background w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </div>
        </div>

        {/* Category dropdown (all devices) */}
        {openCategory && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 md:left-[20%] lg:left-[18%] w-[90%] sm:w-[400px] md:w-[450px] lg:w-[550px] bg-card shadow-lg border border-border rounded-lg max-h-64 overflow-y-auto z-50 mt-2"
          >
            {/* Search inside categories */}
            <div className="p-4 rounded-2xl">
              <div className="flex items-center border rounded-lg border-primary px-3 py-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none"
                />
                <Search className="text-foreground" />
              </div>
            </div>

            {/* Categories list */}
            <div className="p-3 space-y-3">
              {categoriesData.map((cat) => (
                <button
                  key={cat.name}
                  className="flex items-center gap-3 w-full px-2 py-2 rounded-lg border-border text-left hover:bg-primary/25 hover:border-b hover:border hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_4px_6px_-2px_rgba(0,0,0,0.2)] transition-shadow duration-300"
                >
                  <span className="text-xl font-semibold">{cat.icon}</span>
                  <span className="text-foreground font-semibold">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* 🔵 Dark Deep Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#121535] z-[10]"
            />

            {/* 🔍 Center Search Field */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[550px]"
            >
              <div className="relative w-full">
                {/* Search Icon */}

                {/* Input */}
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-5 py-4 rounded-full text-xl bg-white outline-none shadow-lg focus:ring-2 focus:ring-primary"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  <Search className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            {/* ❌ Top-Right Close Icon */}
            <button
              onClick={() => setSearchOpen(false)}
              className="fixed top-6 right-6 z-[1001] text-white"
            >
              <X className="w-10 h-10 hover:scale-110 transition-transform duration-200" />
            </button>
          </>
        )}
      </AnimatePresence>

      <SecoundNavbar />
    </header>
  );
}
