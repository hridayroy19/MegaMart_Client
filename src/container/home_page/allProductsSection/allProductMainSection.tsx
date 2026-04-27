"use client";
import FeaturedProducts from "./featuredProducts";
import TopSellingProduct from "./topSellingProduct";
import OnSaleProducts from "./onSaleProducts";
import {
  useGetFeaturedProductsQuery,
  useGetTopSellingProductsQuery,
  useGetOnSaleProductsQuery,
} from "@/redux/features/featureProducts/featureProductApi";

const AllProductMainSection = () => {
  const { data: featured = [], isLoading: l1 } = useGetFeaturedProductsQuery();
  const { data: topSelling = [], isLoading: l2 } =
    useGetTopSellingProductsQuery();
  const { data: onSale = [], isLoading: l3 } = useGetOnSaleProductsQuery();

  if (l1 || l2 || l3)
    return <p className="py-6 text-sm text-muted-foreground">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-7 gap-5 w-full justify-center">
      <FeaturedProducts title="Featured Products" products={featured} />
      <TopSellingProduct title="Top Selling" products={topSelling} />
      <OnSaleProducts title="On Sale" products={onSale} />
    </div>
  );
};

export default AllProductMainSection;
