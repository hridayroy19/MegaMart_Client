"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./bannerCard";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  image: string;
  cta: string;
  bgColor: string;
  textColor: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Apple Kit's iPad Pro Max",
    subtitle: "Flat Online Deal",
    price: "$225.00",
    description: "Most powerful iPad ever",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
    cta: "Shop Now",
    bgColor: "from-gray-100 to-gray-200",
    textColor: "text-gray-900",
  },
  {
    id: 2,
    title: "Truly Wireless",
    subtitle: "Battery Life",
    price: "Premium Sound",
    description: "4GB RAM | 64GB ROM | 20MP",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
    cta: "Explore",
    bgColor: "from-yellow-300 to-yellow-400",
    textColor: "text-gray-900",
  },
  {
    id: 3,
    title: "For 4K Ultra Smart HD TV's",
    subtitle: "Crystal Clear Display",
    price: "Safe & Enjoy Life !!",
    description: "Experience immersive entertainment",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
    cta: "Discover",
    bgColor: "from-purple-600 to-purple-700",
    textColor: "text-white",
  },
];

export default function Banner() {
  const products = PRODUCTS;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
      setDirection(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  const product = products[current];

  return (
    <div className="flex flex-col pt-10 items-start lg:flex-row gap-6 p-4  w-full">

      {/* ===== CAROUSEL ===== */}
      <div className="w-full lg:w-2/2">
        <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 bg-gradient-to-r ${product.bgColor} 
                flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 lg:p-10`}
            >

              {/* TEXT */}
              <div className="flex-1 space-y-2 sm:space-y-4 text-center md:text-left">

                <p className={`text-xs sm:text-sm ${product.textColor} opacity-70`}>
                  {product.subtitle}
                </p>

                <h1 className={`text-xl sm:text-3xl lg:text-5xl font-bold ${product.textColor}`}>
                  {product.title}
                </h1>

                <p className={`text-lg sm:text-2xl font-semibold ${product.textColor}`}>
                  {product.price}
                </p>

                <p className={`text-xs sm:text-sm ${product.textColor} opacity-80`}>
                  {product.description}
                </p>

                <button className="mt-3 sm:mt-5 px-5 sm:px-8 py-2 sm:py-3 bg-yellow-400 rounded-full font-semibold hover:bg-yellow-500 transition">
                  {product.cta}
                </button>
              </div>

              {/* IMAGE */}
              <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-40 sm:w-60 md:w-72 lg:w-96 object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* NAV */}
          <button
            onClick={() => {
              setDirection(-1);
              setCurrent((p) => (p - 1 + products.length) % products.length);
            }}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => {
              setDirection(1);
              setCurrent((p) => (p + 1) % products.length);
            }}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* ===== SIDE CARD ===== */}
      <div className="w-full lg:w-2/2">
        <ProductCard />
      </div>

    </div>
  );
}