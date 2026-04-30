import Image from "next/image";
import { Package, CreditCard, MapPin, ExternalLink } from "lucide-react";
import StatusBadge from "./statusbadge";
import OrderTracker from "./ordertracker";

export interface OrderItem {
  _id: string;
  quantity: number;
  priceAt: number;
  product?: {
    name?: string;
    images?: string[];
    thumbnail?: string;
  };
}

export interface Order {
  _id: string;
  transactionId?: string;
  createdAt: string;
  orderStatus?: string;
  paymentStatus?: string;
  total?: number;
  customer?: { city?: string };
  items?: OrderItem[];
}

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 bg-secondary backdrop-blur-md border border-background/60 rounded-2xl px-6 py-4">
      {/* Order Header */}
      <div className="px-6 py-4 border-b border-background/50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-secondary/60 backdrop-blur-md border border-background/60 rounded-lg">
            <Package size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-[10px] text-background font-bold uppercase tracking-widest">
              Order ID
            </p>
            <p className="text-sm font-mono font-bold text-background uppercase">
              {order.transactionId?.slice(0, 12)}...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] text-background font-bold uppercase tracking-widest">
              Date Placed
            </p>
            <p className="text-xs text-background/80">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <StatusBadge status={order.orderStatus ?? "Pending"} />
        </div>
      </div>

      {/* Order Items */}
      <div className="px-6 py-6 space-y-4">
        {order.items?.map((item) => (
          <div key={item._id} className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-xl bg-secondary/60 backdrop-blur-md border border-background/60 overflow-hidden flex-shrink-0 relative">
              {item.product?.images?.[0] || item.product?.thumbnail ? (
                <Image
                  src={item.product.images?.[0] ?? item.product.thumbnail!}
                  alt={item.product.name ?? "Product"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  📦
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-background truncate group-hover:text-amber-400 transition-colors">
                {item.product?.name ?? "Product"}
              </h4>
              <p className="text-xs text-background/80 mt-0.5">
                Quantity:{" "}
                <span className="text-background/80">{item.quantity}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-background">
                ${(item.priceAt * item.quantity).toFixed(2)}
              </p>
              <p className="text-[10px] text-background/80">
                ${item.priceAt} each
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Tracker */}
      <div className="px-6 py-4 bg-secondary/30 border-t border-slate-700/30">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-background">Order Progress</p>
          <p className="text-xs font-medium text-amber-400/80">
            Est. Arrival: 3-5 days
          </p>
        </div>
        <OrderTracker status={order.orderStatus ?? "Pending"} />
      </div>

      {/* Order Footer */}
      <div className="px-6 py-4 bg-secondary/60 backdrop-blur-md border border-background/60 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-4 text-xs text-background">
          <div className="flex items-center gap-1.5">
            <CreditCard size={14} className="text-background" />
            <span>
              {order.paymentStatus === "Success"
                ? "Paid"
                : "Unpaid (COD/Pending)"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-border pl-4">
            <MapPin size={14} className="text-background" />
            <span className="truncate max-w-[120px]">
              {order.customer?.city ?? "Address"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-background font-bold uppercase tracking-widest leading-none mb-1">
              Grand Total
            </p>
            <p className="text-lg font-bold text-amber-400">
              ${order.total?.toFixed(2)}
            </p>
          </div>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-colors">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
