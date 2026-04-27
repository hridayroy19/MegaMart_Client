/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VenderSidebar from "./venderSidebar";
import { IProduct } from "@/types";
import { CategoryData } from "./venderSidebar";
import VendarTopBar from "./venderTopBar";
import VanderProductCard from "./vendarProductCard";
import VendarHeader from "./vendarHeader";
import { useGetVendorProductsByKeyQuery } from "@/redux/features/vendorProduct/vendorProductApi";

const ITEMS_PER_PAGE = 12;

const VendorProductMain = ({ id }: any) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Popular");

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { data = [] } = useGetVendorProductsByKeyQuery(id);
  const allProducts: any[] = data;

  /* ---------------- Categories ---------------- */
  const categories: CategoryData[] = useMemo(() => {
    const map = new Map<string, number>();
    allProducts.forEach((p) => {
      if (p.category) {
        map.set(p.category, (map.get(p.category) || 0) + 1);
      }
    });
    return Array.from(map, ([name, count]) => ({ name, count }));
  }, [allProducts]);

  /* ---------------- Filter + Sort ---------------- */
  const processedProducts = useMemo(() => {
    const products = allProducts.filter((p) => {
      const matchRating = selectedRating ? p.rating >= selectedRating : true;
      const matchCategory = selectedCategory
        ? p.category === selectedCategory
        : true;
      const matchSearch = searchTerm
        ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchRating && matchCategory && matchSearch;
    });

    if (sortBy === "Price: Low to High") {
      products.sort((a, b) => {
        const aPrice =
          a.pricing?.salePrice > 0
            ? a.pricing.salePrice
            : a.pricing?.basePrice || 0;
        const bPrice =
          b.pricing?.salePrice > 0
            ? b.pricing.salePrice
            : b.pricing?.basePrice || 0;
        return aPrice - bPrice;
      });
    } else if (sortBy === "Price: High to Low") {
      products.sort((a, b) => {
        const aPrice =
          a.pricing?.salePrice > 0
            ? a.pricing.salePrice
            : a.pricing?.basePrice || 0;
        const bPrice =
          b.pricing?.salePrice > 0
            ? b.pricing.salePrice
            : b.pricing?.basePrice || 0;
        return bPrice - aPrice;
      });
    } else if (sortBy === "Trending") {
      products.sort(
        (a, b) => (b.inventory?.sold || 0) - (a.inventory?.sold || 0),
      );
    } else {
      products.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return products;
  }, [allProducts, selectedRating, selectedCategory, sortBy, searchTerm]);

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = processedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const gridLayout =
    "grid-cols-1 min-[425px]:grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  const listLayout = "grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2";

  return (
    <>
      <VendarHeader title="Vendor Details" currentPage="Vendor Details" />

      <section className="bg-card section-padding-x min-h-screen py-8">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <VenderSidebar
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </aside>

          {/* Mobile Sidebar */}
          {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <div
                className="absolute left-0 top-0 h-full w-[280px] bg-card"
                onClick={(e) => e.stopPropagation()}
              >
                <VenderSidebar
                  isMobile
                  onClose={() => setIsMobileSidebarOpen(false)}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="lg:col-span-9">
            <VendarTopBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResults={processedProducts.length}
              viewMode={viewMode}
              setViewMode={setViewMode}
              toggleSidebar={() => setIsMobileSidebarOpen(true)}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {currentProducts.length ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? gridLayout : listLayout
                }`}
              >
                {currentProducts.map((product) => (
                  <VanderProductCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-lg">
                No products found.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`pagination-btn ${
                        page === currentPage && "active"
                      }`}
                    >
                      {page < 10 ? `0${page}` : page}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </section>
    </>
  );
};

export default VendorProductMain;
