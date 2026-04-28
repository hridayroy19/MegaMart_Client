"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'

export default function PaymentSuccess() {
  const search = useSearchParams()
  const tran_id = search.get('tran_id')
  const [order, setOrder] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (!tran_id) return
    axios.get(`/api/v1/payment/verify/${tran_id}`).then((res) => setOrder(res.data.data)).catch(() => {})
  }, [tran_id])

  if (!tran_id) return <div className="p-6">Missing transaction id</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Successful</h2>
      {order ? (
        <div className="bg-card p-4 rounded">
          <p>Transaction: {order.transactionId}</p>
          <p>Status: {order.paymentStatus}</p>
          <p>Total: ${order.total}</p>
          <button onClick={() => router.push('/dashboard')} className="btn btn-primary mt-4">Go to Dashboard</button>
        </div>
      ) : (
        <p>Loading order...</p>
      )}
    </div>
  )
}
