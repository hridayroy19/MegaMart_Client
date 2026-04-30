/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useGetAllBransQuery } from "@/redux/features/brands/brandsApi";
import { useGetShopingProductsQuery } from "@/redux/features/shopingProduct/shopingProductApi";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function BrandsCarousel() {
  const swiperRef = useRef<any>(null);
  const router = useRouter();
  const { data: brands, isLoading } = useGetAllBransQuery(undefined);
  const { data: allProducts } = useGetShopingProductsQuery(undefined);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts?.forEach((p) => {
      if (p.brand) counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <p className="py-6 text-sm text-muted-foreground text-center">
        No brands available at the moment.
      </p>
    );
  }

  return (
    <div className="relative w-full py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-end mb-8 px-2 gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Shop by Brands
          </h2>
          <div className="h-1 w-12 bg-primary rounded-full" />
        </div>

        <div className="flex items-center gap-6">
          <button className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            View All Brands
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2 border border-border bg-card hover:bg-primary hover:text-white rounded-xl shadow-sm transition-all active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2 border border-border bg-card hover:bg-primary hover:text-white rounded-xl shadow-sm transition-all active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Swiper Container */}
      <Swiper
        modules={[Autoplay, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 16 },
          480: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 24 },
          1280: { slidesPerView: 6, spaceBetween: 30 },
        }}
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
        className="brands-swiper !py-4"
      >
        {brands.map((brand: any) => (
          <SwiperSlide key={brand._id}>
            <div
              onClick={() => router.push(`/shop?brand=${brand.title}`)}
              className="group relative w-full aspect-[4/3] sm:aspect-square bg-card border border-border/50 rounded-2xl p-6 flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-full h-full">
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.title}
                  width={150}
                  height={100}
                  className="object-contain p-2 transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {brand.title}
            </p>
            <p className="text-center text-[11px] text-muted-foreground">
              {brandCounts[brand.title] || 0} Items
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
