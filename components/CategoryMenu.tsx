'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { secondaryMenu } from '@/data/categories';

export default function CategoryMenu() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-17 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 z-10 bg-white p-2 hover:bg-gray-100 transition-colors rounded-2xl  hover:border-gray-300"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>


          {/* Scrollable Menu */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide md:px-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {secondaryMenu.map((item, idx) => (
              <Link
                key={idx}
                href={`/category/${item}`}
                className="py-4 px-2 text-sm sm:text-base font-medium text-gray-900 hover:text-pink-600 relative group whitespace-nowrap transition-colors duration-300"
              >
                {item}
                <span className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 z-10 bg-white p-2 hover:bg-gray-100 transition-colors rounded-2xl hover:border-gray-300"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
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
    </div>
  );
}
