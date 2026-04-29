"use client";

import React from "react";
import { Heart, ShoppingBag, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">My Wishlist</h1>
        <p className="text-slate-400 text-sm">Items you've saved for later. Ready to bring them home?</p>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl p-16 lg:p-24 flex flex-col items-center justify-center text-center shadow-xl">
        <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-8 border border-slate-700/50 relative">
          <Heart size={40} className="text-slate-600" />
          <div className="absolute top-0 right-0 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs">
            0
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
        <p className="text-slate-400 text-sm max-w-sm mb-10 leading-relaxed">
          Looks like you haven't saved anything yet. Explore our collection and find something you love!
        </p>

        <Link
          href="/shop"
          className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-400/10"
        >
          <ShoppingBag size={20} />
          Start Shopping <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
