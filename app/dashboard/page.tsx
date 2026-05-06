'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Heart, MapPin, User, Settings,
  LogOut, Sparkles, Package, ChevronRight, ArrowUpRight
} from 'lucide-react';

interface UserInfo { name: string; email: string; role: string; }
interface Order {
  _id: string;
  items: { name: string; quantity: number; price: number; image?: string }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  pending:    { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  processing: { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  shipped:    { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  delivered:  { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
  cancelled:  { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<UserInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) { router.push('/login?redirect=/dashboard'); return; }
      const data = await res.json();
      if (data.user?.role === 'admin') { router.push('/admin/dashboard'); return; }
      setUser(data.user);
    } catch { router.push('/login'); }
    finally { setLoading(false); }
  }, [router]);

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) { const data = await res.json(); setOrders(data.orders ?? []); }
    } catch { console.error('Failed to load orders'); }
    finally { setOrdersLoading(false); }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);
  useEffect(() => { if (activeTab === 'orders' || activeTab === 'overview') loadOrders(); }, [activeTab, loadOrders]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3 animate-float">
          <Sparkles size={22} className="text-white" />
        </div>
        <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif' }}>Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white" style={{ borderBottom: '1px solid #F0E8EA' }}>
        <div className="section-container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center"><Sparkles size={14} className="text-white" /></div>
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219', letterSpacing: '0.05em' }}>COSMATIC</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/products" className="btn-ghost" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Shop</Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm" style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif' }}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="section-container py-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl p-6 mb-6 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #FDF2F4, #FFF8F2)', border: '1px solid #F2B3BF' }}>
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#1A1219', marginBottom: '0.2rem' }}>
              Welcome back, {user?.name?.split(' ')[0]}!
            </p>
            <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>{user?.email}</p>
          </div>
          <span className="badge badge-primary">Member</span>
        </div>

        <div className="flex gap-7">
          {/* Sidebar */}
          <aside className="w-52 flex-shrink-0 hide-mobile">
            <nav className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F0E8EA' }}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-all text-left"
                  style={{
                    background: activeTab === id ? '#FDF2F4' : 'transparent',
                    color: activeTab === id ? '#D4697E' : '#6B5E65',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: activeTab === id ? 600 : 400,
                    borderRight: activeTab === id ? '3px solid #D4697E' : '3px solid transparent',
                  }}
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile Tab Bar */}
          <div className="mb-5 hide-desktop overflow-x-auto w-full">
            <div className="flex gap-2 pb-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap flex-shrink-0"
                  style={{ background: activeTab === id ? '#FDF2F4' : '#FAFAFA', color: activeTab === id ? '#D4697E' : '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontWeight: activeTab === id ? 600 : 400, border: activeTab === id ? '1px solid #F2B3BF' : '1px solid #F0E8EA' }}>
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-5 animate-fadeInUp">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Orders', value: orders.length, color: '#D4697E', bg: '#FDF2F4', icon: ShoppingBag },
                    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#16A34A', bg: '#F0FDF4', icon: Package },
                    { label: 'Total Spent', value: `₹${orders.reduce((s, o) => s + o.totalAmount, 0).toLocaleString()}`, color: '#C9975A', bg: '#FDF8F2', icon: ArrowUpRight },
                  ].map(({ label, value, color, bg, icon: Icon }) => (
                    <div key={label} className="bg-white rounded-2xl p-5" style={{ border: '1px solid #F0E8EA' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ background: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.75rem', fontWeight: 700, color }}>{value}</p>
                      <p style={{ color: '#A89AA1', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F0E8EA' }}>
                  <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F0E8EA' }}>
                    <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1A1219' }}>Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} style={{ color: '#D4697E', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      View all <ChevronRight size={13} />
                    </button>
                  </div>
                  {ordersLoading ? (
                    <div className="p-8 text-center"><p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>Loading...</p></div>
                  ) : orders.length === 0 ? (
                    <div className="p-10 text-center">
                      <ShoppingBag size={32} style={{ color: '#E5D5D9', margin: '0 auto 0.75rem' }} />
                      <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', marginBottom: '1rem' }}>No orders yet</p>
                      <Link href="/products" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>Shop Now</Link>
                    </div>
                  ) : (
                    orders.slice(0, 3).map(order => {
                      const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                      return (
                        <div key={order._id} className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F8F2F4' }}>
                          <div>
                            <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#D4697E', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                              #{order._id.slice(-8).toUpperCase()}
                            </p>
                            <p style={{ color: '#6B5E65', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, color: '#C9975A' }}>₹{order.totalAmount.toLocaleString()}</span>
                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, fontFamily: 'DM Sans, sans-serif' }}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/products" className="flex items-center gap-4 p-4 bg-white rounded-2xl transition-all"
                    style={{ border: '1px solid #F0E8EA' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F2B3BF'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(212,105,126,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F0E8EA'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FDF2F4' }}><Sparkles size={18} style={{ color: '#D4697E' }} /></div>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#1A1219' }}>Shop Products</p>
                      <p style={{ color: '#A89AA1', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>Browse 500+ premium items</p>
                    </div>
                    <ChevronRight size={15} style={{ color: '#A89AA1' }} />
                  </Link>
                  <button onClick={() => setActiveTab('profile')} className="flex items-center gap-4 p-4 bg-white rounded-2xl transition-all text-left w-full"
                    style={{ border: '1px solid #F0E8EA' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F2B3BF'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(212,105,126,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F0E8EA'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FDF8F2' }}><User size={18} style={{ color: '#C9975A' }} /></div>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#1A1219' }}>Edit Profile</p>
                      <p style={{ color: '#A89AA1', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>Update your information</p>
                    </div>
                    <ChevronRight size={15} style={{ color: '#A89AA1' }} />
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="animate-fadeInUp">
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F0E8EA' }}>
                  <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0E8EA', background: '#FAFAFA' }}>
                    <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1A1219' }}>Order History</h3>
                  </div>
                  {ordersLoading ? (
                    <div className="p-10 text-center"><p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>Loading orders...</p></div>
                  ) : orders.length === 0 ? (
                    <div className="p-16 text-center">
                      <ShoppingBag size={40} style={{ color: '#E5D5D9', margin: '0 auto 1rem' }} />
                      <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', marginBottom: '1rem' }}>No orders yet</p>
                      <Link href="/products" className="btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}>Start Shopping</Link>
                    </div>
                  ) : (
                    <div className="divide-y" style={{ borderColor: '#F8F2F4' }}>
                      {orders.map(order => {
                        const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                        return (
                          <div key={order._id} className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#D4697E', letterSpacing: '0.05em' }}>
                                  Order #{order._id.slice(-8).toUpperCase()}
                                </p>
                                <p style={{ color: '#A89AA1', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif', marginTop: '0.15rem' }}>
                                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                              </div>
                              <div className="text-right">
                                <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, color: '#C9975A', marginBottom: '0.3rem' }}>₹{order.totalAmount.toLocaleString()}</p>
                                <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, fontFamily: 'DM Sans, sans-serif' }}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <span style={{ color: '#6B5E65', fontSize: '0.825rem', fontFamily: 'DM Sans, sans-serif' }}>
                                    {item.name} × {item.quantity}
                                  </span>
                                  <span style={{ color: '#A89AA1', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="animate-fadeInUp bg-white rounded-2xl p-8 text-center" style={{ border: '1px solid #F0E8EA' }}>
                <Heart size={40} style={{ color: '#F2B3BF', margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219', marginBottom: '0.5rem' }}>Your Wishlist</h3>
                <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Save your favorite products here</p>
                <Link href="/products" className="btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}>Browse Products</Link>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="animate-fadeInUp bg-white rounded-2xl p-8 text-center" style={{ border: '1px solid #F0E8EA' }}>
                <MapPin size={40} style={{ color: '#F2B3BF', margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219', marginBottom: '0.5rem' }}>Saved Addresses</h3>
                <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Add addresses for faster checkout</p>
                <button className="btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}>Add Address</button>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="animate-fadeInUp bg-white rounded-2xl p-6" style={{ border: '1px solid #F0E8EA' }}>
                <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219', marginBottom: '1.5rem' }}>Profile Information</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input className="form-input" defaultValue={user?.name} />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input className="form-input" defaultValue={user?.email} type="email" />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" placeholder="+91 98765 43210" type="tel" />
                  </div>
                  <button className="btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}>Save Changes</button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="animate-fadeInUp space-y-4">
                <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #F0E8EA' }}>
                  <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1A1219', marginBottom: '1rem' }}>Notifications</h3>
                  {['Order updates', 'Promotions & offers', 'Newsletter'].map(n => (
                    <label key={n} className="flex items-center justify-between py-3 cursor-pointer" style={{ borderBottom: '1px solid #F8F2F4' }}>
                      <span style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>{n}</span>
                      <div className="w-10 h-6 rounded-full relative" style={{ background: '#D4697E' }}>
                        <div className="absolute w-4 h-4 rounded-full bg-white top-1 right-1 shadow-sm" />
                      </div>
                    </label>
                  ))}
                </div>
                <button onClick={handleLogout} className="btn-ghost w-full flex items-center justify-center gap-2" style={{ color: '#DC2626', borderColor: '#FECACA', padding: '0.75rem' }}>
                  <LogOut size={16} /> Sign Out of Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
