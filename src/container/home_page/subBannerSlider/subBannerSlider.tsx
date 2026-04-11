"use client";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from "@/assets/images/homePage/subBannerSlider/feature-img1.png";
import img2 from "@/assets/images/homePage/subBannerSlider/feature-img2.png";
import img3 from "@/assets/images/homePage/subBannerSlider/feature-img3.png";
import img4 from "@/assets/images/homePage/subBannerSlider/feature-img4.png";
import img5 from "@/assets/images/homePage/subBannerSlider/feature-img5.png";
import img6 from "@/assets/images/homePage/subBannerSlider/feature-img6.png";
import img7 from "@/assets/images/homePage/subBannerSlider/feature-img7.png";
import img8 from "@/assets/images/homePage/subBannerSlider/feature-img8.png";
import img9 from "@/assets/images/homePage/subBannerSlider/feature-img9.png";

const SubBannerSlider = () => {

    // Slider Data Array
    const categories = [
        { id: 1, img: img1, title: "Yummy Candy", count: "125+ Products", bg: "bg-[#F2FCE4]" },
        { id: 2, img: img2, title: "Fish & Meats", count: "125+ Products", bg: "bg-[#FFFCEB]" },
        { id: 3, img: img3, title: "Dairy & Eggs", count: "125+ Products", bg: "bg-[#F2FCE4]" },
        { id: 4, img: img4, title: "Snacks", count: "125+ Products", bg: "bg-[#F2FCE4]" },
        { id: 5, img: img5, title: "Frozen Foods", count: "125+ Products", bg: "bg-[#FFF3FF]" },
        { id: 6, img: img6, title: "Vegetables", count: "125+ Products", bg: "bg-[#F2FCE4]" },
        { id: 7, img: img7, title: "Fish & Meats", count: "125+ Products", bg: "bg-[#FFFCEB]" },
        { id: 8, img: img8, title: "Desserts", count: "125+ Products", bg: "bg-[#FFF3FF]" },
        { id: 9, img: img9, title: "Fruits", count: "125+ Products", bg: "bg-[#F2FCE4]" },
    ];

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="w-full relative group px-4 py-8">
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onInit={(swiper) => {
                    const navigation = swiper.params.navigation;
                    if (navigation && typeof navigation !== 'boolean') {
                        navigation.prevEl = prevRef.current;
                        navigation.nextEl = nextRef.current;

                        swiper.navigation.destroy();
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }
                }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                    1280: { slidesPerView: 7 },
                }}
                className="mySwiper relative"
            >
                {categories.map((item) => (
                    <SwiperSlide key={item.id} className="pb-4">
                        <div className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
                            {/* Image Circle */}
                            <div className={`w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center mb-3 ${item.bg}`}>
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-base font-bold text-gray-800 text-center font-quicksand">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {item.count}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                ref={prevRef}
                className="absolute top-1/2 -left-2 z-10 -translate-y-1/2 w-10 h-10 bg-gray-100 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-[#1F7C90] hover:text-background transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                ref={nextRef}
                className="absolute top-1/2 -right-2 z-10 -translate-y-1/2 w-10 h-10 bg-gray-100 rounded-full hover:bg-[#1F7C90] hover:text-background shadow-md flex items-center justify-center text-gray-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default SubBannerSlider;