"use client";

import { useGetShopingProductsQuery } from '@/redux/features/shopingProduct/shopingProductApi';
import { IShopingProducts } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import ShopingHeader from './_shopingHeader';
import ShopingSidebar, { CategoryData } from './ShopingSidebar';
import ShopingTopBar from './ShopingTopBar';

const ShopingProductMain: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Sorting State
    const [sortBy, setSortBy] = useState('Popular');

    // Filter States
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const { data, isLoading, isError } = useGetShopingProductsQuery(undefined);

  const allProducts: IShopingProducts[] = data || [];

    // Calculate Dynamic Categories
    const categories: CategoryData[] = useMemo(() => {
        const catMap = new Map<string, number>();
        allProducts.forEach((product) => {
            if (product.category) {
                const count = catMap.get(product.category) || 0;
                catMap.set(product.category, count + 1);
            }
        });
        return Array.from(catMap.entries()).map(([name, count]) => ({ name, count }));
    }, [allProducts]);

    //Filtering
    const processedProducts = useMemo(() => {
        let products = allProducts.filter((product) => {
            const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchRating = selectedRating ? product.rating >= selectedRating : true;
            const matchColor = selectedColors.length > 0
                ? product.color && selectedColors.some(selectedColor => selectedColor.toLowerCase() === product.color!.toLowerCase())
                : true;
            const matchBrand = selectedBrands.length > 0
                ? product.brand && selectedBrands.some(selectedBrand => selectedBrand.toLowerCase() === product.brand!.toLowerCase())
                : true;
            const matchCategory = selectedCategory ? product.category === selectedCategory : true;
            return matchPrice && matchRating && matchColor && matchBrand && matchCategory;
        });

        // Sorting
        products = [...products];

        if (sortBy === 'Price: Low to High') {
             products.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
             products.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Trending') {
             products.sort((a, b) => b.sold - a.sold);
        } else if (sortBy === 'Popular') {
             products.sort((a, b) => b.reviewsCount - a.reviewsCount);
        }

        return products;
    }, [allProducts, priceRange, selectedRating, selectedColors, selectedBrands, selectedCategory, sortBy]);

    const itemsPerPage = 18;
    const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = processedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const gridViewLayout =
    "grid-cols-1 min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4";
  const listViewLayout =
    "grid-cols-1 min-[425px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2";

    // Helper to render Sidebar
    const renderSidebar = (isMobile: boolean = false) => (
        <ShopingSidebar
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isMobile={isMobile}
            onClose={() => setIsMobileSidebarOpen(false)}
        />
    );

    return (
        <>
            <ShopingHeader title="Shop" currentPage="Product Shop" />

            {/*  Main Content Section */}
            <section className="bg-gray-50 min-h-screen py-8 font-sans">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Desktop Sidebar */}
                        <div className="lg:col-span-3 hidden lg:block">
                            {renderSidebar(false)}
                        </div>

                        {/* Mobile Sidebar */}
                        <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${isMobileSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} 
                            onClick={() => setIsMobileSidebarOpen(false)}
                        >
                            <div 
                                className={`fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                                onClick={(e) => e.stopPropagation()} 
                            >
                                {renderSidebar(true)}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-9">
                            <ShopingTopBar
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                totalResults={processedProducts.length}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                toggleSidebar={() => setIsMobileSidebarOpen(true)}
                            />
                            {currentProducts.length > 0 ? (
                                <div className={`grid gap-6 ${viewMode === 'grid' ? gridViewLayout : listViewLayout}`}>
                                    {currentProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} viewMode={viewMode} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-lg">
                                    <p className="text-gray-500">No products found matching filters.</p>
                                </div>
                            )}
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        const isActive = pageNumber === currentPage;
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`
                                                    w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-colors
                                                    ${isActive
                                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                                    }
                                                `}
                                            >
                                                {pageNumber < 10 ? `0${pageNumber}` : pageNumber}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopingProductMain;
