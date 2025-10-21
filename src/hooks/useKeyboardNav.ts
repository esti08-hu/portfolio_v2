// Keyboard navigation hook for immersive storytelling experience
// T019
import { useEffect, useCallback, useState } from 'react';
import { shouldReduceMotion } from '../utils/animations';

export interface KeyboardNavState {
  currentSection: string;
  isNavigating: boolean;
  direction: 'up' | 'down' | 'left' | 'right' | null;
}

export interface KeyboardNavActions {
  navigateToSection: (sectionId: string) => void;
  navigateNext: () => void;
  navigatePrevious: () => void;
  resetNavigation: () => void;
}

export function useKeyboardNav(
  sections: string[] = ['home', 'about', 'projects', 'blog', 'contact'],
  options: {
    enableArrowKeys?: boolean;
    enableWASD?: boolean;
    enableHJKL?: boolean;
    loopNavigation?: boolean;
    smoothScroll?: boolean;
  } = {}
) {
  const {
    enableArrowKeys = true,
    enableWASD = true,
    enableHJKL = false,
    loopNavigation = true,
    smoothScroll = true,
  } = options;

  const [navState, setNavState] = useState<KeyboardNavState>({
    currentSection: sections[0] || 'home',
    isNavigating: false,
    direction: null,
  });

  const navigateToSection = useCallback((sectionId: string) => {
    if (!sections.includes(sectionId)) return;

    setNavState(prev => ({
      ...prev,
      currentSection: sectionId,
      isNavigating: true,
      direction: null,
    }));

    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: smoothScroll && !shouldReduceMotion() ? 'smooth' : 'auto',
        block: 'start',
      });
    }

    // Reset navigation state after animation
    setTimeout(() => {
      setNavState(prev => ({ ...prev, isNavigating: false }));
    }, 500);
  }, [sections, smoothScroll]);

  const navigateNext = useCallback(() => {
    const currentIndex = sections.indexOf(navState.currentSection);
    const nextIndex = loopNavigation
      ? (currentIndex + 1) % sections.length
      : Math.min(currentIndex + 1, sections.length - 1);

    navigateToSection(sections[nextIndex]);
    setNavState(prev => ({ ...prev, direction: 'down' }));
  }, [navState.currentSection, sections, loopNavigation, navigateToSection]);

  const navigatePrevious = useCallback(() => {
    const currentIndex = sections.indexOf(navState.currentSection);
    const prevIndex = loopNavigation
      ? (currentIndex - 1 + sections.length) % sections.length
      : Math.max(currentIndex - 1, 0);

    navigateToSection(sections[prevIndex]);
    setNavState(prev => ({ ...prev, direction: 'up' }));
  }, [navState.currentSection, sections, loopNavigation, navigateToSection]);

  const resetNavigation = useCallback(() => {
    setNavState({
      currentSection: sections[0] || 'home',
      isNavigating: false,
      direction: null,
    });
  }, [sections]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevent navigation if user is typing in an input
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return;
    }

    const key = event.key.toLowerCase();

    // Arrow key navigation
    if (enableArrowKeys) {
      if (key === 'arrowdown' || key === 'arrowright') {
        event.preventDefault();
        navigateNext();
        return;
      }
      if (key === 'arrowup' || key === 'arrowleft') {
        event.preventDefault();
        navigatePrevious();
        return;
      }
    }

    // WASD navigation
    if (enableWASD) {
      if (key === 's' || key === 'd') {
        event.preventDefault();
        navigateNext();
        return;
      }
      if (key === 'w' || key === 'a') {
        event.preventDefault();
        navigatePrevious();
        return;
      }
    }

    // HJKL navigation (vim-style)
    if (enableHJKL) {
      if (key === 'j' || key === 'l') {
        event.preventDefault();
        navigateNext();
        return;
      }
      if (key === 'k' || key === 'h') {
        event.preventDefault();
        navigatePrevious();
        return;
      }
    }

    // Number key navigation (1-9 for sections)
    const numKey = parseInt(key);
    if (numKey >= 1 && numKey <= sections.length) {
      event.preventDefault();
      navigateToSection(sections[numKey - 1]);
      return;
    }

    // Home/End keys
    if (key === 'home') {
      event.preventDefault();
      navigateToSection(sections[0]);
      return;
    }
    if (key === 'end') {
      event.preventDefault();
      navigateToSection(sections[sections.length - 1]);
      return;
    }
  }, [enableArrowKeys, enableWASD, enableHJKL, sections, navigateNext, navigatePrevious, navigateToSection]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
            setNavState(prev => ({
              ...prev,
              currentSection: sections[i],
            }));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return {
    ...navState,
    navigateToSection,
    navigateNext,
    navigatePrevious,
    resetNavigation,
  };
}