"use client";

import Image from "next/image";
import { useState } from "react";
import imageOne from "@/assets/images/homePage/offer/fast.png";
import imageTwo from "@/assets/images/homePage/offer/secound.png";

export default function PromoBanners() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("NEW50").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* Card 1 */}
      <div className="relative flex flex-1 overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[240px]">
        <Image
          src={imageOne}
          alt="cashback offer"
          fill
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/20 to-transparent" />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center items-end px-7 text-center w-full h-full p-4">
          <h2 className="text-background text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            10% Back
          </h2>

          <p className="mt-2 text-background/90">
            Earn 10% cash back on Swootech.
          </p>

          <a
            href="#"
            className="mt-2 font-semibold text-background underline underline-offset-2 hover:text-primary transition"
          >
            Learn how
          </a>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative flex flex-1 items-center overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[220px]">
        <Image
          src={imageTwo}
          alt="electronics deal"
          fill
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />

        <div className="relative z-10 p-5 sm:p-7 md:p-8 w-[80%] sm:w-[70%] lg:w-[60%]">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[2px] uppercase text-background/40">
            Limited offer
          </p>

          <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-bold text-background leading-tight">
            Electronics Mega Deal
          </h2>
          <p className="text-background">
            Enter your phone number and well send you a download link.
          </p>
          <button
            onClick={handleCopy}
            className="mt-4 inline-flex items-center rounded-xl border border-border overflow-hidden active:scale-95 transition"
          >
            <span className="px-3 py-2 text-[10px] sm:text-xs text-background/40 bg-background/5">
              Copy code
            </span>

            <span
              className={`px-4 py-2 text-[10px] sm:text-xs font-bold tracking-widest text-black transition ${
                copied ? "bg-green-400" : "bg-primary"
              }`}
            >
              {copied ? "Copied!" : "NEW50"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
