export interface IHotDealsToday {
    _id: string;
    name: string;
    slug: string;
    thumbnail: string;
    brand: string;
    category: string;
    unit: string;
    salePrice: number;
    regularPrice: number;
    currency: string;
    rating: number;
    ratingCount: number;
    sold: number;
    stock: number;
    isFlashSale: boolean;
};
