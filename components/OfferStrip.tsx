'use client';

import React from 'react';

export default function OfferStrip() {
  return (
    <section className="bg-pink-500 py-4 sm:py-6 my-8 sm:my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Flat 20% Off on First Order
            </h2>
            <p className="text-white text-sm sm:text-base mt-1 font-medium">
              Use code for exclusive discount
            </p>
          </div>

          <div className="bg-white px-6 py-3 rounded-md font-bold text-pink-600 text-lg sm:text-xl border border-white hover:bg-gray-50 transition-colors cursor-pointer">
            FIRST20
          </div>
        </div>
      </div>
    </section>
  );
}
