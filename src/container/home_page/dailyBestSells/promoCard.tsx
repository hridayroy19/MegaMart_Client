"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  discount: string;
  title: string;
  subtitle: string;
  imageSrc: any;
  bgColor?: string;
}

const PromoCard = ({
  discount,
  title,
  subtitle,
  imageSrc,
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
        <h3 className="text-background">{subtitle}</h3>
      </div>

      {/* Product Image Section */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div
          className="relative w-full aspect-square"
        >
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="p-4"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PromoCard;
