"use client";

import { useGetOfferCardQuery } from "@/redux/features/offerCard/offerCardApi";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function OfferSection() {
  const { data, isLoading, isError, error } = useGetOfferCardQuery();

  if (isLoading)
    return <p className="py-6 text-sm text-muted-foreground">Loading...</p>;

  if (isError) {
    console.log("Offer error:", error);
    return <p className="py-6 text-sm text-error">Failed to load offers.</p>;
  }

  if (!data?.length) {
    return <p className="py-6 text-sm text-error">No offers available.</p>;
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((offer) => (
          <div
            key={offer.id}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl h-[260px] md:h-[308px]`}
            style={{
              backgroundImage: `url(${offer.bgImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              backgroundPosition:
                offer.imagePosition === "left" ? "left center" : "right center",
            }}
          >
            {/* Background Overlay for Small Devices */}
            <div className="absolute inset-0 bg-muted-foreground/10 md:bg-transparent z-[1]"></div>

            {/* Text Content */}
            <div
              className={`relative z-10 h-full p-6 md:p-8 flex flex-col justify-between w-full xl:w-[55%] lg:w-[73%] ${
                offer.imagePosition === "left" ? "md:ml-auto" : "md:mr-auto"
              }`}
            >
              {/* Logo */}
              <div
                className={`${
                  offer.logoPosition === "top-left"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div className="w-20 h-20 bg-card bg-opacity-90 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <Image
                    src={offer.logoImage || "/placeholder.svg"}
                    alt={offer.logoAlt}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Offer Details */}
              <div className="flex flex-col gap-2">
                <h2 className="whitespace-nowrap">{offer.title}</h2>

                <div className="text-xs flex gap-2 md:text-sm space-y-1 py-2">
                  <div className="text-foreground font-medium">
                    {offer.deliveryTime}
                  </div>
                  <div className={`font-medium text-foreground`}>
                    {offer.expireDate}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`${offer.buttonColor} text-accent-foreground px-5 py-2.5 rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:gap-3 text-sm w-fit`}
              >
                Shop Now
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
