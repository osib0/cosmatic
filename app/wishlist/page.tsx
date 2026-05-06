'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { Heart, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, addToCart } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/products?ids=${wishlist.join(',')}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching wishlist products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [wishlist]);

  const handleAddAllToCart = () => {
    products.forEach(p => addToCart(p));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/products" className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl border border-gray-100 transition-all text-gray-400 hover:text-pink-500">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-josefin flex items-center gap-3">
                My Wishlist
                <span className="text-sm font-normal text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {wishlist.length} items
                </span>
              </h1>
            </div>
          </div>
          
          {products.length > 0 && (
            <button 
              onClick={handleAddAllToCart}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              Add All to Cart
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-medium">Loading your favorites...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Heart size={32} className="text-gray-200" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-josefin">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Save your favorite premium beauty picks here and shop them later.</p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
              <Sparkles size={18} /> Explore Products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
