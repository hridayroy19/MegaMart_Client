"use client";

import { useGetHotDealsTodayQuery } from "@/redux/features/hotDealsToday/hotDealsTodayApi";
import {
  setHotDealsTodayActiveSlide,
  setSelectedHotDealId,
} from "@/redux/features/hotDealsToday/hotDealsTodaySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IHotDealsToday } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HotDealsTodayCounterCard } from "./_HotDealsTodayCounterCard";
import { HotDealsTodaySlider } from "./_hotDealsTodaySlider";

const AUTO_SLIDE_INTERVAL = 4000;

export const HotDealsToday = () => {
  const { data, isLoading, isError } = useGetHotDealsTodayQuery();
  const items = (data ?? []) as IHotDealsToday[];

  const dispatch = useAppDispatch();
  const { activeSlide } = useAppSelector((state) => state.hotDealsTodayUI);

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

  const visibleCount = isMobile ? 1 : 4;
  const maxIndex = Math.max(0, items.length - visibleCount);

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;

    container.scrollTo({
      left: child.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const handleNext = useCallback(() => {
    if (!items.length || !containerRef.current) return;

    if (activeSlide >= maxIndex) {
      const container = containerRef.current;
      container.scrollTo({ left: 0, behavior: "auto" });
      dispatch(setHotDealsTodayActiveSlide(0));
    } else {
      const nextIndex = activeSlide + 1;
      dispatch(setHotDealsTodayActiveSlide(nextIndex));
      scrollToIndex(nextIndex);
    }
  }, [activeSlide, dispatch, items.length, maxIndex, scrollToIndex]);

  const handlePrev = useCallback(() => {
    if (!items.length || !containerRef.current) return;

    if (activeSlide <= 0) {
      const container = containerRef.current;
      const lastIndex = maxIndex;
      const child = container.children[lastIndex] as HTMLElement | undefined;
      if (!child) return;

      container.scrollTo({
        left: child.offsetLeft,
        behavior: "auto",
      });
      dispatch(setHotDealsTodayActiveSlide(lastIndex));
    } else {
      const prevIndex = activeSlide - 1;
      dispatch(setHotDealsTodayActiveSlide(prevIndex));
      scrollToIndex(prevIndex);
    }
  }, [activeSlide, dispatch, items.length, maxIndex, scrollToIndex]);

  useEffect(() => {
    if (!items.length) return;

    const id = setTimeout(() => {
      handleNext();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearTimeout(id);
  }, [activeSlide, items.length, handleNext]);

  const handleAdd = (index: number, id: string) => {
    const safeIndex = Math.min(index, maxIndex);
    dispatch(setSelectedHotDealId(id));
    dispatch(setHotDealsTodayActiveSlide(safeIndex));
    scrollToIndex(safeIndex);
  };

  if (isLoading) {
    return (
      <section className="py-6 px-4">
        <h2 className="mb-4 text-2xl font-bold">Hot Deals Today</h2>
        <p className="text-sm text-muted-foreground">Loading deals...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-6 px-4">
        <h2 className="mb-4 text-2xl font-bold">Hot Deals Today</h2>
        <p className="text-sm text-muted-foreground">No deals available</p>
      </section>
    );
  }
  return (
    <section className="  space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className=" tracking-tight">Hot Deals Todays</h2>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <button className=" font-medium text-foreground ">
            View All Deals
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm disabled:opacity-40"
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

      <div
        className="
         grid gap-6
          grid-cols-1
          md:grid-cols-[360px_minmax(0,1fr)]
          lg:grid-cols-[400px_minmax(0,1fr)]
          xl:grid-cols-[430px_minmax(0,1fr)]
          items-stretch"
      >
        <HotDealsTodayCounterCard />
        <HotDealsTodaySlider
          items={items}
          containerRef={containerRef}
          onAdd={handleAdd}
        />
      </div>
    </section>
  );
}

