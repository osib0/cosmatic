'use client';

import React from 'react';

export default function PromoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
        {/* Left Side - Image */}
        <div className="relative h-64 sm:h-72 md:h-96 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all group">
          <div 
            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url('/images/category-placeholder.svg')` }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col justify-center py-4 sm:py-8 md:py-0">
          <div className="w-16 sm:w-20 h-1 bg-pink-500 rounded-full mb-4"></div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Glow Naturally
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            Discover our exclusive collection of organic skincare products. Crafted with natural ingredients and backed by science, our range is perfect for all skin types. Experience the power of nature with our premium wellness products.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-pink-500 text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-pink-600 transition-all duration-300 border border-pink-600">
              Shop Collection
            </button>
            <button className="border border-gray-300 text-gray-900 px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors duration-300">
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-pink-600">100%</p>
              <p className="text-sm text-gray-600">Natural Ingredients</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-pink-600">Cruelty-Free</p>
              <p className="text-sm text-gray-600">Ethically Sourced</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-pink-600">Dermatologist</p>
              <p className="text-sm text-gray-600">Tested & Approved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
