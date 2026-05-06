import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';
import { getSessionFromRequest } from '@/lib/auth';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? '',
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? '',
});

// POST /api/orders/create
export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: 'Login required' }, { status: 401 });

    await connectDB();
    const { items, address, paymentMethod } = await req.json();

    if (!items?.length || !address) {
      return NextResponse.json({ error: 'Items and address are required' }, { status: 400 });
    }

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    // Save order in DB
    const order = await Order.create({
      userId: session.userId,
      items,
      totalAmount,
      paymentMethod: paymentMethod ?? 'razorpay',
      razorpayOrderId: razorpayOrder.id,
      address,
      paymentStatus: 'pending',
      status: 'pending',
    });

    return NextResponse.json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

