'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import ProductCard from '@/components/ProductCard';
import { Sparkles, ArrowRight, Star, Shield, Truck, RotateCcw } from 'lucide-react';

interface ApiProduct {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  description?: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  featured: boolean;
}



const CATEGORIES = [
  { name: 'Makeup', emoji: '💄', color: '#FEE2E2', textColor: '#DC2626' },
  { name: 'Skin', emoji: '✨', color: '#FDF4FF', textColor: '#A855F7' },
  { name: 'Hair', emoji: '💆', color: '#FFF7ED', textColor: '#EA580C' },
  { name: 'Fragrance', emoji: '🌸', color: '#FDF2F8', textColor: '#DB2777' },
  { name: 'Bath & Body', emoji: '🛁', color: '#EFF6FF', textColor: '#2563EB' },
  { name: 'Wellness', emoji: '🌿', color: '#F0FDF4', textColor: '#16A34A' },
];

const FEATURES = [
  { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: Shield, title: '100% Authentic', desc: 'Certified genuine products' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7-day hassle-free returns' },
  { icon: Star, title: 'Top Rated', desc: '50,000+ happy customers' },
];

export default function Home() {
  const [trending, setTrending] = useState<ApiProduct[]>([]);
  const [bestsellers, setBestsellers] = useState<ApiProduct[]>([]);
  const [featured, setFeatured] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [trendRes, bestRes, featuredRes] = await Promise.all([
          fetch('/api/products?limit=8&page=1'),
          fetch('/api/products?limit=8&page=2'),
          fetch('/api/products?featured=true&limit=4'),
        ]);
        const [trendData, bestData, featuredData] = await Promise.all([
          trendRes.json(),
          bestRes.json(),
          featuredRes.json(),
        ]);
        setTrending(trendData.products ?? []);
        setBestsellers(bestData.products ?? []);
        setFeatured(featuredData.products ?? []);
      } catch {
        // Removed fallback to static data
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const ProductSkeleton = () => (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#F0E8EA' }}>
      <div className="skeleton h-52" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-1/3" />
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">


      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #FDF2F4 0%, #FFFBF8 50%, #FDF8F2 100%)', overflow: 'hidden', padding: '4rem 0 5rem', position: 'relative' }}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2" style={{ background: 'radial-gradient(circle, #D4697E, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15 translate-y-1/2 -translate-x-1/3" style={{ background: 'radial-gradient(circle, #C9975A, transparent)' }} />

        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,105,126,0.1)', border: '1px solid rgba(212,105,126,0.2)' }}>
              <Sparkles size={15} style={{ color: '#D4697E' }} />
              <span style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: '#D4697E', textTransform: 'uppercase' }}>
                Premium Beauty Destination
              </span>
            </div>

            <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#1A1219', lineHeight: 1.2, marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Your Beauty,{' '}
              <span className="text-gradient">Elevated.</span>
            </h1>

            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: '#6B5E65', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              Discover 500+ premium beauty products curated for every skin type, tone, and lifestyle.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/products" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.875rem 2rem', gap: '0.5rem' }}>
                Shop All Products <ArrowRight size={16} />
              </Link>
              <Link href="/products?featured=true" className="btn-outline" style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
                Featured Picks
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center mt-10 pt-8" style={{ borderTop: '1px solid rgba(212,105,126,0.15)' }}>
              {[{ value: '500+', label: 'Products' }, { value: '50K+', label: 'Happy Customers' }, { value: '4.8★', label: 'Avg Rating' }].map(s => (
                <div key={s.label} className="text-center">
                  <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#D4697E' }}>{s.value}</p>
                  <p style={{ color: '#A89AA1', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section style={{ borderTop: '1px solid #F0E8EA', borderBottom: '1px solid #F0E8EA', padding: '1.5rem 0' }}>
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FDF2F4' }}>
                  <Icon size={18} style={{ color: '#D4697E' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#1A1219' }}>{title}</p>
                  <p style={{ color: '#A89AA1', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto max-w-7xl py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-pink-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Explore</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-josefin">Shop by Category</h2>
          </div>
          <Link href="/products" className="text-pink-600 font-bold text-sm border-b-2 border-pink-100 hover:border-pink-500 transition-all">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.name}
              href={`/category/${cat.name}`}
              className="flex flex-col items-center gap-3 p-6 rounded-3xl text-center transition-all group hover:shadow-xl hover:-translate-y-1"
              style={{ background: cat.color }}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-gray-50/50 py-20 border-y border-gray-100">
        <div className="section-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-pink-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Curated Collection</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-josefin">Trending Now</h2>
            </div>
            <Link href="/products" className="text-pink-600 font-bold text-sm border-b-2 border-pink-100 hover:border-pink-500 transition-all">
              Discover More
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : trending.map(p => (
                <ProductCard key={p._id} product={p} />
              ))
            }
          </div>
        </div>
      </section>

      {/* Featured Products Banner */}
      {!loading && featured.length > 0 && (
        <section className="mx-auto max-w-7xl py-20">
          <div className="mb-12 text-center">
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Handpicked Quality</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-josefin">The Beauty Edit</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <section className="py-24 border-t border-gray-100" style={{ background: 'linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 100%)' }}>
        <div className="section-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-pink-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Customer Favorites</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-josefin">Best Sellers</h2>
            </div>
            <Link href="/products" className="text-pink-600 font-bold text-sm border-b-2 border-pink-100 hover:border-pink-500 transition-all">
              Shop All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : bestsellers.map(p => (
                <ProductCard key={p._id} product={p} />
              ))
            }
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      {/* <section className="py-24 px-4">
        <div className="section-container bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-josefin">
              Elevate Your Daily Ritual
            </h2>
            <p className="text-gray-400 font-medium mb-10 max-w-lg mx-auto leading-relaxed">
              Join 50,000+ beauty enthusiasts and get 15% off your first order plus early access to new launches.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/register" className="px-10 py-4 bg-pink-600 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-pink-700 transition-all shadow-lg shadow-pink-900/20">
                Join Now
              </Link>
              <Link href="/products" className="px-10 py-4 bg-white/10 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">
                Explore Shop
              </Link>
            </div>
          </div>
        </div>
      </section> */}


    </div>
  );
}
