"use client";

import Image from "next/image";

export default function NewsletterSection() {
  return (
    <section className="w-full bg-muted/25 rounded-2xl py-10 ">
      <div className="container mx-auto px-4  flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text & Input */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-foreground">
            Stay home & get your daily needs from{" "}
            <br className="xl:block md:block lg:hidden hidden" /> our shop
          </h1>

          {/* Input + Button */}
          <div className="mt-7 flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your mail"
              className="lg:w-[350px] w-full md:w-[520px] xl:w-[500px] px-5 py-3 lg:py-4 rounded-md outline-none border bg-background border-border"
            />
            <button className="bg-secondary text-background lg:px-8 px-2 py-3 rounded-md font-semibold hover:bg-secondary-foreground transition">
              Subscribe now
            </button>
          </div>

          <p className=" text-accent2 font-semibold text-md mt-4">
            I agree that my submitted data is being collected and stored.
          </p>
        </div>

        {/* Right Side Image (Only lg and up) */}
        <div className="hidden lg:block w-[40%]">
          <Image
            src="https://marketpro.theme.picode.in/assets/images/thumbs/cyber-monday-img1.png"
            alt="Newsletter"
            width={460}
            height={250}
            className="w-full border h-[260px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
