"use client";

import { useGetOfferCardQuery } from "@/redux/features/offerCard/offerCardApi";
import { ArrowRight } from "lucide-react";

export default function OfferSection() {
  const { data: offers = [], isLoading, isError } = useGetOfferCardQuery();

  if (isLoading)
    return (
      <p className="py-6 text-sm text-muted-foreground">Loading offers...</p>
    );
  if (isError) return null;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[180px] md:h-[220px]"
            style={{
              backgroundImage: `url(${offer.bgImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: 0.95,
              backgroundPosition:
                offer.imagePosition === "left" ? "left center" : "right center",
            }}
          >
            {/* Text content */}
            <div
              className={`relative z-10 h-full p-2 md:p-4 flex flex-col justify-between w-[65%] xl:w-[50%] lg:w-[60%] md:w-[70%] ${
                offer.imagePosition === "right" ? "md:ml-auto" : ""
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <h2 className=" leading-snug drop-shadow">{offer.title}</h2>

                <div className="flex flex-wrap gap-x-3 mt-1">
                  <span className=" backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    {offer.deliveryTime}
                  </span>
                  <br />
                  <span className="kdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    {offer.expireDate}
                  </span>
                </div>
              </div>

              <button
                className={`text-background px-5 py-2 rounded-full font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-200 text-sm w-fit shadow-md`}
                style={{ backgroundColor: offer.buttonColor }}
              >
                Shop Now
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
