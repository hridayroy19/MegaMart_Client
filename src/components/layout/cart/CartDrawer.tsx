/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeItem,
  syncCartToServer,
  fetchCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) dispatch(fetchCart() as any);
  }, [open, dispatch]);

  const handleDelete = async (productId: string) => {
    dispatch(removeItem(productId));
    try {
      await dispatch(syncCartToServer() as any).unwrap();
      toast.error("Removed from Cart");
    } catch (err) {
      toast.error("Could not sync cart");
    }
  };

  const changeQty = async (productId: string, qty: number) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ productId, quantity: qty }));
    try {
      await dispatch(syncCartToServer() as any).unwrap();
    } catch (err) {
      toast.error("Could not update quantity");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Your Cart</h3>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="space-y-3">
        {items?.length === 0 && (
          <p className="text-sm text-gray-500">Cart is empty</p>
        )}
        {items?.map((it: any) => (
          <div
            key={typeof it.product === "string" ? it.product : it.product._id}
            className="flex items-start justify-between"
          >
            <div>
              <p className="font-bold text-primary">
                {typeof it.product === "string"
                  ? it.product
                  : it.product.name.slice(0, 20) + "..."}
              </p>
              <p className="text-md mt-2 text-foreground">
                Price: $
                {(
                  it.priceAt ||
                  it.product?.pricing?.salePrice ||
                  it.product?.pricing?.basePrice ||
                  0
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-0.5 border rounded hover:bg-primary hover:text-secondary cursor-pointer"
                  onClick={() =>
                    changeQty(
                      typeof it.product === "string"
                        ? it.product
                        : it.product._id,
                      it.quantity - 1,
                    )
                  }
                >
                  -
                </button>
                <span>{it.quantity}</span>
                <button
                  className="px-2 py-0.5 border rounded hover:bg-primary hover:text-secondary cursor-pointer"
                  onClick={() =>
                    changeQty(
                      typeof it.product === "string"
                        ? it.product
                        : it.product._id,
                      it.quantity + 1,
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                className="text-xs text-danger hover:border rounded-lg hover:text-background border-red-500 px-2 py-1 hover:bg-red-500  cursor-pointer mt-2"
                onClick={() =>
                  handleDelete(
                    typeof it.product === "string"
                      ? it.product
                      : it.product._id,
                  )
                }
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <a
          href="/checkout"
          className="w-full block text-center bg-primary text-foreground py-2 rounded"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
