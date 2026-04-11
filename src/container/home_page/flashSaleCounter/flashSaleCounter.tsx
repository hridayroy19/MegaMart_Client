"use client";

import { useEffect, useState } from "react";

import bg1 from "@/assets/images/homePage/flashSaleCounter/Cms-Banner-7.jpg";
import bg2 from "@/assets/images/homePage/flashSaleCounter/Cms-Banner-8.jpg";

import styles from "./flashSaleCounter.module.css";

const FlashSaleCounter = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 741,
    hours: 16,
    minutes: 53,
    seconds: 15,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
