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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
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
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
    cta: "Discover",
    bgColor: "from-purple-600 to-purple-700",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Premium Headphones",
    subtitle: "Noise Cancellation",
    price: "$399.00",
    description: "Studio-grade audio quality",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
    cta: "Shop Now",
    bgColor: "from-blue-500 to-blue-600",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "Smart Watch Pro",
    subtitle: "Health Monitoring",
    price: "$299.00",
    description: "Track your fitness journey",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xvPm72mC2W937wpq30Z7ejsGH5ddv.png",
    cta: "Learn More",
    bgColor: "from-green-500 to-green-600",
    textColor: "text-white",
  },
];

export default function Banner() {
  const products = PRODUCTS;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
      setDirection(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const imageVariants = {
    enter: {
      x: 100,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -100,
      opacity: 0,
    },
  };

  const textVariants = {
    enter: {
      y: 50,
      opacity: 0,
    },
    center: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    exit: {
      y: -50,
      opacity: 0,
    },
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const product = products[current];
  const gradientClass = product.bgColor;

  return (
    <div className="flex items-center">
      <div className="w-2xl  bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="w-full max-w-7xl">
          {/* Main Carousel */}
          <div className="relative w-full h-[70vh] sm:h-[60vh] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className={`absolute inset-0 bg-gradient-to-r ${gradientClass} flex items-center justify-between px-4 sm:px-8 lg:px-16 py-8`}
              >
                {/* Left Content */}
                <div className="flex flex-col justify-center flex-1 space-y-3 sm:space-y-4">
                  <motion.p
                    custom={0}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`text-xs sm:text-sm font-medium ${product.textColor} opacity-75`}
                  >
                    {product.subtitle}
                  </motion.p>

                  <motion.h1
                    custom={1}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`text-2xl sm:text-4xl lg:text-5xl font-bold ${product.textColor} leading-tight break-words`}
                  >
                    {product.title}
                  </motion.h1>

                  <motion.p
                    custom={2}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`text-lg sm:text-2xl font-semibold ${product.textColor}`}
                  >
                    only {product.price}
                  </motion.p>

                  <motion.p
                    custom={3}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`text-xs sm:text-sm ${product.textColor} opacity-80`}
                  >
                    {product.description}
                  </motion.p>

                  <motion.button
                    custom={4}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 sm:mt-6 w-fit px-6 sm:px-8 py-2 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full transition-colors duration-300 text-sm sm:text-base"
                  >
                    {product.cta}
                  </motion.button>
                </div>

                {/* Right Image */}
                <motion.div
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="flex-1 flex items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-2/3 h-auto max-h-96 object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {products.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? "bg-primary w-8 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <ProductCard />
      </div>
    </div>
  );
}
