import Image from "next/image";
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviews: string;
};

type StarRatingProps = {
  rating: number;
  reviews: string;
};

type BestSellProductItemProps = {
  product: Product;
};

const bestSellProducts: Product[] = [
  {
    id: 1,
    title: "Man Fashion Shoe",
    image:
      "https://marketpro.theme.picode.in/assets/images/thumbs/best-selling-img1.png",
    price: 25,
    rating: 4.8,
    reviews: "12K",
  },
  {
    id: 2,
    title: "Woman Fashion Bag",
    image:
      "https://marketpro.theme.picode.in/assets/images/thumbs/best-selling-img2.png",
    price: 25,
    rating: 4.8,
    reviews: "12K",
  },
  {
    id: 3,
    title: "Woman Fashion Tops",
    image:
      "https://marketpro.theme.picode.in/assets/images/thumbs/best-selling-img3.png",
    price: 25,
    rating: 4.8,
    reviews: "12K",
  },
  {
    id: 4,
    title: "Woman Fashion Hat",
    image:
      "https://marketpro.theme.picode.in/assets/images/thumbs/best-selling-img4.png",
    price: 25,
    rating: 4.8,
    reviews: "12K",
  },
  {
    id: 5,
    title: "Woman Fashion Dress",
    image:
      "https://marketpro.theme.picode.in/assets/images/thumbs/best-selling-img5.png",
    price: 25,
    rating: 4.8,
    reviews: "12K",
  },
];

//Star Rating

const StarRating = ({ rating, reviews }: StarRatingProps) => {
  const fullStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1 text-sm">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden
          className={`h-4 w-4 fill-current ${
            i < fullStars ? "text-yellow-500" : "text-muted"
          }`}
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.438 8.353L12 18.005l-7.374 3.882 1.438-8.353-6.064-5.828 8.332-1.151z" />
        </svg>
      ))}

      <span className="ml-1 font-medium text-foreground">{rating}</span>
      <span className="text-muted">({reviews})</span>
    </div>
  );
};

// Product Item

const BestSellProductItem = ({ product }: BestSellProductItemProps) => {
  const { title, image, price, rating, reviews } = product;

  return (
    <div className="flex items-center gap-4 rounded-md border border-border p-2 transition hover:shadow-md">
      <div className="h-16 w-16 flex-shrink-0 rounded-md bg-background p-1">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="cursor-pointer text-base font-semibold text-foreground hover:text-primary leading-tight">
          {title}
        </h3>

        <StarRating rating={rating} reviews={reviews} />

        <p className="mt-1 text-lg font-bold text-foreground">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const VendorBestSellProducts = () => {
  return (
    <section className="rounded-lg mt-10 border border-border p-4 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-foreground">
        Best Sell Products
      </h2>

      <div className="space-y-4">
        {bestSellProducts.map((product) => (
          <BestSellProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default VendorBestSellProducts;
