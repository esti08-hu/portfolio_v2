// Three.js scene hook for managing 3D experiences and performance
// T027
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { shouldReduceMotion } from '../utils/animations';

interface ThreeSceneState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  performance: {
    fps: number;
    frameTime: number;
    memoryUsage: number;
  };
  quality: 'low' | 'medium' | 'high' | 'ultra';
}

interface UseThreeSceneOptions {
  autoStart?: boolean;
  quality?: 'low' | 'medium' | 'high' | 'ultra';
  enablePerformanceMonitoring?: boolean;
  onLoad?: () => void;
  onError?: (error: string) => void;
  onPerformanceChange?: (performance: ThreeSceneState['performance']) => void;
}

interface UseThreeSceneReturn {
  sceneState: ThreeSceneState;
  startScene: () => void;
  stopScene: () => void;
  resetScene: () => void;
  setQuality: (quality: ThreeSceneState['quality']) => void;
  isSupported: boolean;
  performance: ThreeSceneState['performance'];
}

export const useThreeScene = (
  options: UseThreeSceneOptions = {}
): UseThreeSceneReturn => {
  const {
    autoStart = true,
    quality: initialQuality = 'medium',
    enablePerformanceMonitoring = true,
    onLoad,
    onError,
    onPerformanceChange,
  } = options;

  const [sceneState, setSceneState] = useState<ThreeSceneState>({
    isLoaded: false,
    isLoading: false,
    error: null,
    performance: {
      fps: 0,
      frameTime: 0,
      memoryUsage: 0,
    },
    quality: initialQuality,
  });

  const performanceRef = useRef({
    frameCount: 0,
    lastTime: performance.now(),
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
  });

  const animationFrameRef = useRef<number>();
  const isMonitoringRef = useRef(false);

  // Check if WebGL is supported
  const isSupported = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        canvas.getContext('webgl')
      );
    } catch {
      return false;
    }
  }, []);

  // Performance monitoring
  const startPerformanceMonitoring = useCallback(() => {
    if (!enablePerformanceMonitoring || isMonitoringRef.current) return;

    isMonitoringRef.current = true;

    const monitorPerformance = () => {
      const now = performance.now();
      const deltaTime = now - performanceRef.current.lastTime;

      if (deltaTime >= 1000) { // Update every second
        const fps = (performanceRef.current.frameCount * 1000) / deltaTime;
        const frameTime = deltaTime / performanceRef.current.frameCount;

        // Get memory usage if available
        const memoryInfo = (performance as { memory?: { usedJSHeapSize: number } }).memory;
        const memoryUsage = memoryInfo
          ? memoryInfo.usedJSHeapSize / (1024 * 1024) // MB
          : 0;

        const performanceData = {
          fps: Math.round(fps),
          frameTime: Math.round(frameTime * 100) / 100,
          memoryUsage: Math.round(memoryUsage),
        };

        performanceRef.current.fps = performanceData.fps;
        performanceRef.current.frameTime = performanceData.frameTime;
        performanceRef.current.memoryUsage = performanceData.memoryUsage;

        setSceneState(prev => ({
          ...prev,
          performance: performanceData,
        }));

        onPerformanceChange?.(performanceData);

        performanceRef.current.frameCount = 0;
        performanceRef.current.lastTime = now;
      }

      performanceRef.current.frameCount++;
      animationFrameRef.current = requestAnimationFrame(monitorPerformance);
    };

    monitorPerformance();
  }, [enablePerformanceMonitoring, onPerformanceChange]);

  const stopPerformanceMonitoring = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    isMonitoringRef.current = false;
  }, []);

  // Quality management
  const setQuality = useCallback((quality: ThreeSceneState['quality']) => {
    setSceneState(prev => ({ ...prev, quality }));

    // Adjust quality settings based on performance
    const qualitySettings = {
      low: { pixelRatio: 0.5, antialias: false, shadows: false },
      medium: { pixelRatio: 1, antialias: true, shadows: false },
      high: { pixelRatio: 1, antialias: true, shadows: true },
      ultra: { pixelRatio: window.devicePixelRatio || 1, antialias: true, shadows: true },
    };

    // This would be used by the ThreeScene component
    console.log('Quality settings:', qualitySettings[quality]);
  }, []);

  // Scene lifecycle management
  const startScene = useCallback(async () => {
    if (!isSupported) {
      const error = 'WebGL is not supported on this device';
      setSceneState(prev => ({ ...prev, error, isLoading: false }));
      onError?.(error);
      return;
    }

    if (shouldReduceMotion()) {
      const error = '3D scenes disabled due to reduced motion preference';
      setSceneState(prev => ({ ...prev, error, isLoading: false }));
      onError?.(error);
      return;
    }

    setSceneState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Simulate loading time for 3D assets
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSceneState(prev => ({
        ...prev,
        isLoaded: true,
        isLoading: false,
      }));

      startPerformanceMonitoring();
      onLoad?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load 3D scene';
      setSceneState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      onError?.(errorMessage);
    }
  }, [isSupported, startPerformanceMonitoring, onLoad, onError]);

  const stopScene = useCallback(() => {
    stopPerformanceMonitoring();
    setSceneState(prev => ({
      ...prev,
      isLoaded: false,
      isLoading: false,
    }));
  }, [stopPerformanceMonitoring]);

  const resetScene = useCallback(() => {
    stopScene();
    setTimeout(() => startScene(), 100);
  }, [stopScene, startScene]);

  // Auto-start scene
  useEffect(() => {
    if (autoStart && isSupported && !shouldReduceMotion()) {
      startScene();
    }
  }, [autoStart, isSupported, startScene]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPerformanceMonitoring();
    };
  }, [stopPerformanceMonitoring]);

  // Adaptive quality based on performance
  useEffect(() => {
    if (!enablePerformanceMonitoring) return;

    const { fps } = sceneState.performance;

    if (fps < 30 && sceneState.quality !== 'low') {
      console.warn('Low FPS detected, reducing quality');
      setQuality('low');
    } else if (fps < 45 && sceneState.quality === 'ultra') {
      console.warn('Moderate FPS detected, reducing quality');
      setQuality('high');
    }
  }, [sceneState.performance, sceneState.quality, enablePerformanceMonitoring, setQuality]);

  return {
    sceneState,
    startScene,
    stopScene,
    resetScene,
    setQuality,
    isSupported,
    performance: sceneState.performance,
  };
};

export default useThreeScene;