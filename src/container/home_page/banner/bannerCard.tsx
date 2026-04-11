import Image from "next/image";

const products = [
  {
    id: "67b7e1f1a91c12001a20000a",
    category: "Smart Entertainment",
    title: "Ultra HD TV",
    specs: ["4K Resolution", "HDR10+", "Smart OS"],
    image:
      "https://res.cloudinary.com/dh5fzsfzb/image/upload/v1775889790/02-removebg-preview_uitfae.png",
    bgColor: "bg-[#7021FF]",
  },
  {
    id: "67b7e1f1a91c12001a20000b",
    category: "Battery Life",
    title: "Truly Wireless",
    specs: ["4GB RAM", "64GB ROM", "20MP"],
    image:
      "https://res.cloudinary.com/dh5fzsfzb/image/upload/v1775889790/03-removebg-preview_ik497t.png",
    bgColor: "bg-[#FFD700]",
  },
];

export default function ProductShowcase() {
  return (
    <div className="flex flex-row gap-8 justify-center bg-background">
      {products?.map((product) => (
        <div
          key={product?.id}
          className={`relative w-full max-w-[380px] h-[450px] overflow-hidden rounded-sm ${product.bgColor} shadow-2xl transition-all duration-300 hover:-translate-y-2`}
        >
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="relative w-full h-[80%] transition-transform duration-500 hover:scale-110">
              <Image
                src={product?.image}
                alt={product.title}
                fill
                className="object-contain object-bottom p-4"
                priority
              />
            </div>
          </div>

          <div className="relative z-10 p-10 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-white/80 drop-shadow-md">
              {product.category}
            </h3>
            <h2 className="mt-2 text-4xl font-black text-white drop-shadow-lg">
              {product.title}
            </h2>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {product.specs.map((spec, index) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full bg-black/20 backdrop-blur-md text-white text-sm font-semibold border border-white/10"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
