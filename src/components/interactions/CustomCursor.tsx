// Custom cursor component for micro-interactions
// T009
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';
import { shouldReduceMotion } from '../../utils/animations';
import { announceToScreenReader } from '../../utils/accessibility';
import { CursorEffect } from '../../types/interactions';

export const CustomCursor: React.FC = () => {
  const { cursor } = useCursor();
  const [lastEffect, setLastEffect] = useState<CursorEffect>('default');

  // Announce cursor effects to screen readers
  useEffect(() => {
    if (cursor.effect !== lastEffect && cursor.effect !== 'default') {
      announceToScreenReader(`Cursor effect changed to ${cursor.effect}`, 'polite');
      setLastEffect(cursor.effect);
    }
  }, [cursor.effect, lastEffect]);

  if (shouldReduceMotion() || !cursor.isVisible) {
    return null;
  }

  const getCursorVariant = () => {
    switch (cursor.effect) {
      case 'glow':
        return {
          scale: 1.5,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
        };
      case 'morph':
        return {
          scale: 2,
          borderRadius: '50%',
          backgroundColor: 'rgba(236, 72, 153, 0.8)',
          boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)',
        };
      default:
        return {
          scale: 1,
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          boxShadow: 'none',
        };
    }
  };

  return (
    <>
      {/* Screen reader announcement for cursor effects */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="cursor-announcements"
      />

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full mix-blend-difference"
        style={{
          left: cursor.position.x - 12,
          top: cursor.position.y - 12,
        }}
        animate={getCursorVariant()}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        role="presentation"
        aria-hidden="true"
      />

      {/* Cursor trail */}
      {cursor.trail.map((point, index) => (
        <motion.div
          key={`${point.x}-${point.y}-${point.timestamp}`}
          className="fixed pointer-events-none z-40 w-2 h-2 rounded-full bg-blue-400/30"
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          role="presentation"
          aria-hidden="true"
        />
      ))}
    </>
  );
};