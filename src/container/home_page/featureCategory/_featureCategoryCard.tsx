"use client";

import { IFeatureCategory } from "@/types";

type FeatureCategoryCardProps = {
  item: IFeatureCategory;
};

export const FeatureCategoryCard = ({ item }: FeatureCategoryCardProps) => {
  const { title, startingPrice, buttonText, image } = item;

  return (
    <div
      className="relative h-[260px] w-full overflow-hidden rounded-2xl p-6 flex items-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 flex flex-col items-start">
        <h2 className=" max-w-40 text-foreground">{title}</h2>

        {startingPrice !== null && (
          <p className="mt-1 text-sm ">
            Starting at{" "}
            <span className="font-semibold text-red-500">
              ${startingPrice}
            </span>
          </p>
        )}

        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1c7a9c] px-5 py-2 text-sm font-medium text-background hover:bg-[#1c7a9c] transition">
          {buttonText}
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
