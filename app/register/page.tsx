'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = () => {
    const p = form.password;
    if (p.length === 0) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthColors = ['#F87171', '#FBBF24', '#FBBF24', '#4ADE80', '#4ADE80'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Registration failed'); return; }
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordStrength();

  const perks = [
    'Exclusive member discounts',
    'Early access to new arrivals',
    'Free shipping on orders ₹999+',
    'Loyalty points & rewards',
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#0A0812' }}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, #12101E 0%, #1A1728 100%)' }}>
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #C9A96E, transparent)' }} />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #D4697E, transparent)' }} />

        <div className="relative z-10 max-w-sm animate-fadeInUp">
          <Link href="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4697E, #B84F65)' }}>
              <Sparkles size={24} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.5rem', fontWeight: 700 }} className="text-gradient">COSMATIC</span>
          </Link>

          <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Join the beauty revolution
          </h2>
          <p style={{ color: '#A89BB8', lineHeight: 1.8, fontFamily: 'DM Sans, sans-serif', marginBottom: '2rem' }}>
            Create your account and unlock a world of premium beauty products.
          </p>

          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,105,126,0.15)', border: '1px solid rgba(212,105,126,0.3)' }}>
                  <Check size={12} style={{ color: '#D4697E' }} />
                </div>
                <span style={{ color: '#A89BB8', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem' }}>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md animate-fadeInUp">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4697E, #B84F65)' }}>
                <Sparkles size={20} className="text-white" />
              </div>
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.5rem', fontWeight: 700 }} className="text-gradient">COSMATIC</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create Account</h2>
            <p style={{ color: '#A89BB8', fontFamily: 'DM Sans, sans-serif' }}>Join thousands of beauty enthusiasts</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl text-sm animate-scaleIn" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#F87171', fontFamily: 'DM Sans, sans-serif' }}>
                {error}
              </div>
            )}

            <div>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  style={{ paddingRight: '3rem' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#6B6280' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= strength ? strengthColors[strength - 1] : 'rgba(255,255,255,0.1)' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: strength > 0 ? strengthColors[strength - 1] : '#6B6280', fontFamily: 'DM Sans, sans-serif' }}>
                    {strength > 0 ? strengthLabels[strength - 1] : ''}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
                style={{ borderColor: form.confirmPassword && form.confirmPassword !== form.password ? '#F87171' : undefined }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full" style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <span>Creating Account...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Create Account</span>
                  <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div className="divider-text my-7">or</div>

          <p style={{ textAlign: 'center', color: '#A89BB8', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#D4697E', fontWeight: 600 }} className="hover:underline">Sign In</Link>
          </p>
          <div className="mt-6 text-center">
            <Link href="/" style={{ color: '#6B6280', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>← Back to Store</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
