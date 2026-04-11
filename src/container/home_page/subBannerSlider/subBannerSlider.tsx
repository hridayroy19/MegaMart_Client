"use client";

import { Truck, MessageCircle, HelpCircle, CreditCard } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Worldwide Shipping",
    subtitle: "Order On $70",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Customer Review",
    subtitle: "Get Feedback",
  },
  {
    id: 3,
    icon: HelpCircle,
    title: "Online Support",
    subtitle: "24*7 Hours",
  },
  {
    id: 4,
    icon: CreditCard,
    title: "Secure Payment",
    subtitle: "Easy Way",
  },
];

export default function FeatureSection() {
  return (
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-xl bg-white hover:shadow-md transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-yellow-500">
                <Icon size={28} />
              </div>

              {/* Text */}
              <div>
                <h4 className="font-semibold text-gray-900">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}