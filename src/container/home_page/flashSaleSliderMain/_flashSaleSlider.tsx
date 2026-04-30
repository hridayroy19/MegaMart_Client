/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { setActiveSlide } from "@/redux/features/flashSale/flashSaleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IFlashSale } from "@/types";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { addItem, syncCartToServer } from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";

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
      const lastChild = container.children[lastIndex] as
        | HTMLElement
        | undefined;
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
          const sold = item.inventory?.sold ?? 0;
          const stock = item.inventory?.stock ?? 1;
          const soldPercent = Math.min(100, (sold / stock) * 100);
          const salePrice = item.pricing?.salePrice || 0;
          const basePrice = item.pricing?.basePrice || 0;

          return (
            <article
              key={item._id}
              className="
    group relative flex flex-col flex-shrink-0
    bg-background border border-border
    rounded-2xl p-3 transition-colors duration-200
    w-[45%] sm:w-[40%] md:w-[calc((100%-2rem)/4)] xl:w-[calc((100%-3rem)/5)]
  "
            >
              <span className="absolute top-2.5 left-2.5 text-destructive font-medium px-2 py-0.5 rounded-full">
                -{Math.round(((basePrice - salePrice) / basePrice) * 100)}%
              </span>

              <button
                onClick={async () => {
                  dispatch(addItem({ product: item._id, quantity: 1 }));
                  try {
                    await dispatch(syncCartToServer() as any).unwrap();
                  } catch (err) {}
                  toast.success("Added to Cart");
                }}
                className="absolute top-2.5 right-2.5 rounded-full  flex items-center justify-center transition-colors "
              >
                <Plus
                  size={24}
                  className="text-primary hover:border rounded-full border-primary cursor-pointer "
                />
              </button>

              {/* Image */}
              <div className="flex items-center justify-center h-24 mt-7 mb-2.5">
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  width={120}
                  height={96}
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 flex-wrap mb-1">
                <span className="text-[15px] font-medium text-foreground">
                  ${salePrice.toFixed(2)}
                </span>
                {basePrice > salePrice && (
                  <span className="text-xs text-foreground line-through">
                    ${basePrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-zinc-400 mb-1">
                <span className="text-amber-500">★</span>
                <span>{item.rating?.toFixed(1) ?? "4.8"}</span>
                <span>
                  (
                  {item.reviewsCount
                    ? `${(item.reviewsCount / 1000).toFixed(1)}k`
                    : "17k"}
                  )
                </span>
              </div>

              {/* Name */}
              <Link
                href={`/shop/${item._id}`}
                className="text-md text-foreground leading-snug line-clamp-2 mb-2 flex-1 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>

              {/* Progress */}
              <div className="mt-auto">
                <div className="h-1 w-full rounded-full bg-background overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full bg-destructive"
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
                <p className="text-[14px] text-foreground">
                  Sold:{" "}
                  <span className="text-destructive font-medium">{sold}</span>/
                  {stock}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
