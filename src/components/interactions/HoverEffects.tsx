// Hover effects component for micro-interactions
// T010
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useHoverEffect } from '../../hooks/useHoverEffect';
import { hoverScaleVariants, hoverGlowVariants, shouldReduceMotion } from '../../utils/animations';

interface HoverEffectsProps {
  children: ReactNode;
  effect?: 'scale' | 'glow' | 'both';
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export const HoverEffects: React.FC<HoverEffectsProps> = ({
  children,
  effect = 'scale',
  className = '',
  onHoverStart,
  onHoverEnd,
}) => {
  const { hoverProps } = useHoverEffect();

  const getVariants = () => {
    if (shouldReduceMotion()) return {};

    switch (effect) {
      case 'scale':
        return hoverScaleVariants;
      case 'glow':
        return hoverGlowVariants;
      case 'both':
        return {
          initial: { scale: 1, boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
          hover: {
            scale: 1.05,
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            transition: {
              duration: 0.15,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        };
      default:
        return hoverScaleVariants;
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="initial"
      whileHover="hover"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
};