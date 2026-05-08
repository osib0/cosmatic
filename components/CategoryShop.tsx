'use client';

import React from 'react';
import Link from 'next/link';

const shopByCategories = [
  { id: '1', name: 'Makeup', image: 'https://images.unsplash.com/photo-1512496015851-a1dc8a47159c?auto=format&fit=crop&q=80&w=800' },
  { id: '2', name: 'Skin', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800' },
  { id: '3', name: 'Hair', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800' },
  { id: '4', name: 'Fragrance', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800' },
];

export default function CategoryShop() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 md:py-16">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Shop by Category
        </h2>
        <div className="w-16 sm:w-20 h-1 bg-pink-500 mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {shopByCategories.map((category) => {
          const bgImage = category.image || '/images/category-placeholder.svg';

          return (
            <Link
              key={category.id}
              href={`/category/${category.name}`}
              className="group relative h-60 sm:h-64 md:h-72 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              {/* Image */}
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url('${bgImage}')` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white text-sm sm:text-base font-semibold opacity-0 group-hover:opacity-100 transform transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1">
                    Explore →
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
