/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetSellProductQuery } from "@/redux/features/sellsProduct/sellProductApi";
import PromoCard from "./promoCard";
import { Button } from "@/components/ui/button";
import productImage from "@/assets/images/homePage/hotDealsToday/ccTv.png";
export default function DailyBestSells() {
  const { data = [], isLoading, isError, error } = useGetSellProductQuery();

  const [products, setProducts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const slideStep = 2;

  useEffect(() => {
    const updateItemsPerPage = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerPage(1);
      else if (w < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    if (data.length) {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prev) =>
        prev.map((item) => {
          const endTime = new Date(
            item.flashSale?.endTime || Date.now() + 86400000,
          ).getTime();
          const now = new Date().getTime();
          const distance = endTime - now;

          if (distance < 0) {
            return {
              ...item,
              timer: { days: 0, hours: 0, minutes: 0, seconds: 0 },
            };
          }

          return {
            ...item,
            timer: {
              days: Math.floor(distance / (1000 * 60 * 60 * 24)),
              hours: Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
              ),
              minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((distance % (1000 * 60)) / 1000),
            },
          };
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  // Slider controls
  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex((prev) =>
        Math.min(prev + slideStep, products.length - itemsPerPage),
      );
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - slideStep, 0));
    }
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  const canPrev = currentIndex > 0;
  const canNext = currentIndex + itemsPerPage < products.length;

  if (isLoading) return <p className="py-6 text-sm">Loading...</p>;

  if (isError) {
    console.log(error);
    return <p className="py-6 text-sm">Failed to load product.</p>;
  }

  if (!products.length) {
    return <p className="py-6 text-sm">No product available.</p>;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2>Daily Best Sells</h2>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous"
            className="p-2 rounded-full bg-primary/20 hover:bg-primary hover:text-background transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next"
            className="p-2 rounded-full bg-primary/20 hover:bg-primary hover:text-background transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row items-stretch gap-5">
        {/* Promo Card — hidden on mobile/tablet, visible on lg+ */}
        <div className="hidden lg:block lg:w-[250px] xl:w-70 shrink-0">
          <PromoCard
            discount={"50% Discount"}
            title={"Best Shopping"}
            subtitle={"Iphone's"}
            bgColor="bg-primary"
            image={productImage.src}
          />
        </div>

        {/* Product Grid */}
        <div
          className="
            grid gap-4 sm:gap-5 flex-1 transition-all duration-500 w-full
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-2
          "
        >
          {visibleProducts.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between border rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition"
            >
              {/* Sale badge */}
              <span className="bg-destructive text-background text-xs px-2 py-1 rounded w-fit">
                Sale {item.pricing?.discountPercentage}%
              </span>

              {/* Content row */}
              <div className="flex gap-3 sm:gap-5 mt-2">
                {/* Image */}
                <div className="shrink-0">
                  <Image
                    src={item.thumbnail}
                    width={80}
                    height={80}
                    alt={item.name}
                    className="rounded object-contain w-[72px] h-[72px] sm:w-[90px] sm:h-[90px]"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Price */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="line-through text-sm text-muted-foreground">
                      ${item.pricing?.basePrice}
                    </span>
                    <span className="font-bold text-sm">
                      ${item.pricing?.salePrice}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs sm:text-sm mt-0.5">
                    <Star size={13} className="fill-black shrink-0" />
                    <span>{item.rating}</span>
                    <span className="text-muted-foreground">
                      ({item.reviewsCount})
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-1 text-sm font-medium leading-snug line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm mt-0.5 text-muted-foreground">
                    By {item.seller}
                  </p>

                  {/* Progress */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className="bg-primary h-2 rounded"
                        style={{
                          width: `${(item.inventory?.sold / (item.inventory?.stock + item.inventory?.sold)) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-muted-foreground">
                      Sold: {item.inventory?.sold}
                    </p>
                  </div>

                  {/* Timer + Button */}
                  <div className="flex overflow-hidden flex-col xs:flex-row sm:flex-col md:flex-row lg:flex-col xl:flex-row items-start gap-2 mt-2 flex-wrap">
                    {/* Timer */}
                    <div className="grid grid-cols-4 gap-1 text-[11px] sm:text-[12px] font-semibold shrink-0">
                      {[
                        { label: "Day", value: item.timer?.days || 0 },
                        { label: "Hrs", value: item.timer?.hours || 0 },
                        { label: "Min", value: item.timer?.minutes || 0 },
                        { label: "Sec", value: item.timer?.seconds || 0 },
                      ].map(({ label, value }) => (
                        <span
                          key={label}
                          className="bg-primary/15 px-2 py-1 rounded-sm text-center whitespace-nowrap"
                        >
                          {String(value).padStart(2, "0")} {label}
                        </span>
                      ))}
                    </div>

                    {/* Add to Cart */}
                    <Button
                      size="sm"
                      className="text-background text-xs sm:text-sm whitespace-nowrap w-full xs:w-auto"
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
