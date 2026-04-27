import { ChevronDown, Filter, LayoutGrid, List } from 'lucide-react';
import React, { useState } from 'react';

interface ShopingTopBarProps {
    totalResults: number;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    toggleSidebar: () => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    startIndex?: number;
    endIndex?: number;
}

const ShopingTopBar: React.FC<ShopingTopBarProps> = ({
    totalResults,
    viewMode,
    setViewMode,
    toggleSidebar,
    sortBy,
    setSortBy,
    startIndex = 0,
    endIndex = 0
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sortOptions = ["Popular", "Latest", "Trending", "Matches"];

    const handleSortChange = (option: string) => {
        setSortBy(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg mb-6 border border-gray-100 gap-4 sm:gap-0 relative z-20">
            {/* Left Side */}
            <p className="text-gray-600 text-sm w-full sm:w-auto text-center sm:text-left">
                Showing {totalResults > 0 ? startIndex + 1 : 0}-{endIndex} of {totalResults} result(s)
            </p>

            {/* Right Side*/}
            <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">

                {/* View Toggles */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md border transition-colors ${viewMode === 'list'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-600 border-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        <List size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md border transition-colors ${viewMode === 'grid'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-600 border-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm whitespace-nowrap hidden min-[400px]:block">Sort by:</span>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:border-blue-500 transition-colors min-w-[110px]"
                        >
                            <span className="font-medium">{sortBy}</span>
                            <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-1 w-full min-w-[120px] bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-30 animation-fade-in">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSortChange(option)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors
                                            ${sortBy === option ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600'}
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
                    className="lg:hidden flex items-center justify-center p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                    aria-label="Filter"
                >
                    <Filter size={20} />
                </button>
            </div>
        </div>
    );
};

export default ShopingTopBar;