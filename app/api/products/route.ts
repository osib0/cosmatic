import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';
import { getSessionFromRequest } from '@/lib/auth';

// GET /api/products — public
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') ?? '50');
    const page = parseInt(searchParams.get('page') ?? '1');
    const ids = searchParams.get('ids');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (ids) {
      query._id = { $in: ids.split(',') };
    } else {
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.featured = true;
      if (search) query.name = { $regex: search, $options: 'i' };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/products — admin only
export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

