import Navbar from '@/components/Navbar';
import CategoryMenu from '@/components/CategoryMenu';
import HeroSection from '@/components/HeroSection';
import OfferStrip from '@/components/OfferStrip';
import ProductGrid from '@/components/ProductGrid';
import CategoryShop from '@/components/CategoryShop';
import Carousel from '@/components/Carousel';
import PromoSection from '@/components/PromoSection';
import Footer from '@/components/Footer';
import { trendingProducts, bestSellers } from '@/data/products';

export const metadata = {
  title: 'Serenlogue - Premium Beauty & Lifestyle',
  description: 'Discover premium beauty and lifestyle products at Serenlogue. Luxe skincare, makeup, and wellness essentials.',
};

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <CategoryMenu />
      <HeroSection />
      <OfferStrip />
      <ProductGrid title="Trending Products" products={trendingProducts} />
      <CategoryShop />
      <Carousel title="Best Sellers" products={bestSellers} />
      <PromoSection />
      <Footer />
    </div>
  );
}
