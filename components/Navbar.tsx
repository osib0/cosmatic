'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Search, User, ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Makeup', href: '/category/Makeup' },
    { name: 'Skincare', href: '/category/Skin' },
    { name: 'Haircare', href: '/category/Hair' },
    { name: 'Fragrance', href: '/category/Fragrance' },
    { name: 'All Products', href: '/products' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl sm:text-3xl font-bold text-gray-900 whitespace-nowrap">
            serenlogue
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center flex-1 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 flex-1 max-w-xs">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm flex-1 w-full ml-2 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Icons - Visible on all screens */}
            <Link href="/wishlist" className="hidden sm:block text-gray-900 hover:text-pink-600 transition-colors" title="Wishlist">
              <Heart size={20} />
            </Link>

            <Link href="/account" className="hidden sm:block text-gray-900 hover:text-pink-600 transition-colors" title="Account">
              <User size={20} />
            </Link>

            <Link href="/cart" className="text-gray-900 hover:text-pink-600 transition-colors relative" title="Cart">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-900 hover:text-pink-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              {/* Search Bar - Mobile */}
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-2">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm flex-1 w-full ml-2 text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-gray-900 hover:bg-gray-50 rounded-md border border-gray-200 text-sm font-medium transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Icons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200 mt-2">
                <Link href="/wishlist" className="flex items-center gap-2 px-4 py-2 text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 transition-all flex-1 text-sm justify-center font-medium">
                  <Heart size={18} />
                  Wishlist
                </Link>
                <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 transition-all flex-1 text-sm justify-center font-medium">
                  <User size={18} />
                  Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

