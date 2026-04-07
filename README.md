# Serenlogue - Premium Beauty & Lifestyle eCommerce Frontend

A modern, responsive eCommerce frontend built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Inspired by Nykaa, this project showcases a premium beauty and lifestyle brand with a clean, minimalist design.

## 🎨 Features

### Design & UI
- **Modern Aesthetic**: Premium, minimal design with elegant color palette
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Smooth Animations**: Hover effects, transitions, and scroll animations
- **Accessible**: Built with semantic HTML and ARIA attributes
- **Brand Colors**: 
  - Primary: Soft Lavender (#C8A2C8)
  - Secondary: White (#FFFFFF)
  - Accents: Gold (#D4AF37) & Peach (#FFB6A3)
  - Text: Dark Gray (#333333)

### Components
1. **Navbar** - Sticky header with logo, navigation, search, and cart
2. **Secondary Category Menu** - Horizontal scrollable category menu with hover effects
3. **Hero Section** - 3-column responsive banner grid with promotional cards
4. **Offer Strip** - Full-width promotional banner with coupon code
5. **Product Grid** - Trending products showcase with 4-column layout
6. **Product Card** - Individual product cards with ratings, wishlist, and quick actions
7. **Category Shop** - "Shop by Category" section with card-based layout
8. **Carousel** - Horizontal scrollable carousel for best sellers
9. **Promo Section** - Split layout promotional section with features
10. **Footer** - Comprehensive footer with newsletter signup and links

### Interactive Features
- Product wishlist toggle
- Shopping cart counter
- Responsive mobile menu
- Smooth scrolling
- Hover animations and transitions
- Product quick actions
- Newsletter subscription

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Icons**: Lucide React
- **Fonts**: 
  - Playfair Display (headings)
  - Poppins (titles)
  - Inter (body text)

## 📁 Project Structure

```
cosmetic/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles and theme
│   └── favicon.ico
│
├── components/             # Reusable components
│   ├── Navbar.tsx
│   ├── CategoryMenu.tsx
│   ├── HeroSection.tsx
│   ├── BannerCard.tsx
│   ├── OfferStrip.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── CategoryShop.tsx
│   ├── Carousel.tsx
│   ├── PromoSection.tsx
│   └── Footer.tsx
│
├── data/                   # Mock data
│   ├── categories.ts
│   ├── products.ts
│
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Local: http://localhost:3000
   - Network: http://10.201.80.20:3000

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🎯 Key Components Breakdown

### Navbar
- Sticky header with gradient logo
- Responsive navigation links
- Search bar integration
- Cart badge with counter
- Mobile toggle menu
- Wishlist and sign-in buttons

### ProductCard
- Product image with zoom effect on hover
- Discount badge
- Rating system with review count
- Price display (with strikethrough original price)
- Quick add to cart button
- Wishlist toggle

### Carousel
- Smooth horizontal scroll
- Navigation arrows for desktop
- Auto-hide scrollbar
- Responsive item sizing
- Previous/Next controls

### PromoSection
- Split layout (image + content)
- Multiple CTAs
- Feature highlights
- Responsive grid

## 🎨 Customization Guide

### Colors
Edit the CSS custom properties in `app/globals.css`:

```css
--color-primary: #C8A2C8;
--color-accent-gold: #D4AF37;
--color-accent-peach: #FFB6A3;
--color-text-dark: #333333;
```

### Fonts
All fonts are imported from Google Fonts:
- Headings: Playfair Display
- Titles: Poppins
- Body: Inter

## 📊 Data Structure

### Product Interface
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  isWishlisted?: boolean;
  category: string;
}
```

### Category Interface
```typescript
interface Category {
  id: string;
  name: string;
  image: string;
}
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom theme configuration and smooth animations.

### Next.js Image Optimization
- Uses Next.js `Image` component for optimization
- Unsplash placeholder images for demos
- Responsive image sizing with `sizes` prop

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

The design is mobile-first and fully responsive.

## ✨ Animations & Effects

- **Fade In**: Smooth opacity transitions
- **Scale**: Hover scale effects on cards
- **Slide In**: Direction-based slide animations
- **Smooth Scroll**: HTML scroll-behavior: smooth
- **Gradient Text**: Brand logo and headings
- **Hover Effects**: Product cards, buttons, and links
- **Underline Animation**: Navigation link underlines

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy
```

The project is optimized for deployment on Vercel or any Node.js hosting platform.

## 📚 Additional Notes

- **No Backend**: This is frontend-only. Replace mock data with API calls when needed.
- **Placeholder Images**: All images are Unsplash placeholders. Replace with real product images.
- **State Management**: Currently uses React `useState` for local state.
- **Future Enhancements**: Add product filtering, sorting, cart management, and checkout flow.

## 🎯 Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile Browsers: Latest

---

**Created with ❤️ for Serenlogue**

A premium beauty & lifestyle eCommerce experience.

# cosmatic
