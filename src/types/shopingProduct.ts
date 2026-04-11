export interface IShopingProducts {
    _id: string;
    name: string;
    slug: string;
    category: string;
    images: string[];
    price: number;
    originalPrice: number;
    rating: number;
    reviewsCount: number;
    sold: number;
    stock: number;
    isBestSale: boolean;
    discountPercentage: number;
    description: string;
    brand: string;
    color: string;
};