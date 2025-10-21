// Three.js scene component for advanced 3D experiences
// T023
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Torus, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { shouldReduceMotion } from '../../utils/animations';
import { usePerformanceOptimizations, usePerformanceMonitor } from '../../utils/performance';

interface ThreeSceneProps {
  className?: string;
  scene?: 'portfolio' | 'particles' | 'abstract';
  interactive?: boolean;
  showControls?: boolean;
}

interface FloatingObjectProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({
  position,
  color,
  scale = 1,
  speed = 1
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && !shouldReduceMotion()) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box ref={meshRef} position={position} scale={scale}>
        <meshStandardMaterial color={color} />
      </Box>
    </Float>
  );
};

interface ParticleFieldProps {
  count?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count = 100 }) => {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current && !shouldReduceMotion()) {
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

interface PortfolioSceneProps {
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

const PortfolioScene: React.FC<PortfolioSceneProps> = ({ quality = 'medium' }) => {
  // Adjust object count and complexity based on quality
  const objectCount = quality === 'low' ? 2 : quality === 'medium' ? 3 : 5;

  return (
    <group>
      {/* Main portfolio elements - adjust based on quality */}
      {objectCount >= 1 && <FloatingObject position={[-3, 0, 0]} color="#3b82f6" scale={1.5} speed={0.8} />}
      {objectCount >= 2 && <FloatingObject position={[3, 1, -1]} color="#8b5cf6" scale={1.2} speed={1.2} />}
      {objectCount >= 3 && <FloatingObject position={[0, -2, 2]} color="#06b6d4" scale={1} speed={0.6} />}
      {objectCount >= 4 && <FloatingObject position={[-2, 2, -2]} color="#f59e0b" scale={0.8} speed={1.5} />}
      {objectCount >= 5 && <FloatingObject position={[2, -1, 1]} color="#ef4444" scale={0.9} speed={0.9} />}

      {/* Text elements - only show on high quality */}
      {quality === 'high' && (
        <>
          <Text
            position={[0, 3, 0]}
            fontSize={1}
            color="#f8fafc"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Portfolio
          </Text>

          <Text
            position={[0, 1.5, 0]}
            fontSize={0.5}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            Interactive 3D Experience
          </Text>
        </>
      )}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

interface ParticlesSceneProps {
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

const ParticlesScene: React.FC<ParticlesSceneProps> = ({ quality = 'medium' }) => {
  // Adjust particle count based on quality
  const particleCount = quality === 'low' ? 100 : quality === 'medium' ? 200 : 500;
  const starCount = quality === 'low' ? 1000 : quality === 'medium' ? 3000 : 5000;

  return (
    <group>
      <ParticleField count={particleCount} />
      <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

interface AbstractSceneProps {
  interactive?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

const AbstractScene: React.FC<AbstractSceneProps> = ({ quality = 'medium' }) => {
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  // Adjust geometry complexity based on quality
  const torusArgs: [number, number, number, number] = quality === 'low' 
    ? [2, 0.5, 8, 50] 
    : quality === 'medium' 
    ? [2, 0.5, 16, 100] 
    : [2, 0.5, 32, 200];
  const sphereArgs: [number, number, number] = quality === 'low' 
    ? [1.5, 16, 16] 
    : quality === 'medium' 
    ? [1.5, 24, 24] 
    : [1.5, 32, 32];
  const showExtraObjects = quality !== 'low';

  useFrame((state) => {
    if (!shouldReduceMotion()) {
      if (torusRef.current) {
        torusRef.current.rotation.x = state.clock.elapsedTime * 0.5;
        torusRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      }
      if (sphereRef.current) {
        sphereRef.current.rotation.x = state.clock.elapsedTime * -0.2;
        sphereRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      }
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Torus ref={torusRef} args={torusArgs} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </Torus>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere ref={sphereRef} args={sphereArgs} position={[4, 2, -2]}>
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.7} />
        </Sphere>
      </Float>

      {showExtraObjects && (
        <Float speed={1} rotationIntensity={0.6} floatIntensity={0.6}>
          <Box args={[1, 1, 1]} position={[-3, -1, 1]}>
            <meshStandardMaterial color="#f59e0b" />
          </Box>
        </Float>
      )}
    </group>
  );
};

interface SceneContentProps {
  scene: 'portfolio' | 'particles' | 'abstract';
  interactive?: boolean;
}

const SceneContent: React.FC<SceneContentProps> = ({ scene, interactive = true }) => {
  const { camera, gl } = useThree();
  const { updateMetrics } = usePerformanceMonitor(true);
  const { calculateLOD, optimizeMemoryUsage } = usePerformanceOptimizations();

  // Performance monitoring
  useFrame((state) => {
    // Update performance metrics
    const memoryInfo = (performance as { memory?: { usedJSHeapSize: number } }).memory;
    const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / (1024 * 1024) : 0;

    updateMetrics({
      fps: 1 / state.clock.getDelta(),
      memoryUsage,
      drawCalls: gl.info.render.calls,
      triangles: gl.info.render.triangles,
    });
  });

  // Set camera position for better viewing
  React.useEffect(() => {
    camera.position.set(0, 0, 10);
  }, [camera]);

  // Memory optimization on unmount
  React.useEffect(() => {
    return () => {
      const { clearUnusedTextures, clearUnusedGeometries } = optimizeMemoryUsage();
      clearUnusedTextures();
      clearUnusedGeometries();
    };
  }, [optimizeMemoryUsage]);

  const renderScene = () => {
    // Calculate LOD for objects based on camera distance
    const cameraPosition: [number, number, number] = [
      camera.position.x,
      camera.position.y,
      camera.position.z
    ];

    // Example LOD calculation for a floating object at position [5, 0, 0]
    const lodSettings = calculateLOD(
      Math.sqrt(
        Math.pow(cameraPosition[0] - 5, 2) +
        Math.pow(cameraPosition[1] - 0, 2) +
        Math.pow(cameraPosition[2] - 0, 2)
      ),
      'medium'
    );

    // Only render if not culled
    if (!lodSettings.visible) {
      return null;
    }

    switch (scene) {
      case 'portfolio':
        return <PortfolioScene interactive={interactive} quality={lodSettings.quality} />;
      case 'particles':
        return <ParticlesScene interactive={interactive} quality={lodSettings.quality} />;
      case 'abstract':
        return <AbstractScene interactive={interactive} quality={lodSettings.quality} />;
      default:
        return <PortfolioScene interactive={interactive} quality={lodSettings.quality} />;
    }
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Scene content */}
      {renderScene()}

      {/* Controls */}
      {interactive && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={20}
          minDistance={5}
        />
      )}
    </>
  );
};

const ThreeScene: React.FC<ThreeSceneProps> = ({
  className = '',
  scene = 'portfolio',
  interactive = true,
  showControls = false,
}) => {
  if (shouldReduceMotion()) {
    return (
      <div className={`flex items-center justify-center h-96 bg-slate-900 rounded-lg ${className}`}>
        <div className="text-slate-400 text-center">
          <div className="text-2xl mb-2">🎨</div>
          <div>3D Scene Disabled</div>
          <div className="text-sm text-slate-500 mt-1">Reduced motion enabled</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-96 w-full rounded-lg overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent scene={scene} interactive={interactive} />
        </Suspense>
      </Canvas>

      {showControls && (
        <div className="absolute bottom-4 left-4 text-xs text-slate-400 bg-black/50 px-2 py-1 rounded">
          Mouse: Rotate • Scroll: Zoom • Right-click: Pan
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
