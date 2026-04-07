'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  title: string;
  products: Product[];
}

export default function Carousel({ title, products }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
      <div className="mb-8 sm:mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-pink-500 mt-3 rounded-full"></div>
        </div>

        {/* Carousel Controls */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ChevronLeft className="text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ChevronRight className="text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Carousel Controls */}
      <div className="md:hidden flex gap-2 mt-4 justify-center">
        <button
          onClick={() => scroll('left')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="text-gray-700" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="text-gray-700" />
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
