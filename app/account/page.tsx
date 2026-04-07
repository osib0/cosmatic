'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, LogOut, Heart, ShoppingBag, Settings, MapPin } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Serenlogue</h1>
              <p className="text-gray-600 mb-8">Sign in to access your account and manage your orders</p>

              <div className="space-y-4">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition-all border border-pink-600"
                >
                  Sign In
                </button>
                <button className="w-full border border-gray-300 text-gray-900 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-b from-purple-100 to-pink-100 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-600">john@example.com</p>
              </div>

              <div className="space-y-2 border-t pt-6">
                {[
                  { id: 'profile', icon: User, label: 'Profile' },
                  { id: 'orders', icon: ShoppingBag, label: 'Orders' },
                  { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                  { id: 'address', icon: MapPin, label: 'Addresses' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === id
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                <div className="space-y-4">
                  {[1, 2].map((order) => (
                    <div key={order} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">Order #1001{order}</p>
                          <p className="text-sm text-gray-600">Placed on Mar {20 + order}, 2026</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600">₹{2000 + order * 100}</p>
                          <p className="text-sm text-green-600 font-semibold">Delivered</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                <p className="text-gray-600">You have 3 items in your wishlist</p>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'address' && (
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Add Address
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                  <p className="font-semibold text-gray-900 mb-2">Home</p>
                  <p className="text-gray-600">123 Main Street, New York, NY 10001</p>
                  <p className="text-gray-600">Phone: +91 98765 43210</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <span className="font-semibold text-gray-900">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <span className="font-semibold text-gray-900">SMS Notifications</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <span className="font-semibold text-gray-900">Marketing Emails</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
