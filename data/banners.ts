export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  buttonText: string;
  discount?: number;
}

export const heroBanners: Banner[] = [
  {
    id: '1',
    title: 'Summer Beauty Essentials',
    subtitle: 'Get 40% off on premium skincare',
    image: 'https://images.unsplash.com/photo-1599599810694-f3ee39e00e81?w=1000&h=400&fit=crop',
    link: '/category/skin',
    buttonText: 'Shop Now',
    discount: 40,
  },
  {
    id: '2',
    title: 'Makeup Magic Collection',
    subtitle: 'Explore our exclusive makeup range',
    image: 'https://images.unsplash.com/photo-1596289519410-327aaf05dc47?w=1000&h=400&fit=crop',
    link: '/category/makeup',
    buttonText: 'Discover',
    discount: 35,
  },
  {
    id: '3',
    title: 'Luxury Hair Care',
    subtitle: 'Transform your hair in 30 days',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&h=400&fit=crop',
    link: '/category/hair',
    buttonText: 'Learn More',
    discount: 30,
  },
];

export const promobanners: Banner[] = [
  {
    id: '1',
    title: 'Trending Now',
    subtitle: 'Limited time offer on bestsellers',
    image: 'https://images.unsplash.com/photo-1570545063141-507f65b4ee0b?w=600&h=400&fit=crop',
    link: '/products/trending',
    buttonText: 'View All',
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Fresh products just launched',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop',
    link: '/products/new',
    buttonText: 'Explore',
  },
];
