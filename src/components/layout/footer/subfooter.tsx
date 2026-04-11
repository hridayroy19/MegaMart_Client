import { Apple, PlaySquare } from "lucide-react";

const Subfooter = () => {
  return (
    <div className="bg-background md:mb-0 mb-20">
      <div className="border-b border-gray-600 mt-4 pt-2 pb-2">
        <div className="max-content-width mx-auto py-2 flex flex-col md:flex-row justify-between items-center gap-4 lg:px-3 px-2  flex-wrap">
          {/* Payment Icons */}
          <div className="flex items-center space-x-5 opacity-80 flex-wrap">
            <span>💳</span>
            <span>💳</span>
            <span>💳</span>
            <span>💳</span> 
          </div>

          {/* App Download */}
          <div className="flex items-center gap-3 ">
            <button className="text-foreground hover:text-primary  px-4 py-2 rounded text-xs font-medium">
              Download App
            </button>

            <button className="bg-primary flex items-center gap-2 text-foreground px-4 py-2 rounded text-xs hover:bg-secondary hover:text-background font-medium">
              <Apple className="md:w-4 w-2 h-4" />
              App Store
            </button>

            <button className="bg-primary flex items-center gap-2 text-foreground px-4 py-2 rounded text-xs hover:bg-secondary hover:text-background font-medium">
              <PlaySquare className="md:w-4 w-2 h-4" />
              Google Play
            </button>
          </div>
        </div>
      </div>
      <div className="py-7 text-center">
        <p>
          © 2025 <span className="text-primary font-semibold"> Al-Riwaa.</span>{" "}
          All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Subfooter;
