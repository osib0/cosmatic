import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  description?: string;
  image: string;
  images?: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  tags?: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    discount: { type: Number, min: 0, max: 100 },
    category: {
      type: String,
      required: true,
      enum: ['Makeup', 'Skin', 'Hair', 'Fragrance', 'Bath & Body', 'Wellness'],
    },
    description: { type: String, trim: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-calculate discount
ProductSchema.pre('save', function () {
  if (this.originalPrice && this.price && this.originalPrice > this.price) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
});

const Product = mongoose.models.Product ?? mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
