'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data.product);

        if (data.product?.category) {
          const relRes = await fetch(`/api/products?category=${data.product.category}&limit=4`);
          const relData = await relRes.json();
          setRelated(relData.products.filter((p: any) => p._id !== id));
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading premium product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-josefin">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="btn-primary">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = isInWishlist(product._id);
  const images = product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-gray-400">
            <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
            <span className="text-gray-200">/</span>
            <Link href={`/category/${product.category}`} className="hover:text-pink-500 transition-colors">
              {product.category}
            </Link>
            <span className="text-gray-200">/</span>
            <span className="text-gray-900 truncate max-w-[150px]">{product.name}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
              />
              {product.discount && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === idx ? 'border-pink-500 ring-4 ring-pink-50 shadow-md' : 'border-gray-100 hover:border-pink-200'
                      }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-pink-500 font-black mb-3">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight font-josefin">{product.name}</h1>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <span className="text-sm text-gray-500 font-medium">{product.reviews} Customer Reviews</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed text-lg mb-8">{product.description || 'Elevate your beauty routine with our premium collection. Crafted with excellence for visible results.'}</p>
            </div>

            {/* Actions */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Quantity</span>
                <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className={`text-xs font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '● IN STOCK' : '● OUT OF STOCK'}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={!product.inStock}
                  className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-all flex items-center justify-center gap-3 shadow-xl disabled:bg-gray-300 disabled:shadow-none uppercase tracking-widest text-xs"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all shadow-sm ${isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:border-pink-300 hover:text-pink-500'
                    }`}
                >
                  <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 uppercase">Free Delivery</p>
                  <p className="text-[9px] text-gray-500">Orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 uppercase">Authentic</p>
                  <p className="text-[9px] text-gray-500">100% Genuine</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 uppercase">Easy Return</p>
                  <p className="text-[9px] text-gray-500">7 Days Return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pt-20 border-t border-gray-100">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-gray-900 font-josefin">You May Also Like</h2>
              <Link href="/products" className="text-pink-600 font-bold text-sm border-b-2 border-pink-100 hover:border-pink-500 transition-all">Explore All</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}