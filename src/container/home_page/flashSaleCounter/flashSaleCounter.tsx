"use client";

import { useEffect, useState } from "react";

import bg1 from "@/assets/images/homePage/flashSaleCounter/Cms-Banner-7.jpg";
import bg2 from "@/assets/images/homePage/flashSaleCounter/Cms-Banner-8.jpg";

import styles from "./flashSaleCounter.module.css";

import { useGetFlashSalesQuery } from "@/redux/features/flashSale/flashSaleApi";

const FlashSaleCounter = () => {
  const { data: flashSales = [], isLoading } = useGetFlashSalesQuery();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!flashSales.length) return;

    const activeSale =
      flashSales.find((s) => s.flashSale?.isActive) || flashSales[0];
    const endTime = new Date(
      activeSale.flashSale?.endTime || Date.now() + 86400000,
    ).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [flashSales]);

  if (isLoading)
    return (
      <div className="p-4 w-full h-[200px] bg-muted animate-pulse rounded-lg"></div>
    );

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-background px-5 py-3 rounded-lg shadow text-center">
      <p className="text-base font-semibold leading-none">{value}</p>
      <span className="text-[11px] text-foreground  leading-none mt-1 block">
        {label}
      </span>
    </div>
  );

  const InlineCounter = () => (
    <div className="flex items-center gap-2 mt-4">
      <TimeBox value={timeLeft.days} label="D" />
      <span className="font-semibold text-sm">:</span>
      <TimeBox value={timeLeft.hours} label="H" />
      <span className="font-semibold text-sm">:</span>
      <TimeBox value={timeLeft.minutes} label="M" />
      <span className="font-semibold text-sm">:</span>
      <TimeBox value={timeLeft.seconds} label="S" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT CARD  */}
      <div
        className={styles.leftCard}
        style={{
          backgroundImage: `url(${bg1.src})`,
        }}
      >
        <div className="w-full  flex flex-col  justify-end py-10  text-center   items-start px-10 md:px-16 lg:px-20 xl:px-24 2xl:px-32">
          <h2 className=" text-background ">X-Connect Smart Television</h2>
          <p className="text-sm text-background mt-1">
            Time remaining until the end of the offer.
          </p>

          <InlineCounter />

          <button className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1c7a9c] px-10 py-3 text-sm font-medium text-white hover:bg-[#1c7a9c] transition">
            Shop Now →
          </button>
        </div>
      </div>

      {/* RIGHT CARD  */}
      <div
        className="relative md:rounded-3xl px-10 py-8 flex items-center overflow-hidden text-white"
        style={{
          background: `url(${bg2.src}) no-repeat center/cover`,
        }}
      >
        <div className="max-w-md">
          <h2 className=" text-foreground">Vegetables Combo Box</h2>
          <p className="text-foreground">
            Time remaining until the end of the offer.
          </p>

          <div className="flex items-center gap-2 mt-4">
            <div className="px-4 py-2 rounded-md bg-[#1c7a9c] text-sm font-semibold shadow">
              {timeLeft.days} D
            </div>
            <div className="px-4 py-2 rounded-md bg-[#1c7a9c] text-sm font-semibold shadow">
              {timeLeft.hours} H
            </div>
            <div className="px-4 py-2 rounded-md bg-[#1c7a9c] text-sm font-semibold shadow">
              {timeLeft.minutes} M
            </div>
            <div className="px-4 py-2 rounded-md bg-[#1c7a9c] text-sm font-semibold shadow">
              {timeLeft.seconds} S
            </div>
          </div>

          <button className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1c7a9c] px-8 py-2.5 text-sm font-medium text-white hover:bg-[#1c7a9c] transition">
            Shop Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleCounter;
