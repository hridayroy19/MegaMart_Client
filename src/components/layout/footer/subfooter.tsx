"use client";

import { Apple, PlayCircle, CreditCard, Landmark, Wallet } from "lucide-react";

const Subfooter = () => {
  return (
    <div className="bg-background md:mb-0 mb-20 border-t border-border/40">
      <div className="border-b border-border/60">
        <div className="max-w-[1440px] mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-6 px-4 lg:px-8">
          {/* Payment Methods Section */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
              Secure Payments
            </span>
            <div className="flex items-center gap-4 text-muted-foreground/60">
              <CreditCard
                size={24}
                className="hover:text-primary transition-colors cursor-help"
              />
              <Landmark
                size={24}
                className="hover:text-primary transition-colors cursor-help"
              />
              <Wallet
                size={24}
                className="hover:text-primary transition-colors cursor-help"
              />
              {/* You can also use small SVGs for Visa/Mastercard here */}
              <div className="h-6 w-[1px] bg-border mx-1" />
              <span className="text-xs font-semibold">SSL Encrypted</span>
            </div>
          </div>

          {/* App Download Section */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
              Experience on Mobile
            </span>
            <div className="flex items-center gap-3">
              <button className="group flex items-center gap-3 bg-secondary text-background px-4 py-2 rounded-xl transition-all hover:bg-primary hover:text-bakcground">
                <Apple className="w-5 h-5" />
                <div className="text-left leading-none">
                  <p className="text-[10px] opacity-70">Download on</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>

              <button className="group flex items-center gap-3 bg-secondary  text-background px-4 py-2 rounded-xl transition-all hover:bg-primary hover:text-bakcground">
                <PlayCircle className="w-5 h-5" />
                <div className="text-left leading-none">
                  <p className="text-[10px] opacity-70">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="py-8 text-center">
        <p className="text-lg text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary font-bold hover:underline cursor-pointer">
            MegaMart.
          </span>{" "}
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Subfooter;
