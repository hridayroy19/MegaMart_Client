/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { baseApi } from "@/config/axios";
import { useRouter } from "next/navigation";
import { syncCartToServer, fetchCart } from "@/redux/features/cart/cartSlice";
import { useCreateCodOrderMutation } from "@/redux/features/order/orderApi";
import toast from "react-hot-toast";
import {
  CartItem,
  CustomerForm,
  PaymentMethod,
  ShippingMethod,
} from "@/types/checkout";
import CheckoutHeader from "./checkoutHeader";
import { Divider, SectionCard, StepBadge, validate } from "./stepFunction";
import Loading from "@/app/loading";
import PaymentCard from "./paymentCard";
import { ShippingCard } from "./shippingCard";
import { Field } from "./fild";

const INITIAL_CUSTOMER: CustomerForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "Bangladesh",
  description: "",
};

function getItemPrice(it: CartItem): number {
  if (it.priceAt) return it.priceAt;
  if (typeof it.product === "object" && it.product) {
    return it.product.pricing?.salePrice ?? it.product.pricing?.basePrice ?? 0;
  }
  return 0;
}

function getItemName(it: CartItem): string {
  if (typeof it.product === "object" && it.product?.name)
    return it.product.name;
  return "Product";
}

function getItemImage(it: CartItem): string | null {
  if (typeof it.product === "object" && it.product?.images?.[0]) {
    return it.product.images[0];
  }
  return null;
}

function getItemKey(it: CartItem): string {
  if (typeof it.product === "string") return it.product;
  if (typeof it.product === "object" && it.product?._id) return it.product._id;
  return Math.random().toString();
}

export default function Checkout() {
  const [createCodOrder] = useCreateCodOrderMutation();
  const items: CartItem[] = useSelector((s: RootState) => s.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [customer, setCustomer] = useState<CustomerForm>(INITIAL_CUSTOMER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ssl");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("free");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isAuthenticated } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!isAuthenticated && !token) {
      toast.error("Please log in to proceed with checkout");
      router.push("/login");
      return;
    }
    setIsAuthChecked(true);
  }, [router, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchCart() as any);
  }, [dispatch]);

  const setField = useCallback(
    <K extends keyof CustomerForm>(key: K, value: string) => {
      setCustomer((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    },
    [errors],
  );

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + getItemPrice(it) * (it.quantity ?? 0), 0),
    [items],
  );

  const shipping = shippingMethod === "express" ? 9 : 0;
  const taxRate = 0.05;
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const handlePay = async () => {
    if (!items?.length) {
      toast.error("Your cart is empty");
      return;
    }

    const errs = validate(customer);
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error("Please complete all required fields");
      const firstKey = Object.keys(errs)[0];
      document
        .getElementById(firstKey)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const customerPayload = {
      name: `${customer.firstName} ${customer.lastName}`.trim(),
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
      country: customer.country,
      description: customer.description,
    };

    try {
      setLoading(true);
      await dispatch(syncCartToServer() as any).unwrap();

      if (paymentMethod === "cod") {
        await createCodOrder({
          customer: customerPayload,
          shippingMethod,
          shippingFee: shipping,
        }).unwrap();
        toast.success("Order placed! Cash on delivery confirmed.");
        router.push("/dashboard");
        return;
      }

      const { data } = await baseApi.post("/payment/init", {
        customer: customerPayload,
      });
      const paymentUrl = data?.data?.payment_url;
      if (!paymentUrl) throw new Error("No payment URL returned");
      window.location.href = paymentUrl;
    } catch (err: unknown) {
      const e = err as {
        response?: { status?: number; data?: { message?: string } };
        message?: string;
      };
      if (e?.response?.status === 401) {
        router.push("/login");
        return;
      }
      toast.error(
        e?.response?.data?.message ??
          e?.message ??
          "Payment failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthChecked) {
    return (
      <>
        <Loading />
        <p> Checking authentication...</p>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/85 text-background px-4 py-10 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <CheckoutHeader />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="flex flex-col gap-6">
            <SectionCard>
              <div className="flex items-center gap-3 mb-6">
                <StepBadge n={1} />
                <div>
                  <p className="text-base font-semibold text-slate-100">
                    Shipping & Contact
                  </p>
                  <p className="text-xs text-slate-500">
                    Where should we send your order?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  id="firstName"
                  label="First Name"
                  value={customer.firstName}
                  onChange={(v) => setField("firstName", v)}
                  placeholder="John"
                  error={errors.firstName}
                />
                <Field
                  id="lastName"
                  label="Last Name"
                  value={customer.lastName}
                  onChange={(v) => setField("lastName", v)}
                  placeholder="Doe"
                  error={errors.lastName}
                />
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  value={customer.email}
                  onChange={(v) => setField("email", v)}
                  placeholder="john@example.com"
                  error={errors.email}
                />
                <Field
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={customer.phone}
                  onChange={(v) => setField("phone", v)}
                  placeholder="+880 1700 000000"
                  error={errors.phone}
                />
                <Field
                  id="address"
                  label="Street Address"
                  value={customer.address}
                  onChange={(v) => setField("address", v)}
                  placeholder="123 Main Street"
                  error={errors.address}
                  colSpan
                />
                <Field
                  id="city"
                  label="City"
                  value={customer.city}
                  onChange={(v) => setField("city", v)}
                  placeholder="Dhaka"
                  error={errors.city}
                />
                <Field
                  id="state"
                  label="State / Division"
                  value={customer.state}
                  onChange={(v) => setField("state", v)}
                  placeholder="Dhaka Division"
                  error={errors.state}
                />
                <Field
                  id="zip"
                  label="ZIP / Postal Code"
                  value={customer.zip}
                  onChange={(v) => setField("zip", v)}
                  placeholder="1000"
                  error={errors.zip}
                />
                <Field
                  id="country"
                  label="Country"
                  value={customer.country}
                  onChange={(v) => setField("country", v)}
                  placeholder="Bangladesh"
                />

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1.5"
                  >
                    Order Notes{" "}
                    <span className="text-slate-600 font-normal normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="description"
                    value={customer.description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Any special instructions for your order..."
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-slate-700/60 rounded-xl text-slate-100 placeholder-slate-600 text-sm outline-none resize-y transition-all duration-200 focus:bg-slate-800 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Step 2 — Shipping Method */}
            <SectionCard>
              <div className="flex items-center gap-3 mb-5">
                <StepBadge n={2} />
                <div>
                  <p className="text-base font-semibold text-slate-100">
                    Shipping Method
                  </p>
                  <p className="text-xs text-slate-500">
                    Choose your delivery speed
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <ShippingCard
                  method="free"
                  selected={shippingMethod === "free"}
                  label="Standard Shipping"
                  sub="7–20 business days"
                  price="Free"
                  onClick={() => setShippingMethod("free")}
                />
                <ShippingCard
                  method="express"
                  selected={shippingMethod === "express"}
                  label="Express Delivery"
                  sub="1–3 business days"
                  price="$9.00"
                  onClick={() => setShippingMethod("express")}
                />
              </div>
            </SectionCard>

            {/* Step 3 — Payment Method */}
            <SectionCard>
              <div className="flex items-center gap-3 mb-5">
                <StepBadge n={3} />
                <div>
                  <p className="text-base font-semibold text-slate-100">
                    Payment Method
                  </p>
                  <p className="text-xs text-slate-500">
                    How would you like to pay?
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <PaymentCard
                  method="ssl"
                  selected={paymentMethod === "ssl"}
                  label="Online Payment"
                  sub="SSLCommerz — card, mobile"
                  onClick={() => setPaymentMethod("ssl")}
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  }
                />
                <PaymentCard
                  method="cod"
                  selected={paymentMethod === "cod"}
                  label="Cash on Delivery"
                  sub="Pay when you receive"
                  onClick={() => setPaymentMethod("cod")}
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  }
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  256-bit SSL Encrypted
                </span>
                <span className="text-xs text-slate-500">
                  Your payment info is secure
                </span>
              </div>
            </SectionCard>
          </div>

          {/* ── RIGHT COLUMN — Order Summary ── */}
          <aside>
            <div className="bg-secondary border border-border rounded-2xl backdrop-blur-md p-6 lg:sticky lg:top-6">
              <p className="text-base font-semibold text-background mb-5">
                Order Summary
              </p>

              {/* Items */}
              <div>
                {!items?.length ? (
                  <div className="text-center py-8 text-background">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mx-auto mb-2"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <p className="text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  items.map((it) => {
                    const price = getItemPrice(it);
                    const name = getItemName(it);
                    const img = getItemImage(it);
                    return (
                      <div
                        key={getItemKey(it)}
                        className="flex items-center gap-3 py-3 border-b border-slate-800/60 last:border-0"
                      >
                        <div className="w-11 h-11 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center shrink-0 overflow-hidden">
                          {img ? (
                            <img
                              src={img}
                              alt={name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-base">📦</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">
                            {name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Qty: {it.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-amber-400 shrink-0">
                          ${(price * (it.quantity ?? 0)).toFixed(2)}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              <Divider />

              {/* Totals */}
              <div className="space-y-2.5 text-sm">
                {[
                  { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
                  {
                    label: `Shipping${shippingMethod === "express" ? " (Express)" : ""}`,
                    value: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`,
                  },
                  {
                    label: `Tax (${(taxRate * 100).toFixed(0)}%)`,
                    value: `$${tax.toFixed(2)}`,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-slate-300">{value}</span>
                  </div>
                ))}

                <Divider />

                <div className="flex justify-between items-baseline">
                  <span className="text-slate-100 font-bold">Total</span>
                  <span className="text-amber-400 font-bold text-2xl font-serif">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handlePay}
                  disabled={loading || !items?.length}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loading />
                      Processing…
                    </>
                  ) : paymentMethod === "cod" ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Place Order (COD)
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      Continue to Payment
                    </>
                  )}
                </button>

                <button
                  onClick={() => router.back()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm text-slate-400 border border-slate-700/60 rounded-xl hover:border-slate-600 hover:text-slate-300 transition-all duration-200"
                >
                  ← Continue Shopping
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-5 flex justify-center gap-6">
                {[
                  { icon: "🔒", label: "Secure" },
                  { icon: "↩", label: "Returns" },
                  { icon: "📦", label: "Tracked" },
                ].map(({ icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-base mb-1">{icon}</div>
                    <p className="text-xs text-slate-600 uppercase tracking-wider">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
