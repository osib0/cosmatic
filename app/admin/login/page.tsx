'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, ArrowRight, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Login failed'); return; }
      if (data.user?.role !== 'admin') {
        await fetch('/api/auth/logout', { method: 'POST' });
        setError('Access denied. Admin credentials required.');
        return;
      }
      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#FAFAFA' }}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#F0E8EA 1px, transparent 1px), linear-gradient(90deg, #F0E8EA 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative w-full max-w-md animate-scaleIn">
        <div className="bg-white rounded-2xl p-10" style={{ border: '1px solid #F0E8EA', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FDF2F4, #FFF8F2)', border: '1.5px solid #F2B3BF' }}>
              <Shield size={28} style={{ color: '#D4697E' }} />
            </div>
            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#1A1219', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Admin Portal</h1>
            <p style={{ color: '#A89AA1', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>Restricted access — administrators only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl text-sm" style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontFamily: 'DM Sans, sans-serif' }}>
                {error}
              </div>
            )}

            <div>
              <label className="form-label">Admin Email</label>
              <input type="email" className="form-input" placeholder="admin@cosmatic.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="form-input" placeholder="Admin password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#A89AA1' }}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full" style={{ justifyContent: 'center', opacity: loading ? 0.75 : 1 }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2"><Shield size={15} /> Access Panel <ArrowRight size={15} /></span>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1 mt-5" style={{ color: '#16A34A', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>
            <Lock size={12} /> Secure admin login
          </div>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid #F0E8EA' }}>
            <Link href="/login" style={{ color: '#A89AA1', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>← Back to User Login</Link>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl text-center text-xs" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E', fontFamily: 'DM Sans, sans-serif' }}>
          💡 Visit <code style={{ color: '#D97706' }}>/api/seed</code> to create the default admin account
        </div>
      </div>
    </div>
  );
}
