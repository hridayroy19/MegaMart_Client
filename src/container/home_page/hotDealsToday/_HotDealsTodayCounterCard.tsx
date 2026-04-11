"use client";

import basketImg from "@/assets/images/homePage/hotDealsToday/basket-img.png";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export const HotDealsTodayCounterCard = () => {
    return (
        <div
            className="
        relative flex h-full flex-col justify-between
        rounded-2xl bg-[#1c799b] px-6 py-6
        text-background overflow-hidden
      "
        >
            <div className="relative mt-10 z-10">
                {/* badge */}
                <span className="inline-flex w-fit rounded-sm bg-amber-400 px-4 py-1 text-xs font-semibold text-foreground">
                    Medical equipment
                </span>

                <div className="mt-3 space-y-3">
                    <h2 className=" text-background leading-tight">
                        Deals of the day
                    </h2>
                    <p className="paragraph-md text-green-400 font-medium">
                        Save up to 50% off on your first order
                    </p>
                </div>

                {/* counter */}
                <div className="mt-5 flex flex-wrap gap-3">
                    {[
                        { label: "D", value: "701" },
                        { label: "H", value: "16" },
                        { label: "M", value: "37" },
                        { label: "S", value: "31" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="
        flex items-center justify-center
        rounded-md bg-background px-4 py-2
        text-foreground shadow-sm
        min-w-[64px]
      "
                        >
                            <span className="text-lg font-semibold leading-none">
                                {item.value}
                            </span>
                            <span className="ml-1 font-bold mt-1 text-muted leading-none">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
                {/* button */}
                <button
                    className="
            mt-6 inline-flex items-center gap-2 rounded-full
            bg-background px-6 py-3 text-sm font-semibold text-primary  hover:bg-primary hover:text-background transition-all 
            shadow-md
          "
                >
                    Explore Shop
                    <ShoppingCart className="h-4 w-4" />
                </button>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-0 w-[65%]">
                <Image
                    src={basketImg}
                    alt="Basket"
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
};
