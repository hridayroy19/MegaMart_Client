import { ShippingCardProps } from "@/types/checkout";

export function ShippingCard({
  selected,
  label,
  sub,
  price,
  onClick,
}: ShippingCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        selected
          ? "border-amber-400/70 bg-amber-400/5 shadow-lg shadow-amber-400/10"
          : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`font-semibold text-sm ${selected ? "text-amber-300" : "text-slate-300"}`}
          >
            {label}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`text-sm font-bold ${selected ? "text-amber-400" : "text-slate-400"}`}
          >
            {price}
          </span>
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${selected ? "border-amber-400 bg-amber-400" : "border-slate-600"}`}
          >
            {selected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
          </div>
        </div>
      </div>
    </button>
  );
}
