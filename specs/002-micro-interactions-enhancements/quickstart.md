# Quickstart: Micro-Interaction Enhancements

**Feature**: 002-micro-interactions-enhancements
**Date**: October 21, 2025

## Prerequisites

- React 18+ with TypeScript
- Framer Motion installed
- Node.js 18+
- GitHub Personal Access Token (for API features)

## Installation

```bash
npm install @react-three/fiber @react-three/drei howler @tanstack/react-query
```

## Basic Setup

### 1. Custom Cursor Component

```tsx
import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 w-6 h-6 bg-blue-500 rounded-full opacity-80 transition-transform duration-100"
      style={{
        left: position.x - 12,
        top: position.y - 12,
        transform: `scale(1.2)`
      }}
    />
  );
};
```

### 2. Hover Effects Hook

```tsx
import { useState } from 'react';

export const useHoverEffect = () => {
  const [isHovered, setIsHovered] = useState(false);

  return {
    isHovered,
    hoverProps: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    }
  };
};
```

### 3. API Data Integration

```tsx
import { useQuery } from '@tanstack/react-query';

const useGitHubStats = (username: string) => {
  return useQuery({
    queryKey: ['github-stats', username],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      return response.json();
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
};
```

## Advanced Features

### 3D Scene Setup

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeScene = () => {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </Canvas>
  );
};
```

### Sound Effects

```tsx
import { Howl } from 'howler';

const useSound = (src: string) => {
  const sound = new Howl({ src: [src] });

  return {
    play: () => sound.play(),
    stop: () => sound.stop()
  };
};
```

## Performance Tips

- Use `React.memo` for interactive components
- Throttle mouse move events with `requestAnimationFrame`
- Lazy load 3D components
- Respect `prefers-reduced-motion` media query

## Testing

```bash
npm run test
# Test interactive components with React Testing Library
```

## Deployment

Ensure all assets are optimized and API keys are properly configured for production.