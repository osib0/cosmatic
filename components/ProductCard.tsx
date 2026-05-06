'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: any; // Using any because it could be ApiProduct or Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const productId = product._id || product.id;
  const isWishlisted = isInWishlist(productId);

  const bgImage = product.image || '/images/product-placeholder.svg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-pink-200 hover:shadow-lg overflow-hidden transition-all duration-300">
      {/* Image Container */}
      <Link href={`/products/${productId}`} className="relative h-48 sm:h-56 md:h-64 bg-gray-50 overflow-hidden block">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold border border-red-600 shadow-sm">
            {product.discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-gray-100 hover:border-pink-200 transition-all shadow-sm"
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/btn:text-red-400'
              }`}
          />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-center pb-4">
          <button
            onClick={handleAddToCart}
            className="bg-white text-gray-900 px-5 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex items-center gap-2 hover:bg-pink-500 hover:text-white border border-gray-100 shadow-md"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-[10px] uppercase tracking-widest text-pink-500 font-bold mb-1">{product.category}</p>

        {/* Product Name */}
        <Link href={`/products/${productId}`}>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${i < Math.round(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-200'
                  }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${product.inStock
            ? 'bg-green-50 text-green-600 border-green-100'
            : 'bg-red-50 text-red-600 border-red-100'
            }`}>
            {product.inStock ? 'STOCK' : 'OUT'}
          </span>
        </div>
      </div>
    </div>
  );
}

