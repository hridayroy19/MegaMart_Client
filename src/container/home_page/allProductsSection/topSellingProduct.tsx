"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { IFeatureProduct } from "@/types";

interface FeaturedProductsProps {
  title: string;
  products: IFeatureProduct[];
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
}: FeaturedProductsProps) {
  const slides = chunkArray(products, 4);

  return (
    <div className="w-full hover:border-primary p-4 bg-card border border-border rounded-xl shadow-sm">
      <div className="w-full mb-6 bg-primary/13 px-4 py-2 rounded-lg inline-block">
        <h2  className="md:text-2xl text-xl">{title}</h2>
        {/* underline bar */}
        <div className="bg-primary h-0.5 w-[150px] mt-2 rounded"></div>
      </div>

      <Swiper
        direction="horizontal"
        slidesPerView={1}
        loop={slides.length > 1}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1200}
        modules={[Autoplay]}
      >
        {slides.map((group, index) => (
          <SwiperSlide key={index}>
            {/* 4 cards in a vertical column */}
            <div className=" w-full flex flex-col p-2 gap-12">
              {group.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3  hover:shadow-md transition"
                >
                  <Image
                    src={item.image}
                    alt="image"
                    width={80}
                    height={80}
                    className="object-contain border w-[90px] border-border rounded-lg"
                  />

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm text-muted gap-1">
                      <span>{item.rating}</span>
                      <Star
                        size={14}
                        className="text-popover-foreground fill-popover-foreground"
                      />
                      <span>({item.reviews})</span>
                    </div>

                    <h3 className="cursor-pointer hover:text-primary">
                      {item.productName}
                    </h3>

                    <div className="flex items-center gap-2 text-md">
                      <span className="font-semibold text-foreground">
                        ${item.price}.00
                      </span>
                      <span className="line-through text-muted">
                        ${item.oldPrice}.00
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
