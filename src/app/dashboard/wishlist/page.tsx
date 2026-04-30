"use client";

import React, { useState } from "react";
import { 
  Heart, 
  ShoppingBag, 
  ChevronRight, 
  Trash2, 
  CreditCard, 
  Plus, 
  Minus,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useGetWishlistQuery, useToggleWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import { useDispatch } from "react-redux";
import { addItem, syncCartToServer } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function WishlistPage() {
  const { data: wishlistItems, isLoading } = useGetWishlistQuery(undefined);
  const [toggleWishlist] = useToggleWishlistMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Local state for quantities of each item
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleDelete = async (productId: string) => {
    try {
      await toggleWishlist(productId).unwrap();
      toast.success("Removed from wishlist");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to remove item");
    }
  };

  const handleBuyNow = async (product: any) => {
    const qty = quantities[product._id] || 1;
    try {
      dispatch(addItem({ product, quantity: qty }));
      await dispatch(syncCartToServer() as any).unwrap();
      toast.success("Added to cart! Redirecting to checkout...");
      router.push("/checkout");
    } catch (err) {
      toast.error("Failed to proceed to checkout");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">My Wishlist</h1>
        <p className="text-slate-400 text-sm">
          {wishlistItems?.length || 0} items saved. Ready to make them yours?
        </p>
      </div>

      {!wishlistItems || wishlistItems.length === 0 ? (
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl p-16 lg:p-24 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-8 border border-slate-700/50">
            <Heart size={40} className="text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
          <p className="text-slate-400 text-sm max-w-sm mb-10">
            Looks like you haven't saved anything yet. Explore our collection and find something you love!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-amber-400/10"
          >
            <ShoppingBag size={20} />
            Start Shopping <ChevronRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.map((product: any) => {
            const qty = quantities[product._id] || 1;
            const price = product.pricing?.salePrice || product.pricing?.basePrice || 0;
            
            return (
              <div 
                key={product._id} 
                className="group bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl overflow-hidden hover:border-amber-400/30 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col md:flex-row p-6 gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-slate-800/50 rounded-2xl overflow-hidden relative shrink-0">
                    <Image 
                      src={product.images?.[0] || product.thumbnail || "/placeholder.png"} 
                      alt={product.name} 
                      fill 
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                          {product.name}
                        </h3>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {product.description || "No description available for this product."}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-amber-400">${price.toFixed(2)}</span>
                        {product.pricing?.discountPercentage > 0 && (
                          <span className="text-sm text-slate-500 line-through">${product.pricing.basePrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-800/60">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 bg-slate-950/50 border border-slate-800/60 rounded-2xl p-1.5">
                        <button 
                          onClick={() => handleQuantityChange(product._id, -1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-bold text-white text-lg">{qty}</span>
                        <button 
                          onClick={() => handleQuantityChange(product._id, 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Total & Checkout */}
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Item Total</p>
                          <p className="text-xl font-bold text-white">${(price * qty).toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => handleBuyNow(product)}
                          className="flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
                        >
                          <CreditCard size={20} />
                          Buy Now <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
