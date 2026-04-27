import { IProduct } from "@/types";
import { ShoppingCart, Star, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: IProduct;
  viewMode: "grid" | "list";
}

const VanderProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
}) => {
  const {
    name,
    images,
    rating,
    reviewsCount,
    pricing,
    isBestSeller,
    thumbnail,
  } = product;

  const mainImage = images?.[0] || thumbnail;

  return (
    <Link href={`/shop/${product._id}`} className="block h-full">
      <div
        className={`
          border border-border rounded-xl bg-card transition-all duration-300 shadow-md 
          hover:border-primary
          ${
            viewMode === "list"
              ? "flex flex-row gap-3 p-3 items-center"
              : "flex flex-col p-4 h-full"
          }
        `}
      >
        {/* Image Section */}
        <div
          className={`
            relative bg-border rounded-lg overflow-hidden flex items-center justify-center
            ${
              viewMode === "list"
                ? "w-1/3 px-2 h-48 shrink-0"
                : "w-full h-64 mb-4"
            }
          `}
        >
          {mainImage && (
            <Image
              src={mainImage}
              alt={name}
              width={150}
              height={100}
              className={`object-contain transition-transform duration-300 ${
                viewMode === "grid" ? "hover:scale-[1.2]" : ""
              }`}
            />
          )}

          {pricing?.discountPercentage && pricing.discountPercentage > 0 && (
            <span className="absolute top-3 left-2 bg-card text-primary text-xs font-bold px-2 py-3 rounded-full shadow-md">
              -{pricing.discountPercentage}%
            </span>
          )}

          {isBestSeller && (
            <span className="absolute top-11 mt-4 left-2 bg-background text-foreground text-xs font-bold px-2 py-3 border border-border rounded-full shadow-md">
              HOT
            </span>
          )}

          <div className="absolute top-3 right-3 bg-card w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-muted transition">
            <Plus className="w-5 h-5 text-muted hover:text-foreground" />
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`flex flex-col flex-grow ${
            viewMode === "list" ? "justify-between h-full" : ""
          }`}
        >
          <h4
            className={`text-foreground font-medium leading-snug line-clamp-2 ${
              viewMode === "list" ? "" : "mt-2 mb-3"
            }`}
          >
            {name}
          </h4>

          <div className="flex items-center space-x-1 text-sm text-muted mb-3 mt-2">
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span className="font-bold text-foreground ml-1">
              {rating.toFixed(1)}
            </span>
            <span className="text-muted">
              (
              {reviewsCount > 1000
                ? `${(reviewsCount / 1000).toFixed(1)}K`
                : reviewsCount}
              )
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-auto mb-4">
            {pricing?.basePrice && pricing.basePrice > (pricing?.salePrice || 0) && (
              <span className="text-muted line-through text-lg font-normal">
                ${pricing.basePrice.toFixed(2)}
              </span>
            )}
            <span className="text-foreground font-bold text-xl">
              ${(pricing?.salePrice > 0 ? pricing.salePrice : (pricing?.basePrice || 0)).toFixed(2)}
            </span>
            <span className="text-muted text-sm">/Qty</span>
          </div>

          <button
            className="w-full mt-4 flex items-center justify-center gap-2 hover:bg-primary hover:text-background text-foreground text-sm py-2 px-2 rounded-lg"
            onClick={(e) => e.preventDefault()}
          >
            Add To Cart
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default VanderProductCard;
