'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';
import { Heart, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  // Mock wishlist items
  const wishlistItems = [
    allProducts[0],
    allProducts[4],
    allProducts[8],
    allProducts[15],
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="fill-red-500 text-red-500" size={32} />
              Wishlist
            </h1>
            <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
          </div>
        </div>

        {wishlistItems.length > 0 ? (
          <div>
            {/* Wishlist Actions */}
            <div className="mb-8 flex gap-4">
              <button className="px-6 py-2 bg-pink-500 text-white rounded-md font-semibold hover:bg-pink-600 transition-all border border-pink-600">
                Add All to Cart
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-900 rounded-md font-semibold hover:bg-gray-50 transition-all">
                Move to Cart
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-4">Your wishlist is empty</p>
            <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold">
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
