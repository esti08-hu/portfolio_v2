/**
 * Accessibility utilities for micro-interactions
 * Ensures inclusive user experiences across all interaction features
 */

// Media query helpers for accessibility preferences
export const ACCESSIBILITY_QUERIES = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: high)',
  reducedTransparency: '(prefers-reduced-transparency: reduce)',
} as const;

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(ACCESSIBILITY_QUERIES.reducedMotion).matches;
};

// Check if user prefers high contrast
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(ACCESSIBILITY_QUERIES.highContrast).matches;
};

// Check if user prefers reduced transparency
export const prefersReducedTransparency = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(ACCESSIBILITY_QUERIES.reducedTransparency).matches;
};

// Safe animation duration that respects user preferences
export const getAccessibleDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

// Safe animation configuration that respects user preferences
export const getAccessibleAnimation = <T extends Record<string, unknown>>(
  animation: T,
  fallback: T = {} as T
): T => {
  return prefersReducedMotion() ? fallback : animation;
};

// Focus management utilities
export const focusableSelectors = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

export const getFocusableElements = (container: HTMLElement = document.body): HTMLElement[] => {
  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
};

// Trap focus within a container (for modals, etc.)
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

// Announce content to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';

  document.body.appendChild(announcement);
  announcement.textContent = message;

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Check if element is visible to screen readers
export const isElementVisible = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' &&
         style.visibility !== 'hidden' &&
         style.opacity !== '0' &&
         element.getAttribute('aria-hidden') !== 'true';
};

// Generate unique IDs for ARIA relationships
let idCounter = 0;
export const generateUniqueId = (prefix: string = 'interaction'): string => {
  return `${prefix}-${++idCounter}`;
};

// Color contrast utilities (basic implementation)
// Note: In production, use a proper color contrast library like 'color-contrast'
export const getContrastRatio = (): number => {
  // Placeholder implementation - assumes good contrast for demo purposes
  // In production, implement proper WCAG contrast ratio calculation
  return 4.5; // WCAG AA threshold
};

export const hasGoodContrast = (): boolean => {
  // Placeholder implementation - assumes good contrast for demo purposes
  return getContrastRatio() >= 4.5;
};