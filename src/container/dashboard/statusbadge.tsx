import { Package, Truck, CheckCircle, Clock } from "lucide-react";

type StatusKey =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

interface StatusConfig {
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  text: string;
}

const STATUS_CONFIGS: Record<StatusKey, StatusConfig> = {
  Pending: {
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-500/20",
    text: "Pending",
  },
  Processing: {
    icon: Package,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-500/20",
    text: "Processing",
  },
  Shipped: {
    icon: Truck,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-500/20",
    text: "Shipped",
  },
  Delivered: {
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-500/20",
    text: "Delivered",
  },
  Cancelled: {
    icon: CheckCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-500/20",
    text: "Cancelled",
  },
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIGS[status as StatusKey] ?? STATUS_CONFIGS.Pending;
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.bg} ${config.color} ${config.border}`}
    >
      <Icon size={14} className="animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {config.text}
      </span>
    </div>
  );
}
