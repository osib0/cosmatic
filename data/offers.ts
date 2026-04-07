export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  validUntil: string;
  category?: string;
  image: string;
  type: 'flat' | 'percent';
}

export const activeOffers: Offer[] = [
  {
    id: '1',
    title: 'New User Offer',
    description: 'Get ₹500 off on your first purchase',
    discount: 500,
    code: 'WELCOME500',
    validUntil: '2026-05-31',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop',
    type: 'flat',
  },
  {
    id: '2',
    title: 'Makeup Madness',
    description: 'Flat 50% off on all makeup products',
    discount: 50,
    code: 'MAKEUP50',
    validUntil: '2026-04-30',
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1596289519410-327aaf05dc47?w=400&h=300&fit=crop',
    type: 'percent',
  },
  {
    id: '3',
    title: 'Skin Care Special',
    description: 'Get 40% off on skincare products above ₹1000',
    discount: 40,
    code: 'SKINCARE40',
    validUntil: '2026-05-15',
    category: 'Skin',
    image: 'https://images.unsplash.com/photo-1570545063141-507f65b4ee0b?w=400&h=300&fit=crop',
    type: 'percent',
  },
  {
    id: '4',
    title: 'Hair Care Festival',
    description: 'Buy 2 haircare products, Get 30% off',
    discount: 30,
    code: 'HAIR30',
    validUntil: '2026-05-20',
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
    type: 'percent',
  },
  {
    id: '5',
    title: 'Fragrance Frenzy',
    description: '₹1000 off on fragrance purchases above ₹2000',
    discount: 1000,
    code: 'FRAGRANCE1K',
    validUntil: '2026-05-25',
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1594945499941-9704cb73df0f?w=400&h=300&fit=crop',
    type: 'flat',
  },
  {
    id: '6',
    title: 'Summer Glow',
    description: 'Get 25% off on Bath & Body products',
    discount: 25,
    code: 'SUMMER25',
    validUntil: '2026-06-30',
    category: 'Bath & Body',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=300&fit=crop',
    type: 'percent',
  },
];

export const bannerOffers = {
  title: 'Biggest Sale of the Season',
  subtitle: 'Up to 50% off on everything',
  discount: 50,
  backgroundColor: '#C8A2C8',
  textColor: '#FFFFFF',
  expiresIn: '3 days left',
};
