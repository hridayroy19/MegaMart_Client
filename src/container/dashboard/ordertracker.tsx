import { Clock, Package, Truck, CheckCircle } from "lucide-react";

const STEPS = ["Pending", "Processing", "Shipped", "Delivered"] as const;
type Step = (typeof STEPS)[number];

const STEP_ICONS: Record<Step, React.ElementType> = {
  Pending: Clock,
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle,
};

interface OrderTrackerProps {
  status: string;
}

export default function OrderTracker({ status }: OrderTrackerProps) {
  const currentIndex = STEPS.indexOf(status as Step);

  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2" />

        {/* Progress fill */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-amber-400 -translate-y-1/2 transition-all duration-1000 ease-out"
          style={{
            width: `${(Math.max(currentIndex, 0) / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {STEPS.map((step, i) => {
          const isActive = i <= currentIndex;
          const isCurrent = i === currentIndex;
          const Icon = STEP_ICONS[step];

          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  isActive
                    ? "bg-amber-400 border-amber-400 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                    : "bg-slate-800 border-slate-700 text-slate-500",
                  isCurrent ? "scale-125" : "scale-100",
                ].join(" ")}
              >
                <Icon size={14} />
              </div>

              <span
                className={[
                  "absolute -bottom-6 text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap",
                  isActive ? "text-amber-400" : "text-slate-500",
                ].join(" ")}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
