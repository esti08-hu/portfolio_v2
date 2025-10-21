import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';
import { SEO } from './components/SEO';
import { CustomCursor } from './components/interactions/CustomCursor';
import DynamicBackgrounds from './components/immersive/DynamicBackgrounds';
import ExperimentalNav from './components/immersive/ExperimentalNav';
import GamifiedProjects from './components/immersive/GamifiedProjects';
import ThemeTransitionProvider from './components/immersive/ThemeTransitionProvider';

function App() {
  return (
    <HelmetProvider>
      <ThemeTransitionProvider initialTheme="dark">
        <SEO />
        <div className="min-h-screen bg-slate-900 relative">
          {/* Dynamic background layer */}
          <DynamicBackgrounds variant="particles" intensity="medium" />

          <Header />
          <ExperimentalNav />
          <main>
            <Hero />
            <About />
            <GamifiedProjects />
            <Blog />
            <Contact />
          </main>
          <Footer />
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