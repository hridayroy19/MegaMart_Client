/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  discount: string;
  title: string;
  subtitle: string;
  bgColor?: string;
}

const PromoCard = ({
  discount,
  title,
  subtitle,
  bgColor = "bg-[#FF5A1F]",
}: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${bgColor} h-full w-full rounded-lg overflow-hidden relative flex flex-col justify-between items-center pt-10 px-6 cursor-pointer shadow-xl`}
    >
      {/* Text Content */}
      <div className="text-center text-background z-10">
        <p className="mb-2">{discount}</p>
        <h2 className="mt-7 text-background">{title}</h2>
        <h2 className="text-background">{subtitle}</h2>
      </div>

      {/* Product Image Section */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="relative w-full aspect-square">
          <Image
            src="https://res.cloudinary.com/dsb1inal0/image/upload/v1775918913/images__3_-removebg-preview_rrizzn.png"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 250px"
            className="p-4 w-full h-full object-contain"
            loading="eager"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PromoCard;
