"use client";

import { IHotDealsToday } from "@/types";
import Image from "next/image";
import React from "react";

type HotDealsTodaySliderProps = {
  items: IHotDealsToday[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onAdd: (index: number, id: string) => void;
};

export const HotDealsTodaySlider = ({
  items,
  containerRef,
  onAdd,
}: HotDealsTodaySliderProps) => {
  return (
    <div className="h-full">
      <div
        ref={containerRef}
        className="
          flex gap-4 overflow-x-auto pb-2 scrollbar-hide
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          snap-x snap-mandatory
        "
      >
        {items.map((item, index) => {
          const sold = item.sold ?? 0;
          const stock = item.stock ?? 1;
          const soldPercent = Math.min(100, (sold / stock) * 100);

          return (
            <article
              key={item._id}
              className="
            
                group
                snap-start
                relative flex flex-col
                flex-shrink-0
                w-[45%]
                border-border bg-card md:p-4  hover:border-primary transition-all

                sm:w-[40%]             
                md:w-[48%]           
                lg:w-[calc((100%-2rem)/2)]
                xl:w-[calc((100%-3rem)/4)] 
                rounded-2xl border p-4
                shadow-sm  duration-500 ease-in-out
              "
            >
              {/* Product image */}
              <div className="relative mt-10 flex h-40 items-center justify-center overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  width={200}
                  height={160}
                  className="
                    h-full w-auto object-contain
                    pb-5
                    transition-transform duration-500 ease-in-out
                    group-hover:scale-125
                  "
                />
              </div>

              {/* Add button */}
              <button
                className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold text-sky-700 shadow-sm"
                onClick={() => onAdd(index, item._id)}
              >
                Add
                <span className="text-base">🛒</span>
              </button>

              {/* Price row */}
              <div className="mb-1  flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  ${item.salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted">/Qty</span>
                {item.regularPrice && item.regularPrice > item.salePrice && (
                  <span className="text-lg text-muted line-through">
                    ${item.regularPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="mb-2 flex items-center gap-1 heading-7 text-foreground">
                <span className="text-sm">{item.rating?.toFixed(1) ?? "4.8"}</span>
                <span className="text-amber-400">★</span>
                <span>
                  (
                  {item.ratingCount
                    ? `${Math.round(item.ratingCount / 100) / 10}k`
                    : "17k"}
                  )
                </span>
              </div>

              {/* Name */}
              <h3 className="mb-4 line-clamp-2 heading-6 text-foreground">
                {item.name}
              </h3>

              {/* Progress bar */}
              <div className="mt-auto">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-foreground">
                  Sold: {sold}/{stock}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
