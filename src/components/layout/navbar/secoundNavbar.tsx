"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  User,
  LayoutGrid,
  PhoneCall,
  Zap,
  Heart,
  ShoppingCart,
  LogOut,
  UserCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MobileMenuItem from "./mobleMenuIte";
import { menuData } from "@/constants/navbarRouteConstants";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useSelector, useDispatch } from "react-redux";
import CartDrawer from "../cart/CartDrawer";

type IconButtonProps = {
  icon: React.ReactNode;
  badge?: number;
  onClick?: () => void;
};

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
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const cartCount = useSelector((s: RootState) => s.cart.items.length || 0);

  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  // ── Scroll detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Outside Click Logic ───────────────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserOpen(false);
      }
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi({}).unwrap();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      dispatch(logoutUser());
      setUserOpen(false);
    }
  };

  const isActive = (link: string) =>
    link === "/" ? pathname === "/" : pathname.startsWith(link);

  // ── Refactored IconCluster ───────────────────────────────────────────────
  const IconCluster = () => (
    <>
      <Link href="/wishlist">
        <IconButton icon={<Heart className="w-5 h-5" />} />
      </Link>

      <IconButton
        icon={<ShoppingCart className="w-5 h-5" />}
        badge={cartCount}
        onClick={() => setCartOpen(true)}
      />

      <div className="relative" ref={userRef}>
        {isAuthenticated ? (
          <>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-transform">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            </button>

            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-card border border-border rounded-2xl shadow-2xl z-[110] overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-border bg-muted/30">
                    <p className="font-bold text-sm truncate">
                      {user?.username}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/10 hover:text-secondary text-sm font-medium transition-colors"
                    >
                      <UserCircle className="w-4 h-4" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 text-sm font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link href="/login">
            <IconButton icon={<User className="w-5 h-5" />} />
          </Link>
        )}
      </div>
    </>
  );

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
              className="flex items-center gap-3 bg-secondary text-white px-6 py-2.5 rounded-full shadow-lg font-bold text-sm lg:text-base transition-all"
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="hidden md:inline">Browse Categories</span>
              <span className="md:hidden">Shop</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </motion.button>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {menuData.map((item) => (
              <div key={item.id} className="relative px-4 py-2">
                <Link
                  href={item.link}
                  className={`flex items-center gap-1.5 text-[15px] font-semibold transition-all hover:text-secondary ${
                    isActive(item.link)
                      ? "text-secondary"
                      : "text-foreground/80"
                  }`}
                >
                  {item.name === "Deals" && (
                    <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                  )}
                  {item.name}
                </Link>
                {isActive(item.link) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary rounded-full"
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Right Section: Hotline & Icons */}
          <div className="flex items-center gap-4">
            {/* Hotline: Visible only when NOT scrolled on XL screens */}
            <AnimatePresence mode="wait">
              {!scrolled && (
                <motion.div
                  key="hotline"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="hidden xl:flex items-center gap-3"
                >
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <PhoneCall className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                      Hotline
                    </p>
                    <p className="text-sm font-black text-foreground">
                      1900 - 888
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Scrolled Icons: Visible only when scrolled on XL screens */}
              {scrolled && (
                <motion.div
                  key="icons-scrolled"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="hidden xl:flex items-center gap-3"
                >
                  <IconCluster />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile/Tablet Icons: Always visible icons on non-xl screens */}
            <div className="flex xl:hidden items-center gap-2">
              <IconCluster />
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mega Menu ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute left-4 right-4 lg:left-8 lg:right-auto lg:w-[1000px] top-full mt-3 z-50"
            >
              <div className="bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-72 bg-muted/30 p-8 border-r border-border">
                  <h3 className="text-lg font-black mb-6">Quick Search</h3>
                  <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Find category..."
                      className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>
                <div className="flex-1 p-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoriesData.map((cat, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-secondary/20 hover:bg-secondary/5 transition-all cursor-pointer"
                    >
                      <div className="text-3xl p-3 bg-muted rounded-2xl group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <div>
                        <p className="font-bold group-hover:text-secondary transition-colors">
                          {cat.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {cat.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Drawers ── */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ── Mobile Sidebar ── */}
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
              className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-card z-[201] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-border">
                <div className="flex items-center gap-2">
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
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
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

export default SecoundNavbar;

// ── IconButton Sub-component ──
function IconButton({ icon, badge, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2.5 rounded-xl hover:bg-secondary/10 text-foreground/80 hover:text-secondary transition-all"
    >
      {icon}
      {badge ? (
        <span className="absolute -top-1 -right-1 bg-primary text-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
