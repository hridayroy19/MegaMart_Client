"use client";

import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { IProduct } from "@/types";
import Link from "next/link";

interface TopSellingProductProps {
  title: string;
  products: IProduct[];
}

const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

export default function TopSellingProduct({
  title,
  products,
}: TopSellingProductProps) {
  const slides = chunkArray(products, 4);

  return (
    <div className="w-full bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30">
      {/* Header Section */}
      <div className="p-5 border-b border-border/50 flex justify-between items-center">
        <div className="relative">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <div className="absolute -bottom-1 left-0 h-1 w-12 bg-primary rounded-full"></div>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="p-4">
        <Swiper
          direction="horizontal"
          slidesPerView={1}
          loop={slides.length > 1}
          spaceBetween={10}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={800}
          modules={[Autoplay, Pagination]}
          className="featured-swiper"
        >
          {slides.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-5">
                {group?.map((item) => (
                  <Link
                    href={`/shop/${item?._id}`}
                    key={item._id}
                    className="group flex items-center gap-4 p-2 rounded-xl transition-all duration-300 hover:bg-muted/50"
                  >
                    {/* Product Image */}
                    <div className="relative flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white w-[85px] h-[85px]">
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          {[...Array(1)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className="text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {item.rating} ({item.reviewsCount})
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="text-[14px] font-semibold text-foreground truncate group-hover:text-primary transition-colors cursor-pointer">
                        {item.name}
                      </h3>

                      {/* Pricing */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-bold text-primary">
                          ${item.pricing?.salePrice?.toFixed(2) || "0.00"}
                        </span>
                        {item.pricing?.basePrice &&
                          item.pricing.basePrice > item.pricing.salePrice && (
                            <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
                              ${item.pricing.basePrice.toFixed(2)}
                            </span>
                          )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
