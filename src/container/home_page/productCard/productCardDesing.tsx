"use client";

import { IProduct } from "@/types";
import { Heart, ShoppingCart, Star, Store } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ProductCard({ product }: { product: IProduct }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group flex flex-col justify-between border rounded-2xl border-border bg-card md:p-4 p-1 hover:shadow-lg hover:border-primary transition-all min-h-[480px] relative">
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
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
      {product.badge.text && (
        <span
          className={`inline-block w-fit text-sm font-semibold px-3 py-1 rounded-full mb-2 ${
            product.badge.color === "red"
              ? "bg-error text-accent-foreground"
              : "bg-primary text-accent-foreground"
          }`}
        >
          {product.badge.text}
        </span>
      )}

      {/* Product Image */}
      <div className="mb-4 flex justify-center overflow-hidden rounded-lg bg-card">
        <Image
          width={100}
          height={100}
          src={product.image}
          alt={product.name}
          className="h-52 w-38 object-contain transition-transform duration-500 group-hover:scale-120"
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
          ${product.price.toFixed(2)}
        </span>
        <span className="text-sm line-through text-muted">
          ${product.originalPrice.toFixed(2)}
        </span>
      </div>

      {/* Rating */}
      <div className="mb-4 flex items-center gap-1">
        <Star
          width={18}
          className="text-popover-foreground fill-popover-foreground"
        />
        <span className="text-sm font-medium text-muted">{product.rating}</span>
        <span className="text-xs text-muted">({product.reviews}k)</span>
      </div>

      {/* Add To Cart */}
      <button className="mt-auto flex w-full items-center justify-center gap-2 bg-secondary/15 py-2 text-sm font-medium hover:bg-primary hover:text-accent-foreground rounded-3xl transition-colors">
        <ShoppingCart size={18} />
        Add To Cart
      </button>
    </div>
  );
}
