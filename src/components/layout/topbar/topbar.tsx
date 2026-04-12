"use client";

import { Mail, Phone } from "lucide-react";

const Topbar = () => {
  return (
    <div className="section-padding-x border-b border-border md:block hidden">
      <div className="w-full px-2 max-content-width text-sm transition-all duration-300 overflow-hidden">
        <div className="w-full px-2 py-2 mx-auto flex items-center justify-between">
          
          {/* Contact Information */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 text-[15px]">
              <Mail size={16} className="text-primary" />
              <span>megamert@gmail.com</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[15px]">
              <Phone size={16} className="text-primary" />
              <p>(+001) 123 456 789</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="hidden sm:block text-[15px] hover:text-primary transition-colors">
              🎉 Get 15% OFF with code: <span className="font-bold">WELCOME15</span>
            </button>

            <div className="flex gap-4">
              <select className="bg-transparent outline-none cursor-pointer">
                <option value="bn">Bangla</option>
                <option value="en">English</option>
              </select>

              <select className="bg-transparent outline-none cursor-pointer">
                <option value="bdt">BDT</option>
                <option value="usd">USD</option>
              </select>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Topbar;