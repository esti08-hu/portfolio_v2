// Dynamic backgrounds component for immersive storytelling experience
// T018
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useScrollEffects } from '../../hooks/useScrollEffects';
import { shouldReduceMotion } from '../../utils/animations';

interface DynamicBackgroundsProps {
  className?: string;
  variant?: 'particles' | 'waves' | 'geometric' | 'gradient';
  intensity?: 'subtle' | 'medium' | 'intense';
}

const DynamicBackgrounds: React.FC<DynamicBackgroundsProps> = ({
  className = '',
  variant = 'particles',
  intensity = 'medium',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollProgress, effects } = useScrollEffects({
    enableParallax: true,
    enableScale: true,
  });

  // Create motion values for scroll progress
  const scrollMotionValue = useMotionValue(scrollProgress);

  // Update scroll motion value when scroll progress changes
  useEffect(() => {
    scrollMotionValue.set(scrollProgress);
  }, [scrollProgress, scrollMotionValue]);

  // Transform values for mouse interaction (defined outside render)
  const particleX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-50, 50]);
  const particleY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-50, 50]);
  const particleScale = useTransform(scrollMotionValue, [0, 1], [0.5, 1.5]);

  // Transform values for gradients
  const gradientX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-20, 20]);
  const gradientY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-20, 20]);

  // Transform values for overlays
  const baseOpacity = useTransform(scrollMotionValue, [0, 0.5, 1], [1, 0.8, 0.6]);
  const overlayOpacity = useTransform(scrollMotionValue, [0, 0.3, 0.7, 1], [0.1, 0.05, 0.05, 0.1]);

  // Mouse tracking for interactive backgrounds
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'subtle': return 0.3;
      case 'medium': return 0.6;
      case 'intense': return 1.0;
      default: return 0.6;
    }
  };

  const intensityMultiplier = getIntensityMultiplier();

  if (shouldReduceMotion()) {
    return (
      <div
        ref={containerRef}
        className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900" />
      </div>
    );
  }

  const renderParticles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => i);

    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              x: particleX,
              y: particleY,
              scale: particleScale,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  };

  const renderWaves = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3].map((wave) => (
          <motion.div
            key={wave}
            className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
            style={{
              background: `linear-gradient(to top, rgba(59, 130, 246, ${0.1 * wave}), transparent)`,
              y: effects.parallaxOffset(wave * 20 * intensityMultiplier),
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{
                duration: 20 / wave,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='${0.1 * wave}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const renderGeometric = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-500/20"
            style={{
              width: 100 + i * 50,
              height: 100 + i * 50,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              rotate: effects.rotateOffset(i * 45 * intensityMultiplier),
              scale: effects.scaleOffset(0.5, 1.5),
            }}
            animate={{
              rotate: [0, 360],
              borderRadius: ['0%', '50%', '0%'],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    );
  };

  const renderGradient = () => {
    return (
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + gradientX.get()}% ${50 + gradientY.get()}%, rgba(59, 130, 246, ${0.3 * intensityMultiplier}) 0%, rgba(147, 51, 234, ${0.2 * intensityMultiplier}) 50%, rgba(236, 72, 153, ${0.1 * intensityMultiplier}) 100%)`,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, ${0.3 * intensityMultiplier}) 0%, rgba(147, 51, 234, ${0.2 * intensityMultiplier}) 50%, rgba(236, 72, 153, ${0.1 * intensityMultiplier}) 100%)`,
            `radial-gradient(circle at 30% 70%, rgba(147, 51, 234, ${0.3 * intensityMultiplier}) 0%, rgba(236, 72, 153, ${0.2 * intensityMultiplier}) 50%, rgba(59, 130, 246, ${0.1 * intensityMultiplier}) 100%)`,
            `radial-gradient(circle at 70% 30%, rgba(236, 72, 153, ${0.3 * intensityMultiplier}) 0%, rgba(59, 130, 246, ${0.2 * intensityMultiplier}) 50%, rgba(147, 51, 234, ${0.1 * intensityMultiplier}) 100%)`,
            `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, ${0.3 * intensityMultiplier}) 0%, rgba(147, 51, 234, ${0.2 * intensityMultiplier}) 50%, rgba(236, 72, 153, ${0.1 * intensityMultiplier}) 100%)`,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    );
  };

  const renderBackground = () => {
    switch (variant) {
      case 'particles':
        return renderParticles();
      case 'waves':
        return renderWaves();
      case 'geometric':
        return renderGeometric();
      case 'gradient':
        return renderGradient();
      default:
        return renderParticles();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    >
      {/* Base gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"
        style={{
          opacity: baseOpacity,
        }}
      />

      {/* Dynamic background elements */}
      {renderBackground()}

      {/* Subtle overlay for better text readability */}
      <motion.div
        className="absolute inset-0 bg-black/10"
        style={{
          opacity: overlayOpacity,
        }}
      />
    </div>
  );
};

export default DynamicBackgrounds;
