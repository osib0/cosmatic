'use client';

import React from 'react';

interface BannerCardProps {
  image: string;
  title: string;
  subtitle?: string;
  buttonText: string;
  isCenter?: boolean;
}

export default function BannerCard({
  image,
  title,
  subtitle,
  buttonText,
  isCenter,
}: BannerCardProps) {
  const bgImage = image || '/images/banner-placeholder.svg';

  return (
    <div className="relative group overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 h-64 sm:h-80 md:h-96">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

      {/* Content */}
      <div className={`relative h-full flex flex-col p-4 sm:p-6 md:p-8 ${
        isCenter 
          ? 'justify-center items-center text-center' 
          : 'justify-end'
      }`}>
        {isCenter ? (
          // Center Card Layout
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {subtitle}
              </p>
            )}
            <button className="bg-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-semibold hover:bg-pink-600 transition-all duration-300">
              {buttonText}
            </button>
          </div>
        ) : (
          // Side Card Layout
          <>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm sm:text-base text-white mb-4">
                {subtitle}
              </p>
            )}
            <button className="w-fit bg-white text-gray-900 px-6 sm:px-8 py-2 sm:py-3 rounded-md font-semibold hover:bg-gray-100 transition-all duration-300 border border-gray-200">
              {buttonText}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
