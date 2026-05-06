'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, TrendingUp, Users, LogOut, Sparkles, ArrowUpRight, RefreshCw, ExternalLink } from 'lucide-react';

interface Stats { totalProducts: number; totalOrders: number; totalUsers: number; totalRevenue: number; }

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, statsRes] = await Promise.all([fetch('/api/auth/me'), fetch('/api/admin/stats')]);
      if (!meRes.ok) { router.push('/admin/login'); return; }
      const meData = await meRes.json();
      if (meData.user?.role !== 'admin') { router.push('/admin/login'); return; }
      setAdminName(meData.user.name);
      if (statsRes.ok) setStats(await statsRes.json());
    } catch { router.push('/admin/login'); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', active: true },
    { label: 'Products', icon: Package, href: '/admin/products' },
    { label: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
  ];

  const statCards = [
    { label: 'Total Products', value: stats?.totalProducts ?? 0, icon: Package, color: '#D4697E', bg: '#FDF2F4' },
    { label: 'Total Orders', value: stats?.totalOrders ?? 0, icon: ShoppingBag, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Customers', value: stats?.totalUsers ?? 0, icon: Users, color: '#16A34A', bg: '#F0FDF4' },
    { label: 'Revenue', value: `₹${((stats?.totalRevenue ?? 0) / 1000).toFixed(1)}K`, icon: TrendingUp, color: '#C9975A', bg: '#FDF8F2' },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3 animate-float">
          <Sparkles size={22} className="text-white" />
        </div>
        <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif' }}>Loading admin panel...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col admin-sidebar hide-mobile">
        <div className="px-5 py-5" style={{ borderBottom: '1px solid #F0E8EA' }}>
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1A1219', letterSpacing: '0.05em' }}>COSMATIC</p>
              <p style={{ color: '#A89AA1', fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif' }}>Admin Panel</p>
            </div>
          </Link>
        </div>

        <div className="px-4 py-3" style={{ borderBottom: '1px solid #F0E8EA' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: '#FDF2F4', border: '1px solid #F2B3BF' }}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-sm font-bold">
              {adminName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#1A1219', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{adminName}</p>
              <span className="badge badge-primary" style={{ fontSize: '0.6rem', padding: '0.1rem 0.45rem' }}>Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ label, icon: Icon, href, active }) => (
            <Link key={label} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm"
              style={{ background: active ? '#FDF2F4' : 'transparent', color: active ? '#D4697E' : '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontWeight: active ? 600 : 400, border: active ? '1px solid #F2B3BF' : '1px solid transparent' }}>
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 space-y-0.5" style={{ borderTop: '1px solid #F0E8EA' }}>
          <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm" style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif' }}>
            <ExternalLink size={16} /> View Store
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left" style={{ color: '#DC2626', fontFamily: 'DM Sans, sans-serif' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between px-8 py-5 bg-white" style={{ borderBottom: '1px solid #F0E8EA' }}>
          <div>
            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#1A1219' }}>Dashboard</h1>
            <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>Welcome back, {adminName}</p>
          </div>
          <button onClick={loadData} className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <div className="p-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8 stagger">
            {statCards.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="animate-fadeInUp bg-white rounded-2xl p-5" style={{ border: '1px solid #F0E8EA' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '2rem', fontWeight: 700, color, marginBottom: '0.2rem' }}>{value}</p>
                <p style={{ color: '#A89AA1', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #F0E8EA' }}>
              <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219', marginBottom: '1.25rem' }}>Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: 'Manage Products', icon: Package, href: '/admin/products', desc: 'Add, edit, delete products', color: '#D4697E', bg: '#FDF2F4' },
                  { label: 'View All Orders', icon: ShoppingBag, href: '/admin/orders', desc: 'Manage customer orders', color: '#2563EB', bg: '#EFF6FF' },
                ].map(({ label, icon: Icon, href, desc, color, bg }) => (
                  <Link key={label} href={href}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                    style={{ border: '1px solid #F0E8EA', background: '#FAFAFA' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFFFFF'; (e.currentTarget as HTMLElement).style.borderColor = '#E5D5D9'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAFA'; (e.currentTarget as HTMLElement).style.borderColor = '#F0E8EA'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#1A1219' }}>{label}</p>
                      <p style={{ color: '#A89AA1', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>{desc}</p>
                    </div>
                    <ArrowUpRight size={16} style={{ color: '#A89AA1' }} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #F0E8EA' }}>
              <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219', marginBottom: '1.25rem' }}>Setup & Tools</h3>
              <div className="p-4 rounded-xl mb-4" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <p style={{ color: '#6B5E65', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                  First time? Seed the database with sample products and create the admin account.
                </p>
                <div className="text-xs space-y-1 mb-3" style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B5E65' }}>
                  <p>📧 <code style={{ color: '#D97706' }}>admin@cosmatic.com</code></p>
                  <p>🔑 <code style={{ color: '#D97706' }}>admin123456</code></p>
                </div>
                <a href="/api/seed" target="_blank" className="btn-gold w-full text-center block" style={{ padding: '0.65rem', fontSize: '0.85rem', textDecoration: 'none', borderRadius: '8px' }}>
                  🌱 Run Database Seed
                </a>
              </div>
              <Link href="/" target="_blank" className="btn-ghost w-full text-center" style={{ padding: '0.65rem', fontSize: '0.85rem', justifyContent: 'center', display: 'flex', gap: '0.4rem' }}>
                <ExternalLink size={14} /> Preview Store
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
