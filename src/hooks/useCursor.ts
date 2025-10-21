// Custom cursor hook for micro-interactions
// T012
import { useState, useEffect, useCallback } from 'react';
import { CursorState, CursorEffect } from '../types/interactions';
import { shouldReduceMotion } from '../utils/animations';

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    position: { x: 0, y: 0 },
    isVisible: false,
    effect: 'default',
    trail: []
  });

  const updateCursor = useCallback((e: MouseEvent) => {
    if (shouldReduceMotion()) return;

    const newPosition = { x: e.clientX, y: e.clientY };
    setCursor(prev => ({
      ...prev,
      position: newPosition,
      isVisible: true,
      trail: [
        ...prev.trail.slice(-4), // Keep last 5 positions
        { ...newPosition, timestamp: Date.now() }
      ]
    }));
  }, []);

  const setEffect = useCallback((effect: CursorEffect) => {
    setCursor(prev => ({ ...prev, effect }));
  }, []);

  const hideCursor = useCallback(() => {
    setCursor(prev => ({ ...prev, isVisible: false }));
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, [updateCursor, hideCursor]);

  return {
    cursor,
    setEffect,
    hideCursor
  };
}