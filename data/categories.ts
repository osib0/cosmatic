export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Makeup', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7214d?w=400&h=400&fit=crop' },
  { id: '2', name: 'Skin', image: 'https://images.unsplash.com/photo-1570545063141-507f65b4ee0b?w=400&h=400&fit=crop' },
  { id: '3', name: 'Hair', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
  { id: '4', name: 'Appliances', image: 'https://images.unsplash.com/photo-1494217903776-e6b99edc11d9?w=400&h=400&fit=crop' },
  { id: '5', name: 'Bath & Body', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
  { id: '6', name: 'Natural', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7214d?w=400&h=400&fit=crop' },
  { id: '7', name: 'Wellness', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
  { id: '8', name: 'Men', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
  { id: '9', name: 'Fragrance', image: 'https://images.unsplash.com/photo-1594945499941-9704cb73df0f?w=400&h=400&fit=crop' },
  { id: '10', name: 'Offers', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop' },
];

export const secondaryMenu = [
  'Makeup',
  'Skin',
  'Hair',
  'Appliances',
  'Bath & Body',
  'Natural',
  'Wellness',
  'Men',
  'Fragrance',
  'Offers',
];
