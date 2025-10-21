// Performance optimization utilities for 3D scenes and advanced components
// T029
import { useMemo, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  drawCalls: number;
  triangles: number;
}

interface LODSettings {
  distance: number;
  quality: 'low' | 'medium' | 'high';
  visible: boolean;
}

export const usePerformanceOptimizations = () => {
  // Adaptive quality based on device capabilities
  const deviceCapabilities = useMemo(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    return {
      webgl2: !!canvas.getContext('webgl2'),
      maxTextureSize: gl?.getParameter(gl.MAX_TEXTURE_SIZE) || 2048,
      maxRenderbufferSize: gl?.getParameter(gl.MAX_RENDERBUFFER_SIZE) || 2048,
      supportedExtensions: gl?.getSupportedExtensions() || [],
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
      deviceMemory: ((navigator as { deviceMemory?: number }).deviceMemory) || 4,
    };
  }, []);

  // LOD (Level of Detail) management
  const calculateLOD = useCallback((distance: number, baseQuality: 'low' | 'medium' | 'high'): LODSettings => {
    let quality: 'low' | 'medium' | 'high' = baseQuality;
    let visible = true;

    // Adaptive quality based on distance and device capabilities
    if (distance > 50) {
      quality = 'low';
    } else if (distance > 25) {
      quality = baseQuality === 'high' ? 'medium' : 'low';
    }

    // Hide very distant objects
    if (distance > 100) {
      visible = false;
    }

    // Reduce quality on low-end devices
    if (deviceCapabilities.hardwareConcurrency < 4 || deviceCapabilities.deviceMemory < 4) {
      if (quality === 'high') quality = 'medium';
      if (quality === 'medium') quality = 'low';
    }

    return { distance, quality, visible };
  }, [deviceCapabilities]);

  // Frustum culling optimization
  const shouldCullObject = useCallback((
    objectPosition: [number, number, number],
    cameraPosition: [number, number, number],
    cameraDirection: [number, number, number],
    fov: number,
    aspect: number,
    near: number,
    far: number
  ): boolean => {
    const [ox, oy, oz] = objectPosition;
    const [cx, cy, cz] = cameraPosition;
    const [dx, dy, dz] = cameraDirection;

    // Simple distance-based culling
    const distance = Math.sqrt(
      (ox - cx) ** 2 + (oy - cy) ** 2 + (oz - cz) ** 2
    );

    if (distance > far || distance < near) {
      return true;
    }

    // View frustum culling (simplified)
    const cameraToObject = [ox - cx, oy - cy, oz - cz];
    const dotProduct = cameraToObject[0] * dx + cameraToObject[1] * dy + cameraToObject[2] * dz;
    const angle = Math.acos(dotProduct / (distance * Math.sqrt(dx**2 + dy**2 + dz**2)));

    const halfFov = (fov * Math.PI / 180) / 2;
    const maxAngle = halfFov + Math.atan(aspect);

    return angle > maxAngle;
  }, []);

  // Memory management
  const optimizeMemoryUsage = useCallback(() => {
    // Force garbage collection if available (development only)
    if (import.meta.env.DEV) {
      const gc = (window as { gc?: () => void }).gc;
      if (gc) {
        gc();
      }
    }

    // Clear unused textures and geometries
    // This would be implemented in the ThreeScene component
    return {
      clearUnusedTextures: () => {
        // Implementation would dispose of unused Three.js textures
        // console.log('Clearing unused textures');
      },
      clearUnusedGeometries: () => {
        // Implementation would dispose of unused Three.js geometries
        // console.log('Clearing unused geometries');
      },
    };
  }, []);

  // Instancing for repeated objects
  const createInstancedMesh = useCallback(<T,>(
    geometry: T,
    material: T,
    count: number
  ) => {
    // This would create an instanced mesh for better performance
    return {
      geometry,
      material,
      count,
      instanceMatrix: new Float32Array(count * 16),
      updateInstance: () => {
        // Implementation would update instance matrix
        // for (let i = 0; i < 16; i++) {
        //   instanceMatrix[index * 16 + i] = matrix[i];
        // }
      },
    };
  }, []);

  // Texture compression and optimization
  const optimizeTextures = useCallback((textures: { image?: { width: number; height: number } }[]) => {
    return textures.map(texture => {
      // Enable texture compression if supported
      if (deviceCapabilities.supportedExtensions.includes('WEBGL_compressed_texture_s3tc')) {
        // texture.format = THREE.RGB_S3TC_DXT1_Format;
      }

      // Set appropriate texture size based on device capabilities
      const maxSize = Math.min(deviceCapabilities.maxTextureSize, 2048);
      if (texture.image && (texture.image.width > maxSize || texture.image.height > maxSize)) {
        // console.warn(`Texture size exceeds device capabilities: ${texture.image.width}x${texture.image.height}`);
      }

      return texture;
    });
  }, [deviceCapabilities]);

  return {
    deviceCapabilities,
    calculateLOD,
    shouldCullObject,
    optimizeMemoryUsage,
    createInstancedMesh,
    optimizeTextures,
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = (enabled = true) => {
  const metrics = useMemo(() => ({
    fps: 0,
    memoryUsage: 0,
    drawCalls: 0,
    triangles: 0,
  }), []);

  const updateMetrics = useCallback((newMetrics: Partial<PerformanceMetrics>) => {
    if (!enabled) return;

    Object.assign(metrics, newMetrics);

    // Log performance warnings
    if (metrics.fps < 30) {
      // console.warn(`Low FPS detected: ${metrics.fps}`);
    }

    if (metrics.memoryUsage > 100) { // MB
      // console.warn(`High memory usage: ${metrics.memoryUsage}MB`);
    }
  }, [enabled, metrics]);

  return { metrics, updateMetrics };
};

// Resource pooling for reusable objects
export class ResourcePool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn?: (item: T) => void;

  constructor(createFn: () => T, resetFn?: (item: T) => void) {
    this.createFn = createFn;
    this.resetFn = resetFn;
  }

  get(): T {
    const item = this.pool.pop() || this.createFn();
    this.resetFn?.(item);
    return item;
  }

  release(item: T): void {
    this.resetFn?.(item);
    if (this.pool.length < 50) { // Limit pool size
      this.pool.push(item);
    }
  }

  clear(): void {
    this.pool.length = 0;
  }
}

export default usePerformanceOptimizations;