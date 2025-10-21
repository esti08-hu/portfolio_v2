import React from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../../utils/accessibility';

interface KineticTypographyProps {
  text: string;
  className?: string;
  variant?: 'wave' | 'bounce' | 'glow' | 'typewriter' | 'fade-in';
  delay?: number;
  duration?: number;
}

const KineticTypography: React.FC<KineticTypographyProps> = ({
  text,
  className = '',
  variant = 'fade-in',
  delay = 0,
  duration = 0.8
}) => {
  const getAnimationVariants = () => {
    if (prefersReducedMotion()) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      };
    }

    switch (variant) {
      case 'wave':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
      case 'bounce':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              damping: 10,
              stiffness: 100
            }
          }
        };
      case 'glow':
        return {
          hidden: { opacity: 0, textShadow: '0 0 0 rgba(59, 130, 246, 0)' },
          visible: {
            opacity: 1,
            textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            transition: { duration: 1 }
          }
        };
      case 'typewriter':
        return {
          hidden: { width: 0 },
          visible: {
            width: '100%',
            transition: { duration: text.length * 0.05 }
          }
        };
      case 'fade-in':
      default:
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  const itemVariants = getAnimationVariants();

  if (variant === 'typewriter') {
    return (
      <motion.div
        className={`inline-block overflow-hidden whitespace-nowrap ${className}`}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ duration }}
        role="text"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="inline-block">
          {text}
        </span>
        <motion.span
          className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          aria-hidden="true"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      role="text"
      aria-live="polite"
      aria-atomic="true"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          transition={{ duration, delay: index * 0.05 }}
          className="inline-block"
          style={{
            display: char === ' ' ? 'inline' : 'inline-block'
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default KineticTypography;
