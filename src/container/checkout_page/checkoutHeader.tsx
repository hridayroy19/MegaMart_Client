import React from "react";

export default function CheckoutHeader() {
  return (
    <div>
      <div className="mb-8">
        <p className=" text-background mb-2">Secure Checkout</p>
        <h2 className="text-3xl md:text-4xl text-background ">
          Complete your <em className="text-primary ">order</em>
        </h2>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {(["Cart", "Checkout", "Confirmation"] as const).map((step, i) => (
          <React.Fragment key={step}>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full text-md font-bold flex items-center justify-center ${
                  i === 1
                    ? "bg-accent text-background"
                    : i < 1
                      ? "bg-accent text-background/80"
                      : "bg-accent text-background"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs ${i === 1 ? "text-background font-semibold" : "text-background"}`}
              >
                {step}
              </span>
            </div>
            {i < 2 && <div className="flex-1 h-px bg-accent" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
