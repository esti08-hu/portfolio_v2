// Theme transition context hook
// T022
import { useContext } from 'react';
import { ThemeTransitionContext } from '../components/immersive/ThemeTransitionProvider';

export const useThemeTransitionContext = () => {
  const context = useContext(ThemeTransitionContext);
  if (!context) {
    throw new Error('useThemeTransitionContext must be used within a ThemeTransitionProvider');
  }
  return context;
};