"use client";

import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Free Shipping",
    desc: "Free shipping all over the US",
    icon: Truck,
  },
  {
    id: 2,
    title: "100% Satisfaction",
    desc: "Free shipping all over the US",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Secure Payments",
    desc: "Free shipping all over the US",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "Free shipping all over the US",
    icon: Headphones,
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-secondary/14 rounded-xl p-6"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-background">
                <Icon size={30} />
              </div>

              <div>
                <h2 className=" text-xl font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
