/* eslint-disable @typescript-eslint/no-explicit-any */
import advertise from "@/assets/images/shopingPage/advertise-img1.png";
import { Star, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import styles from "./shoping.module.css";
import Image from "next/image";

// Interface for Category
export interface CategoryData {
  name: string;
  count: number;
}

interface ShopingSidebarProps {
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  categories: CategoryData[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  brandsList: { name: string; count: number }[];
  onClearFilters: () => void;

  isMobile?: boolean;
  onClose?: () => void;
}

const ShopingSidebar: React.FC<ShopingSidebarProps> = ({
  selectedRating,
  setSelectedRating,
  selectedColors,
  setSelectedColors,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  categories,
  selectedCategory,
  setSelectedCategory,
  brandsList,
  onClearFilters,
  isMobile = false,
  onClose,
}) => {
  // Local State for Price Slider
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange[1] || 2000);

  useEffect(() => {
    setLocalMaxPrice(priceRange[1]);
  }, [priceRange]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMaxPrice(Number(e.target.value));
  };

  const applyPriceFilter = () => {
    setPriceRange([0, localMaxPrice]);
  };

  // Handlers
  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors((prev) => prev.filter((c) => c !== colorName));
    } else {
      setSelectedColors((prev) => [...prev, colorName]);
    }
  };

  const toggleBrand = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands((prev) => prev.filter((b) => b !== brandName));
    } else {
      setSelectedBrands((prev) => [...prev, brandName]);
    }
  };

  const handleRatingClick = (stars: number) => {
    if (selectedRating === stars) setSelectedRating(null);
    else setSelectedRating(stars);
  };

  const handleCategoryClick = (catName: string) => {
    if (selectedCategory === catName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catName);
    }
  };

  const ratings = [
    { stars: 5, count: 124, percent: 60 },
    { stars: 4, count: 52, percent: 40 },
    { stars: 3, count: 12, percent: 20 },
    { stars: 2, count: 5, percent: 10 },
    { stars: 1, count: 2, percent: 5 },
  ];
  const colors = [
    { name: "Black", color: "#000000", count: 12 },
    { name: "Blue", color: "#3B82F6", count: 12 },
    { name: "Gray", color: "#6B7280", count: 12 },
    { name: "Green", color: "#22C55E", count: 12 },
    { name: "Red", color: "#EF4444", count: 12 },
    { name: "White", color: "#FFFFFF", count: 12 },
    { name: "Purple", color: "#A855F7", count: 12 },
  ];

  return (
    <aside
      className={`w-full bg-background p-5 space-y-8 h-full  overflow-y-auto
            ${isMobile ? "" : "rounded-lg border border-slate-200"}`}
    >
      <div>
        <div className="flex justify-between items-center border-b border-zinc-300 pb-4 mb-4 ">
          <h3 className=" text-foreground">Product Category</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearFilters}
              className="text-xs text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Clear Filters
            </button>
            {/* Close Button for Mobile */}
            {isMobile && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        <ul
          className={`space-y-3 max-h-[650px] overflow-y-auto pr-2 ${styles.customScrollbar}`}
        >
          {categories.map((cat, idx) => {
            const isActive = selectedCategory === cat.name;
            return (
              <li
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex justify-between items-center cursor-pointer transition-colors group ${isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"}`}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {cat.name}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600"}`}
                >
                  {cat.count}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <hr className="border-zinc-300" />

      {/* Filter by Price */}
      <div>
        <h3 className=" font-bold  mb-6">Filter by Price</h3>
        <div className="relative w-full mb-6">
          <input
            type="range"
            min="0"
            max="2000"
            value={localMaxPrice}
            onChange={handlePriceChange}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={applyPriceFilter}
            className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            Filter
          </button>
          <span className="text-sm font-medium text-gray-600">
            Price:{" "}
            <span className="text-foreground font-bold">
              $0 - ${localMaxPrice}
            </span>
          </span>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Filter by Rating */}
      <div>
        <h3 className=" font-bold  mb-4">Filter by Rating</h3>
        <div className="space-y-3">
          {ratings.map((item, idx) => {
            const isActive = selectedRating === item.stars;
            return (
              <div
                key={idx}
                onClick={() => handleRatingClick(item.stars)}
                className="flex items-center gap-3 text-sm cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? "border-blue-600" : "border-gray-300 group-hover:border-blue-600"}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-blue-600" : "bg-transparent group-hover:bg-blue-100"}`}
                  ></div>
                </div>
                <div className="flex items-center gap-0.5 text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < item.stars
                          ? "fill-orange-400"
                          : "text-gray-300 fill-gray-200"
                      }
                    />
                  ))}
                </div>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full ml-1 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
                <span
                  className={`w-8 text-right text-xs font-medium ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`}
                >
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Filter by Color */}
      <div>
        <h3 className=" font-bold  mb-4">Filter by Color</h3>
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none cursor-pointer"
            value={selectedColors[0] || ""}
            onChange={(e) => {
              if (e.target.value) {
                setSelectedColors([e.target.value]);
              } else {
                setSelectedColors([]);
              }
            }}
          >
            <option value="">All Colors</option>
            {colors.map((item, idx) => (
              <option key={idx} value={item.name}>
                {item.name} ({item.count})
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* Filter by Brand */}
      <div>
        <h3 className=" font-bold  mb-4">Filter by Brand</h3>
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none cursor-pointer"
            value={selectedBrands[0] || ""}
            onChange={(e) => {
              if (e.target.value) {
                setSelectedBrands([e.target.value]);
              } else {
                setSelectedBrands([]);
              }
            }}
          >
            <option value="">All Brands</option>
            {brandsList.map((brandObj, idx) => (
              <option key={idx} value={brandObj.name}>
                {brandObj.name} ({brandObj.count})
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
          </div>
        </div>
      </div>

      <hr className="border-slate-200" />
      <div className="w-full pt-2">
        <Image
          width={200}
          height={200}
          src={
            typeof advertise === "string" ? advertise : (advertise as any).src
          }
          alt="Special Offer"
          className="w-full h-auto rounded-lg object-cover hover:opacity-95 transition-opacity cursor-pointer"
          style={{ width: 'auto' }}
        />
      </div>
    </aside>
  );
};

export default ShopingSidebar;
