'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

interface Product {
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

const CATEGORIES = ['Makeup', 'Skin', 'Hair', 'Fragrance', 'Bath & Body', 'Wellness'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: '100' });
        if (search) params.set('search', search);
        // Fetch all and filter/sort client side for responsive UI
        const res = await fetch(`/api/products?${params}`);
        const data = await res.json();
        setProducts(data.products ?? []);
        setTotal(data.total ?? 0);
      } catch {
        console.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [search]);

  // Client-side filter + sort
  let filtered = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
  if (selectedCategories.length > 0) filtered = filtered.filter(p => selectedCategories.includes(p.category));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  const toggleCategory = (cat: string) =>
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(5000);
    setSortBy('newest');
    setSearch('');
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A89AA1', marginBottom: '1rem' }}>Categories</h3>
        <div className="space-y-2.5">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleCategory(cat)}
                className="w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                style={{ width: '18px', height: '18px', borderColor: selectedCategories.includes(cat) ? '#D4697E' : '#E5D5D9', background: selectedCategories.includes(cat) ? '#D4697E' : 'white' }}
              >
                {selectedCategories.includes(cat) && <span style={{ color: 'white', fontSize: '10px', fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: selectedCategories.includes(cat) ? '#D4697E' : '#6B5E65', fontWeight: selectedCategories.includes(cat) ? 600 : 400 }}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #F0E8EA', paddingTop: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A89AA1', marginBottom: '1rem' }}>Price Range</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="form-label" style={{ fontSize: '0.7rem' }}>Min (₹)</label>
              <input type="number" className="form-input" style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }} value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} min={0} />
            </div>
            <div className="flex-1">
              <label className="form-label" style={{ fontSize: '0.7rem' }}>Max (₹)</label>
              <input type="number" className="form-input" style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} max={10000} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #F0E8EA', paddingTop: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A89AA1', marginBottom: '0.75rem' }}>Sort By</h3>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-input" style={{ padding: '0.6rem 0.75rem', fontSize: '0.875rem' }}>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="featured">Featured First</option>
        </select>
      </div>

      <button onClick={resetFilters} className="btn-ghost w-full" style={{ padding: '0.65rem', fontSize: '0.85rem' }}>Reset All Filters</button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #FDF2F4 0%, #FDF8F2 100%)', borderBottom: '1px solid #F0E8EA', padding: '2.5rem 0 2rem' }}>
        <div className="section-container">
          <h1 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1A1219', marginBottom: '0.5rem' }}>
            All Products
          </h1>
          <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif' }}>
            {loading ? 'Loading...' : `${sorted.length} of ${total} products`}
          </p>
        </div>
      </div>

      <div className="section-container py-8 mt-10">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          {/* Search */}
          <div className="flex-1 min-w-48 relative">
            <input
              type="text"
              className="form-input"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingRight: search ? '2.5rem' : undefined }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#A89AA1' }}>
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort select (desktop) */}
          <div className="relative hide-mobile">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-input appearance-none pr-8" style={{ minWidth: '180px', cursor: 'pointer' }}>
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
              <option value="featured">Featured First</option>
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#A89AA1' }} />
          </div>

          {/* Filter toggle (mobile) */}
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-ghost hide-desktop flex items-center gap-2" style={{ padding: '0.65rem 1rem', fontSize: '0.875rem' }}>
            <SlidersHorizontal size={16} /> Filters
            {(selectedCategories.length > 0) && <span className="badge badge-primary">{selectedCategories.length}</span>}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — Desktop */}
          <aside className="w-60 flex-shrink-0 hide-mobile">
            <div className="card sticky top-24" style={{ padding: '1.5rem' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1A1219' }}>Filters</h2>
                {(selectedCategories.length > 0 || minPrice > 0 || maxPrice < 5000) && (
                  <button onClick={resetFilters} style={{ color: '#D4697E', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif' }}>Clear all</button>
                )}
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 hide-desktop" style={{ background: 'rgba(0,0,0,0.3)' }} onClick={() => setFiltersOpen(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 700 }}>Filters</h2>
                  <button onClick={() => setFiltersOpen(false)} style={{ color: '#6B5E65' }}><X size={20} /></button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden">
                    <div className="skeleton h-48" />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-4 w-3/4" />
                      <div className="skeleton h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No products found</h3>
                <p style={{ color: '#6B5E65', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.5rem' }}>Try adjusting your filters or search term</p>
                <button onClick={resetFilters} className="btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}>Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sorted.map(product => (
                  <Link key={product._id} href={`/products/${product._id}`} className="block hover:no-underline">
                    <ProductCard product={product as unknown as import('@/data/products').Product} />
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
