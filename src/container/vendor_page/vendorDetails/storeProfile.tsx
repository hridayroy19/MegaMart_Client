/* eslint-disable @typescript-eslint/no-explicit-any */
import { DotSquare, Plus, Star } from "lucide-react";
import Image from "next/image";

const storeData = {
  name: "Baishakhi Plus",
  // For example: "/logo/vendorshop_logo.png"
  logoUrl:
    "https://marketpro.theme.picode.in/assets/images/thumbs/vendors-two-icon1.png",
  followers: 480589,
  rating: 4.8,
  reviewCount: "12K",
  links: [
    { label: "About Store", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Return Policy", href: "#return" },
    { label: "Shipping Policy", href: "#shipping" },
    { label: "Contact Seller", href: "#contact" },
  ],
};

// --- 2. HELPER COMPONENT: StarRating ---
const StarRating = ({ rating }: any) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="text-yellow-400 fill-yellow-400 w-4 h-4" />
      );
    } else {
      stars.push(<Star key={i} className="text-gray-400 w-4 h-4" />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
};

const StoreProfile = () => {
  const { name, logoUrl, followers, rating, reviewCount, links } = storeData;

  return (
    <div className="bg-primary text-card p-6 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="w-20 h-20 mr-3 rounded-lg overflow-hidden border border-gray-700 bg-white p-1">
          <Image
            src={logoUrl || "/placeholder-logo.png"}
            alt={`${name} Logo`}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <button className="flex items-center justify-center px-4 py-2 border border-background text-sm font-medium rounded-full hover:bg-background hover:text-foreground transition duration-200 min-w-[120px]">
            FOLLOW <Plus className="ml-2 w-4 h-4" />
          </button>

          {/* CHAT NOW Button */}
          <button className="flex items-center justify-center px-4 py-2 bg-transparent border border-background text-sm font-medium rounded-full hover:bg-background hover:text-foreground transition duration-200 min-w-[120px]">
            CHAT NOW <DotSquare className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      <h2 className="text-2xl mt-4 text-background font-bold mb-2">{name}</h2>
      <p className="text-card mb-4">{followers.toLocaleString()} Followers</p>

      <div className="flex items-center mb-6">
        <StarRating rating={rating} />
        <span className="ml-3 text-xl font-semibold">{rating}</span>
        <span className="ml-2 text-card">({reviewCount})</span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-start justify-start px-4 py-3 border border-border  rounded-lg text-lg  hover:bg-background hover:text-foreground transition duration-150"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default StoreProfile;
