import { Star, X } from "lucide-react";
import styles from "../../shop_page/shopingProduct/shoping.module.css";
import StoreProfile from "./storeProfile";
import VandorBestSallProduct from "./vandorBestSallProduct";

export interface CategoryData {
  name: string;
  count: number;
}

interface SidebarProps {
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  categories: CategoryData[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const VenderSidebar: React.FC<SidebarProps> = ({
  selectedRating,
  setSelectedRating,
  categories,
  selectedCategory,
  setSelectedCategory,
  isMobile = false,
  onClose,
}) => {
  const ratings = [
    { stars: 5, count: 124, percent: 60 },
    { stars: 4, count: 52, percent: 40 },
    { stars: 3, count: 12, percent: 20 },
    { stars: 2, count: 5, percent: 10 },
    { stars: 1, count: 2, percent: 5 },
  ];

  return (
    <aside
      className={`bg-background space-y-6 h-full 
       overflow-y-auto
      ${styles.customScrollbar}
      ${isMobile ? "" : "rounded-lg "}`}
    >
      {/* Category Header */}
      <StoreProfile />
      <div className="flex px-2 justify-between items-center mt-8 border-b border-border pb-3">
        <h2 className="font-semibold text-xl">Product Category</h2>
        {isMobile && (
          <button onClick={onClose} className="text-muted">
            <X size={22} />
          </button>
        )}
      </div>

      {/* Categories */}
      <ul
        className="
      space-y-3
      max-h-[400px]
      overflow-y-auto
      pr-2
      px-4
    "
      >
        {categories.map((cat) => {
          const active = selectedCategory === cat.name;
          return (
            <li
              key={cat.name}
              onClick={() => setSelectedCategory(active ? null : cat.name)}
              className={`cursor-pointer text-lg flex items-center gap-2
            ${
              active
                ? "text-secondary font-medium"
                : "text-foreground hover:text-primary"
            }`}
            >
              <span>{cat.name}</span>
              <span className=" text-lg rounded-full bg-background">
                ({cat.count})
              </span>
            </li>
          );
        })}
      </ul>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold px-2 mb-3">Filter by Rating</h3>

        <div className="space-y-3 px-2">
          {ratings.map((r) => {
            const active = selectedRating === r.stars;
            return (
              <div
                key={r.stars}
                onClick={() => setSelectedRating(active ? null : r.stars)}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <div
                  className={`w-4 h-4 rounded-full border 
                  ${active ? "border-border bg-primary" : "border-border"}`}
                />

                <div className="flex text-popover-foreground">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < r.stars
                          ? "fill-popover-foreground"
                          : "text-background fill-card"
                      }
                    />
                  ))}
                </div>

                <span className="ml-auto text-sm text-foreground">
                  {r.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <VandorBestSallProduct />
    </aside>
  );
};

export default VenderSidebar;
