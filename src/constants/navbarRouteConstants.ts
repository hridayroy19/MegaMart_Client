// Menu with children for dropdown
export const menuData = [
  { id: 1, name: "Home", link: "/" },
  {
    id: 2,
    name: "Shop",
    link: "/shop",
    children: [
      { id: 21, name: "All Products", link: "/shop/all" },
      { id: 22, name: "New Arrivals", link: "/shop/new" },
      { id: 23, name: "Best Sellers", link: "/shop/best" },
    ],
  },
  { id: 3, name: "Pages", link: "/pages" },
  { id: 4, name: "Vendor", link: "/vendor" },
  { id: 5, name: "Blog", link: "/blog" },
  { id: 6, name: "Contact Us", link: "/contact" },
];
