"use client"

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useGetMyOrdersQuery } from '@/redux/features/order/orderApi'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  CreditCard, 
  MapPin, 
  Calendar,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Components ──────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const configs: Record<string, { icon: any, color: string, bg: string, text: string }> = {
    'Pending': { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', text: 'Pending' },
    'Processing': { icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10', text: 'Processing' },
    'Shipped': { icon: Truck, color: 'text-purple-400', bg: 'bg-purple-400/10', text: 'Shipped' },
    'Delivered': { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', text: 'Delivered' },
    'Cancelled': { icon: CheckCircle, color: 'text-red-400', bg: 'bg-red-400/10', text: 'Cancelled' },
  }

  const config = configs[status] || configs['Pending']
  const Icon = config.icon

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.color} border border-${config.color.split('-')[1]}-500/20`}>
      <Icon size={14} className="animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-wider">{config.text}</span>
    </div>
  )
}

const OrderTracker = ({ status }: { status: string }) => {
  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered']
  const currentIndex = steps.indexOf(status)
  
  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-amber-400 -translate-y-1/2 transition-all duration-1000 ease-out" 
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, i) => {
          const isActive = i <= currentIndex
          const isCurrent = i === currentIndex
          const Icon = i === 0 ? Clock : i === 1 ? Package : i === 2 ? Truck : CheckCircle

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500
                ${isActive ? 'bg-amber-400 border-amber-400 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'bg-slate-800 border-slate-700 text-slate-500'}
                ${isCurrent ? 'scale-125' : 'scale-100'}
              `}>
                <Icon size={14} />
              </div>
              <span className={`absolute -bottom-6 text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, isAuthenticated, token } = useSelector((s: RootState) => s.auth)
  const { data: ordersResponse, isLoading } = useGetMyOrdersQuery(undefined)
  const orders = (ordersResponse as any) || []
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('orders')

  React.useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push('/login')
    }
  }, [isAuthenticated, token, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0f18] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0f18] text-slate-200 font-sans selection:bg-amber-400/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&display=swap');
        
        .dashboard-root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .heading-font { font-family: 'Outfit', sans-serif; }
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(51, 65, 85, 0.4);
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
        }
        .order-card:hover {
          border-color: rgba(251, 191, 36, 0.3);
          transform: translateY(-2px);
          background: rgba(15, 23, 42, 0.8);
        }
      `}</style>

      <div className="dashboard-root max-w-6xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="heading-font text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome back, <span className="text-amber-400">{user?.username}</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-md">
              Manage your orders, track deliveries, and view your shopping history in one place.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Spent</p>
              <p className="text-2xl font-bold text-white">${orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0).toFixed(2)}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20 overflow-hidden">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl font-bold text-amber-400 relative overflow-hidden">
                {user?.avatar ? (
                   <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                ) : (
                  user?.username?.[0]?.toUpperCase()
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: 'orders', label: 'Order History', icon: Package },
              { id: 'profile', label: 'Profile Settings', icon: CreditCard },
              { id: 'wishlist', label: 'My Wishlist', icon: Filter },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'bg-amber-400 text-slate-900 font-bold shadow-lg shadow-amber-400/20' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                  `}
                >
                  <Icon size={18} />
                  <span className="text-sm tracking-tight">{tab.label}</span>
                </button>
              )
            })}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-6">
            
            {activeTab === 'orders' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="heading-font text-xl font-bold text-white">Recent Orders</h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/50">
                    <Search size={12} />
                    <span>Search by Order ID</span>
                  </div>
                </div>

                {!orders.length && (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700/50">
                      <Package size={32} className="text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">No orders found</h3>
                    <p className="text-slate-400 text-sm mb-8">You haven&apos;t placed any orders yet. Start shopping to fill your history!</p>
                    <Link href="/shop" className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                      Go to Shop <ChevronRight size={16} />
                    </Link>
                  </div>
                )}

                {orders.map((order: any) => (
                  <div key={order._id} className="order-card glass-card rounded-2xl overflow-hidden transition-all duration-300">
                    
                    {/* Order Header */}
                    <div className="px-6 py-4 border-b border-slate-700/50 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-800 rounded-lg">
                          <Package size={20} className="text-amber-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Order ID</p>
                          <p className="text-sm font-mono font-bold text-white uppercase">{order.transactionId?.slice(0, 12)}...</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="hidden sm:block text-right">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Date Placed</p>
                          <p className="text-xs text-slate-300">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <StatusBadge status={order.orderStatus || 'Pending'} />
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="px-6 py-6 space-y-4">
                      {order.items?.map((item: any) => (
                        <div key={item._id} className="flex items-center gap-4 group">
                          <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0 relative">
                            {(item.product?.images?.[0] || item.product?.thumbnail) ? (
                              <Image 
                                src={item.product.images?.[0] || item.product.thumbnail} 
                                alt={item.product.name} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                              {item.product?.name || 'Product'}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">Quantity: <span className="text-slate-300">{item.quantity}</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-white">${(item.priceAt * item.quantity).toFixed(2)}</p>
                            <p className="text-[10px] text-slate-500">${item.priceAt} each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Section */}
                    <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-slate-400">Order Progress</p>
                        <p className="text-xs font-medium text-amber-400/80">Est. Arrival: 3-5 days</p>
                      </div>
                      <OrderTracker status={order.orderStatus || 'Pending'} />
                    </div>

                    {/* Footer Info */}
                    <div className="px-6 py-4 bg-slate-800/20 flex flex-wrap items-center justify-between gap-4">
                       <div className="flex items-center gap-4 text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <CreditCard size={14} className="text-slate-500" />
                            <span>{order.paymentStatus === 'Success' ? 'Paid' : 'Unpaid (COD/Pending)'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 border-l border-slate-700 pl-4">
                            <MapPin size={14} className="text-slate-500" />
                            <span className="truncate max-w-[120px]">{order.customer?.city || 'Address'}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Grand Total</p>
                            <p className="text-lg font-bold text-amber-400 heading-font">${order.total?.toFixed(2)}</p>
                          </div>
                          <button className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-colors">
                            <ExternalLink size={16} />
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'profile' && (
              <div className="glass-card rounded-2xl p-8 space-y-8">
                <div>
                  <h2 className="heading-font text-xl font-bold text-white mb-6">Profile Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Username</label>
                      <div className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-300">
                        {user?.username}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <div className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-300">
                        {user?.email}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role</label>
                      <div className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-300">
                        {user?.role || 'Customer'}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account Status</label>
                      <div className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-emerald-400 font-bold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-700/50">
                   <h3 className="text-sm font-bold text-white mb-4">Security</h3>
                   <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 transition-all">
                     Change Password
                   </button>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="glass-card rounded-2xl p-20 text-center text-slate-500">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg font-bold text-white">Your Wishlist</p>
                <p className="text-sm">You haven't added any items to your wishlist yet.</p>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  )
}
