'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ShoppingBag, MapPin, CreditCard, Check, ArrowLeft, Lock, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [address, setAddress] = useState({
    name: '', phone: '', street: '', city: '', state: '', pincode: '',
  });
  const [orderId, setOrderId] = useState('');

  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) {
        setUser(d.user);
        if (!address.name) setAddress(prev => ({ ...prev, name: d.user.name }));
      } else {
        router.push('/login?redirect=/checkout');
      }
    });

    if (cart.length === 0 && step !== 'success') {
      router.push('/cart');
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { 
      if (document.body.contains(script)) document.body.removeChild(script); 
    };
  }, [router, cart.length, step]);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.pincode) return;
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderItems = cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      // Create order
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems, address }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? 'Failed to create order');
        return;
      }

      const orderData = await res.json();
      setOrderId(orderData.orderId);

      // Open Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Cosmatic',
        description: 'Premium Beauty Products',
        order_id: orderData.razorpayOrderId,
        prefill: { name: user?.name, email: user?.email, contact: address.phone },
        theme: { color: '#D4697E' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          // Verify payment
          const verifyRes = await fetch('/api/orders/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: orderData.orderId,
            }),
          });
          if (verifyRes.ok) {
            clearCart();
            setStep('success');
            window.scrollTo(0, 0);
          } else {
            alert('Payment verification failed');
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-green-100 animate-bounce">
            <Check size={48} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-josefin">Order Successfully Placed!</h1>
          <p className="text-gray-500 mb-2 max-w-md mx-auto">Thank you for choosing Cosmatic. Your premium beauty ritual is on its way.</p>
          <p className="text-sm font-mono text-gray-400 mb-10">Order ID: #{orderId.slice(-8).toUpperCase()}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary">View Orders</Link>
            <Link href="/products" className="btn-outline">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        {/* Checkout Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-josefin mb-2">Secure Checkout</h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Link href="/cart" className="hover:text-pink-600 transition-colors">Bag</Link>
              <ChevronRight size={14} />
              <span className={step === 'address' ? 'text-pink-600 font-bold' : ''}>Delivery</span>
              <ChevronRight size={14} />
              <span className={step === 'payment' ? 'text-pink-600 font-bold' : ''}>Payment</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-500" /> Secure SSL
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-blue-500" /> Express Delivery
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Steps */}
          <div className="lg:col-span-2 space-y-8">
            {step === 'address' ? (
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                    <MapPin size={24} className="text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-josefin">Shipping Information</h2>
                </div>

                <form onSubmit={handleAddressSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 outline-none transition-all font-medium"
                        value={address.name}
                        onChange={e => setAddress({...address, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+91 9876543210"
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 outline-none transition-all font-medium"
                        value={address.phone}
                        onChange={e => setAddress({...address, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Address Line</label>
                    <input 
                      type="text" 
                      placeholder="Flat, House no, Building, Street"
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 outline-none transition-all font-medium"
                      value={address.street}
                      onChange={e => setAddress({...address, street: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">City</label>
                      <input 
                        type="text" 
                        placeholder="Mumbai"
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 outline-none transition-all font-medium"
                        value={address.city}
                        onChange={e => setAddress({...address, city: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">State</label>
                      <input 
                        type="text" 
                        placeholder="Maharashtra"
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 outline-none transition-all font-medium"
                        value={address.state}
                        onChange={e => setAddress({...address, state: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Pincode</label>
                      <input 
                        type="text" 
                        placeholder="400001"
                        maxLength={6}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-pink-200 outline-none transition-all font-medium"
                        value={address.pincode}
                        onChange={e => setAddress({...address, pincode: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="btn-primary w-full py-4 text-sm uppercase tracking-widest font-black shadow-xl flex items-center justify-center gap-2">
                      Continue to Payment <ChevronRight size={18} />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                    <CreditCard size={24} className="text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-josefin">Payment Method</h2>
                </div>

                <div className="p-6 bg-pink-50/50 rounded-3xl border border-pink-100 mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-pink-600" />
                      <span className="text-sm font-black uppercase tracking-wider text-gray-500">Shipping To</span>
                    </div>
                    <button onClick={() => setStep('address')} className="text-xs font-bold text-pink-600 underline">Change</button>
                  </div>
                  <p className="text-gray-900 font-bold">{address.name} · {address.phone}</p>
                  <p className="text-sm text-gray-600 mt-1">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-[2rem] border-2 border-pink-500 bg-white shadow-lg shadow-pink-100/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-4 border-pink-500" />
                        <span className="font-bold text-gray-900">Razorpay Secure Payment</span>
                      </div>
                      <img src="https://razorpay.com/assets/razorpay-glyph.svg" className="w-6 h-6" alt="Razorpay" />
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      Support for Cards, UPI, Netbanking, and Wallets. 100% Secure & Encrypted.
                    </p>
                    <button 
                      onClick={handlePayment} 
                      disabled={loading}
                      className="btn-primary w-full py-5 text-lg font-black shadow-xl flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Pay ₹{total.toLocaleString()} Securely</>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <Lock size={12} className="text-green-500" />
                    Encrypted Transaction
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white sticky top-24 shadow-2xl">
              <h3 className="text-xl font-bold mb-8 font-josefin">Order Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-black text-pink-400 mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10 mb-8">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-bold' : 'text-white font-bold'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Total Payable</p>
                  <p className="text-3xl font-black text-white">₹{total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
