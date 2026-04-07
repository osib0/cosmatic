'use client';

import React from 'react';
import BannerCard from './BannerCard';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Card */}
        <div className="md:col-span-1">
          <BannerCard
            image="/images/banner-placeholder.svg"
            title="Summer Glow Essentials"
            subtitle="Up to 40% Off"
            buttonText="Shop Now"
          />
        </div>

        {/* Center Card */}
        <div className="md:col-span-1">
          <BannerCard
            image="/images/banner-placeholder.svg"
            title="Serenlogue Beauty Awards 2026"
            subtitle="Vote Your Favorites"
            buttonText="Vote Now"
            isCenter
          />
        </div>

        {/* Right Card */}
        <div className="md:col-span-1">
          <BannerCard
            image="/images/banner-placeholder.svg"
            title="Travel Beauty Kit"
            subtitle="Premium on-the-go collection"
            buttonText="Explore"
          />
        </div>
      </div>
    </section>
  );
}
