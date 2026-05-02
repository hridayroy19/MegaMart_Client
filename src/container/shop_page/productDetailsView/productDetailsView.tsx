import { IProduct } from "@/types";
import ProductGallery from "./_productGallery";
import ProductInfo from "./_productInfo";
import ProductMetaInfo from "./_productMetaInfo";

interface Props {
  product: IProduct;
}

const ProductDetailsView = ({ product }: Props) => {
  return (
    <>
    <div className="py-10 mt-60 container mx-auto px-4  font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ProductGallery product={product} />
        </div>

        <div className="lg:col-span-5">
          <ProductInfo product={product} />
        </div>

        <div className="lg:col-span-3">
          <ProductMetaInfo product={product} />
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetailsView;