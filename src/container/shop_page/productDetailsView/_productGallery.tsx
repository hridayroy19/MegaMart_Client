"use client";
import { IProduct } from "@/types";
import { useState } from "react";

interface Props {
  product: IProduct;
}

const ProductGallery = ({ product }: Props) => {
  const images = product.images?.length
    ? product.images
    : (product.thumbnail ? [product.thumbnail] : ["/placeholder.png"]);

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="bg-background border  border-gray-300 rounded-xl p-6 flex items-center justify-center min-h-[400px]">
        <img
          src={activeImage}
          alt={product.name}
          className="max-h-[350px] py-10 w-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`flex-shrink-0 w-20 h-20 border rounded-lg p-2 flex items-center justify-center transition-all
              ${activeImage === img
                ? "border-blue-600 ring-1 ring-blue-600"
                : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <img src={img} className="h-full w-full object-contain" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;