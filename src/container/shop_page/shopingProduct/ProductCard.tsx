import { IProduct } from '@/types';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
    product: IProduct;
    viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
    console.log(product.images);
    const {
        name,
        images,
        rating,
        reviewsCount,
        inventory,
        pricing,
        isBestSeller,
        flashSale,
        description,
        thumbnail
    } = product;

    const soldPercentage = inventory?.stock > 0 ? Math.min((inventory.sold / inventory.stock) * 100, 100) : 0;
    const mainImage = images?.[0] || thumbnail;

    return (
        <Link href={`/shop/${product._id}`} className="block h-full">
            <div className={`
                border border-gray-300 rounded-lg bg-white hover:border hover:border-blue-600 transition-all duration-300 group
                ${viewMode === 'list'
                    ? 'flex flex-row p-4 gap-4 items-center'
                    : 'flex flex-col p-4 h-full'}
            `}>
                {/* Image Container */}
                <div className={`
                    relative flex items-center justify-center bg-zinc-200 py-6 rounded-md overflow-hidden shrink-0
                    ${viewMode === 'list'
                        ? 'w-1/3 h-38 md:h-52'
                        : 'w-full h-48 mb-4'}
                `}>
                    {mainImage && (
                        <img
                            src={mainImage}
                            alt={name}
                            className="h-full w-full object-contain mix-blend-multiply p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                    )}

                    {/* Badges */}
                    {isBestSeller && (
                        <span className="absolute top-0 left-0 text-[11px] font-bold px-3 py-1 text-white bg-blue-500 rounded-tl-2xl rounded-br-[20px]">
                            Best Sale
                        </span>
                    )}
                    {!isBestSeller && pricing?.discountPercentage > 0 && (
                        <span className="absolute top-0 left-0 text-[10px] font-bold px-3 py-1 rounded rounded-tl-2xl rounded-br-[20px] text-white bg-red-500">
                            Sale {pricing.discountPercentage}%
                        </span>
                    )}
                </div>

                {/* Content Section */}
                <div className={`flex flex-col flex-grow ${viewMode === 'list' ? 'justify-between h-full' : ''}`}>
                    <div className="space-y-4">
                        <h4 className={`text-black leading-tight ${viewMode === 'grid' && 'line-clamp-2 min-h-[40px]'}`}>
                            {name}
                        </h4>

                        {/* Rating */}
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                            <span className="font-semibold text-gray-800">{rating}</span>
                            <span>({reviewsCount > 1000 ? `${(reviewsCount / 1000).toFixed(0)}k` : reviewsCount})</span>
                        </div>

                        <div className="py-2 w-full max-w-[150px]">
                            <div className="w-full bg-gray-100 rounded-full h-1 mb-1 overflow-hidden">
                                <div
                                    className="bg-blue-600 h-1 rounded-full"
                                    style={{ width: `${soldPercentage}%` }}
                                ></div>
                            </div>
                            <p className="paragraph-sm">Sold: {inventory?.sold || 0}/{inventory?.stock || 0}</p>
                        </div>
                    </div>

                    {/* Price & Button Area */}
                    <div className={`${viewMode === 'list' ? 'mt-2' : 'mt-auto'}`}>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-900 font-bold text-lg">${pricing?.salePrice > 0 ? pricing.salePrice : pricing?.basePrice}</span>
                            {pricing?.discountPercentage > 0 && (
                                <span className="text-gray-400 text-xs line-through">${pricing.basePrice}</span>
                            )}
                            <span className="text-gray-400 text-xs">/Qty</span>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 text-xs font-bold py-2 px-3 rounded transition-colors duration-200">
                            <h5>Add To Cart</h5>
                            <ShoppingCart size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
