# Estifanos Ameha - Portfolio

A modern, immersive portfolio website built with React 18, TypeScript 5.x, and cutting-edge web technologies. Featuring interactive 3D experiences, advanced performance optimizations, and a command-driven interface for seamless navigation.

## 🚀 Features

### Core Features
- **Modern Design**: Clean, professional UI with fluid micro-interactions
- **Responsive**: Optimized for all devices and screen sizes
- **Performance**: Fast loading with lazy loading, code splitting, and Core Web Vitals optimization
- **SEO Optimized**: Meta tags, structured data, and social media cards
- **PWA Ready**: Progressive Web App with offline capabilities and service worker
- **Contact Form**: Functional contact form with validation and error handling

### Advanced Features
- **3D Experiences**: Interactive Three.js scenes with WebGL rendering and performance monitoring
- **Command Palette**: Keyboard-driven navigation system (Cmd/Ctrl+K) for quick access to sections
- **Loading Animations**: Smooth loading states with skeleton screens and progress indicators
- **Performance Monitoring**: Real-time Core Web Vitals tracking (FCP, FID, CLS, TTFB)
- **Adaptive Quality**: Automatic quality adjustment based on device capabilities and performance
- **Accessibility**: WCAG compliant with proper ARIA labels, keyboard navigation, and screen reader support

### Developer Experience
- **TypeScript 5.x**: Full type safety with modern TypeScript features
- **Hot Module Replacement**: Instant updates during development
- **Bundle Analysis**: Built-in bundle analyzer for optimization insights
- **ESLint Integration**: Code quality enforcement with zero-config setup

## 🛠 Tech Stack

### Frontend Framework
- **React 18** - Modern React with concurrent features and automatic batching
- **TypeScript 5.x** - Latest TypeScript with advanced type system features
- **Vite** - Next-generation frontend tooling with lightning-fast HMR

### 3D & Graphics
- **Three.js** - 3D graphics library for WebGL experiences
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Forms & Validation
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Performance & Quality
- **ESLint** - Pluggable linting utility for JavaScript and TypeScript
- **Vite Bundle Analyzer** - Visualize and analyze bundle size
- **Workbox** - Set of libraries for Progressive Web Apps

### Development Tools
- **Vite PWA Plugin** - Zero-config PWA plugin for Vite
- **TypeScript Compiler** - Official TypeScript compiler
- **Autoprefixer & PostCSS** - CSS processing and vendor prefixing

## 📦 Installation

### Prerequisites

- **Node.js 18+** - Required for Vite and modern JavaScript features
- **npm or yarn** - Package manager
- **Git** - Version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/esti08-hu/portfolio-v2.git
   cd portfolio-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the portfolio

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Analyze bundle size
npm run analyze
```

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **`src/components/SEO.tsx`** - Update meta tags and structured data
2. **`src/components/sections/Hero.tsx`** - Update name, title, and description
3. **`src/components/sections/About.tsx`** - Update personal story and skills
4. **`src/components/sections/Projects.tsx`** - Add your real projects
5. **`src/components/sections/Contact.tsx`** - Update contact information

### Styling

- **Colors**: Update color scheme in `tailwind.config.js`
- **Fonts**: Change fonts in `index.html` and `tailwind.config.js`
- **Animations**: Modify animations in `src/styles/globals.css`

### Content

- **Projects**: Replace placeholder projects with your real work
- **Skills**: Update skills and technologies in About section
- **Experience**: Add your actual work experience and achievements
- **Blog**: Add your blog posts or remove the section

## 📁 Project Structure

```
src/
├── components/
│   ├── advanced/           # Advanced components (ThreeScene, CommandPalette, LoadingAnimation)
│   ├── layout/             # Header, Footer
│   ├── performance/        # Performance monitoring components
│   ├── sections/           # Main page sections (Hero, About, Projects, etc.)
│   ├── ui/                 # Reusable UI components (Button, Card)
│   └── SEO.tsx             # SEO and meta tags component
├── hooks/
│   ├── useCommandPalette.ts # Command palette functionality
│   ├── useThreeScene.ts     # Three.js scene management
│   └── usePerformanceMonitor.ts # Performance monitoring
├── utils/
│   ├── animations.ts        # Animation utilities and reduced motion detection
│   ├── performance.ts       # Performance optimization utilities
│   └── validation.ts        # Form validation schemas
├── styles/
│   └── globals.css          # Global styles and animations
├── App.tsx                  # Main app component with lazy loading
├── main.tsx                 # Application entry point
└── vite-env.d.ts           # Vite type definitions
```

### Key Architecture Features

- **Lazy Loading**: Heavy components (ThreeScene, CommandPalette) are lazy-loaded for better initial load performance
- **Code Splitting**: Manual chunking strategy in Vite config for optimal bundle sizes
- **Component Organization**: Modular structure with clear separation of concerns
- **Performance Monitoring**: Built-in performance tracking with Core Web Vitals

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### GitHub Pages

1. Add `gh-pages` dependency
2. Update `package.json` scripts
3. Deploy with `npm run deploy`

## 📊 Performance

### Core Web Vitals Optimization

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to First Byte (TTFB)**: < 600ms

### Bundle Optimization

- **Code Splitting**: Automatic and manual chunking for optimal loading
- **Lazy Loading**: Heavy components loaded on-demand
- **Tree Shaking**: Unused code automatically removed
- **Compression**: Gzip compression for all assets

### Performance Monitoring

The portfolio includes built-in performance monitoring:

- **Real-time Metrics**: Core Web Vitals tracking in development
- **Performance Observer**: Browser performance API integration
- **Memory Monitoring**: JavaScript heap usage tracking
- **Adaptive Quality**: Automatic quality adjustment for 3D scenes

### Bundle Analysis

```bash
# Analyze bundle size and composition
npm run analyze

# View detailed bundle report
npm run build:analyze
```

### Performance Features

- **Progressive Loading**: Components load progressively based on viewport
- **Resource Pooling**: Efficient memory management for 3D assets
- **LOD (Level of Detail)**: Adaptive quality based on distance and performance
- **Frustum Culling**: Efficient rendering optimization for 3D scenes

## 🔧 Scripts

### Development
```bash
npm run dev          # Start development server with HMR
npm run preview      # Preview production build locally
```

### Building & Quality
```bash
npm run build        # Build for production with optimizations
npm run type-check   # Run TypeScript type checking
npm run lint         # Lint code with ESLint (zero warnings)
```

### Analysis & Debugging
```bash
npm run analyze      # Analyze bundle size and composition
npm run build:analyze # Build and analyze bundle with visual report
```

### Available Scripts Summary
- `dev` - Development server
- `build` - Production build
- `preview` - Production preview
- `lint` - Code linting
- `type-check` - TypeScript checking
- `analyze` - Bundle analysis
- `build:analyze` - Build with analysis

## ⌨️ Keyboard Shortcuts

The portfolio includes a command palette for quick navigation:

- **`Cmd/Ctrl + K`** - Open command palette
- **`Escape`** - Close command palette or modals
- **Arrow Keys** - Navigate through commands
- **`Enter`** - Execute selected command

### Available Commands

- **Navigation**: Home, About, Projects, Blog, Contact
- **Actions**: Scroll to top, Toggle theme (future feature)
- **Custom Commands**: Add your own commands programmatically

## 🎮 Interactive Features

### 3D Scene
- **WebGL Rendering**: Hardware-accelerated 3D graphics
- **Adaptive Quality**: Automatic quality adjustment based on device performance
- **Performance Monitoring**: Real-time FPS and memory usage tracking
- **Reduced Motion**: Respects user's motion preferences

### Loading States
- **Skeleton Screens**: Smooth loading transitions
- **Progress Indicators**: Visual feedback during loading
- **Error Boundaries**: Graceful error handling with retry options

### Animations
- **Micro-interactions**: Subtle animations for better UX
- **Framer Motion**: Production-ready animation library
- **Reduced Motion Support**: Accessibility-compliant animations

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Google Analytics (optional)
VITE_GA_TRACKING_ID=your-ga-tracking-id

# Contact Information
VITE_CONTACT_EMAIL=estioame@gmail.com

# Site Configuration
VITE_SITE_URL=https://yourdomain.com
VITE_SITE_TITLE="Estifanos Ameha - Portfolio"
VITE_SITE_DESCRIPTION="Full-stack developer and machine learning enthusiast"

# Performance Monitoring (development only)
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

## 🔧 Troubleshooting

### Common Issues

**3D Scene Not Loading**
- Check browser WebGL support
- Ensure hardware acceleration is enabled
- Try updating graphics drivers

**Command Palette Not Working**
- Check keyboard layout and shortcuts
- Ensure no browser extensions are interfering
- Try refreshing the page

**Performance Issues**
- Run `npm run analyze` to check bundle size
- Clear browser cache and service worker
- Check network tab for failed requests

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

### Development Tips

- Use `npm run type-check` for TypeScript errors
- Run `npm run lint` before committing
- Use `npm run analyze` to optimize bundle size
- Check browser console for runtime errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Contact

- **Email**: [estioame@gmail.com](mailto:estioame@gmail.com)
- **LinkedIn**: [Estifanos Ameha](https://www.linkedin.com/in/estifanosameha/)
- **GitHub**: [@esti08-hu](https://github.com/esti08-hu)

---

Made with ❤️ by [Estifanos Ameha](https://yourdomain.com)
