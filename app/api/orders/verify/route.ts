import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/lib/models/Order';
import { getSessionFromRequest } from '@/lib/auth';
import crypto from 'crypto';

// POST /api/orders/verify
export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = await req.json();

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET ?? '')
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update order
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      status: 'processing',
      razorpayPaymentId,
      razorpaySignature,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verify order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

