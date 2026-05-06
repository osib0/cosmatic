'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Package, LayoutDashboard, LogOut, Sparkles, RefreshCw, ChevronDown } from 'lucide-react';

interface Order {
  _id: string;
  userId: { name: string; email: string } | string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  pending:    { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  processing: { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  shipped:    { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  delivered:  { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
  cancelled:  { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
};

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data.orders);
    } catch { console.error('Failed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (!d.user || d.user.role !== 'admin') router.push('/admin/login');
      else fetchOrders();
    });
  }, [router, fetchOrders]);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const getUser = (userId: Order['userId']) => typeof userId === 'object' ? userId : { name: 'Unknown', email: '' };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col admin-sidebar hide-mobile">
        <div className="px-5 py-5" style={{ borderBottom: '1px solid #F0E8EA' }}>
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"><Sparkles size={16} className="text-white" /></div>
            <div>
              <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1A1219' }}>COSMATIC</p>
              <p style={{ color: '#A89AA1', fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif' }}>Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {[
            { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
            { label: 'Products', icon: Package, href: '/admin/products' },
            { label: 'Orders', icon: ShoppingBag, href: '/admin/orders', active: true },
          ].map(({ label, icon: Icon, href, active }) => (
            <Link key={label} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm"
              style={{ background: active ? '#FDF2F4' : 'transparent', color: active ? '#D4697E' : '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontWeight: active ? 600 : 400, border: active ? '1px solid #F2B3BF' : '1px solid transparent' }}>
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-3" style={{ borderTop: '1px solid #F0E8EA' }}>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left" style={{ color: '#DC2626', fontFamily: 'DM Sans, sans-serif' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between px-8 py-5 bg-white" style={{ borderBottom: '1px solid #F0E8EA' }}>
          <div>
            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#1A1219' }}>Orders</h1>
            <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>Manage and update customer orders</p>
          </div>
          <button onClick={fetchOrders} className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #F0E8EA' }}>
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto mb-3" style={{ borderColor: '#D4697E', borderTopColor: 'transparent' }} />
                <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-16 text-center">
                <ShoppingBag size={40} style={{ color: '#E5D5D9', margin: '0 auto 1rem' }} />
                <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif' }}>No orders yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {orders.map(order => {
                      const user = getUser(order.userId);
                      const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                      return (
                        <tr key={order._id}>
                          <td>
                            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#D4697E', letterSpacing: '0.05em' }}>
                              #{order._id.slice(-8).toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <p style={{ color: '#1A1219', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem' }}>{user.name}</p>
                            <p style={{ color: '#A89AA1', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>{user.email}</p>
                          </td>
                          <td><span style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem' }}>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span></td>
                          <td><span style={{ color: '#C9975A', fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700 }}>₹{order.totalAmount.toLocaleString()}</span></td>
                          <td>
                            <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : order.paymentStatus === 'failed' ? 'badge-error' : 'badge-warning'}`} style={{ textTransform: 'capitalize' }}>
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td>
                            <div className="relative inline-block">
                              <select
                                value={order.status}
                                onChange={e => updateStatus(order._id, e.target.value)}
                                className="appearance-none text-sm py-1.5 pl-2.5 pr-7 rounded-lg cursor-pointer transition-all"
                                style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.78rem', textTransform: 'capitalize' }}
                              >
                                {STATUSES.map(s => <option key={s} value={s} style={{ background: 'white', color: '#1A1219', textTransform: 'capitalize' }}>{s}</option>)}
                              </select>
                              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: sc.color }} />
                            </div>
                          </td>
                          <td><span style={{ color: '#A89AA1', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
