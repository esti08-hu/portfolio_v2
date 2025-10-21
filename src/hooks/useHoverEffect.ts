// Hover effect hook for micro-interactions
// T013
import { useState, useCallback } from 'react';
import { shouldReduceMotion } from '../utils/animations';

export function useHoverEffect() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!shouldReduceMotion()) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!shouldReduceMotion()) {
      setIsHovered(false);
    }
  }, []);

  const handleFocus = useCallback(() => {
    if (!shouldReduceMotion()) {
      setIsHovered(true);
    }
  }, []);

  const handleBlur = useCallback(() => {
    if (!shouldReduceMotion()) {
      setIsHovered(false);
    }
  }, []);

  const hoverProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return {
    isHovered,
    hoverProps,
  };
}