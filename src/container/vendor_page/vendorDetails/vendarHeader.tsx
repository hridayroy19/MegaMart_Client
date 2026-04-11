import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ShopingHeaderProps {
  title?: string;
  currentPage?: string;
}

const VendarHeader: React.FC<ShopingHeaderProps> = ({
  title = "Vendor Details",
  currentPage = "Vendor Details",
}) => {
  return (
    <div className="w-full bg-primary/10 mt-12 md:mt-6 py-8 border-b border-border">
      <div className=" px-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted hover:text-primary cursor-pointer transition-colors">
            <Home size={14} />
            <Link href={"/"}>
              <span>Home</span>
            </Link>
          </div>
          <span className="text-muted">
            <ChevronRight size={14} />
          </span>
          <span className="text-primary font-medium">{currentPage}</span>
        </div>
      </div>
    </div>
  );
};

export default VendarHeader;
