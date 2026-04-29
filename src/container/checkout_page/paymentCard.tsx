import { PaymentCardProps } from "@/types/checkout";

export default function PaymentCard({
  selected,
  icon,
  label,
  sub,
  onClick,
}: PaymentCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        selected
          ? "border-amber-500 bg-amber-400/5 shadow-lg shadow-amber-400/10"
          : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-amber-400/15 text-amber-400" : "bg-slate-700/60 text-accent"}`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-sm ${selected ? "text-amber-300" : "text-background"}`}
          >
            {label}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
        </div>
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected ? "border-amber-400 bg-amber-400" : "border-border"}`}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
        </div>
      </div>
    </button>
  );
}
