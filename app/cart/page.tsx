'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();

  return (
    <div className="bg-white min-h-screen">


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 font-josefin">Your Shopping Bag ({cartCount})</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-josefin">Your bag is empty</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't added anything to your bag yet. Start exploring our premium collection.</p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm group transition-all hover:border-pink-100">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">{item.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">Premium Item</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-xs text-gray-400 font-medium">₹{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-josefin">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-gray-900">₹0</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-3xl font-black text-pink-600">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="btn-primary w-full py-4 rounded-xl font-black text-center text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>

                <p className="text-center text-[10px] text-gray-400 mt-6 font-medium uppercase tracking-wider">
                  Secure Payment Powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        )}
      </main>


    </div>
  );
}
