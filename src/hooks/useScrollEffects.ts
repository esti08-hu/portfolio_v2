// Scroll effects hook for immersive storytelling experience
// T020
import { useEffect, useState, useCallback } from 'react';
import { shouldReduceMotion } from '../utils/animations';

export interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'none';
  scrollProgress: number;
  isScrolling: boolean;
  velocity: number;
}

export interface ScrollEffects {
  parallaxOffset: (speed: number) => number;
  fadeInOffset: (threshold?: number) => boolean;
  scaleOffset: (minScale?: number, maxScale?: number) => number;
  rotateOffset: (maxRotation?: number) => number;
  blurOffset: (maxBlur?: number) => number;
}

export function useScrollEffects(options: {
  enableParallax?: boolean;
  enableFadeIn?: boolean;
  enableScale?: boolean;
  enableRotate?: boolean;
  enableBlur?: boolean;
} = {}) {
  const {
    enableParallax = true,
    enableFadeIn = true,
    enableScale = true,
    enableRotate = true,
    enableBlur = true,
  } = options;

  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: 'none',
    scrollProgress: 0,
    isScrolling: false,
    velocity: 0,
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime;
    const scrollDelta = currentScrollY - lastScrollY;

    const velocity = timeDelta > 0 ? Math.abs(scrollDelta) / timeDelta : 0;
    const direction = scrollDelta > 0 ? 'down' : scrollDelta < 0 ? 'up' : 'none';

    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = documentHeight > 0 ? currentScrollY / documentHeight : 0;

    setScrollState({
      scrollY: currentScrollY,
      scrollDirection: direction,
      scrollProgress,
      isScrolling: velocity > 0.1,
      velocity,
    });

    setLastScrollY(currentScrollY);
    setLastScrollTime(currentTime);
  }, [lastScrollY, lastScrollTime]);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollState]);

  // Scroll effects calculations
  const effects: ScrollEffects = {
    parallaxOffset: useCallback((speed: number) => {
      if (!enableParallax || shouldReduceMotion()) return 0;
      return scrollState.scrollY * speed;
    }, [scrollState.scrollY, enableParallax]),

    fadeInOffset: useCallback((threshold: number = 0.1) => {
      if (!enableFadeIn || shouldReduceMotion()) return true;
      return scrollState.scrollProgress > threshold;
    }, [scrollState.scrollProgress, enableFadeIn]),

    scaleOffset: useCallback((minScale: number = 0.8, maxScale: number = 1.2) => {
      if (!enableScale || shouldReduceMotion()) return 1;
      const progress = scrollState.scrollProgress;
      return minScale + (maxScale - minScale) * progress;
    }, [scrollState.scrollProgress, enableScale]),

    rotateOffset: useCallback((maxRotation: number = 10) => {
      if (!enableRotate || shouldReduceMotion()) return 0;
      const progress = scrollState.scrollProgress;
      return maxRotation * progress;
    }, [scrollState.scrollProgress, enableRotate]),

    blurOffset: useCallback((maxBlur: number = 5) => {
      if (!enableBlur || shouldReduceMotion()) return 0;
      const progress = scrollState.scrollProgress;
      return maxBlur * progress;
    }, [scrollState.scrollProgress, enableBlur]),
  };

  return {
    ...scrollState,
    effects,
  };
}