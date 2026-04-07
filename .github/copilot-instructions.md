# Serenlogue eCommerce Frontend - Project Instructions

## Project Overview
Serenlogue is a modern, responsive eCommerce frontend for a premium beauty & lifestyle brand. Built with Next.js 16, TypeScript, and Tailwind CSS v4, featuring a Nykaa-inspired design with elegant UI components and smooth animations.

## Project Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/data` - Mock data for products, categories
- `/public` - Static assets

## Key Technologies
- **Framework**: Next.js 16.2.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Poppins, Inter)

## Component List
1. **Navbar** - Sticky navigation with logo, menu, search, and cart
2. **CategoryMenu** - Scrollable secondary category menu
3. **HeroSection** - 3-column promotional banner grid
4. **BannerCard** - Reusable banner card component
5. **OfferStrip** - Full-width promotional offer banner
6. **ProductCard** - Individual product display with ratings and wishlist
7. **ProductGrid** - Grid layout for product collections
8. **CategoryShop** - Shop by category section
9. **Carousel** - Horizontal scrollable product carousel
10. **PromoSection** - Split-layout promotional content
11. **Footer** - Comprehensive footer with newsletter and links

## Color Palette
- Primary: #C8A2C8 (Soft Lavender)
- Secondary: #FFFFFF (White)
- Accent Gold: #D4AF37
- Accent Peach: #FFB6A3
- Text Dark: #333333
- Borders: #E8E8E8

## Development Workflow
1. Components are in `components/` using 'use client' directive
2. Mock data in `data/` - replace with API calls for production
3. Global styles in `app/globals.css` with Tailwind imports
4. Responsive design uses Tailwind breakpoints (sm, md, lg)
5. Images use Next.js Image component with Unsplash placeholder URLs

## Customization Points
- Colors: Edit CSS custom properties in `app/globals.css`
- Fonts: Google Fonts URLs in `app/globals.css`
- Mock data: Update `data/products.ts` and `data/categories.ts`
- Component styles: Modify Tailwind classes in component files
- Navigation links: Update `components/Navbar.tsx`

## Running the Project
```bash
npm install          # Install dependencies
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint
```

## Important Notes
- All images are Unsplash placeholder URLs - replace with production images
- Components use local React state (useState) - consider Redux/Zustand for complex state
- No backend integration yet - mock data only
- Mobile-first responsive design
- Smooth animations and hover effects throughout
- Accessible UI with semantic HTML

## Future Enhancements
- Backend API integration
- Shopping cart functionality
- Wishlist persistence
- Product filtering and sorting
- Checkout flow
- User authentication
- Admin dashboard
- Analytics integration

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (latest)

---
**Last Updated**: April 2026
**Status**: Production-ready frontend UI
