# Development Guide - Serenlogue Frontend

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- A code editor (VS Code recommended)

### Initial Setup
```bash
# Clone/navigate to the project
cd /home/osib/projects/cosmetic

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Project Architecture

### Component Structure
Each component is a self-contained module with:
- Type definitions for props
- 'use client' directive for client-side rendering
- Clear prop interfaces
- Responsive design patterns

Example component structure:
```typescript
'use client';

import React, { useState } from 'react';
import { lucideIcons } from 'lucide-react';

interface ComponentProps {
  title: string;
  items: Item[];
}

export default function Component({ title, items }: ComponentProps) {
  const [state, setState] = useState(false);
  
  return (
    <div className="flex flex-col gap-4">
      {/* Component JSX */}
    </div>
  );
}
```

### Data Structure
- **Products**: ID, name, price, originalPrice, image, rating, reviews, discount, category
- **Categories**: ID, name, image
- Keep mock data in `/data` folder

### Styling Approach
- **Tailwind CSS v4**: Utility-first CSS framework
- **Custom Properties**: Brand colors in CSS variables
- **Breakpoints**: Mobile-first (sm, md, lg)
- **Animations**: Defined in globals.css with @keyframes

## Component Development

### Creating a New Component
1. Create file in `/components` directory
2. Add 'use client' directive if using interactivity
3. Define TypeScript interfaces for props
4. Use Tailwind utility classes for styling
5. Export as default

### Component Best Practices
- Keep components focused and reusable
- Pass data via props, not hardcoded
- Use TypeScript for type safety
- Handle responsive design with Tailwind breakpoints
- Add hover effects for interactivity
- Use semantic HTML elements

### Tailwind Breakpoints
```typescript
// Mobile first approach
<div className="
  px-4              // mobile (default)
  sm:px-6           // 640px+
  md:px-8           // 1024px+
  lg:px-12          // 1280px+
">
```

## Styling Guidelines

### Color Usage
```css
/* Primary actions and highlights */
bg-gradient-to-r from-purple-500 to-pink-500

/* Secondary elements */
text-gray-700, text-gray-400, text-gray-100

/* Hover states */
hover:text-purple-600, hover:shadow-lg

/* Accents (use sparingly) */
text-yellow-400 (for ratings)
```

### Spacing Consistency
- Sections: `py-10 sm:py-14 md:py-16`
- Components: `gap-4 sm:gap-6 md:gap-8`
- Padding: `px-4 sm:px-6 lg:px-8`

### Responsive Variants
```typescript
// Images
<Image sizes="(max-width: 768px) 100vw, 50vw" />

// Text sizes
<h1 className="text-2xl sm:text-3xl md:text-4xl" />

// Grid layouts
<div className="grid grid-cols-2 md:grid-cols-4" />
```

## Common Patterns

### Product Card Pattern
```typescript
<div className="group bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-lg-custom transition-all duration-300 hover:scale-105">
  <div className="relative h-64 overflow-hidden">
    <Image ... className="group-hover:scale-110 transition-transform" />
  </div>
  <div className="p-4">
    {/* Content */}
  </div>
</div>
```

### Scrollable Menu Pattern
```typescript
useRef + scrollBy() for smooth horizontal scrolling
with hidden scrollbar using CSS
```

### Responsive Grid Pattern
```typescript
grid-cols-1        // mobile
sm:grid-cols-2     // small screens
md:grid-cols-3     // medium screens
lg:grid-cols-4     // large screens
gap-4 sm:gap-6     // responsive gaps
```

## Images & Assets

### Image Optimization
- Use Next.js `Image` component
- Include `fill` prop for dynamic sizing
- Always include `alt` text
- Use `sizes` prop for responsive images
- Images are currently Unsplash placeholders - replace with real URLs

### Placeholder Images
All current images use Unsplash URLs:
```
https://images.unsplash.com/photo-[ID]?w=400&h=400&fit=crop
```

Replace with your own CDN/image service.

## Performance Considerations

### Optimizations
- Images lazy-loaded by default with Next.js
- Tailwind CSS purges unused styles in production
- Client components use 'use client' only where needed
- CSS custom properties for theme switching without JS
- Smooth transitions for perceived performance

### Best Practices
- Avoid unnecessary re-renders with proper component splitting
- Use CSS for animations instead of JavaScript
- Keep bundle size small with tree-shaking
- Test performance in production build

## Testing

### Manual Testing Checklist
- [ ] Load page on mobile (< 640px)
- [ ] Test on tablet (640-1024px)
- [ ] Verify on desktop (> 1024px)
- [ ] Check hover effects on desktop
- [ ] Test mobile menu toggle
- [ ] Verify image loading
- [ ] Test form inputs (newsletter)
- [ ] Check scroll performance
- [ ] Verify accessibility (keyboard nav)

### Production Build Testing
```bash
npm run build    # Build for production
npm run start    # Run production server
# Test at http://localhost:3000
```

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
None required for current setup. Add to `.env.local` if needed:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Deployment Platforms
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect GitHub repo
- **AWS/Azure**: Build and deploy Docker container
- **Self-hosted**: Node.js server required

## Common Issues & Solutions

### Images Not Loading
- Check if URL is accessible
- Verify image path is correct
- Check image format (JPG, PNG, WebP)
- Use network tab in DevTools to debug

### Styles Not Applying
- Clear `.next` build cache
- Hard refresh browser (Ctrl+Shift+R)
- Check Tailwind class spelling
- Verify responsive breakpoint is correct

### Animations Janky
- Use GPU-accelerated properties (transform, opacity)
- Avoid animating width/height
- Check browser performance (DevTools)
- Reduce animation duration if too slow

### Mobile Menu Not Working
- Check z-index values
- Verify onClick handlers
- Test touch events on actual device
- Check for CSS overflow hidden on parent

## Code Style

### TypeScript
- Use interfaces for component props
- Avoid `any` type
- Define return types for functions
- Use union types instead of `typeof` checks

### Naming Conventions
- Components: PascalCase (ProductCard.tsx)
- Regular functions: camelCase (handleClick)
- Constants: UPPER_SNAKE_CASE (MAX_ITEMS)
- Files: match component name

### Comments
```typescript
// Use for brief explanations
/** Use for complex sections */
// TODO: Future improvements
// FIXME: Known issues
```

## Adding New Features

### Feature Checklist
1. Create/update components in `/components`
2. Update mock data in `/data` if needed
3. Add types/interfaces in component file
4. Implement responsive design
5. Add hover/interaction effects
6. Test on mobile and desktop
7. Update documentation
8. Commit with clear message

### Example: Adding Product Filter
1. Create `components/ProductFilter.tsx`
2. Add state management for filters
3. Update `ProductGrid` to accept filters prop
4. Update `data/products.ts` if needed
5. Add filter UI items
6. Test filtering functionality

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Debugging
npm run build -- --debug # Verbose build output

# Cleaning
rm -rf .next             # Clear Next.js cache
rm -rf node_modules      # Remove dependencies
npm install              # Reinstall all packages
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev/)
- [React Documentation](https://react.dev/)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

### Dependencies Issues
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Hot Reload Not Working
- Check that changes are actually saved
- Clear browser cache
- Restart dev server
- Check console for errors

---

**Last Updated**: April 2026
**Maintained By**: Serenlogue Development Team
