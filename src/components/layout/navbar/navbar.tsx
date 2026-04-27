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
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

type IconButtonProps = {
  icon: React.ReactNode;
  badge?: number;
};

export default function Navbar() {
  const [openCategory, setOpenCategory] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi({}).unwrap();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      dispatch(logoutUser());
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setOpenCategory(false);
      }

      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-50">
      <Topbar />

      <div className="max-w-[1440px] mx-auto px-4 lg:py-2 flex items-center justify-between relative">
        {/* Logo */}
        <Image
          src={logo}
          width={200}
          height={80}
          alt="Logo"
          className="object-contain cursor-pointer"
        />

        {/* Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-[700px] mx-10">
          <div className="flex w-full">
            {/* Category Button */}
            <button
              onClick={() => {
                setOpenCategory(!openCategory);
                setUserOpen(false);
              }}
              className="flex items-center gap-2 bg-background/10 hover:bg-background/20 border-secondary/40 border border-r-0 px-4 rounded-l-xl text-sm font-semibold cursor-pointer"
            >
              Categories
              <ChevronDown
                className={`w-4 h-4 transition ${
                  openCategory ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Input */}
            <div className="relative w-full">
              <input
                placeholder="Search products..."
                className="w-full border border-secondary/20 px-4 py-3 rounded-r-xl outline-none focus:border-secondary/20"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-foreground w-9 h-9 rounded-lg flex items-center justify-center">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/wishlist">
            <IconButton icon={<Heart />} />
          </Link>

          <Link href="/cart">
            <IconButton icon={<ShoppingCart />} badge={2} />
          </Link>

          {/* USER */}
          <div className="relative" ref={userRef}>
            {isAuthenticated ? (
              <>
                <button onClick={() => setUserOpen(!userOpen)}>
                  <div className="w-9 h-9 rounded-full bg-primary text-foreground flex items-center justify-center font-semibold">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>

                <AnimatePresence>
                  {userOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-60 bg-background border border-border rounded-xl shadow-2xl z-[999]"
                    >
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm">
                          {user?.username}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>

                      <div className="p-2 space-y-1">
                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 rounded-lg hover:bg-background/10 text-sm"
                        >
                          My Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-danger text-sm"
                        >
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link href="/login">
                <IconButton icon={<User />} />
              </Link>
            )}
          </div>
        </div>

        {/* CATEGORY DROPDOWN */}
        <AnimatePresence>
          {openCategory && (
            <>
              {/* Overlay */}
              <div className="fixed inset-0 bg-background/20 z-40"></div>

              <motion.div
                ref={categoryRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-1/5 mt-20 w-[300px] bg-background border border-border rounded-xl shadow-2xl z-50"
              >
                <div className="p-2 max-h-[300px] overflow-y-auto">
                  {categoriesData.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setOpenCategory(false);
                      }}
                      className="w-full text-left cursor-pointer hover:bg-primary/15 px-3 py-2 rounded-lg"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MOBILE SEARCH */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  placeholder="Search..."
                  className="w-full border px-4 py-3 rounded-lg"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SecoundNavbar />
    </header>
  );
}

function IconButton({ icon, badge }: IconButtonProps) {
  return (
    <button className="relative p-2 rounded-lg hover:bg-background/10">
      {icon}
      {badge && (
        <span className="absolute top-0 right-0 bg-primary text-foreground text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}
