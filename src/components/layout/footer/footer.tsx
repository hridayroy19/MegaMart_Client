"use client";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Subfooter from "./subfooter";

export default function Footer() {
  return (
    <>
      <footer className="bg-primary  text-background w-full pt-12 pb-6">
        <div className="flex flex-col px-4 max-content-width lg:flex-row gap-10 lg:gap-6 w-full">
          {/* Left Sections (80%) */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Top Categories */}
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-background">
                Top Categories
              </h3>
              <ul className="space-y-2 text-background">
                {[
                  "Pregnant",
                  "Milks & Foods",
                  "Diapers & Wipes",
                  "Infant",
                  "Eat & Drink Supplies",
                  "Baby Fashion",
                ].map((item, i) => (
                  <li key={i} className="hover:text-foreground cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-background">
                Company
              </h3>
              <ul className="space-y-2 text-background">
                {["About", "Contact", "Career", "Blog"].map((item, i) => (
                  <li key={i} className="hover:text-foreground cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Center */}
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-background">
                Help Center
              </h3>
              <ul className="space-y-2 text-background">
                {[
                  "Customer Service",
                  "Policy",
                  "Terms & Conditions",
                  "Track Order",
                  "FAQs",
                  "My Account",
                  "Product Support",
                ].map((item, i) => (
                  <li key={i} className="hover:text-foreground cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Partner */}
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-background">
                Partner
              </h3>
              <ul className="space-y-2 text-background">
                {["Become Seller", "Affiliate", "Affiliate", "Affiliate"].map(
                  (item, i) => (
                    <li
                      key={i}
                      className="hover:text-foreground cursor-pointer"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Subscribe Section (20%) */}
          <div className="lg:w-[30%] w-full">
            <h3 className="font-bold text-2xl mb-5 text-background">
              Subscribe & Get <span className="text-error/90">10% OFF</span>
            </h3>

            <div className="flex items-center bg-card rounded overflow-hidden mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-5 py-3 text-foreground outline-none text-lg"
              />
              <button className="bg-primary px-4 border py-3 font-semibold text-background transition hover:bg-[#011f3a]">
                SUBSCRIBE
              </button>
            </div>

            <p className="text-sm text-background mb-3">
              By subscribing, you accept the{" "}
              <span className="text-background underline cursor-pointer">
                Privacy Policy
              </span>
            </p>

            <p className="text-background mb-1">
              Hotline: 24/7 : (+325) 3668 36 16
            </p>
            <p className="text-background mb-1">
              Work Hours: Monday–Saturday, 9:00am - 5:00pm
            </p>
            <p className="text-background mb-4">Mail: contact@swabbymall.com</p>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-card text-foreground flex items-center justify-center cursor-pointer shadow-md hover:bg-secondary hover:text-background transition"
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
      {/* Bottom Bar */}
      <Subfooter />
    </>
  );
}
