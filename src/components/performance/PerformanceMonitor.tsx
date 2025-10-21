// Performance monitoring component for production analytics
// T030
import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  loadTime: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  onMetricsCollected?: (metrics: PerformanceMetrics) => void;
  reportInterval?: number; // in milliseconds
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = true,
  onMetricsCollected,
  reportInterval = 30000 // 30 seconds
}) => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const newMetrics: Partial<PerformanceMetrics> = {};

      entries.forEach((entry) => {
        switch (entry.entryType) {
          case 'paint': {
            if (entry.name === 'first-contentful-paint') {
              newMetrics.fcp = entry.startTime;
            }
            break;
          }
          case 'largest-contentful-paint': {
            newMetrics.lcp = entry.startTime;
            break;
          }
          case 'first-input': {
            const firstInputEntry = entry as PerformanceEventTiming;
            newMetrics.fid = firstInputEntry.processingStart - entry.startTime;
            break;
          }
          case 'layout-shift': {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!layoutShiftEntry.hadRecentInput) {
              newMetrics.cls = (newMetrics.cls || 0) + (layoutShiftEntry.value || 0);
            }
            break;
          }
          case 'navigation': {
            const navigationEntry = entry as PerformanceNavigationTiming;
            newMetrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            newMetrics.loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
            break;
          }
        }
      });

      setMetrics(prev => ({ ...prev, ...newMetrics }));
    });

    // Observe performance entries
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });

    // Report metrics periodically
    const reportIntervalId = setInterval(() => {
      if (Object.keys(metrics).length > 0) {
        onMetricsCollected?.(metrics as PerformanceMetrics);
      }
    }, reportInterval);

    return () => {
      observer.disconnect();
      clearInterval(reportIntervalId);
    };
  }, [enabled, onMetricsCollected, reportInterval, metrics]);

  // Development-only performance display
  if (import.meta.env.DEV) {
    return (
      <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded font-mono z-50 max-w-xs">
        <div className="font-bold mb-1">Performance Metrics</div>
        {metrics.fcp && <div>FCP: {metrics.fcp.toFixed(0)}ms</div>}
        {metrics.lcp && <div>LCP: {metrics.lcp.toFixed(0)}ms</div>}
        {metrics.fid && <div>FID: {metrics.fid.toFixed(0)}ms</div>}
        {metrics.cls && <div>CLS: {metrics.cls.toFixed(3)}</div>}
        {metrics.ttfb && <div>TTFB: {metrics.ttfb.toFixed(0)}ms</div>}
        {metrics.loadTime && <div>Load: {metrics.loadTime.toFixed(0)}ms</div>}
      </div>
    );
  }

  return null;
};

export default PerformanceMonitor;