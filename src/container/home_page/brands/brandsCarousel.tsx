/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css';
import "swiper/css/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllBransQuery } from "@/redux/features/brands/brandsApi";

export default function BrandsCarousel() {
  const swiperRef = useRef<any>(null);

  const { data, isLoading, isError, error } = useGetAllBransQuery();

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
    <div className="relative">
      {/* Header */}
      <div className="flex  px-4 md:flex-row flex-wrap justify-between gap-5 items-center mb-4">
        <h2>Shop by Brands</h2>
        <div className="flex items-center gap-3 justify-start">
          <h5 className="font-medium hover:text-primary hover:underline text-foreground/90 cursor-pointer">
            View Details
          </h5>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className=" border border-border hover:bg-primary hover:text-background rounded-full shadow"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className=" border border-border hover:bg-primary hover:text-background rounded-full shadow"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 12 }, // sm
          640: { slidesPerView: 5, spaceBetween: 16 }, // md
          1024: { slidesPerView: 5, spaceBetween: 20 }, // lg
          1280: { slidesPerView: 6, spaceBetween: 24 }, // xl
        }}
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
        className="!px-0"
      >
        {data.map((brand) => (
          <SwiperSlide
            key={brand._id}
            className="flex items-center justify-center"
          >
            <div className="w-full aspect-square bg-card rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <Image
                src={brand.image || "/placeholder.svg"}
                alt={brand.title}
                width={150}
                height={150}
                className="object-contain w-full h-full max-w-[140px] max-h-[140px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
