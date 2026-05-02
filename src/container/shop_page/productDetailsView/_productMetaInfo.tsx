import {
  Box,
  CreditCard,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";

import Link from "next/link";
import { IProduct } from "@/types";

const ProductMetaInfo = ({ product }: { product: IProduct }) => {
  const items = [
    {
      icon: <Truck size={20} className="text-slate-600" />,
      title: "Fast Delivery",
      desc: "Lightning-fast shipping, guaranteed.",
    },
    {
      icon: <RotateCcw size={20} className="text-slate-600" />,
      title: "Free 90-day returns",
      desc: "Shop risk-free with easy returns.",
    },
    {
      icon: <MapPin size={20} className="text-slate-600" />,
      title: "Pickup available at Shop location",
      desc: "Usually ready in 24 hours",
    },
    {
      icon: <CreditCard size={20} className="text-slate-600" />,
      title: "Payment",
      desc: "Payment upon receipt of goods, Payment by card in the department, Google Pay, Online card.",
    },
    {
      icon: <ShieldCheck size={20} className="text-slate-600" />,
      title: "Warranty",
      desc: "The Consumer Protection Act does not provide for the return of this product of proper quality.",
    },
    {
      icon: <Box size={20} className="text-slate-600" />,
      title: "Packaging",
      desc: "Research & development value proposition graphical user interface investor.",
    },
  ];

  return (
    <div className="space-y-6 border border-gray-200 pt-5">
      {/* Vendor Card (Top Box) */}
      <div className="bg-primary border border-gray-200 rounded-full p-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-4 bg-gray-100 rounded-full">
            <Store size={24} className="text-slate-600" />
          </div>
          <div>
            <span className=" text-background block text-xs">by</span>
            <span className=" text-background font-bold">
              {product.seller || "Marketpro"}
            </span>
          </div>
        </div>
        <Link href={`/shop?seller=${product.seller}`}>
          <button className=" w-32 bg-background text-black border border-gray-300 px-3 py-2 rounded-full hover:bg-gray-50 hover:text-black transition text-xs font-bold">
            VIEW STORE
          </button>
        </Link>
      </div>

      {/* Services List (Bottom Box) */}
      <div className="bg-[#f3faf2] rounded-xl p-6 space-y-6 border border-gray-100">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="mt-1">{item.icon}</div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMetaInfo;
