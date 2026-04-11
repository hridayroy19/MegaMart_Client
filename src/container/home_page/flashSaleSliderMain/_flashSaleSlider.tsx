"use client";

import {
  setActiveSlide,
  setSelectedFlashSaleId,
} from "@/redux/features/flashSale/flashSaleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IFlashSale } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type FlashSaleSliderProps = {
  items: IFlashSale[];
};

const AUTO_SLIDE_INTERVAL = 4000;

export const FlashSaleSlider = ({ items }: FlashSaleSliderProps) => {
  const dispatch = useAppDispatch();
  const { activeSlide } = useAppSelector((state) => state.flashSaleUI);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 640px)");

    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    update(mq);
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  const step = isMobile ? 2 : 1;

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;

    const childLeft = child.offsetLeft;

    container.scrollTo({
      left: childLeft,
      behavior: "smooth",
    });
  }, []);

  const maxIndex = Math.max(0, items.length - step);

  // seamless Next
  const handleNext = useCallback(() => {
    if (!items.length || !containerRef.current) return;

    const container = containerRef.current;

    if (activeSlide >= maxIndex) {
      const firstChild = container.children[0] as HTMLElement | undefined;
      if (!firstChild) return;

      container.scrollTo({
        left: firstChild.offsetLeft,
        behavior: "auto",
      });
      dispatch(setActiveSlide(0));
    } else {
      const nextIndex = activeSlide + step;
      dispatch(setActiveSlide(nextIndex));
      scrollToIndex(nextIndex);
    }
  }, [activeSlide, dispatch, items.length, maxIndex, scrollToIndex, step]);

  // seamless Prev
  const handlePrev = useCallback(() => {
    if (!items.length || !containerRef.current) return;

    const container = containerRef.current;

    if (activeSlide <= 0) {
      const lastIndex = maxIndex;
      const lastChild = container.children[lastIndex] as HTMLElement | undefined;
      if (!lastChild) return;

      container.scrollTo({
        left: lastChild.offsetLeft,
        behavior: "auto",
      });
      dispatch(setActiveSlide(lastIndex));
    } else {
      const prevIndex = activeSlide - step;
      const safeIndex = prevIndex < 0 ? 0 : prevIndex;
      dispatch(setActiveSlide(safeIndex));
      scrollToIndex(safeIndex);
    }
  }, [activeSlide, dispatch, items.length, maxIndex, scrollToIndex, step]);

  // auto slide
  useEffect(() => {
    if (!items.length) return;

    const id = setTimeout(() => {
      handleNext();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearTimeout(id);
  }, [activeSlide, items.length, handleNext]);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className=" tracking-tight">Flash Sales Today</h2>

        <div className="flex items-center gap-4">
          <button className=" font-medium text-foreground hover:underline">
            View All Deals
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex  items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm disabled:opacity-40"
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm disabled:opacity-40"
              aria-label="Next"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
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
                border-border bg-card md:p-4  hover:border-primary transition-all
                relative flex flex-col
                flex-shrink-0
                w-[45%]              
                sm:w-[40%]          
                 md:w-[calc((100%-2rem)/4)]          
                lg:w-[calc((100%-2rem)/4)] 
                xl:w-[calc((100%-3rem)/4)]  
                p-4
                border
                shadow-sm  duration-500 ease-in-out
                rounded-2xl 
             
              "
            >
              {/* Product image */}
              <div className="relative  mt-2  md:mt-10 flex h-48 md:h-60   items-center justify-center overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  width={200}
                  height={160}
                  className="
                  md:pb-7
                    h-full w-auto object-contain
                    transition-transform duration-500 ease-in-out
                    group-hover:scale-119
                  "
                />
              </div>

              {/* Add button */}
              <button
                className="absolute right-4 md:top-4 flex items-center gap-1 rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold text-sky-700 shadow-sm"
                onClick={() => dispatch(setSelectedFlashSaleId(item._id))}
              >
                Add
                <span className="text-base">🛒</span>
              </button>
              {/* Price row */}
              <div className="mb-1 flex items-center  gap-2">
                <span className=" font-bold text-foreground text-lg ">
                  ${item.salePrice.toFixed(2)}
                </span>
                <span className="text-lg text-muted">/Qty</span>
                {item.regularPrice && item.regularPrice > item.salePrice && (
                  <span className="text-lg text-muted line-through">
                    ${item.regularPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="mb-2 flex items-center gap-1  text-foreground">
                <span>{item.rating?.toFixed(1) ?? "4.8"}</span>
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
              <h3 className="mb-4 line-clamp-2  text-foreground">
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
    </section>
  );
};
