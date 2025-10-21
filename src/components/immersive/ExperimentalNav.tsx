// Experimental navigation component for immersive storytelling experience
// T016
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import { shouldReduceMotion } from '../../utils/animations';

interface ExperimentalNavProps {
  className?: string;
}

const ExperimentalNav: React.FC<ExperimentalNavProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navStyle, setNavStyle] = useState<'minimal' | 'expanded' | 'floating'>('minimal');

  const {
    currentSection,
    isNavigating,
    navigateToSection,
    navigateNext,
    navigatePrevious,
  } = useKeyboardNav();

  const sections = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  // Dynamic nav style based on scroll position and interaction
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > windowHeight * 0.5) {
        setNavStyle('floating');
      } else if (isOpen) {
        setNavStyle('expanded');
      } else {
        setNavStyle('minimal');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (sectionId: string) => {
    navigateToSection(sectionId);
    setIsOpen(false);
  };

  const navVariants = {
    minimal: {
      width: 60,
      height: 60,
      borderRadius: '50%',
    },
    expanded: {
      width: 'auto',
      height: 60,
      borderRadius: '30px',
    },
    floating: {
      width: 'auto',
      height: 50,
      borderRadius: '25px',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (shouldReduceMotion()) {
    return (
      <nav className={`fixed top-6 right-6 z-40 ${className}`}>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleNav}
            className="w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <div className="flex items-center space-x-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {section.icon} {section.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-6 right-6 z-40 ${className}`}>
      <motion.div
        className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center overflow-hidden"
        variants={navVariants}
        animate={navStyle}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Navigation Toggle */}
        <motion.button
          onClick={toggleNav}
          className="w-12 h-12 flex items-center justify-center text-white hover:bg-slate-700/50 transition-colors rounded-full flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle navigation menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </motion.button>

        {/* Navigation Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex items-center space-x-2 px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-neutral-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isNavigating}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.label}</span>
                  {currentSection === section.id && (
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Navigation Arrows */}
        {navStyle === 'floating' && (
          <motion.div
            className="flex items-center space-x-1 px-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={navigatePrevious}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isNavigating}
              aria-label="Navigate to previous section"
            >
              <ChevronUp size={16} />
            </motion.button>
            <motion.button
              onClick={navigateNext}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isNavigating}
              aria-label="Navigate to next section"
            >
              <ChevronDown size={16} />
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Keyboard Navigation Hint */}
      <AnimatePresence>
        {navStyle === 'floating' && !isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 px-3 py-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg text-xs text-neutral-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 1 }}
          >
            Use ↑↓ or WASD to navigate
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ExperimentalNav;
