"use client";

import Image from "next/image";
import { useGetWishlistQuery, useToggleWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IProduct } from "@/types";

const ProductList = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: wishlistRes, isLoading } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [toggleWishlist] = useToggleWishlistMutation();

  const products: IProduct[] = (wishlistRes as IProduct[]) || [];

  const handleRemove = async (productId: string) => {
    try {
      await toggleWishlist(productId).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return <div className="text-center py-20">Please log in to view your wishlist.</div>;
  if (isLoading) return <div className="text-center py-20">Loading wishlist...</div>;
  if (products.length === 0) return <div className="text-center py-20">Your wishlist is empty.</div>;

  return (
    <div className="max-w-6xl mx-auto section-padding-t">
      <h3 className="mb-7">Home/Wishlist</h3>
      <div className="hidden md:grid grid-cols-12 border-b border-border pb-4 mb-4 text-lg">
        <div className="col-span-6 pl-12">Product name</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Stock status</div>
        <div className="col-span-2 text-right"></div>
      </div>

      <div className="space-y-6 md:space-y-0">
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-1 md:grid-cols-12 items-center border-b border-border py-6 gap-4"
          >
            {/* Product Info Section */}
            <div className="col-span-1 md:col-span-6 flex items-center gap-4">
              <button 
                onClick={() => handleRemove(product._id)}
                className="text-card-foreground hover:border hovborder-border rounded-full px-2 cursor-pointer hover:text-error transition-colors">
                <span className="text-2xl">×</span>
              </button>
              <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src={product.thumbnail}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="leading-tight">{product.name}</h3>
            </div>

            {/* Price Section */}
            <div className="col-span-1 md:col-span-2 flex flex-col md:block items-center md:items-start">
              <span className="md:hidden text-xs text-card-foreground uppercase">
                Price
              </span>
              <div className="flex items-center gap-2">
                <span className="text-error font-bold text-lg">
                  ${(product.pricing?.salePrice || product.pricing?.basePrice || 0).toFixed(2)}
                </span>
                {product.pricing?.discountPercentage > 0 && (
                  <span className="text-card-foreground line-through text-sm">
                    ${(product.pricing?.basePrice || 0).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Section */}
            <div className="col-span-1 md:col-span-2 flex flex-col md:block items-center md:items-start ">
              <span className="md:hidden text-xs text-card-foreground uppercase">
                Stock status
              </span>
              <span className="text-primary font-medium text-sm">
                {product.inventory?.stock > 0 ? `${product.inventory.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* CTA Section */}
            <div className="col-span-1 md:col-span-2 text-right">
              <button className="w-full md:w-auto bg-secondary hover:bg-primary cursor-pointer text-background font-bold py-3 px-6 rounded text-xs tracking-wider uppercase transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
