"use client";

import { useGetFeatureCategoriesQuery } from "@/redux/features/featureCategory/featureCategoryApi";
import { FeatureCategoryCard } from "./_featureCategoryCard";

export const FeatureCategory = () => {
  const { data, isLoading, isError, error } = useGetFeatureCategoriesQuery();

  if (isError) {
    console.log(" featureCategories error:", error);
  }

  if (isLoading) {
    return (
      <div className="py-6">
        <p className="text-sm text-muted-foreground">Loading feature categories...</p>
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="py-6">
        <p className="text-sm text-red-500">
          Failed to load feature categories.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="heading-3  font-semibold">Featured Categories</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.map((item) => (
          <FeatureCategoryCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};
