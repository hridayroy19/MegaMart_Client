import { ChevronDown, Filter, LayoutGrid, List, Search } from "lucide-react";
import React, { useState } from "react";
import VendorSaleBanner from "./vendarBanner";

interface ShopingTopBarProps {
  totalResults: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSidebar: () => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const VendarTopBar: React.FC<ShopingTopBarProps> = ({
  totalResults,
  viewMode,
  setViewMode,
  toggleSidebar,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sortOptions = ["Popular", "Latest", "Trending", "Matches"];

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <VendorSaleBanner />
      <div className="flex flex-col mt-10 sm:flex-row justify-between items-center bg-background p-2 rounded-lg mb-6   gap-4 sm:gap-0 relative z-20">
        {/* Left Side */}
        <div className="relative w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 
               border border-border rounded-lg 
               text-sm sm:text-base
               focus:outline-none focus:ring-2 focus:ring-primary
               transition-all"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 
                     w-5 h-5 sm:w-6 sm:h-6 text-muted"
          />
        </div>

        {/* Right Side*/}
        <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 w-full">
          {/* View Toggles */}
          <div className="flex items-center gap-4">
            <p className="hidden xl:block text-muted text-sm w-full sm:w-auto text-center sm:text-left">
              Showing 1-12 of {totalResults} result
            </p>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md border transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-background border-border"
                  : "bg-card text-muted border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              <List size={24} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md border transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-background border-border"
                  : "bg-card text-muted border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              <LayoutGrid size={24} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className=" hidden md:block text-foreground text-sm whitespace-nowrap ">
              Sort by:
            </span>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-2 px-3 py-3 bg-card border border-border rounded-full text-sm text-foreground font-bold hover:border-primary transition-colors min-w-[110px]"
              >
                <span className="font-medium">{sortBy}</span>
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-full min-w-[120px] bg-card border border-border rounded-lg shadow-lg py-1 z-30 animation-fade-in">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortChange(option)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary transition-colors
                                            ${
                                              sortBy === option
                                                ? "text-primary hover:text-background font-medium bg-card"
                                                : "text-foreground hover:text-background"
                                            }
                                        `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Overlay */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-20 cursor-default"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
              )}
            </div>
          </div>

          <button
            onClick={toggleSidebar}
            className="lg:hidden flex items-center justify-center p-2 rounded-md bg-primary text-background hover:bg-secondary transition-colors shadow-sm"
            aria-label="Filter"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default VendarTopBar;
