"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export const HotDealsTodayCounterCard = () => {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary px-8 py-10 text-background shadow-xl">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-backtext-background/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black leading-[1.1] tracking-tight text-background lg:text-4xl">
              Deals of <br /> the day
            </h2>
            <p className="max-w-[240px] text-sm font-medium text-cyan-100/90">
              Save up to{" "}
              <span className="text-amber-400 font-bold text-lg">50% OFF</span>{" "}
              on your first order
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "Days", value: "701" },
              { label: "Hrs", value: "16" },
              { label: "Min", value: "37" },
              { label: "Sec", value: "31" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center rounded-xl bg-backtext-background/10 backdrop-blur-md border border-backtext-background/20 p-2 min-w-[55px] lg:min-w-[60px]"
              >
                <span className="text-xl font-black text-background">
                  {item.value}
                </span>
                <span className="text-[10px] font-bold uppercase text-amber-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10">
          <button className="group flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-black text-primary transition-all hover:bg-amber-400 hover:text-black shadow-lg active:scale-95">
            Explore Shop
            <ShoppingCart className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="pointer-events-none absolute -bottom-4 -right-8 w-1/2 transition-transform duration-500 hover:scale-105 sm:w-[55%] md:w-[60%] lg:w-[65%]">
        <Image
          src="https://res.cloudinary.com/dsb1inal0/image/upload/v1775977885/images__7_-removebg-preview_nlq4bc.png"
          alt="Basket"
          width={300}
          height={100}
          className="h-auto w-full object-contain"
          priority
        />
      </div>
    </div>
  );
};
