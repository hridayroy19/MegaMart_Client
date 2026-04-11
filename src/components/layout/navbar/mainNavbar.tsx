"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";
import StickyScrollNavbar from "./StickyScrollNavbar";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "./bottomNav";

const MainNavbar = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showTopNavbar = scrollY <= 50;
  const showStickyNavbar = scrollY > 50;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Top Navbar (default) */}
        <AnimatePresence mode="wait">
          {showTopNavbar && (
            <motion.div
              key="top-navbar"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <Navbar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Navbar (scroll down) */}
        <AnimatePresence mode="wait">
          {showStickyNavbar && (
            <motion.div
              key="sticky-navbar"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full"
            >
              <StickyScrollNavbar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </>
  );
};

export default MainNavbar;
