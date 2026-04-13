import Image from "next/image";
import products from "./data.json";

const ProductList = () => {
  return (
    <div className="max-w-6xl mx-auto section-padding-t">
      <div className="hidden md:grid grid-cols-12 border-b border-border pb-4 mb-4 text-md">
        <div className="col-span-6 pl-12">Product name</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Stock status</div>
        <div className="col-span-2 text-right"></div>
      </div>

      <div className="space-y-6 md:space-y-0">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-1 md:grid-cols-12 items-center border-b border-border py-6 gap-4"
          >
            {/* Product Info Section */}
            <div className="col-span-1 md:col-span-6 flex items-center gap-4">
              <button className="text-gray-400 hover:text-error transition-colors">
                <span className="text-xl">×</span>
              </button>
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src={product.image}
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
                  ${product.currentPrice.toFixed(2)}
                </span>
                <span className="text-card-foreground line-through text-sm">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Stock Section */}
            <div className="col-span-1 md:col-span-2 flex flex-col md:block items-center md:items-start ">
              <span className="md:hidden text-xs text-card-foreground uppercase">
                Stock status
              </span>
              <span className="text-primary font-medium text-sm">
                {product.stock} in stock
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
