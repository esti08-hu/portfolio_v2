// Theme transition hook for smooth visual state changes
// T022
import { useState, useCallback, useMemo } from 'react';
import { useMotionValue } from 'framer-motion';

export interface ThemeState {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  shadowColor: string;
}

export interface ThemeTransition {
  duration: number;
  ease: string;
  delay?: number;
}

export interface ThemeConfig {
  light: ThemeState;
  dark: ThemeState;
  immersive: ThemeState;
  [key: string]: ThemeState;
}

const defaultThemes: ThemeConfig = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
    borderColor: '#e5e7eb',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#60a5fa',
    borderColor: '#334155',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  immersive: {
    backgroundColor: '#020617',
    textColor: '#f1f5f9',
    accentColor: '#818cf8',
    borderColor: '#1e293b',
    shadowColor: 'rgba(139, 92, 246, 0.2)',
  },
};

export const useThemeTransition = (
  initialTheme: keyof ThemeConfig = 'dark',
  config: Partial<ThemeConfig> = {}
) => {
  const themes = useMemo(() => ({ ...defaultThemes, ...config }), [config]);
  const [currentTheme, setCurrentTheme] = useState<keyof ThemeConfig>(initialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Motion values for smooth transitions (using numbers for interpolation)
  const transitionProgress = useMotionValue(0);

  const transitionToTheme = useCallback((
    targetTheme: keyof ThemeConfig,
    transition: ThemeTransition = { duration: 0.5, ease: 'easeInOut' }
  ) => {
    if (!themes[targetTheme] || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentTheme(targetTheme);

    // Animate transition progress
    transitionProgress.set(0);
    transitionProgress.set(1);

    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, transition.duration * 1000);
  }, [themes, isTransitioning, transitionProgress]);

  const getCurrentTheme = useCallback(() => themes[currentTheme], [themes, currentTheme]);

  const getInterpolatedValue = useCallback((
    fromTheme: keyof ThemeConfig,
    toTheme: keyof ThemeConfig,
    property: keyof ThemeState,
    progress: number
  ): string => {
    const fromValue = themes[fromTheme]?.[property];
    const toValue = themes[toTheme]?.[property];

    if (!fromValue || !toValue) return fromValue || toValue || '';

    // For colors, we'll use CSS transitions instead of interpolation
    // Return the target value when progress is complete
    return progress >= 1 ? toValue : fromValue;
  }, [themes]);

  return {
    currentTheme,
    isTransitioning,
    transitionProgress,
    transitionToTheme,
    getCurrentTheme,
    getInterpolatedValue,
    themes,
  };
};

export default useThemeTransition;