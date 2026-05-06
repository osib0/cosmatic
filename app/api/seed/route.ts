import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';
import { allProducts } from '@/data/products';

// GET /api/seed — Only seeds products (admin already created)
// Requires ?key=JWT_SECRET always
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (key !== process.env.JWT_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    await connectDB();

    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({ message: `Products already seeded (${existingCount} products exist).` });
    }

    const toSeed = allProducts.map((p) => ({
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      category: p.category,
      description: p.description,
      image: p.image,
      inStock: p.inStock ?? true,
      rating: p.rating,
      reviews: p.reviews,
      featured: Math.random() > 0.7,
    }));

    await Product.insertMany(toSeed);

    return NextResponse.json({ success: true, productsSeeded: toSeed.length });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed', details: String(error) }, { status: 500 });
  }
}
