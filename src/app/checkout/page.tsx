"use client"

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { baseApi } from '@/config/axios'
import { useRouter } from 'next/navigation'
import { syncCartToServer, fetchCart } from '@/redux/features/cart/cartSlice'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const items = useSelector((s: RootState) => s.cart.items)
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // ensure we have server-side cart (with prices)
    dispatch(fetchCart() as any)
  }, [dispatch])

  const handlePay = async () => {
    if (!items || items.length === 0) {
      toast.error('Cart is empty')
      return
    }

    try {
      setLoading(true)
      // ensure server has latest items and server calculates prices
      await dispatch(syncCartToServer() as any).unwrap()
      const res = await baseApi.post('/payment/init')
      const { payment_url } = res.data.data
      window.location.href = payment_url
    } catch (err: any) {
      if (err?.response?.status === 401) return router.push('/login')
      toast.error(err?.response?.data?.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  const total = items.reduce((s: number, it: any) => {
    const price = it.priceAt || (it.product?.pricing?.salePrice ?? it.product?.pricing?.basePrice) || 0
    return s + (it.quantity || 0) * price
  }, 0)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="bg-card p-4 rounded mb-4">
        {(!items || items.length === 0) && <p>Your cart is empty</p>}
        {items.map((it: any) => (
          <div key={typeof it.product === 'string' ? it.product : it.product._id} className="flex justify-between py-2 border-b last:border-b-0">
            <div>
              <p className="font-medium">{it.product?.name || it.product}</p>
              <p className="text-sm text-muted">Qty: {it.quantity}</p>
            </div>
            <div className="text-right">
              <p>${(it.priceAt || (it.product?.pricing?.salePrice ?? it.product?.pricing?.basePrice) || 0).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold">Total (server-calculated on init)</p>
        <p className="font-bold">${total.toFixed(2)}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={handlePay} className="btn btn-primary" disabled={loading}>{loading ? 'Processing...' : 'Pay Now'}</button>
        <button onClick={() => router.back()} className="btn">Continue Shopping</button>
      </div>
    </div>
  )
}
