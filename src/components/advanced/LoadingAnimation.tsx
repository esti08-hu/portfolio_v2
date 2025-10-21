// Loading animation component for engaging user experience during loading states
// T025
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shouldReduceMotion } from '../../utils/animations';

interface LoadingAnimationProps {
  isLoading: boolean;
  variant?: 'spinner' | 'pulse' | 'bars' | 'dots' | 'wave' | 'geometric';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  message?: string;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  isLoading,
  variant = 'spinner',
  size = 'md',
  color = '#3b82f6',
  message,
  showProgress = false,
  progress = 0,
  className = '',
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  // Animate progress if provided
  useEffect(() => {
    if (showProgress && progress !== currentProgress) {
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, currentProgress, showProgress]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      case 'xl': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };

  const sizeClasses = getSizeClasses();

  if (shouldReduceMotion()) {
    return (
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`flex flex-col items-center justify-center space-y-4 ${className}`}
          >
            <div
              className={`${sizeClasses} rounded-full border-2 border-current`}
              style={{ color }}
            />
            {message && (
              <div className="text-slate-400 text-sm text-center">
                {message}
              </div>
            )}
            {showProgress && (
              <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const renderSpinner = () => (
    <motion.div
      className={`${sizeClasses} border-2 border-transparent rounded-full`}
      style={{ borderTopColor: color }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );

  const renderPulse = () => (
    <motion.div
      className={`${sizeClasses} rounded-full`}
      style={{ backgroundColor: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  const renderBars = () => {
    const bars = Array.from({ length: 5 }, (_, i) => i);
    return (
      <div className="flex items-end space-x-1">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            className="w-1 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              height: [4, 16, 4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: bar * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  };

  const renderDots = () => {
    const dots = Array.from({ length: 3 }, (_, i) => i);
    return (
      <div className="flex space-x-2">
        {dots.map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: dot * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  };

  const renderWave = () => {
    const waves = Array.from({ length: 4 }, (_, i) => i);
    return (
      <div className="flex items-center space-x-1">
        {waves.map((wave) => (
          <motion.div
            key={wave}
            className="w-1 h-8 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              scaleY: [1, 0.3, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: wave * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  };

  const renderGeometric = () => (
    <motion.div
      className={`${sizeClasses} relative`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.div
        className="absolute inset-0 border-2 rounded"
        style={{ borderColor: color }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-2 border-2 rounded-full"
        style={{ borderColor: color }}
        animate={{
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );

  const renderAnimation = () => {
    switch (variant) {
      case 'spinner': return renderSpinner();
      case 'pulse': return renderPulse();
      case 'bars': return renderBars();
      case 'dots': return renderDots();
      case 'wave': return renderWave();
      case 'geometric': return renderGeometric();
      default: return renderSpinner();
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={`flex flex-col items-center justify-center space-y-4 ${className}`}
        >
          {renderAnimation()}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm text-center max-w-xs"
            >
              {message}
            </motion.div>
          )}

          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-32 space-y-2"
            >
              <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-xs text-slate-500 text-center">
                {Math.round(currentProgress)}%
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
