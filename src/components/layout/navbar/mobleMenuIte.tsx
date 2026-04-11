"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface MenuItem {
  id: number;
  name: string;
  link: string;
  children?: { id: number; name: string; link: string }[];
}

interface Props {
  item: MenuItem;
  pathname: string;
}

const MobileMenuItem = ({ item, pathname }: Props) => {
  const [open, setOpen] = useState(false);
  // Update activeMenu based on URL path
  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname.startsWith(link);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center px-2 py-2 rounded-md transition 
          ${
            isActive(item.link)
              ? "text-secondary font-bold"
              : "text-foreground hover:text-primary"
          }`}
      >
        {item.name}
        {item.children && (
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {item.children && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden pl-4 flex flex-col gap-1"
        >
          {item.children.map((child) => (
            <a
              key={child.id}
              href={child.link}
              className={`text-sm px-2 py-1 rounded-md hover:text-primary ${
                pathname === child.link
                  ? "text-secondary font-semibold"
                  : "text-foreground"
              }`}
            >
              {child.name}
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MobileMenuItem;
