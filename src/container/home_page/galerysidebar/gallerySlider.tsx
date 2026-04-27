"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

import { useGetGalleryItemsQuery } from "@/redux/features/gallery/galleryApi";

const GallerySlider = () => {
  const { data: galleryData = [], isLoading } = useGetGalleryItemsQuery();
  const [modalImage, setModalImage] = useState<string | null>(null);

  if (isLoading)
    return (
      <div className="p-4 w-full h-[250px] bg-muted animate-pulse rounded-lg"></div>
    );
  if (galleryData.length === 0) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          From The Gallery
        </h2>

        <div className="flex items-center gap-2">
          <button className="prev-btn flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-muted disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="next-btn flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-muted disabled:opacity-40">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {galleryData.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="bg-background rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200">
              {/* FIX 2: wrap in relative container; use fill + object-cover on Image */}
              <div
                className="relative w-full h-[180px]"
                onClick={() => setModalImage(item.image)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              <div className="p-3">
                <h3
                  className=" line-clamp-2 text-foreground hover:text-primary transition-colors duration-150 cursor-pointer"
                  onClick={() => setModalImage(item.image)}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-video">
              <Image
                src={modalImage}
                alt="preview"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 95vw, 800px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySlider;
