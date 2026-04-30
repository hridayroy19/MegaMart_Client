/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  User,
  LayoutGrid,
  PhoneCall,
  Zap,
  Heart,
  ShoppingCart,
  LogOut,
  UserCircle,
  Tag,
  Store,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGetFeatureCategoriesQuery } from "@/redux/features/featureCategory/featureCategoryApi";
import { useGetAllBransQuery } from "@/redux/features/brands/brandsApi";
import { useGetShopingProductsQuery } from "@/redux/features/shopingProduct/shopingProductApi";
import CartDrawer from "../cart/CartDrawer";
import { menuData } from "@/constants/navbarRouteConstants";
import MobileMenuItem from "./mobleMenuIte";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  badge?: number;
}

const SecoundNavbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"categories" | "brands">(
    "categories",
  );

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const popupRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const cartCount = useSelector((s: RootState) => s.cart.items.length || 0);

  // Fetch dynamic data
  const { data: categories } = useGetFeatureCategoriesQuery(undefined);
  const { data: brands } = useGetAllBransQuery(undefined);
  const { data: allProducts } = useGetShopingProductsQuery(undefined);
  const [logoutApi] = useLogoutMutation();

  // Calculate dynamic all categories from products
  const allCategories = React.useMemo(() => {
    const catMap = new Map<string, number>();
    allProducts?.forEach((product) => {
      if (product.category) {
        const count = catMap.get(product.category) || 0;
        catMap.set(product.category, count + 1);
      }
    });
    return Array.from(catMap.entries()).map(([title, count]) => ({
      title,
      count,
      _id: title,
      image: categories?.find((c: any) => c.title === title)?.image || "",
    }));
  }, [allProducts, categories]);

  const brandCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts?.forEach((p) => {
      if (p.brand) counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const IconCluster = () => (
    <>
      <Link href="/dashboard/wishlist">
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
                      My Dashboard
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
      <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-[1440px] px-4 lg:px-8 mx-auto py-2.5 flex items-center justify-between gap-4">
          {/* Left: Dynamic Category Trigger */}
          <div className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-secondary text-white px-6 py-2.5 rounded-full shadow-lg font-bold text-sm lg:text-base transition-all"
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="hidden md:inline">Browse Products</span>
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

          {/* Right Section */}
          <div className="flex items-center gap-4">
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

            <div className="flex xl:hidden items-center gap-2">
              <IconCluster />
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Dynamic Mega Menu ── */}
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
              className="absolute left-4 right-4 lg:left-8 lg:right-auto lg:w-[1100px] top-full mt-3 z-50"
            >
              <div className="bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-72 bg-muted/30 p-8 border-r border-border">
                  <h3 className="text-lg font-black mb-8">Browse Market</h3>

                  <div className="space-y-4">
                    <button
                      onClick={() => setActiveTab("categories")}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                        activeTab === "categories"
                          ? "bg-secondary text-white shadow-lg"
                          : "bg-background hover:bg-muted border border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Tag size={20} />
                        <span className="font-bold">Categories</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>

                    <button
                      onClick={() => setActiveTab("brands")}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                        activeTab === "brands"
                          ? "bg-secondary text-white shadow-lg"
                          : "bg-background hover:bg-muted border border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Store size={20} />
                        <span className="font-bold">Popular Brands</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="mt-12 p-6 bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 rounded-2xl">
                    <p className="text-xs font-bold text-secondary uppercase mb-2">
                      Weekly Offer
                    </p>
                    <p className="text-sm font-medium mb-4">
                      Up to 40% off on organic vegetables
                    </p>
                    <Link href="/shop" className="text-xs font-bold underline">
                      Shop Now
                    </Link>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black">
                      {activeTab === "categories"
                        ? "Explore Categories"
                        : "Shop by Brands"}
                    </h3>
                    <Link
                      href="/shop"
                      className="text-sm font-bold text-secondary flex items-center gap-1"
                    >
                      View All <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                    {activeTab === "categories"
                      ? allCategories?.map((cat: any) => (
                          <div
                            key={cat._id}
                            onClick={() => {
                              setOpen(false);
                              router.push(`/shop?category=${cat.title}`);
                            }}
                            className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-secondary/20 hover:bg-secondary/5 transition-all cursor-pointer"
                          >
                            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform overflow-hidden relative">
                              {cat.image ? (
                                <img
                                  src={cat.image}
                                  alt={cat.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                "📦"
                              )}
                            </div>
                            <div>
                              <p className="font-bold group-hover:text-secondary transition-colors line-clamp-1">
                                {cat.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                Total Items: {cat.count}
                              </p>
                            </div>
                          </div>
                        ))
                      : brands?.map((brand: any) => (
                          <div
                            key={brand._id}
                            onClick={() => {
                              setOpen(false);
                              router.push(`/shop?brand=${brand.title}`);
                            }}
                            className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-secondary/20 hover:bg-secondary/5 transition-all cursor-pointer"
                          >
                            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform overflow-hidden relative">
                              {brand.image ? (
                                <img
                                  src={brand.image}
                                  alt={brand.title}
                                  className="w-full h-full object-contain p-2"
                                />
                              ) : (
                                <Store
                                  size={24}
                                  className="text-muted-foreground"
                                />
                              )}
                            </div>
                            <div>
                              <p className="font-bold group-hover:text-secondary transition-colors line-clamp-1">
                                {brand.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                Total Items: {brandCounts[brand.title] || 0}
                              </p>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Sidebar */}
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

const ArrowRight = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function IconButton({ icon, badge, className, ...props }: IconButtonProps) {
  return (
    <button
      className={`relative p-2.5 rounded-xl hover:bg-secondary/10 text-foreground/80 hover:text-secondary transition-all ${className || ""}`}
      {...props}
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
