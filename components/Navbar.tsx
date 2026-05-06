'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Search, User, ShoppingCart, Menu, X, LogOut, LayoutDashboard, Sparkles, ChevronDown } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface UserInfo { name: string; role: string; }

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlist } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'Makeup', href: '/category/Makeup' },
    { name: 'Skincare', href: '/category/Skin' },
    { name: 'Haircare', href: '/category/Hair' },
    { name: 'Fragrance', href: '/category/Fragrance' },
    { name: 'All Products', href: '/products' },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-all duration-300"
      style={{ borderBottom: '1px solid #F0E8EA', boxShadow: scrolled ? '0 2px 20px rgba(212,105,126,0.08)' : 'none' }}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between gap-4 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 gradient-primary">
              <Sparkles size={18} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.06em', color: '#1A1219' }}>
              COSMATIC
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-7 items-center flex-1 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: '#6B5E65' }}
                className="hover:text-rose-500 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-rose-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#FAFAFA', border: '1px solid #F0E8EA' }}>
              <Search size={15} style={{ color: '#A89AA1' }} />
              <input
                type="text"
                placeholder="Search products..."
                style={{ background: 'transparent', outline: 'none', fontSize: '0.85rem', color: '#1A1219', width: '150px', fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative hidden sm:flex w-9 h-9 rounded-lg items-center justify-center transition-all" style={{ color: '#6B5E65', border: '1px solid #F0E8EA' }} title="Wishlist"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FDF2F4'; (e.currentTarget as HTMLElement).style.color = '#D4697E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6B5E65'; }}>
              <Heart size={18} className={wishlist.length > 0 ? 'fill-pink-500 text-pink-500' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full border border-white" />
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all"
                  style={{ background: userMenuOpen ? '#FDF2F4' : '#FAFAFA', border: '1px solid #F0E8EA', fontFamily: 'DM Sans, sans-serif' }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white gradient-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ color: '#1A1219', fontSize: '0.875rem', fontWeight: 500 }} className="hidden sm:block max-w-24 truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={13} style={{ color: '#A89AA1' }} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden animate-scaleIn bg-white" style={{ border: '1px solid #F0E8EA', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                    <div className="px-4 py-3" style={{ borderBottom: '1px solid #F0E8EA', background: '#FAFAFA' }}>
                      <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#1A1219' }}>{user.name}</p>
                      <span className={`badge mt-1 ${user.role === 'admin' ? 'badge-gold' : 'badge-primary'}`}>{user.role}</span>
                    </div>
                    <div className="p-2">
                      <Link
                        href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
                        style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FDF2F4'; (e.currentTarget as HTMLElement).style.color = '#D4697E'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6B5E65'; }}
                      >
                        <LayoutDashboard size={15} />
                        {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all text-left"
                        style={{ color: '#DC2626', fontFamily: 'DM Sans, sans-serif' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEF2F2'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center transition-all"
                style={{ color: '#6B5E65', border: '1px solid #F0E8EA' }}
                title="Login"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FDF2F4'; (e.currentTarget as HTMLElement).style.color = '#D4697E'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6B5E65'; }}
              >
                <User size={18} />
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative flex w-9 h-9 rounded-lg items-center justify-center transition-all" style={{ color: '#6B5E65', border: '1px solid #F0E8EA' }} title="Cart"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FDF2F4'; (e.currentTarget as HTMLElement).style.color = '#D4697E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#6B5E65'; }}>
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-white text-xs font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center gradient-primary" style={{ width: '18px', height: '18px', fontSize: '10px' }}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center" style={{ color: '#6B5E65', border: '1px solid #F0E8EA' }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 animate-fadeInUp" style={{ borderTop: '1px solid #F0E8EA' }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-6 py-2 mb-2">
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="relative p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Heart size={20} className={wishlist.length > 0 ? 'fill-pink-500 text-pink-500' : ''} />
                  {wishlist.length > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white" />}
                </Link>
                <Link href="/cart" onClick={() => setMobileOpen(false)} className="relative p-2 rounded-xl bg-gray-50 text-gray-500">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white">{cartCount}</span>}
                </Link>
              </div>

              {navLinks.map(link => (
                <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between"
                  style={{ color: '#1A1219', background: '#FAFAFA' }}
                >
                  {link.name}
                  <ChevronDown size={14} className="-rotate-90 text-gray-300" />
                </Link>
              ))}

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                {user ? (
                  <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gray-900 text-white">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="py-3 rounded-xl font-bold text-sm border border-gray-200 text-center text-gray-700">Sign In</Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)} className="py-3 rounded-xl font-bold text-sm bg-pink-600 text-white text-center">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
