'use client';

import { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { allProducts, getProductById, getProductsByCategory } from '@/data/products';
import { Heart, ShoppingCart, ChevronLeft, Star } from 'lucide-react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-pink-600 hover:text-pink-700 font-medium">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Related products
  const relatedProducts = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);

  const images = [product.image, product.image, product.image]; // In production, these would be different images

  return (
    <div className="bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-pink-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96 border border-gray-200">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image || '/images/product-placeholder.svg'}')` }}
              ></div>
            </div>
            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    activeImage === idx ? 'border-pink-500' : 'border-gray-300'
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.image || '/images/product-placeholder.svg'}')` }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 rounded-full transition-colors ${
                  isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Heart size={24} />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 font-semibold">In Stock</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About this product</h3>
              <p className="text-gray-700">{product.description || 'Premium quality product with excellent features and benefits.'}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-all flex items-center justify-center gap-2 border border-pink-600">
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button className="w-full border border-gray-300 text-gray-900 py-3 rounded-md font-semibold hover:bg-gray-50 transition-all">
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Delivery:</span>
                <span className="font-semibold text-gray-900">Free - Arrives in 2-3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Return Policy:</span>
                <span className="font-semibold text-gray-900">30-day returns</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Warranty:</span>
                <span className="font-semibold text-gray-900">1 Year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
