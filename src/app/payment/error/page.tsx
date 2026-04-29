"use client"

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { XCircle, AlertCircle, RefreshCcw, Home, MessageCircle } from 'lucide-react'

export default function PaymentError() {
  const search = useSearchParams()
  const message = search.get('message')
  const tran_id = search.get('tran_id')
  const router = useRouter()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        
        .error-page {
          font-family: 'DM Sans', sans-serif;
          background: #0b0f18;
          background-image: 
            radial-gradient(circle at 0% 0%, rgba(239,68,68,0.05) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(99,102,241,0.03) 0%, transparent 40%);
          color: #e2e8f0;
        }
        .serif { font-family: 'DM Serif Display', serif; }
        .glass {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      <div className="error-page min-h-screen flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full"
        >
          <div className="glass rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full -z-10"></div>
            
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20"
            >
              <XCircle size={40} />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-red-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-3"
            >
              Transaction Unsuccessful
            </motion.p>

            <h1 className="serif text-4xl text-white mb-4">Payment <span className="italic text-red-500">Failed</span></h1>
            
            <p className="text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
              {message || "We encountered an issue while processing your payment. No funds were captured."}
            </p>

            {tran_id && (
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">
                <AlertCircle size={14} />
                Reference: <span className="text-slate-200 font-mono">{tran_id}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => router.push('/checkout')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-red-500/20"
              >
                <RefreshCcw size={18} />
                Try Again
              </button>
              
              <button 
                onClick={() => router.push('/')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-sm transition-all"
              >
                <Home size={18} />
                Back to Home
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                Still having trouble? 
                <button className="text-red-400 font-semibold flex items-center gap-1 hover:underline">
                  <MessageCircle size={14} />
                  Contact Support
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
