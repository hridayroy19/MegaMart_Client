import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ShopingHeaderProps {
    title?: string;
    currentPage?: string;
}

const ShopingHeader: React.FC<ShopingHeaderProps> = ({
    title = "Shop",
    currentPage = "Product Shop"
}) => {
    return (
        <div className="w-full bg-[#e9eefb] mt-12 md:mt-6 py-8 border-b border-gray-100">
            <div className=" px-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

                <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                        <Home size={14} />
                        <Link href={"/"}>
                        <span>Home</span>
                        
                        </Link>
                    </div>
                    <span className="text-gray-400">
                        <ChevronRight size={14} />
                    </span>
                    <span className="text-blue-600 font-medium">{currentPage}</span>
                </div>
            </div>
        </div>
    );
};

export default ShopingHeader;