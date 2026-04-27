export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  thumbnail: string;
  pricing: {
    basePrice: number;
    salePrice: number;
    discountPercentage: number;
    currency: string;
  };
  brand: string;
  color?: string;
  seller: string;
  inventory: {
    stock: number;
    unit: string;
    sold: number;
  };
  attributes?: Array<{
    name: string;
    value: string;
  }>;
  tag: string;
  flashSale: {
    isActive: boolean;
    discountPercentage: number;
    endTime: string | null;
  };
  rating: number;
  reviewsCount: number;
  isBestSeller: boolean;
}
