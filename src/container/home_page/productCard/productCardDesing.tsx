"use client";

import { IProduct } from "@/types";
import { Heart, ShoppingCart, Star, Store } from "lucide-react";
import Image from "next/image";
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from "@/redux/features/wishlist/wishlistApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addItem, syncCartToServer } from '@/redux/features/cart/cartSlice'
import toast from 'react-hot-toast'

export function ProductCard({ product }: { product: IProduct }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: wishlistRes } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const dispatch = useDispatch()
  const [toggleWishlist] = useToggleWishlistMutation();

  const isWishlisted =
    isAuthenticated &&
    (wishlistRes as IProduct[])?.some((p: IProduct) => p._id === product._id);

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      alert("Please login to add to wishlist");
      return;
    }
    try {
      await toggleWishlist(product._id).unwrap();
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
    }
  };

  return (
    <div className="group flex flex-col justify-between border rounded-2xl border-border bg-card md:p-4 p-1 hover:shadow-lg hover:border-primary transition-all min-h-[480px] relative">
      <button
        onClick={handleToggleWishlist}
        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-2 border border-border hover:border-primary rounded-full shadow-sm"
      >
        <Heart
          size={30}
          className={`transition-colors ${
            isWishlisted
              ? "fill-error text-error"
              : "text-foreground hover:text-primary"
          }`}
        />
      </button>

      {/* Badge */}
      {product.tag && (
        <span
          className={`inline-block w-fit text-sm font-semibold px-3 py-1 rounded-full mb-2 ${
            product.tag === "hot-deals"
              ? "bg-error text-accent-foreground"
              : "bg-primary text-accent-foreground"
          }`}
        >
          {product.tag}
        </span>
      )}

      {/* Product Image */}
      <div className="mb-4 flex justify-center overflow-hidden rounded-lg bg-card">
        <Image
          width={100}
          height={100}
          src={product.thumbnail}
          alt={product.name}
          className="h-44 w-32 object-contain transition-transform duration-500 group-hover:scale-120"
        />
      </div>

      {/* Product Name */}
      <h3 className="mb-2 line-clamp-2 hover:text-primary cursor-pointer">
        {product.name}
      </h3>

      {/* Seller */}
      <div className="mb-3 flex items-center gap-1 text-muted text-sm">
        <Store width={16} className="text-primary" />
        <span>By {product.seller}</span>
      </div>

      {/* Price */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg font-bold text-foreground">
          ${product.pricing.salePrice.toFixed(2)}
        </span>
        <span className="text-sm line-through text-muted">
          ${product.pricing.basePrice.toFixed(2)}
        </span>
      </div>

      {/* Rating */}
      <div className="mb-4 flex items-center gap-1">
        <Star
          width={18}
          className="text-popover-foreground fill-popover-foreground"
        />
        <span className="text-sm font-medium text-muted">{product.rating}</span>
        <span className="text-xs text-muted">({product.reviewsCount})</span>
      </div>

      {/* Add To Cart */}
      <button onClick={async () => {
        dispatch(addItem({ product: product._id, quantity: 1 }))
        try { await dispatch(syncCartToServer() as any).unwrap() } catch (err) {}
        toast.success('Added to Cart')
      }} className="mt-auto flex w-full items-center justify-center gap-2 bg-secondary/15 py-2 text-sm font-medium hover:bg-primary hover:text-accent-foreground rounded-3xl transition-colors">
        <ShoppingCart size={18} />
        Add To Cart
      </button>
    </div>
  );
}
