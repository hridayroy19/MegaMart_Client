"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Calendar, CreditCard, ChevronRight } from 'lucide-react'
import axios from 'axios'

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stat({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
      <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{label}</p>
        <p className="text-sm font-semibold text-slate-200">{value}</p>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PaymentSuccess() {
  const search = useSearchParams()
  const tran_id = search.get('tran_id')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!tran_id) {
      setLoading(false)
      return
    }
    
    // Using axios directly as in original, but could use baseApi if preferred
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/payment/verify/${tran_id}`)
      .then((res) => {
        setOrder(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Verification error:", err)
        setLoading(false)
      })
  }, [tran_id])

  if (!tran_id) {
    return (
      <div className="min-h-screen bg-[#0b0f18] flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Invalid Transaction</h1>
          <p className="text-slate-400 mb-6">We couldn't find a valid transaction ID in your request. Please check your email or contact support.</p>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        
        .success-page {
          font-family: 'DM Sans', sans-serif;
          background: #0b0f18;
          background-image: 
            radial-gradient(circle at 0% 0%, rgba(251,191,36,0.08) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(99,102,241,0.05) 0%, transparent 40%);
          color: #e2e8f0;
        }
        .serif { font-family: 'DM Serif Display', serif; }
        .glass {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      <div className="success-page min-h-screen pb-20 pt-10 md:pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-amber-400/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-8 text-slate-400 font-medium tracking-widest uppercase text-xs">Verifying your payment</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Header Section */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(251,191,36,0.2)]"
                  >
                    <CheckCircle2 size={48} className="text-slate-950" />
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs mb-3"
                  >
                    Payment Received Successfully
                  </motion.p>
                  
                  <h1 className="serif text-4xl md:text-6xl text-white mb-4">
                    Thank you for your <span className="italic text-amber-400">order</span>
                  </h1>
                  
                  <p className="text-slate-400 max-w-lg mx-auto">
                    We've received your payment and are currently processing your order. 
                    You'll receive a confirmation email shortly.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Order Summary Column */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Order Details Grid */}
                    <div className="glass rounded-3xl p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="serif text-2xl text-white">Order Details</h3>
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                          Verified
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Stat icon={CreditCard} label="Transaction ID" value={order?.transactionId || tran_id} />
                        <Stat icon={Calendar} label="Date" value={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
                        <Stat icon={Package} label="Payment Method" value="SSLCommerz" />
                        <Stat icon={ShoppingBag} label="Total Amount" value={`$${order?.total?.toFixed(2) || '0.00'}`} />
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="glass rounded-3xl p-8">
                      <h3 className="serif text-2xl text-white mb-6">Items Purchased</h3>
                      <div className="space-y-4">
                        {order?.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                            <div className="w-16 h-16 rounded-xl bg-white/5 flex-shrink-0 overflow-hidden border border-white/10">
                              {item.product?.images?.[0] ? (
                                <img src={item.product.images[0]} alt={item.product?.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                  <Package size={24} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-slate-200 line-clamp-1">{item.product?.name || "Product Item"}</h4>
                              <p className="text-xs text-slate-500 mt-1">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-amber-400">${((item.priceAt || 0) * (item.quantity || 1)).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="space-y-6">
                    <div className="glass rounded-3xl p-8 sticky top-8">
                      <h3 className="serif text-2xl text-white mb-6">What's Next?</h3>
                      
                      <div className="space-y-6 mb-10">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-200">Processing</p>
                            <p className="text-xs text-slate-500 mt-1">Our warehouse team is preparing your items for shipment.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-400">Shipping</p>
                            <p className="text-xs text-slate-600 mt-1">You'll receive a tracking number via email once shipped.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button 
                          onClick={() => router.push('/dashboard')}
                          className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-400/20"
                        >
                          Track Your Order
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <button 
                          onClick={() => router.push('/')}
                          className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                          Continue Shopping
                        </button>
                      </div>

                      <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-xs text-slate-500">Need help? <button className="text-amber-400 font-semibold underline underline-offset-4">Contact Support</button></p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
