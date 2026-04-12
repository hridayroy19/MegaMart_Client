"use client";

// components/faq/FAQAccordion.tsx
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { faqs } from "./faqData";

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-gray-200 border border-border rounded-md">
      {faqs.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center px-4 py-3  font-medium  hover:bg-primary/30 transition-colors text-left"
            >
              <span>{item.question}</span>
              {isOpen ? (
                <ChevronUp size={16} className="text-foreground shrink-0 ml-2" />
              ) : (
                <ChevronDown size={16} className="text-foreground shrink-0 ml-2" />
              )}
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 leading-relaxed bg-background">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}