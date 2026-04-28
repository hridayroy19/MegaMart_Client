"use client"

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function PaymentError() {
  const search = useSearchParams()
  const message = search.get('message')
  const router = useRouter()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Error</h2>
      <div className="bg-card p-4 rounded">
        <p>{message || 'There was an error processing your payment.'}</p>
        <div className="mt-4 flex gap-2">
          <button onClick={() => router.push('/checkout')} className="btn btn-primary">Try Again</button>
          <button onClick={() => router.push('/')} className="btn">Home</button>
        </div>
      </div>
    </div>
  )
}
