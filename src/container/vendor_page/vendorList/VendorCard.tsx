import Image from "next/image";
import Link from "next/link";

type Vendor = {
  id: number;
  name: string;
  productKey: string;
  deliveryTime: string;
  promo: string;
  logo: string;
  products: string[];
};

type VendorCardProps = {
  vendor: Vendor;
  index: number;
};

const CARD_THEMES = [
  "bg-amber-100",
  "bg-orange-100",
  "bg-blue-100",
  "bg-lime-100",
] as const;

const getTheme = (index: number): string =>
  CARD_THEMES[index % CARD_THEMES.length];

export function VendorCard({ vendor, index }: VendorCardProps) {
  return (
    <article
      className={`relative w-full rounded-3xl px-2 pt-20 pb-6 shadow-sm transition hover:shadow-md ${getTheme(
        index
      )}`}
    >
      {/* Logo */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-card shadow">
          <Image
            src={vendor.logo}
            alt={`${vendor.name} logo`}
            width={58}
            height={58}
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <Link href={`/vendor/${vendor.productKey}`}>
          <h3 className="cursor-pointer text-2xl font-semibold text-foreground hover:text-primary">
            {vendor.name}
          </h3>
        </Link>

        <p className="mt-2 text-md text-muted">{vendor.deliveryTime}</p>

        {/* Promo */}
        <span className="mt-4 inline-block rounded-full bg-background px-3 py-2 text-md font-medium text-foreground shadow">
          {vendor.promo}
        </span>

        {/* Products */}
        <div className="mt-8 flex justify-center gap-2">
          {vendor.products.map((src, i) => (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow"
            >
              <Image
                src={src}
                alt="Product"
                width={47}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
