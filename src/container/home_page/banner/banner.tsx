"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./bannerCard";
import Image from "next/image";

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
    image:
      "https://res.cloudinary.com/dh5fzsfzb/image/upload/v1775891503/Apple-Ipad-Pro-PNG-758x473-removebg-preview_ecuj9i.png",
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
    image:
      "https://res.cloudinary.com/dh5fzsfzb/image/upload/v1775891508/pngtree-white-premium-true-wireless-earbuds-png-image_16021425-removebg-preview_aj1f0b.png",
    cta: "Explore",
    bgColor: "from-gray-100 to-gray-200",
    textColor: "text-gray-900",
  },
  {
    id: 3,
    title: "For 4K Ultra Smart HD TV's",
    subtitle: "Crystal Clear Display",
    price: "Safe & Enjoy Life !!",
    description: "Experience immersive entertainment",
    image:
      "https://res.cloudinary.com/dh5fzsfzb/image/upload/v1775891512/images__2_-removebg-preview_ws30ys.png",
    cta: "Discover",
    bgColor: "from-gray-100 to-gray-200",
    textColor: "text-gray-900",
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
    <div className="flex flex-col items-start lg:flex-row gap-6 p-4  w-full">
      <div className="w-full lg:w-2/2">
        <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 bg-gradient-to-r ${product.bgColor} 
                flex flex-col-reverse md:flex-row items-center justify-between p-4 sm:p-6 lg:p-10`}
            >
              {/* TEXT */}
              <div className="flex-1 space-y-2 sm:space-y-4 text-center md:text-left">
                <p
                  className={`text-xs sm:text-sm ${product.textColor} opacity-70`}
                >
                  {product.subtitle}
                </p>

                <h1
                  className={`text-xl sm:text-3xl lg:text-5xl font-bold ${product.textColor}`}
                >
                  {product.title}
                </h1>

                <p
                  className={`text-lg sm:text-2xl font-semibold ${product.textColor}`}
                >
                  {product.price}
                </p>

                <p
                  className={`text-xs sm:text-sm ${product.textColor} opacity-80`}
                >
                  {product.description}
                </p>

                <button className="mt-3 sm:mt-5 px-5 sm:px-8 py-2 sm:py-3 bg-yellow-400 rounded-full font-semibold hover:bg-yellow-500 transition">
                  {product.cta}
                </button>
              </div>

              {/* IMAGE */}
              <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={300}
                  loading="eager"
                  className="w-40 md:w-96 lg:w-[400px] object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>

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

      <div className="w-full lg:w-2/2">
        <ProductCard />
      </div>
    </div>
  );
}
