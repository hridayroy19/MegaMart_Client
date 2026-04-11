"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* 👇 Shadcn Skeleton while loading */}
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
      )}

      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        onLoadingComplete={() => setLoaded(true)}
        className={`${className} ${
          !loaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      />
    </div>
  );
};

export default ImageWithSkeleton;
