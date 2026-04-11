import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BlogHeaderProps {
  title?: string;
  currentPage?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title = "Blog",
  currentPage = "Blog",
}) => {
  return (
    <div className="w-full bg-primary/12  md:mt-7 py-6 border-b border-border">
      <div className=" px-5  flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2>{title}</h2>

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

export default BlogHeader;
