"use client";

import { IProduct } from "@/types";
import {
  Heart,
  Minus,
  Plus,
  Repeat2,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetWishlistQuery, useToggleWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  product: IProduct;
}

const ProductInfo = ({ product }: Props) => {
  const {
    name,
    description,
    pricing,
    rating,
    reviewsCount,
    inventory,
  } = product;

  const sold = inventory?.sold || 0;
  const stock = inventory?.stock || 0;
  const soldPercentage = stock ? Math.min((sold / stock) * 100, 100) : 50;
  const availableStock = stock > sold ? stock - sold : 0;

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: wishlistRes } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
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

  //  State for Quantity 
  const [quantity, setQuantity] = useState(1);

  //  Handlers 
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < availableStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          {name}
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                  ? "text-orange-400 fill-orange-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
            <span className="font-semibold ml-1">{rating} Star Rating</span>
            <span className="text-gray-500">
              ({reviewsCount} User feedback)
            </span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-slate-600">
            SKU: <span className="font-semibold">EB4DRP</span>
          </span>
        </div>
        <hr className="mt-6 text-gray-300" />
      </div>

      {/* Description */}
      <p className="text-slate-500 leading-relaxed text-sm">
        {description ||
          "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent."}
      </p>

      {/* Price & WhatsApp Button */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-slate-900">${pricing?.salePrice > 0 ? pricing.salePrice : pricing?.basePrice}</span>
          {pricing?.discountPercentage > 0 && (
            <span className="text-lg line-through text-gray-400 font-medium">
              ${pricing.basePrice}
            </span>
          )}
        </div>
        <button className="bg-[#108c84] hover:bg-[#0d756e] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition shadow-sm">
          Order on WhatsApp
        </button>
      </div>

      {/* Special Offer Countdown */}
      <div className="bg-[#f0fdf4] border border-green-100 rounded-lg p-4 flex items-center justify-between">
        <span className="text-[#108c84] font-medium text-sm">
          Special Offer:
        </span>
        <div className="flex gap-2">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="bg-white border border-gray-200 text-slate-700 font-bold px-2 py-1 rounded text-xs min-w-[30px] text-center shadow-sm">
              {timeLeft.days}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5">Days</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="bg-white border border-gray-200 text-slate-700 font-bold px-2 py-1 rounded text-xs min-w-[30px] text-center shadow-sm">
              {formatTime(timeLeft.hours)}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5">Hrs</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="bg-white border border-gray-200 text-slate-700 font-bold px-2 py-1 rounded text-xs min-w-[30px] text-center shadow-sm">
              {formatTime(timeLeft.minutes)}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5">Mins</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="bg-white border border-gray-200 text-slate-700 font-bold px-2 py-1 rounded text-xs min-w-[30px] text-center shadow-sm">
              {formatTime(timeLeft.seconds)}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5">Secs</span>
          </div>
        </div>
        <span className="text-gray-500 text-xs hidden sm:block">
          Remains until the end of the offer
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
          <span className="text-blue-600">⚡</span>
          Products are almost sold out
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${soldPercentage}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Available only: <span className="text-slate-900">{availableStock}</span>
        </p>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-4 pt-2">
        <p className="font-semibold text-slate-700 text-sm">Quantity:</p>
        <div className="flex gap-4">

          {/*  Quantity Input */}
          <div className="flex items-center border border-gray-300 rounded-lg select-none">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className={`px-3 py-2 text-gray-600 transition ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
            >
              <Minus size={16} />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center border-none outline-none font-semibold text-slate-700"
            />
            <button
              onClick={handleIncrease}
              disabled={quantity >= availableStock}
              className={`px-3 py-2 text-gray-600 transition ${quantity >= availableStock ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart */}
          <button className="flex-1 bg-[#235789] hover:bg-[#1a446d] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-md">
            <ShoppingCart size={20} />
            Add To Cart
          </button>
        </div>

        {/* Action Buttons  */}
        <div className="flex gap-2 pt-2">
          <button 
            onClick={handleToggleWishlist}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
              isWishlisted
                ? "border-error text-error bg-error/10 hover:bg-error/20"
                : "border-gray-200 text-slate-600 hover:bg-gray-50"
            }`}
          >
            <Heart size={16} className={isWishlisted ? "fill-error" : ""} /> {isWishlisted ? "Wishlisted" : "Wishlist"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <Repeat2 size={16} /> Compare
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-slate-600 ml-auto">
            <Share2 size={16} />
          </button>
        </div>
      </div>
      <div className="border-t border-gray-100 my-6"></div>
      {/* Bottom Coupon Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border border-dashed border-blue-200 bg-blue-50/50 rounded p-3">
          <span className="text-sm text-slate-600 font-medium">
            Mfr. coupon: $3.00 off 5
          </span>
          <a
            href="#"
            className="text-blue-600 text-xs font-bold underline decoration-blue-300"
          >
            View Details
          </a>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
          <li>Buy 1, Get 1 FREE</li>
          <li>Buy 1, Get 1 FREE</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;