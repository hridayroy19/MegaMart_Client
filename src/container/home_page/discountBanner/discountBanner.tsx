"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export default function DiscountBanner() {
  const [copied, setCopied] = useState(false);
  const discountCode = "FREE25BAC";
  const handleCopy = () => {
    navigator.clipboard
      .writeText(discountCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <section className="w-full">
      <div className="w-full mx-auto">
        <div
          className="bg-primary/13 border border-dashed border-primary/70 rounded-xl 
                        flex flex-col md:flex-row items-center justify-between gap-6 
                        py-7 px-4 xl:px-16"
        >
          {/* Left Text */}
          <h3 className=" xl:text-2xl  text-primary text-center lg:text-left">
            Super discount for your{" "}
            <span className="font-semibold underline">first purchase</span>
          </h3>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-primary text-background px-6 py-2 rounded-full font-medium"
          >
            {discountCode}
            <Copy size={18} />
            {copied && (
              <span className="ml-2 text-xs text-background/90">Copied!</span>
            )}
          </button>

          {/* Right Text */}
          <p className="text-primary-foreground text-lg text-center lg:text-left">
            Use discount code to get <span className="font-bold">20%</span>{" "}
            discount for any item
          </p>
        </div>
      </div>
    </section>
  );
}
