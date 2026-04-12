"use client";
import FeaturedProducts from "./featuredProducts";
import { useGetfeaturePrductsQuery } from "@/redux/features/featureProducts/featureProductApi";
import TopSellingProduct from "./topSellingProduct";
import OnSaleProducts from "./onSaleProducts";

const AllProductMainSection = () => {
  const { data, isLoading, isError, error } = useGetfeaturePrductsQuery();
  if (isLoading)
    return <p className="py-6 text-sm text-muted-foreground">Loading...</p>;

  if (isError) {
    console.log("Offer error:", error);
    return (
      <p className="py-6 text-sm text-error">Failed to load FeatureProduct.</p>
    );
  }

  if (!data?.length) {
    return (
      <p className="py-6 text-sm text-error">No FeatureProduct available.</p>
    );
  }

  const featured = data.filter((p) => p.tag === "featured");
  const topSelling = data.filter((p) => p.tag === "topSelling");
  const onSale = data.filter((p) => p.tag === "onSale");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-7 gap-5 w-full justify-center">
      <FeaturedProducts title="Featured Products" products={featured} />
      <TopSellingProduct title="Top Selling" products={topSelling} />
      <OnSaleProducts title="On Sale" products={onSale} />
    </div>
  );
};

export default AllProductMainSection;
