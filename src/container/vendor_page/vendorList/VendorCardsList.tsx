"use client";

import { VendorCard } from "./VendorCard";

const VENDORS = [
  {
    id: 1,
    name: "Safeway",
    deliveryTime: "Delivery by 6:15am",
    productKey: "safeway-12145871442",
    promo: "$5 off Snack & Candy",
    logo: "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-logo4.png",
    products: Array(5).fill(
      "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-img4.png"
    ),
  },
  {
    id: 2,
    name: "Lucky Supermarket",
    deliveryTime: "Delivery by 6:30am",
    productKey: "lucky-supermarket-98451236",
    promo: "$10 off $50+ order",
    logo: "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-logo2.png",
    products: Array(5).fill(
      "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-img3.png"
    ),
  },
  {
    id: 3,
    name: "Arico Farmer",
    deliveryTime: "Delivery by 7:00am",
    productKey: "arico-farmer-45871236",
    promo: "Fresh Produce Deals",
    logo: "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-logo2.png",
    products: Array(5).fill(
      "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-img4.png"
    ),
  },
  {
    id: 4,
    name: "Green Valley Market",
    deliveryTime: "Delivery by 6:45am",
    productKey: "green-valley-78451296",
    promo: "Organic Picks 15% Off",
    logo: "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-logo2.png",
    products: Array(5).fill(
      "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-img4.png"
    ),
  },
  {
    id: 5,
    name: "Fresh Basket",
    deliveryTime: "Delivery by 7:15am",
    productKey: "fresh-basket-33548721",
    promo: "Free Delivery Today",
    logo: "/images/badge-basket.png",
    products: Array(5).fill(
      "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-img4.png"
    ),
  },
  {
    id: 6,
    name: "Daily Mart",
    deliveryTime: "Delivery by 6:00am",
    productKey: "daily-mart-90871234",
    promo: "Morning Saver Deals",
    logo: "/images/badge-store.png",
    products: Array(5).fill(
      "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-img4.png"
    ),
  },
  {
    id: 7,
    name: "Urban Grocery",
    deliveryTime: "Delivery by 7:30am",
    productKey: "urban-grocery-56234198",
    promo: "$7 off Breakfast Items",
    logo: "/images/badge-city.png",
    products: Array(5).fill(
      "https://marketpro.theme.picode.in/assets/images/thumbs/vendor-img4.png"
    ),
  },
];

export default function VendorCardsList() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto w-full px-2">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-foreground">
            Supermarket Delivery Options
          </h1>
          <p className="mt-2 text-muted">
            Choose your favorite store and get fresh groceries delivered fast
          </p>
        </header>

        <div className="grid grid-cols-1 space-y-10 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {VENDORS.map((vendor, index) => (
            <VendorCard key={vendor.id} vendor={vendor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
