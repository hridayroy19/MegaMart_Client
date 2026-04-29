"use client"

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { baseApi } from '@/config/axios'
import { useRouter } from 'next/navigation'
import { syncCartToServer, fetchCart } from '@/redux/features/cart/cartSlice'
import { useCreateCodOrderMutation } from '@/redux/features/order/orderApi'
import toast from 'react-hot-toast'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  description: string
}

type PaymentMethod = 'ssl' | 'cod'
type ShippingMethod = 'free' | 'express'

const INITIAL_CUSTOMER: CustomerForm = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
  country: 'Bangladesh', description: '',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getItemPrice(it: any): number {
  return it.priceAt ?? it.product?.pricing?.salePrice ?? it.product?.pricing?.basePrice ?? 0
}

function getItemKey(it: any): string {
  return typeof it.product === 'string' ? it.product : it.product?._id ?? Math.random().toString()
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  label, id, type = 'text', value, onChange, placeholder, error, colSpan,
}: {
  label: string; id: string; type?: string; value: string
  onChange: (v: string) => void; placeholder?: string; error?: string; colSpan?: boolean
}) {
  return (
    <div className={colSpan ? 'md:col-span-2' : ''}>
      <label htmlFor={id} className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`
          w-full px-4 py-3 bg-slate-800/60 border rounded-lg text-slate-100 placeholder-slate-500
          text-sm transition-all duration-200 outline-none
          focus:bg-slate-800 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20
          ${error ? 'border-red-400/60 bg-red-900/10' : 'border-slate-700/60'}
        `}
      />
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
            <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

function ShippingCard({
  method, selected, label, sub, price, onClick,
}: {
  method: ShippingMethod; selected: boolean; label: string; sub: string; price: string; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 p-4 rounded-xl border-2 text-left transition-all duration-200 group
        ${selected
          ? 'border-amber-400/70 bg-amber-400/8 shadow-lg shadow-amber-400/10'
          : 'border-slate-700/60 bg-slate-800/40 hover:border-slate-600'}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`font-semibold text-sm ${selected ? 'text-amber-300' : 'text-slate-300'}`}>{label}</p>
          <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-sm font-bold ${selected ? 'text-amber-400' : 'text-slate-400'}`}>{price}</span>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
            ${selected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
            {selected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
          </div>
        </div>
      </div>
    </button>
  )
}

function PaymentMethodCard({
  method, selected, icon, label, sub, onClick,
}: {
  method: PaymentMethod; selected: boolean; icon: React.ReactNode; label: string; sub: string; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1 p-4 rounded-xl border-2 text-left transition-all duration-200
        ${selected
          ? 'border-amber-400/70 bg-amber-400/8 shadow-lg shadow-amber-400/10'
          : 'border-slate-700/60 bg-slate-800/40 hover:border-slate-600'}
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
          ${selected ? 'bg-amber-400/15 text-amber-400' : 'bg-slate-700/60 text-slate-400'}`}>
          {icon}
        </div>
        <div>
          <p className={`font-semibold text-sm ${selected ? 'text-amber-300' : 'text-slate-300'}`}>{label}</p>
          <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
        </div>
        <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
          ${selected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
          {selected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
        </div>
      </div>
    </button>
  )
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(c: CustomerForm): Record<string, string> {
  const e: Record<string, string> = {}
  if (!c.firstName.trim()) e.firstName = 'First name is required'
  if (!c.lastName.trim()) e.lastName = 'Last name is required'
  if (!c.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) e.email = 'Valid email required'
  if (!c.phone || c.phone.replace(/\D/g, '').length < 6) e.phone = 'Valid phone required'
  if (!c.address.trim()) e.address = 'Address is required'
  if (!c.city.trim()) e.city = 'City is required'
  if (!c.state.trim()) e.state = 'State is required'
  if (!c.zip.trim()) e.zip = 'ZIP code is required'
  return e
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [createCodOrder] = useCreateCodOrderMutation()
  const items = useSelector((s: RootState) => s.cart.items)
  const router = useRouter()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [customer, setCustomer] = useState<CustomerForm>(INITIAL_CUSTOMER)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ssl')
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('free')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { isAuthenticated } = useSelector((s: RootState) => s.auth)

  useEffect(() => {
    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    
    // If not in Redux and no token in localStorage, redirect
    if (!isAuthenticated && !token) {
      toast.error('Please log in to proceed with checkout')
      router.push('/login')
      return
    }
    
    setIsAuthChecked(true)
  }, [router, isAuthenticated])

  useEffect(() => {
    dispatch(fetchCart() as any)
  }, [dispatch])

  const setField = useCallback(<K extends keyof CustomerForm>(key: K, value: string) => {
    setCustomer((prev) => ({ ...prev, [key]: value }))
    // Clear error on change
    if (errors[key]) setErrors((prev) => { const next = { ...prev }; delete next[key]; return next })
  }, [errors])

  const subtotal = useMemo(() =>
    items.reduce((s: number, it: any) => s + getItemPrice(it) * (it.quantity || 0), 0),
  [items])

  const shipping = shippingMethod === 'express' ? 9 : 0
  const taxRate = 0.05
  const tax = +(subtotal * taxRate).toFixed(2)
  const total = +(subtotal + shipping + tax).toFixed(2)

  const handlePay = async () => {
    if (!items?.length) { toast.error('Your cart is empty'); return }

    const errs = validate(customer)
    if (Object.keys(errs).length) {
      setErrors(errs)
      toast.error('Please complete all required fields')
      // Scroll to first error
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
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
    }

    try {
      setLoading(true)
      await dispatch(syncCartToServer() as any).unwrap()

      if (paymentMethod === 'cod') {
        await createCodOrder({ 
          customer: customerPayload,
          shippingMethod,
          shippingFee: shipping
        }).unwrap()
        toast.success('Order placed! Cash on delivery confirmed.')
        router.push('/dashboard')
        return
      }

      const { data } = await baseApi.post('/payment/init', { customer: customerPayload })
      const paymentUrl = data?.data?.payment_url
      if (!paymentUrl) throw new Error('No payment URL returned')
      window.location.href = paymentUrl
    } catch (err: any) {
      if (err?.response?.status === 401) { router.push('/login'); return }
      toast.error(err?.response?.data?.message ?? err?.message ?? 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .checkout-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0b0f18;
          background-image:
            radial-gradient(ellipse 80% 50% at 20% 0%, rgba(251,191,36,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(99,102,241,0.05) 0%, transparent 50%);
          color: #e2e8f0;
          padding: 2.5rem 1rem 5rem;
        }
        .checkout-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          color: #f8fafc;
          letter-spacing: -0.02em;
        }
        .checkout-title em {
          font-style: italic;
          color: #fbbf24;
        }
        .section-card {
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(51,65,85,0.5);
          border-radius: 1.25rem;
          backdrop-filter: blur(12px);
          padding: 2rem;
        }
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: #f1f5f9;
          letter-spacing: 0.01em;
          margin-bottom: 0.25rem;
        }
        .section-subtitle {
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 1.5rem;
        }
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(51,65,85,0.6), transparent);
          margin: 1.5rem 0;
        }
        .step-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          background: rgba(251,191,36,0.15);
          border: 1px solid rgba(251,191,36,0.3);
          color: #fbbf24;
          font-size: 0.7rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .cta-btn {
          width: 100%;
          padding: 1rem;
          border-radius: 0.875rem;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.03em;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          border: none;
        }
        .cta-primary {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #1c1917;
          box-shadow: 0 4px 20px rgba(245,158,11,0.25);
        }
        .cta-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(245,158,11,0.35);
        }
        .cta-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cta-secondary {
          background: transparent;
          border: 1px solid rgba(51,65,85,0.7) !important;
          color: #94a3b8;
        }
        .cta-secondary:hover {
          border-color: rgba(100,116,139,0.9) !important;
          color: #cbd5e1;
        }
        .order-item-row {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 0;
          border-bottom: 1px solid rgba(51,65,85,0.3);
        }
        .order-item-row:last-child { border-bottom: none; }
        .item-avatar {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 0.5rem;
          background: rgba(51,65,85,0.5);
          border: 1px solid rgba(51,65,85,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1rem;
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(28,25,23,0.3);
          border-top-color: #1c1917;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .badge-ssl {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 2rem;
          padding: 0.3rem 0.75rem;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #34d399;
          text-transform: uppercase;
        }
        textarea.checkout-textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(30,41,59,0.6);
          border: 1px solid rgba(51,65,85,0.6);
          border-radius: 0.5rem;
          color: #e2e8f0;
          font-size: 0.875rem;
          font-family: inherit;
          resize: vertical;
          height: 7rem;
          outline: none;
          transition: all 0.2s;
        }
        textarea.checkout-textarea:focus {
          background: rgba(30,41,59,0.9);
          border-color: rgba(251,191,36,0.6);
          box-shadow: 0 0 0 2px rgba(251,191,36,0.2);
        }
        textarea.checkout-textarea::placeholder { color: #475569; }
      `}</style>

      <div className="checkout-root">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {!isAuthChecked && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '1rem', color: '#cbd5e1' }}>Checking authentication...</div>
            </div>
          )}

          {isAuthChecked && (
          <>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>
              Secure Checkout
            </p>
            <h1 className="checkout-title">Complete your <em>order</em></h1>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {['Cart', 'Checkout', 'Confirmation'].map((step, i) => (
              <React.Fragment key={step}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '1.5rem', height: '1.5rem', borderRadius: '50%', fontSize: '0.65rem',
                    fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: i === 1 ? '#fbbf24' : i < 1 ? 'rgba(251,191,36,0.2)' : 'rgba(51,65,85,0.4)',
                    color: i === 1 ? '#1c1917' : i < 1 ? '#fbbf24' : '#64748b',
                  }}>{i + 1}</div>
                  <span style={{ fontSize: '0.75rem', color: i === 1 ? '#e2e8f0' : '#64748b', fontWeight: i === 1 ? 600 : 400 }}>{step}</span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: '1px', background: 'rgba(51,65,85,0.5)' }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}
            className="checkout-grid">
            <style>{`@media(min-width:1024px){.checkout-grid{grid-template-columns:1fr 380px!important}}`}</style>

            {/* ── Left Column ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Shipping & Contact */}
              <div className="section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span className="step-badge">1</span>
                  <div>
                    <p className="section-title">Shipping & Contact</p>
                    <p className="section-subtitle">Where should we send your order?</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                  className="form-grid">
                  <style>{`@media(max-width:640px){.form-grid{grid-template-columns:1fr!important}}`}</style>

                  <Field id="firstName" label="First Name" value={customer.firstName} onChange={(v) => setField('firstName', v)} placeholder="John" error={errors.firstName} />
                  <Field id="lastName" label="Last Name" value={customer.lastName} onChange={(v) => setField('lastName', v)} placeholder="Doe" error={errors.lastName} />
                  <Field id="email" label="Email Address" type="email" value={customer.email} onChange={(v) => setField('email', v)} placeholder="john@example.com" error={errors.email} />
                  <Field id="phone" label="Phone Number" type="tel" value={customer.phone} onChange={(v) => setField('phone', v)} placeholder="+880 1700 000000" error={errors.phone} />
                  <Field id="address" label="Street Address" value={customer.address} onChange={(v) => setField('address', v)} placeholder="123 Main Street" error={errors.address} colSpan />
                  <Field id="city" label="City" value={customer.city} onChange={(v) => setField('city', v)} placeholder="Dhaka" error={errors.city} />
                  <Field id="state" label="State / Division" value={customer.state} onChange={(v) => setField('state', v)} placeholder="Dhaka Division" error={errors.state} />
                  <Field id="zip" label="ZIP / Postal Code" value={customer.zip} onChange={(v) => setField('zip', v)} placeholder="1000" error={errors.zip} />
                  <Field id="country" label="Country" value={customer.country} onChange={(v) => setField('country', v)} placeholder="Bangladesh" />

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="description" className="block" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.375rem' }}>
                      Order Notes <span style={{ color: '#475569', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      id="description"
                      className="checkout-textarea"
                      value={customer.description}
                      onChange={(e) => setField('description', e.target.value)}
                      placeholder="Any special instructions for your order..."
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <span className="step-badge">2</span>
                  <div>
                    <p className="section-title">Shipping Method</p>
                    <p className="section-subtitle" style={{ marginBottom: 0 }}>Choose your delivery speed</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.875rem' }} className="ship-flex">
                  <style>{`@media(max-width:520px){.ship-flex{flex-direction:column!important}}`}</style>
                  <ShippingCard method="free" selected={shippingMethod === 'free'} label="Standard Shipping" sub="7–20 business days" price="Free" onClick={() => setShippingMethod('free')} />
                  <ShippingCard method="express" selected={shippingMethod === 'express'} label="Express Delivery" sub="1–3 business days" price="$9.00" onClick={() => setShippingMethod('express')} />
                </div>
              </div>

              {/* Payment Method */}
              <div className="section-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <span className="step-badge">3</span>
                  <div>
                    <p className="section-title">Payment Method</p>
                    <p className="section-subtitle" style={{ marginBottom: 0 }}>How would you like to pay?</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.875rem' }} className="pay-flex">
                  <style>{`@media(max-width:520px){.pay-flex{flex-direction:column!important}}`}</style>
                  <PaymentMethodCard
                    method="ssl"
                    selected={paymentMethod === 'ssl'}
                    label="Online Payment"
                    sub="SSLCommerz — card, mobile"
                    onClick={() => setPaymentMethod('ssl')}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                      </svg>
                    }
                  />
                  <PaymentMethodCard
                    method="cod"
                    selected={paymentMethod === 'cod'}
                    label="Cash on Delivery"
                    sub="Pay when you receive"
                    onClick={() => setPaymentMethod('cod')}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                      </svg>
                    }
                  />
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge-ssl">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    256-bit SSL Encrypted
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#475569' }}>Your payment info is secure</span>
                </div>
              </div>
            </div>

            {/* ── Right Column: Order Summary ── */}
            <aside>
              <div className="section-card" style={{ position: 'sticky', top: '1.5rem' }}>
                <p className="section-title" style={{ marginBottom: '1.25rem' }}>Order Summary</p>

                {/* Items */}
                <div>
                  {!items?.length && (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: '#475569' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 0.5rem' }}>
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                      </svg>
                      <p style={{ fontSize: '0.8rem' }}>Your cart is empty</p>
                    </div>
                  )}
                  {items?.map((it: any) => {
                    const price = getItemPrice(it)
                    const name = it.product?.name ?? (typeof it.product === 'string' ? 'Product' : 'Product')
                    return (
                      <div className="order-item-row" key={getItemKey(it)}>
                        <div className="item-avatar">
                          {it.product?.images?.[0]
                            ? <img src={it.product.images[0]} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} />
                            : <span>📦</span>
                          }
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</p>
                          <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem' }}>Qty: {it.quantity}</p>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fbbf24', flexShrink: 0 }}>
                          ${(price * (it.quantity || 0)).toFixed(2)}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="divider" />

                {/* Totals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
                  {[
                    { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                    { label: `Shipping${shippingMethod === 'express' ? ' (Express)' : ''}`, value: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` },
                    { label: `Tax (${(taxRate * 100).toFixed(0)}%)`, value: `$${tax.toFixed(2)}` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>{label}</span>
                      <span style={{ color: '#cbd5e1' }}>{value}</span>
                    </div>
                  ))}

                  <div className="divider" style={{ margin: '0.5rem 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9' }}>Total</span>
                    <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#fbbf24', fontFamily: "'DM Serif Display', serif" }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    onClick={handlePay}
                    disabled={loading || !items?.length}
                    className="cta-btn cta-primary"
                  >
                    {loading ? (
                      <><div className="spinner" /> Processing…</>
                    ) : paymentMethod === 'cod' ? (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Place Order (COD)</>
                    ) : (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> Continue to Payment</>
                    )}
                  </button>

                  <button onClick={() => router.back()} className="cta-btn cta-secondary" style={{ border: '1px solid rgba(51,65,85,0.7)' }}>
                    ← Continue Shopping
                  </button>
                </div>

                {/* Trust badges */}
                <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
                  {[
                    { icon: '🔒', label: 'Secure' },
                    { icon: '↩', label: 'Returns' },
                    { icon: '📦', label: 'Tracked' },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{icon}</div>
                      <p style={{ fontSize: '0.6rem', color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

          </div>
          </>
          )}
        </div>
      </div>
    </>
  )
}