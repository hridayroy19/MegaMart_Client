/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
import {
  Package,
  Search,
  Filter,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import OrderCard from "@/container/dashboard/ordercard";

export default function OrderHistoryPage() {
  const { user } = useSelector((s: RootState) => s.auth);
  const { data: ordersResponse, isLoading } = useGetMyOrdersQuery(undefined);
  const orders = (ordersResponse as any) || [];

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-background font-medium animate-pulse">
            Fetching your orders...
          </p>
        </div>
      </div>
    );
  }

  const totalSpent = orders.reduce(
    (sum: number, o: any) => sum + (o.total || 0),
    0,
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-background tracking-tight">
            Welcome back,{" "}
            <span className="text-popover-foreground">{user?.username}</span>
          </h1>
          <p className="text-background/80 max-w-md">
            You&apos;ve placed{" "}
            <span className="text-popover-foreground">{orders.length}</span>{" "}
            orders so far. Here&apos;s what&apos;s happening with your latest
            purchases.
          </p>
        </div>

        <div className="bg-secondary/60 backdrop-blur-md border border-background/60 rounded-2xl px-6 py-4 flex items-center gap-6 shadow-lg">
          <div className="p-3 bg-amber-400/10 rounded-xl">
            <Package className="text-amber-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] text-background font-bold uppercase tracking-widest leading-none mb-1">
              Total Investment
            </p>
            <p className="text-2xl font-bold text-background">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/60 backdrop-blur-md border border-background/60 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-2 w-full sm:w-auto px-4 py-2 bg-secondary/60 backdrop-blur-md border border-background/60 rounded-xl  group focus-within:border-amber-400/50 transition-colors">
          <Search
            size={16}
            className="text-slate-500 group-focus-within:text-amber-400 transition-colors"
          />
          <input
            type="text"
            placeholder="Search by Order ID..."
            className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 w-full"
          />
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/50 transition-all text-sm font-medium w-full sm:w-auto justify-center">
          <Filter size={16} />
          Filter Orders
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {!orders.length ? (
          <div className="bg-secondary/60 backdrop-blur-md border border-background/60 rounded-2xl px-6 py-4">
            <div className="w-20 h-20 bg-secondary/60 backdrop-blur-md border border-background/60 rounded-full flex items-center justify-center mb-6 border border-background/60">
              <Package size={32} className="text-background" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">
              No orders found
            </h3>
            <p className="text-slate-400 text-sm mb-8 max-w-xs">
              You haven&apos;t placed any orders yet. Fill your history with
              amazing products!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-s text-slate-900 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-amber-400/10"
            >
              Go to Shop <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order: any) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>

      <Link
        href="/shop"
        className="fixed bottom-8 right-8 lg:hidden w-14 h-14 bg-popover-foreground rounded-full flex items-center justify-center text-slate-900 shadow-2xl shadow-amber-400/40 hover:scale-110 active:scale-95 transition-all z-40"
      >
        <ShoppingBag size={24} />
      </Link>
    </div>
  );
}
