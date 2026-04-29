/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "./bottomNav";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import SecoundNavbar from "./secoundNavbar";

const MainNavbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useDispatch();
  const { data: userData, isSuccess } = useGetMeQuery({});

  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUser(userData as any));
    }
  }, [isSuccess, userData, dispatch]);

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
              <SecoundNavbar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </>
  );
};

export default MainNavbar;
