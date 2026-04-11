"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetSellProductQuery } from "@/redux/features/sellsProduct/sellProductApi";

export default function DailyBestSells() {
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prev) =>
        prev.map((item) => {
          let { days, hours, minutes, seconds } = item.timer;

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

          return { ...item, timer: { days, hours, minutes, seconds } };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { data, isLoading, isError, error } = useGetSellProductQuery();
  const [products, setProducts] = useState(data || []);

  if (isLoading)
    return <p className="py-6 text-sm text-muted-foreground">Loading...</p>;

  if (isError) {
    console.log("Offer error:", error);
    return <p className="py-6 text-sm text-error">Failed to load product.</p>;
  }

  if (!data?.length) {
    return <p className="py-6 text-sm text-error">No product available.</p>;
  }

  return (
    <div className="w-full bg-background">
      <h2 className="mb-6">Daily Best Sells</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="border border-border hover:border-primary rounded-xl p-1 shadow-sm hover:shadow-lg 
            transition-all duration-300 relative bg-card"
          >
            {/* Sale Tag */}
            <span className="absolute top-4 left-4 bg-error text-background text-sm font-semibold px-3 py-1 rounded-md">
              Sale {item.sale}
            </span>

            {/* Product Section */}
            <div className="flex gap-6 p-2 items-center flex-nowrap">
              {/* IMAGE + HOVER ZOOM */}
              <div className="w-[140px] lg:w-[180px] xl:w-[250px] h-[200px] flex justify-center items-center overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  width={140}
                  height={220}
                  alt="product"
                  className="transition-transform duration-300 ease-in-out hover:scale-120"
                />
              </div>

              <div className="flex-1">
                {/* Price Row */}
                <div className="flex items-center gap-2">
                  <span className="line-through text-mute text-sm">
                    ${item.oldPrice}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ${item.newPrice}
                  </span>
                  <span className="text-muted text-sm">/Qty</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <Star
                    size={16}
                    className="text-popover-foreground fill-popover-foreground"
                  />
                  <span className="text-sm font-semibold">{item.rating}</span>
                  <span className="text-xs text-mute">({item.reviews})</span>
                </div>

                {/* Title */}
                <h3 className="mt-2 hover:text-primary cursor-pointer font-semibold">{item.title}</h3>

                {/* Seller */}
                <p className="text-sm font-semibold text-muted mt-1">
                  By {item.seller}
                </p>

                {/* Sold Bar */}
                <div className="mt-3">
                  <div className="w-full bg-muted/20 h-2 rounded-full mt-1">
                    <div className="bg-primary h-2 rounded-full w-1/2"></div>
                  </div>
                  <p className="text-[16px] mt-1 text-foreground font-bold">
                    Sold: {item.sold}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button className="mt-4 w-full bg-primary/15 hover:text-background hover:bg-primary text-primary py-2 rounded-lg text-sm font-medium transition">
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Timer */}
            <div className="grid lg:w-[340px] md:w-[170px] w-[170px] grid-cols-2 lg:grid-cols-4 gap-2 py-2 px-2 text-[12px] text-foreground font-semibold">
              <span className="bg-primary/15 px-3 py-1 rounded-sm">
                {item.timer.days} Day
              </span>
              <span className="bg-primary/15 px-3 py-1 rounded-md">
                {item.timer.hours} Hrs
              </span>
              <span className="bg-primary/15 px-3 py-1 rounded-md">
                {item.timer.minutes} Min
              </span>
              <span className="bg-primary/15 px-3 py-1 rounded-md">
                {item.timer.seconds} Sec
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
