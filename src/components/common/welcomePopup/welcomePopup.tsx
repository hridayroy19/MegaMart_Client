"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import welcome from "@/assets/images/welcome/Welcome to MEGAMART!.png";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("popup_shown");
    if (!shown) {
      setOpen(true);
      sessionStorage.setItem("popup_shown", "true");
    }
  }, []);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[800] flex items-center justify-center bg-black/5 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 right-3 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-card-foreground shadow hover:bg-accent hover:text-primary transition"
            >
              ✕
            </button>

            {/* Image */}
            <Image
              src={welcome}
              alt="Welcome"
              width={500}
              height={450}
              className="object-contain px-4"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
