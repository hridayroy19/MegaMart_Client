"use client";
import { useGetprductCardQuery } from "@/redux/features/product/productApi";
import { ProductCard } from "./productCardDesing";

export default function ProductSection() {
  const { data, isLoading, isError, error } = useGetprductCardQuery();

  if (isLoading)
    return <p className="py-6 text-sm text-muted-foreground">Loading...</p>;

  if (isError) {
    console.log("Offer error:", error);
    return <p className="py-6 text-sm text-error">Failed to load product.</p>;
  }

  if (!data?.length) {
    return <p className="py-6 text-sm text-error">No product available.</p>;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full">
        <div className="mb-8">
          <h2>Recommended for you</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:gap-4 gap-2 md:grid-cols-3 lg:grid-cols-5">
          {data?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
