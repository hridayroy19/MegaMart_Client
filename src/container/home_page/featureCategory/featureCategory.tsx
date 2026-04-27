"use client";

import { FeatureCategoryCard } from "./_featureCategoryCard";
import data from "@/utils/helpers/featureCategories.json";

export const FeatureCategory = () => {
  if (!data || data.length === 0) {
    return (
      <div className="py-6">
        <p className="text-sm text-red-500">No feature categories available.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="heading-3  font-semibold">Featured Categories</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((item) => (
          <FeatureCategoryCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};
