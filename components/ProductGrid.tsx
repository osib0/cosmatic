'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title: string;
  products: any[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 md:py-16">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          {title}
        </h2>
        <div className="w-16 sm:w-20 h-1 bg-pink-500 mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="block hover:no-underline">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      <div className="text-center mt-8 sm:mt-10 md:mt-12">
        <button className="bg-pink-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-md font-semibold hover:bg-pink-600 transition-all duration-300 border border-pink-600">
          View All Products
        </button>
      </div>
    </section>
  );
}
