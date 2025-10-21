// Theme transition provider component for smooth visual state changes
// T022
import React, { createContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeTransition, ThemeConfig, ThemeState } from '../../hooks/useThemeTransition';
import { useScrollEffects } from '../../hooks/useScrollEffects';

export interface ThemeTransitionContextType {
  currentTheme: keyof ThemeConfig;
  transitionToTheme: (theme: keyof ThemeConfig) => void;
  isTransitioning: boolean;
  getCurrentTheme: () => ThemeState;
}

export const ThemeTransitionContext = createContext<ThemeTransitionContextType | null>(null);

interface ThemeTransitionProviderProps {
  children: React.ReactNode;
  initialTheme?: keyof ThemeConfig;
  config?: Partial<ThemeConfig>;
}

export const ThemeTransitionProvider: React.FC<ThemeTransitionProviderProps> = ({
  children,
  initialTheme = 'dark',
  config,
}) => {
  const { scrollProgress } = useScrollEffects();
  const {
    currentTheme,
    isTransitioning,
    transitionToTheme,
    getCurrentTheme,
  } = useThemeTransition(initialTheme, config);

  // Auto-transition based on scroll progress
  useEffect(() => {
    const threshold = 0.3;
    if (scrollProgress > threshold && currentTheme === 'dark') {
      transitionToTheme('immersive');
    } else if (scrollProgress < threshold && currentTheme === 'immersive') {
      transitionToTheme('dark');
    }
  }, [scrollProgress, currentTheme, transitionToTheme]);

  // Apply theme CSS variables
  useEffect(() => {
    const theme = getCurrentTheme();
    if (!theme) return;

    const root = document.documentElement;

    root.style.setProperty('--theme-bg', theme.backgroundColor);
    root.style.setProperty('--theme-text', theme.textColor);
    root.style.setProperty('--theme-accent', theme.accentColor);
    root.style.setProperty('--theme-border', theme.borderColor);
    root.style.setProperty('--theme-shadow', theme.shadowColor);
  }, [currentTheme, getCurrentTheme]);

  const contextValue: ThemeTransitionContextType = {
    currentTheme,
    transitionToTheme,
    isTransitioning,
    getCurrentTheme: () => getCurrentTheme() || {
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      accentColor: '#60a5fa',
      borderColor: '#334155',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <ThemeTransitionContext.Provider value={contextValue}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="theme-transition-wrapper"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeTransitionContext.Provider>
  );
};

export default ThemeTransitionProvider;