// Three.js scene hook for managing 3D experiences and performance
// T027
import React, { useState, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';
import { SEO } from './components/SEO';
import { CustomCursor } from './components/interactions/CustomCursor';
import DynamicBackgrounds from './components/immersive/DynamicBackgrounds';
import ExperimentalNav from './components/immersive/ExperimentalNav';
import GamifiedProjects from './components/immersive/GamifiedProjects';
import ThemeTransitionProvider from './components/immersive/ThemeTransitionProvider';

// Lazy load heavy components for better performance
const ThreeScene = lazy(() => import('./components/advanced/ThreeScene'));
const CommandPalette = lazy(() => import('./components/advanced/CommandPalette'));
const LoadingAnimation = lazy(() => import('./components/advanced/LoadingAnimation'));
const PerformanceMonitor = lazy(() => import('./components/performance/PerformanceMonitor'));

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Command palette commands
  const commands = [
    {
      id: 'home',
      title: 'Go to Home',
      description: 'Navigate to the hero section',
      category: 'Navigation',
      action: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        setIsCommandPaletteOpen(false);
      },
      keywords: ['home', 'hero', 'start']
    },
    {
      id: 'about',
      title: 'Go to About',
      description: 'Navigate to the about section',
      category: 'Navigation',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setIsCommandPaletteOpen(false);
      },
      keywords: ['about', 'me', 'bio']
    },
    {
      id: 'projects',
      title: 'Go to Projects',
      description: 'Navigate to the projects section',
      category: 'Navigation',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setIsCommandPaletteOpen(false);
      },
      keywords: ['projects', 'work', 'portfolio']
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      description: 'Navigate to the contact section',
      category: 'Navigation',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setIsCommandPaletteOpen(false);
      },
      keywords: ['contact', 'email', 'message']
    }
  ];

  // Keyboard shortcut for command palette
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HelmetProvider>
      <ThemeTransitionProvider initialTheme="dark">
        <SEO />
        <div className="min-h-screen bg-slate-900 relative">
          {/* Dynamic background layer */}
          <DynamicBackgrounds variant="particles" intensity="medium" />

          {/* 3D Scene Background */}
          <Suspense fallback={null}>
            <ThreeScene scene="portfolio" className="fixed inset-0 pointer-events-none z-0" />
          </Suspense>

          <Header />
          <ExperimentalNav />
          <main>
            <Hero />
            <About />
            <Projects />
            <GamifiedProjects />
            <Blog />
            <Contact />
          </main>
          <Footer />

          {/* Advanced UI Components */}
          <Suspense fallback={null}>
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              commands={commands}
            />
          </Suspense>
          <Suspense fallback={null}>
            <LoadingAnimation
              isLoading={false}
              variant="spinner"
              size="md"
              className="fixed top-4 right-4 z-50"
            />
          </Suspense>

          {/* Performance Monitoring */}
          <Suspense fallback={null}>
            <PerformanceMonitor
              enabled={import.meta.env.PROD}
              onMetricsCollected={(metrics) => {
                console.log('Performance metrics:', metrics);
                // In production, you could send this to analytics
              }}
            />
          </Suspense>

          <CustomCursor />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155'
              },
            }}
          />
        </div>
      </ThemeTransitionProvider>
    </HelmetProvider>
  );
}

export default App;