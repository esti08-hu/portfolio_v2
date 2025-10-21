import React from 'react';
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

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
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
    </HelmetProvider>
  );
}

export default App;