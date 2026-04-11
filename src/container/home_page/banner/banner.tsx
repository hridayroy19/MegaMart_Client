"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsDownIcon,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://marketpro.theme.picode.in/assets/images/thumbs/banner-two-img.png",
      subTitle: "Save Up To 50% Off On Your First Order",
      title: "Daily Grocery Order and Get",
      highlightText: "Express",
      titleEnd: "Delivery",
      price: "60.99",
      bgHighlight: "#0E88B9",
    },
    {
      id: 2,
      image:
        "https://marketpro.theme.picode.in/assets/images/thumbs/banner-two-img.png",
      subTitle: "Fresh & Organic Food For Your Health",
      title: "Daily Grocery Order and Get",
      highlightText: "Express",
      titleEnd: "Delivery",
      price: "45.00",
      bgHighlight: "#2BBF6D",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative  w-full bg-primary/10 overflow-hidden font-sans">
      {/* Main Container — automatic height on mobile, fixed on desktop */}
      <div className="relative z-10 flex items-center min-h-[580px] md:h-[500px] lg:h-[550px] pt-10 md:pt-0">
        <div
          key={slide.id}
          className="flex flex-col md:flex-row items-center justify-between w-full 
          lg:px-6 md:px-5 px-7 xl:px-16 gap-12 md:gap-6 animate-in fade-in slide-in-from-right-4 duration-500"
        >
          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2 space-y-4 text-left md:pl-6">
            {/* Subtitle */}
            <h4 className="text-[#2BBF6D] font-medium text-lg tracking-wide">
              {slide.subTitle}
            </h4>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-bold leading-tight">
              {slide.title}{" "}
              <span style={{ color: slide.bgHighlight }}>
                {slide.highlightText}
              </span>{" "}
              {slide.titleEnd}
            </h1>

            {/* CTA + Price */}
            <div className="flex flex-row items-center justify-start gap-4 lg:gap-6 mt-6">
              <button className="bg-[#1F7C90] hover:bg-[#186676] rounded-full flex items-center gap-2 py-3 px-5 text-background">
                Explore Shop
                <ShoppingCart
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <div className="flex items-center gap-2 text-sm md:text-lg whitespace-nowrap">
                <span className="text-gray-500 italic font-medium">
                  Starting at
                </span>
                <span className="text-[#E94646]">${slide.price}</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE (FULL RESPONSIVE) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
            <div
              className="
                relative 
                w-full 
                max-w-[320px]
                sm:max-w-[420px]
                md:max-w-[480px]
                lg:max-w-[420px]
                xl:max-w-[550px]
                aspect-square 
                sm:aspect-[4/3]
              "
            >
              <Image
                src={slide.image}
                alt="Banner Product"
                fill
                priority
                className="object-contain drop-shadow-xl"
                sizes="(max-width: 768px) 95vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 
        bg-white/80 hover:bg-[#1F7C90] hover:text-white text-gray-700 
        p-3 rounded-full shadow-md transition-all hidden md:block 
        border border-gray-100 z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 
        bg-white/80 hover:bg-[#1F7C90] hover:text-white text-gray-700 
        p-3 rounded-full shadow-md transition-all hidden md:block 
        border border-gray-100 z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Curve + Arrow */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-auto text-background fill-current"
        >
          <path d="M0,100 L0,60 C240,60 480,60 640,60 C680,60 680,100 720,100 C760,100 760,60 800,60 C960,60 1200,60 1440,60 L1440,100 Z" />
        </svg>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-[20px] z-30 pointer-events-auto">
          <button className="bg-[#1F7C90] text-white p-3 rounded-full hover:bg-[#186676] transition-colors border-4 border-white">
            <ChevronsDownIcon className="animate-bounce" size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
