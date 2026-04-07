'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const footerSections = [
    {
      title: 'About',
      links: [
        { name: 'About Serenlogue', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Press', href: '#' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'Contact Us', href: '#' },
        { name: 'FAQs', href: '#' },
        { name: 'Track Order', href: '#' },
        { name: 'Support', href: '#' },
      ],
    },
    {
      title: 'Policies',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Use', href: '#' },
        { name: 'Shipping Policy', href: '#' },
        { name: 'Return Policy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'f', href: '#', label: 'Facebook' },
    { name: '📷', href: '#', label: 'Instagram' },
    { name: '𝕏', href: '#', label: 'X' },
    { name: 'in', href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-12 sm:mt-14 md:mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        {/* Newsletter */}
        <div className="mb-10 sm:mb-12 md:mb-14 pb-8 sm:pb-10 border-b border-gray-700">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
            Stay Updated with Serenlogue
          </h3>
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            Get exclusive offers and beauty tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="bg-pink-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-600 transition-all flex items-center justify-center gap-2 whitespace-nowrap border border-pink-600">
              <Mail size={18} />
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              serenlogue
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Premium beauty & lifestyle products for the modern you.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-md font-bold text-lg border border-gray-700"
                  aria-label={social.label}
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 md:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Serenlogue. All rights reserved.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <img
              src="https://via.placeholder.com/40x25?text=Visa"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://via.placeholder.com/40x25?text=MC"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="https://via.placeholder.com/40x25?text=UPI"
              alt="UPI"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
