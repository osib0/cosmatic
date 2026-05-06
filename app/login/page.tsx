'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function LoginPage() {
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
      router.push(data.user?.role === 'admin' ? '/admin/dashboard' : '/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const perks = ['Exclusive member discounts', 'Early access to new arrivals', 'Free shipping on orders ₹999+', 'Easy order tracking'];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FDF2F4 0%, #FFF8F2 100%)', borderRight: '1px solid #F0E8EA' }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #D4697E, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #C9975A, transparent)', transform: 'translate(-30%, 30%)' }} />

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center gradient-primary">
            <Sparkles size={20} className="text-white" />
          </div>
          <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.06em', color: '#1A1219' }}>COSMATIC</span>
        </Link>

        <div className="relative z-10">
          <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#1A1219', marginBottom: '1rem', lineHeight: 1.3 }}>
            Premium Beauty<br />
            <span className="text-gradient">Awaits You</span>
          </h2>
          <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.8, marginBottom: '2rem' }}>
            Sign in to access your beauty dashboard, track orders, and shop exclusive deals.
          </p>
          <div className="space-y-3">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FDF2F4', border: '1px solid #F2B3BF' }}>
                  <Check size={11} style={{ color: '#D4697E' }} />
                </div>
                <span style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 relative z-10">
          {[{ value: '500+', label: 'Products' }, { value: '50K+', label: 'Customers' }, { value: '4.8★', label: 'Rating' }].map(s => (
            <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(212,105,126,0.06)', border: '1px solid rgba(212,105,126,0.1)' }}>
              <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#D4697E' }}>{s.value}</p>
              <p style={{ color: '#A89AA1', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md animate-fadeInUp">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center gradient-primary">
                <Sparkles size={20} className="text-white" />
              </div>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#1A1219' }}>COSMATIC</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.875rem', fontWeight: 700, color: '#1A1219', marginBottom: '0.4rem' }}>Welcome back</h1>
            <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif' }}>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl text-sm" style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontFamily: 'DM Sans, sans-serif' }}>
                {error}
              </div>
            )}

            <div>
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="form-input" placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#A89AA1' }}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full" style={{ justifyContent: 'center', opacity: loading ? 0.75 : 1 }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">Sign In <ArrowRight size={15} /></span>
              )}
            </button>
          </form>

          <div className="divider-text my-6">or</div>

          <p style={{ textAlign: 'center', color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: '#D4697E', fontWeight: 600 }}>Create one</Link>
          </p>

          <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid #F0E8EA' }}>
            <Link href="/admin/login" style={{ color: '#A89AA1', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>
              Admin? Login here →
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link href="/" style={{ color: '#A89AA1', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>← Back to Store</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
